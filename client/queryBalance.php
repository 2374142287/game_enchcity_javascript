<?php
//  session_start();
  
//  $userId = $_SESSION['userId'];
//  $userId = $_COOKIE['userId'];
//  $userId = "";
//  $file = fopen('1.txt','r') or exit("Unable to open file!");
//  while(!feof($file)){
//    $userId = fgets($file);
//  }
//  fclose($file);
  

  date_default_timezone_set('Asia/Shanghai');
  $transIDO_balance = '741451'.date('YmdHis').'111114';
  /*
  $post_str = '<?xml version="1.0" encoding="UTF-8"?><request><msgType>ChargeUpReq</msgType><sender>202</sender><userIdType>3</userIdType><userLabel>'.$userId.'</userLabel><channelId>15077000</channelId><cpId>701001</cpId><cpServiceId>400120002000</cpServiceId><transIDO>'.$transIDO.'</transIDO><versionId>2_0_0</versionId></request>';
  */
  $balance = '<?xml version="1.0" encoding="UTF-8"?><request><msgType>QueryBalanceReq</msgType><sender>202</sender><userIdType>3</userIdType><userLabel>'.$userId.'</userLabel><channelId>40204000</channelId><transIDO>'.$transIDO_balance.'</transIDO><versionId>2_0_0</versionId></request>';
  
//	echo $post_str;
//	echo $transIDO;
  $ch_balance = curl_init();
  curl_setopt($ch_balance,CURLOPT_HEADER,0);
  curl_setopt($ch_balance,CURLOPT_RETURNTRANSFER,1);
  curl_setopt($ch_balance, CURLOPT_URL, "http://gmp.i139.cn/bizcontrol/QueryBalance");
  curl_setopt($ch_balance, CURLOPT_POST, 1);
  curl_setopt($ch_balance, CURLOPT_POSTFIELDS, $balance);
  $content_balance=curl_exec($ch_balance);

  $xml_balance = simplexml_load_string($content_balance);
  
  $status_balance = $xml_balance->point ;

//	echo $userId;
//  echo 'var js_content ='."'$post_str'";
//  echo "<script type='text/javascript'>alert($userId)</script>";
?>