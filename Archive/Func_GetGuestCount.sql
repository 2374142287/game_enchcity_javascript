DROP function IF EXISTS `Func_GetGuestCount`;

DELIMITER $$
CREATE FUNCTION `Func_GetGuestCount` (p_magic INT)
RETURNS INTEGER
BEGIN

RETURN (CASE WHEN 1 <= p_magic AND p_magic < 1000 THEN 300 + p_magic * 0.1
			 WHEN 1000 <= p_magic AND p_magic < 2500 THEN 400 + (p_magic - 1000) * 0.067
			 WHEN 2500 <= p_magic AND p_magic < 5000 THEN 500 + (p_magic - 2500) * 0.04
			 WHEN 5000 <= p_magic AND p_magic < 10000 THEN 600 + (p_magic - 5000) * 0.02
			 WHEN 10000 <= p_magic AND p_magic < 50000 THEN 700 + (p_magic - 10000) * 0.005
			 WHEN 50000 <= p_magic THEN 900 + (p_magic - 50000) * 0.001
		     ELSE 0 END);

END$$

DELIMITER ;

