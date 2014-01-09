DROP procedure IF EXISTS `Proc_GuestGenerateAll`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Proc_GuestGenerateAll`()
BEGIN

/*
1. 只有用户有食品或用户在线时，才进行客人生成及消费计算
2. 生成客人的时间间隔可以适当大一些，如3分钟等。
3. 客人出店后将删除记录
*/

declare v_count int;
declare v_userid int;
declare v_counter int;

delete from tmp_usersofgstgen;

insert into tmp_usersofgstgen(userid)
	select userid from users where status = 1 or foodstatus = 1;

select count(*) into @v_count from tmp_usersofgstgen;

set @v_counter = 0;
while (@v_counter := @v_counter + 1) <= @v_count
do
	select userid into @v_userid from tmp_usersofgstgen where isgenerated = 0 limit 1;

	call Proc_GuestGenerate(@v_userid);

	update tmp_usersofgstgen set isgenerated = 1 where userid = @v_userid;
end while;


END$$

DELIMITER ;

