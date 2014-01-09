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
  $transIDO_buytool = '741451'.date('YmdHis').'111112';
  /*
  $post_str = '<?xml version="1.0" encoding="UTF-8"?><request><msgType>ChargeUpReq</msgType><sender>202</sender><userIdType>3</userIdType><userLabel>'.$userId.'</userLabel><channelId>15077000</channelId><cpId>701001</cpId><cpServiceId>400120002000</cpServiceId><transIDO>'.$transIDO.'</transIDO><versionId>2_0_0</versionId></request>';
  */
  $buytool = '<?xml version="1.0" encoding="UTF-8"?><request><msgType>BuyGameToolReq</msgType><sender>202</sender><userId>'.$userId.'</userId><channelId>40204000</channelId><cpId>741451</cpId><cpServiceId>645120070440</cpServiceId><consumeCode>000070439001</consumeCode><transIDO>'.$transIDO_buytool.'</transIDO><versionId>2_0_0</versionId></request>';
  
//	echo $post_str;
//	echo $transIDO;
  $ch_buytool = curl_init();
  curl_setopt($ch_buytool,CURLOPT_HEADER,0);
  curl_setopt($ch_buytool,CURLOPT_RETURNTRANSFER,1);
  curl_setopt($ch_buytool, CURLOPT_URL, "http://gmp.i139.cn/bizcontrol/BuyGameTool");
  curl_setopt($ch_buytool, CURLOPT_POST, 1);
  curl_setopt($ch_buytool, CURLOPT_POSTFIELDS, $buytool);
  $content_buytool=curl_exec($ch_buytool);

  $xml_buytool = simplexml_load_string($content_buytool);
  
  
  
  $buytool_status = $xml_buytool->status ;

//	echo $userId;
//  echo 'var js_content ='."'$post_str'";
//  echo "<script type='text/javascript'>alert($userId)</script>";
?>