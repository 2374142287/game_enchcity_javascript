DROP procedure IF EXISTS `Proc_UpdateUserStatus`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Proc_UpdateUserStatus`(IN p_userid INT, IN p_status INT)
BEGIN

/* 
1. 用户上线时，重新生成客人列表
*/

update users set status = p_status where userid = p_userid;

if p_status = 1
then
	call Proc_GuestGenerate(p_userid);
end if;

END$$

DELIMITER ;

