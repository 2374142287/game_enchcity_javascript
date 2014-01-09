<?php>

  $hRet = isset($_REQUEST['hRet']) ? trim($_REQUEST['hRet']) : ''; 
	$status = isset($_REQUEST['status']) ? trim($_REQUEST['status']) : ''; 
	$balance = isset($_REQUEST['balance']) ? trim($_REQUEST['balance']) : ''; 
echo '计费成功';
echo 'hret=' . $hRet;
echo 'status=' . $status;
echo 'balance=' . $balance;
<?>