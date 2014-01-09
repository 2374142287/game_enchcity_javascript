<?php
//  session_start();
  
//  $userId = $_SESSION['userId'];
//  $userId = $_COOKIE['userId'];
  $userId = "";
  $key = "";
  $file = fopen('1.txt','r') or exit("Unable to open file!");
  while(!feof($file)){
    $userId = fgets($file);
  }
  fclose($file);
  $file_key = fopen('2.txt','r') or exit("Unable to open file!");
  while(!feof($file_key)){
    $key = fgets($file_key);
  }
  fclose($file_key);

  date_default_timezone_set('Asia/Shanghai');
  $transIDO = '741451'.date('YmdHis').'111111';
  $post_str = '<?xml version="1.0" encoding="UTF-8"?><request><msgType>ChargeUpReq</msgType><sender>202</sender><userIdType>3</userIdType><userLabel>'.$userId.'</userLabel><channelId>15077000</channelId><cpId>701001</cpId><cpServiceId>400120002000</cpServiceId><transIDO>'.$transIDO.'</transIDO><versionId>2_0_0</versionId></request>';
//	echo $post_str;
//	echo $transIDO;
  $ch = curl_init();
  curl_setopt($ch,CURLOPT_HEADER,0);
  curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
  curl_setopt($ch, CURLOPT_URL, "http://gmp.i139.cn/bizcontrol/ChargeUp");
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $post_str);
  $content=curl_exec($ch);

  $xml = simplexml_load_string($content);
  
  $status = $xml->status ;

//	echo $userId;
//  echo 'var js_content ='."'$post_str'";
//  echo "<script type='text/javascript'>alert($userId)<script>";
?>