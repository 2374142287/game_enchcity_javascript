DROP procedure IF EXISTS `Proc_GuestConsuming`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Proc_GuestConsuming`(IN p_userid INT)
BEGIN
/* 
1. 只有用户有食品或用户在线时，才进行客人生成及消费计算
2. 设客人进店10秒后可以消费，客人进店50秒后可以出店，则系统可以间隔10秒
3. 消费后用户gold数据增加
*/

declare v_count int;
declare v_userid int;
declare v_counter int;
declare v_guestid int;
declare v_guestcount int;
declare v_guestcounter int;
declare v_drinkid int;
declare v_desertid int;
declare v_foodcount int;

delete from tmp_usersofgstcon;
delete from tmp_guestconsuming;

insert into tmp_usersofgstcon(userid)
	select userid from users where status = 1 or foodstatus = 1;

select count(*) into @v_count from tmp_usersofgstcon;
set @v_counter = 0;
while (@v_counter := @v_counter + 1) <= @v_count
do
	select userid into @v_userid from tmp_usersofgstcon where isgenerated = 0 limit 1;

	insert into tmp_guestconsuming(userid, guestid)
		select userid, guestid
		  from userguest 
		 where userid = @v_userid and isconsumed != 1 and isentered = 1
		   and consumetime < CURRENT_TIMESTAMP and CURRENT_TIMESTAMP < exittime;

	select count(*) into @v_guestcount from tmp_guestconsuming where isgenerated = 0;
	set @v_guestcounter = 0;
	while (@v_guestcounter := @v_guestcounter + 1) <= @v_guestcount
	do
		select guestid into @v_guestid from tmp_guestconsuming where isgenerated = 0 limit 1;

		# generate drinking
		set @v_foodcount = 0;
		select count(*) into @v_foodcount 
		  from userguest as a left join guestfoods as b
			on a.typecode = b.typecode
		 where a.userid = @v_userid and a.guestid = @v_guestid and b.foodtypecode = 'DRK';

		if @v_foodcount = 0 then set @v_drindid = -1;
		else
			set @v_drindid = -2; # 要消费但没有食品
			select b.foodid into @v_drinkid
			  from userguest as a 
			  left join guestfoods as b on a.typecode = b.typecode
			  left join userfoods as c on b.foodid = c.foodid and status = -1
			 where a.userid = @v_userid and a.guestid = @v_guestid
			   and b.foodtypecode = 'DRK' and c.quantity > 0
			  order by rand()
			 limit 1;
		end if;

		# generate desert
		set @v_foodcount = 0;
		select count(*) into @v_foodcount 
		  from userguest as a left join guestfoods as b
			on a.typecode = b.typecode
		 where a.userid = @v_userid and a.guestid = @v_guestid and b.foodtypecode = 'DST';

		if @v_foodcount = 0 then set @v_desertid = -1;
		else
			set @v_desertid = -2; # 要消费但没有食品
			select b.foodid into @v_desertid
			  from userguest as a 
			  left join guestfoods as b on a.typecode = b.typecode
			  left join userfoods as c on b.foodid = c.foodid and ststus = -1
			 where a.userid = @v_userid and a.guestid = @v_guestid
			   and b.foodtypecode = 'DST' and c.quantity > 0
			  order by rand()
			 limit 1;
		end if;

		# set foodid and consume status
		update userguest set drinkid = @v_drinkid, desertid = @v_desertid, isconsumed = 1
		 where userid = @v_userid and guestid = @v_guestid;

		# update the count if the food;
		update userfoods set quantity = quantity - 1
		 where userid = @v_userid and status = -1 and (foodid = @v_drinkid or foodid = @v_desertid);

		# update isgenerated to 1
		update tmp_guestconsuming set isgenerated = 1 
		 where userid = @v_userid and guestid = @v_guestid;

	end while;

	# update isgenerated to 1
	update tmp_usersofgstcon set isgenerated = 1 where userid = @v_userid;

	# update gold. 注：userfoods中status为－1表示调制好的食品
	update users as a left join 
			(select sum(b5.price) as drinks, sum(b5.price) as deserts
			   from tmp_guestconsuming as b1 
			   left join userguest as b2 on b1.userid = b2.userid and b1.guestid = b2.guestid
			   left join userfoods as b3 on b1.userid = b3.userid and b2.drinkid = b3.foodid and b3.status = -1
			   left join userfoods as b4 on b1.userid = b4.userid and b2.desertid = b4.foodid and b4.status = -1
			   left join foodprice as b5 on b3.foodid = b5.foodid and b3.star = b5.star
			   left join foodprice as b6 on b3.foodid = b6.foodid and b3.star = b6.star
			  where b1.userid = @v_userid)as b on a.userid = @v_userid
	   set a.gold = a.gold + ifnull(b.drinks, 0) + ifnull(b.deserts, 0)
	 where a.userid = @v_userid;

end while;

select b.userid, b.guestid, b.drinkid, b.desertid, b.hastip, c.gold + c.tips as gold
  from tmp_guestconsuming as a
  left join userguest as b on a.userid = b.userid and a.guestid = b.guestid
  left join users as c on a.userid = c.userid;

END$$

DELIMITER ;

