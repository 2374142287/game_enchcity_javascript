DROP procedure IF EXISTS `Proc_GuestEnter`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Proc_GuestEnter`()
BEGIN

/* 
0. 客人进店的最小间隔为3秒，因此以3秒为间隔计算进店、消费、出店。
1. 只有用户有食品或用户在线时，才进行客人生成及消费计算

*/

declare v_count int;
declare v_userid int;
declare v_counter int;

delete from tmp_usersofgstent;
delete from tmp_guestentering;

insert into tmp_usersofgstent(userid)
	select userid from users where status = 1 or foodstatus = 1;

select count(*) into @v_count from tmp_usersofgstent;
set @v_counter = 0;
while (@v_counter := @v_counter + 1) <= @v_count
do
	select userid into @v_userid from tmp_usersofgstent where isgenerated = 0 limit 1;

	insert into tmp_guestentering(userid, guestid)
		select userid, guestid
		  from userguest 
		 where userid = @v_userid and isentered != 1
		   and entertime < CURRENT_TIMESTAMP;

	# update is entered
	update userguest set isentered = 1
	 where userid = @v_userid and isentered != 1
	   and entertime < CURRENT_TIMESTAMP;

	# update isgenerated to 1
	update tmp_usersofgstent set isgenerated = 1 where userid = @v_userid;

end while;

select b.userid, b.guestid, b.typecode
  from tmp_guestentering as a
  left join userguest as b on a.userid = b.userid and a.guestid = b.guestid;


END$$

DELIMITER ;

