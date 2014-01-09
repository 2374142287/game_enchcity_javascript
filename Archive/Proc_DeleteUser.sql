DROP procedure IF EXISTS `Proc_DeleteUser`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Proc_DeleteUser` (IN p_userid int)
BEGIN

delete from userachievement where userid = p_userid;

delete from userbarworkers where userid = p_userid;

delete from userfoods where userid = p_userid;

delete from userfriends where userid = p_userid;

delete from userfurnitures where userid = p_userid;

delete from userguest where userid = p_userid;

delete from usermessage where userid = p_userid;

delete from userprops where userid = p_userid;

delete from users where userid = p_userid;

END$$

DELIMITER ;

CREATE DEFINER=`root`@`localhost` PROCEDURE `Proc_CreateNewMail` (IN v_userid int,IN v_receiveuserid int, IN v_title varchar(45), IN v_content varchar(200))
BEGIN

	declare v_id int;
	select max(id) into @v_id from tb_castlemail;
	set @v_id = @v_id + 1;

	insert into tb_castlemail (id,castleId,sendCastleId,mailTitle,mailTest) 
	values(v_id,v_userid,v_receiveuserid,v_title,v_content);
END$$;

