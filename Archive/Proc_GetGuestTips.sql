DROP procedure IF EXISTS `Proc_GetGuestTips`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Proc_GetGuestTips`(IN p_userid INT, IN p_guestid INT)
BEGIN

declare v_count int;
declare v_tips int;
declare v_experience int;
declare v_proprate int;
declare v_propnummax int;
declare v_propid int;

select count(*) into @v_count
  from userguest 
 where userid = p_userid and guestid = p_guestid and hastip = 1 and istiped = 0;

if @v_count > 0
then
	select b.tips, b.experience, b.proprate into @v_tips, @v_experience, @v_proprate
	  from userguest as a left join guests as b on a.typecode = b.typecode
	 where a.guestid = p_guestid;
	
	update users set tips = tips + @v_tips, experience = experience + @v_experience
	 where userid = p_userid;

	if ( floor(rand() * 100) > (100 - @v_proprate) )
	then
		select max(propnum) into @v_propnummax from guestprops where guestid = p_guestid;

		select propid into @v_propid from guestprops 
		 where guestid = p_guestid and propnum = floor(rand() * @propnummax);

		update userguest set hasprop = 1, propid = @v_propid
		 where userid = p_userid and guestid = p_guestid;

	end if;
                                                      
end if;        

select userid, (gold + tips) as gold, experience, @v_propid as propid
  from users
 where userid = p_userid;

END$$

DELIMITER ;

