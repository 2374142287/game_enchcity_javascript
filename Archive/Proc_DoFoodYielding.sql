DROP procedure IF EXISTS `Proc_DoFoodYielding`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Proc_DoFoodYielding`()
BEGIN

/*
1. 将userfoods表中所有status为0的重新计算是否调制结束, 调制结束时删除该记录，并更新调制好的食品数量
2. 将userfoods表中没有正在调制的用户进行下一个食品的调制
3. 返回调制列表有变化的且用户在线的用户ID列表
4. 程序根据该列表进行数据推送
*/

declare v_count int;
declare v_counter int;
declare v_userid int;
declare v_userfoodid int;
declare v_yieldstarttime int;
declare v_yieldendtime int;
declare v_foodid int;
declare v_yieldingtime int;
declare v_yield int;
declare v_costgold int;
declare v_newyieldingid int;

delete from tmp_foodyieldingusers;
delete from tmp_foodyielding;

insert into tmp_foodyielding(userid, userfoodid, yieldstarttime, yieldendtime)
	select userid, userfoodid, yieldstarttime, yieldendtime from userfoods where status = 0;

select count(*) into @v_count from tmp_foodyielding;
set @v_counter = 0;
while (@v_counter := @v_counter + 1) <= @v_count
do
	select userid, userfoodid, yieldstarttime, yieldendtime 
	  into @v_userid, @v_userfoodid, @v_yieldstarttime, @v_yieldendtime 
	  from tmp_foodyielding where isgenerated = 0 limit 1;

	if @v_yieldendtime < CURRENT_TIMESTAMP
	then
		select b.foodid, b.yieldingtime, b.yield, b.costgold 
		  into @v_foodid, @v_yieldingtime, @v_yield, @v_costgold
		  from userfoods as a 
		  left join foodprice as b on a.foodid = b.foodid and a.star = b.star
		where a.userid = @v_userid and a.userfoodid = @v_userfoodid;

		# update the quantity of the yielded food
		update userfoods set quantity = quantity + @v_yield 
		 where userid = @v_userid and foodid = @v_foodid and status = -1; # status = -1 表示调制好的食品

		# updte the food state of the user
		update users set foodstatus = 1 where userid = @v_userid;

		# remove the record
		delete from userfoods where userid = @v_userid and userfoodid = @v_userfoodid;

		# do the next yield if existed
		select userfoodid into @v_newyieldingid from userfoods
		 where userid = @v_userid and foodid = @v_foodid and status != -1
		 limit 1;

		if @v_newyieldingid is not null
		then
			update userfoods set status = 0, yieldstarttime = CURRENT_TIMESTAMP
				   , yieldendtime = date_add(CURRENT_TIMESTAMP, interval @v_yieldingtime second)
			 where userid = @v_userid and userfoodid = @v_newyieldingid;

			# 更新金币数，不判断金币是否足够
			update users set gold = gold - @v_costgold where userid = @v_userid;

		end if;

		# insert one record to tmp_foodyieldingusers
		insert into tmp_foodyieldingusers(userid) values(@v_userid);

	end if;

	# update isgenerated to 1
	update tmp_foodyielding set isgenerated = 1 
	 where userid = @v_userid and userfoodid = @v_userfoodid;

end while;

select distinct userid from tmp_foodyieldingusers;

END$$

DELIMITER ;

