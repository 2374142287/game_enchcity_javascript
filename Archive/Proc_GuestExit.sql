DROP procedure IF EXISTS `Proc_GuestExit`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Proc_GuestExit`()
BEGIN

/* 
0. 客人进店的最小间隔为3秒，因此以3秒为间隔计算进店、消费、出店。
1. 客人出店后要删除记录。
*/

declare v_count int;
declare v_userid int;
declare v_counter int;

delete from tmp_usersofgstext;
delete from tmp_guestexiting;

insert into tmp_usersofgstext(userid)
	select userid from users where status = 1 or foodstatus = 1;

select count(*) into @v_count from tmp_usersofgstext;
set @v_counter = 0;
while (@v_counter := @v_counter + 1) <= @v_count
do
	select userid into @v_userid from tmp_usersofgstext where isgenerated = 0 limit 1;

	insert into tmp_guestexiting(userid, guestid)
		select userid, guestid
		  from userguest 
		 where userid = @v_userid and isexited != 1
		   and CURRENT_TIMESTAMP > exittime;

	# delete the exited
	delete from userguest
	 where userid = @v_userid and isexited != 1
	   and CURRENT_TIMESTAMP > exittime;

	# update isgenerated to 1
	update tmp_usersofgstext set isgenerated = 1 where userid = @v_userid;

end while;

select userid, guestid from tmp_guestexiting;


END$$

DELIMITER ;

