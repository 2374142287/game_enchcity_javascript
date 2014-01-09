DROP procedure IF EXISTS `Proc_GuestGenerate`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Proc_GuestGenerate`(IN p_userid INT)
BEGIN

/*
1. 只有用户有食品或用户在线时，才进行客人生成及消费计算
2. 在生成客人时，未进店的客人将被删除。
3. 客人出店后将删除记录
4. 客人进店间隔 ＝ 3600 / 每小时的客流量
5. 客人进店的最小间隔为3秒，因此以3秒为间隔计算进店、消费、出店。
6. 进店顺序随机
7. 在购买的时候生成购买哪两个食品（流浪汉只有酒水）
*/

declare v_magic int;	 # 用户魔幻值
declare v_gsttotal int;	 # 客人总数
declare v_gstcnta int;   # A类客人数
declare v_gstcntb int;   # B类客人数
declare v_gstcntc int;   # C类客人数
declare v_gstcntd int;   # D类客人数
declare v_counter int;   # 计数器
declare v_gstidmax int;  # 客人ID最大值
declare v_gstidbase int; # 客人ID基准值
declare v_interval int;  # 客人进店间隔
declare v_entertimemax int;  # 客人进店时间最大值

# 删除未进店的或已经出店的客人
delete from userguest where entertime > CURRENT_TIMESTAMP or exittime < CURRENT_TIMESTAMP;

select curmagic into @v_magic from users where userid = p_userid;

set @v_gsttotal = Func_GetGuestCount(@v_magic);
set @v_gstcnta  = floor(Func_GetGuestPercent(@v_magic, 'A') * @v_gsttotal / 100);
set @v_gstcntb  = floor(Func_GetGuestPercent(@v_magic, 'B') * @v_gsttotal / 100);
set @v_gstcntc  = floor(Func_GetGuestPercent(@v_magic, 'C') * @v_gsttotal / 100);
set @v_gstcntd  = floor(Func_GetGuestPercent(@v_magic, 'D') * @v_gsttotal / 100);
set @v_interval = floor(3600 / @v_gsttotal);

#select @v_gsttotal, @v_gstcnta;


# 设置客人进店最后时间
select max(entertime) into @v_entertimemax from userguest where userid = p_userid;
if @v_entertimemax is null 
then set @v_entertimemax = CURRENT_TIMESTAMP;
end if;

# 获取客人ID基准值
if @v_gstidmax is null or @v_gstidmax > 10000
then
	set @v_gstidbase = 0;
else
	set @v_gstidbase = @v_gstidmax;
end if;

# 流浪汉
set @v_counter = 0;
while (@v_counter := @v_counter + 1) <= @v_gstcnta
do
	insert into userguest(userid, guestid, typecode, hastip)
		   values(p_userid, (@v_gstidbase := @v_gstidbase + 1), 'A', 0);
end while;
# 上班族
set @v_counter = 0;
while (@v_counter := @v_counter + 1) <= @v_gstcntb
do
	insert into userguest(userid, guestid, typecode, hastip)
		   values(p_userid, (@v_gstidbase := @v_gstidbase + 1), 'B', 1);
end while;
# 唏哈族
set @v_counter = 0;
while (@v_counter := @v_counter + 1) <= @v_gstcntc
do
	insert into userguest(userid, guestid, typecode, hastip)
		   values(p_userid, (@v_gstidbase := @v_gstidbase + 1), 'C', 1);
end while;
# 富豪
set @v_counter = 0;
while (@v_counter := @v_counter + 1) <= @v_gstcntD
do
	insert into userguest(userid, guestid, typecode, hastip)
		   values(p_userid, (@v_gstidbase := @v_gstidbase + 1), 'D', 1);
end while;

select max(guestid) into @v_gstidmax from userguest where userid = p_userid;

# 设置客人进店时间
update userguest as a
	   left join
		(select userid, guestid, (@v_gstorder := @v_gstorder + 1) as rownum 
		   from userguest 
		  where userid = p_userid and entertime is null
		  order by rand()) as b
	   on a.userid = b.userid and a.guestid = b.guestid
   set enterorder = rownum
 where a.userid = p_userid and a.entertime is null;

# 设置客人进店、消费及出店时间
update userguest
   set entertime = (@v_entertimemax := date_add(@v_entertimemax, INTERVAL @v_interval SECOND)),
	   consumetime = date_add(@v_entertimemax , INTERVAL 10 SECOND),
       exittime = date_add(@v_entertimemax , INTERVAL 1 MINUTE)
 where userid = p_userid and entertime is null
 order by enterorder;

#*/

END$$

DELIMITER ;

