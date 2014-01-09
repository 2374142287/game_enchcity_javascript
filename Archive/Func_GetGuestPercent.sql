DROP function IF EXISTS `Func_GetGuestPercent`;

DELIMITER $$
CREATE FUNCTION `Func_GetGuestPercent` (p_magic INT, p_guestcode VARCHAR(3))
RETURNS INTEGER
BEGIN

RETURN (
CASE 
	WHEN 1 <= p_magic AND p_magic < 1000 
	THEN (CASE p_guestcode WHEN 'A' THEN 100 ELSE 0 END)

	WHEN 1000 <= p_magic AND p_magic < 2500 
	THEN (CASE p_guestcode WHEN 'A' THEN 60 WHEN 'B' THEN 40 ELSE 0 END)

	WHEN 2500 <= p_magic AND p_magic < 5000 
	THEN (CASE p_guestcode WHEN 'A' THEN 40 WHEN 'B' THEN 40 WHEN 'C' THEN 20 ELSE 0 END)

	WHEN 5000 <= p_magic AND p_magic < 10000 
	THEN (CASE p_guestcode WHEN 'A' THEN 20 WHEN 'B' THEN 30 WHEN 'C' THEN 50 ELSE 0 END)

	WHEN 10000 <= p_magic AND p_magic < 50000 
	THEN (CASE p_guestcode WHEN 'B' THEN 30 WHEN 'C' THEN 50 WHEN 'D' THEN 20 ELSE 0 END)

	WHEN 50000 <= p_magic 
	THEN (CASE p_guestcode WHEN 'B' THEN 20 WHEN 'C' THEN 40 WHEN 'D' THEN 40 ELSE 0 END)

	ELSE 0 END);

END$$

DELIMITER ;

