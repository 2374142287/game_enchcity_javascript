<?php 
require_once('../Common/Config.php');
require_once('DataBase.php');
	$db = new db();
	$command = isset($_REQUEST['command']) ? trim($_REQUEST['command']) : 'undefined'; 
	//��¼
	if($command == "login")
	{
		//ͨ��account��password��ȡ����
		$account =  isset($_REQUEST['account']) ? trim($_REQUEST['account']) : '';
		$password =  isset($_REQUEST['password']) ? trim($_REQUEST['password']) : '';
		if($account=='' || $password=='')
		{
			echo 0;
		}

		$result = $db->getRow("SELECT * FROM tb_login WHERE account = '" . $account . "' AND keycode = '" . $password . "'");
		if($result) echo 1;
		else echo 2;
	}
	else if($command == "reg")
	{		
		//ע��ֻ��ҪID
		$account =  isset($_REQUEST['name']) ? trim($_REQUEST['name']) : '';
		$password =  isset($_REQUEST['password']) ? trim($_REQUEST['password']) : '';
		$nickname =  isset($_REQUEST['nickname']) ? trim($_REQUEST['nickname']) : '';
		$rolecode =  isset($_REQUEST['rolecode']) ? trim($_REQUEST['rolecode']) : '';

		$result = $db->query("CALL Proc_CreateUser('" . $account . "', '" . $password . "', '" . $nickname . "', '" . $rolecode . "')");

		if($result && $row = mysql_fetch_array($result, MYSQL_ASSOC)){
			//echo json_encode($row);
			echo "{'userid':" . $row["userid"] . ", 'result':" . $row["result"] . ", 'message':'" . $row["message"] . "'}";
		}else
		{
			echo "{'userid':-1, 'result':0, 'message':'ע������г���δ֪������ˢ��ҳ�����ԣ�'}";
		}
	}
	else
	{		
		//ͨ��ID����������
		echo "�������������ˢ��ҳ�����ԣ�";
	}
?>