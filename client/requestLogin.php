<?php 
require_once('../Common/Config.php');
require_once('DataBase.php');
	$db = new db();
	$command = isset($_REQUEST['command']) ? trim($_REQUEST['command']) : 'undefined'; 
	//登录
	if($command == "login")
	{
		//通过account与password读取数据
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
		//注册只需要ID
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
			echo "{'userid':-1, 'result':0, 'message':'注册过程中出现未知错误，请刷新页面重试！'}";
		}
	}
	else
	{		
		//通过ID来更新数据
		echo "请求参数错误，请刷新页面重试！";
	}
?>