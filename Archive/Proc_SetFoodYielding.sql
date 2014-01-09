DROP procedure IF EXISTS `Proc_SetFoodYielding`;

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Proc_SetFoodYielding`(IN p_userid INT, IN p_foodid INT)
BEGIN

declare v_count int;
declare v_userfoodid int;
declare v_star int;
declare v_yieldingtime int;
declare v_yield int;
declare v_status int;
declare v_costgold int;

select count(*) into @v_count
  from userfoods as a 
  left join users as b on a.userid = b.userid
  left join foods as c on a.foodid = c.foodid
 where a.userid = p_userid and a.foodid = p_foodid and b.level >= c.unlocklevel;

if @v_count > 0
then
	select max(status) into @v_status from userfoods where userid = p_userid;
	set @v_status = @v_status + 1;
	set @v_userfoodid = p_foodid + @v_status + 100;

	select b.yieldingtime, b.yield, b.costgold, b.star into @v_yieldingtime, @v_yield, @v_costgold, @v_star
	  from userfoods as a 
	  left join foodprice as b on a.foodid = b.foodid and a.star = b.star
	where a.userid = p_userid and a.foodid = p_foodid and a.status = -1; # status = -1 表示调制好的食品，唯一的。

	if @v_status = 0 # 正在调制
	then
		insert into userfoods(userid, userfoodid, foodid, yieldstarttime, yieldendtime, yield, status, star)
			   values(p_userid, @v_userfoodid, p_foodid, CURRENT_TIMESTAMP
					, date_add(CURRENT_TIMESTAMP, interval @v_yieldingtime second), @v_yield, @v_status, @v_star);

		# 更新金币数，不判断金币是否足够
		update users set gold = gold - @v_costgold where userid = p_userid;
	else # 加入调制队列
		insert into userfoods(userid, userfoodid, foodid, yield, status, star)
			   values(p_userid, @v_userfoodid, p_foodid, @v_yield, @v_status, @v_star);
	end if;
                                          
end if;        

select userid, (gold + tips) as gold
  from users
 where userid = p_userid;

END$$
DELIMITER ;

