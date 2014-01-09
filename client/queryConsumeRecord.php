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
  $transIDO_consumeRecord = '741451'.date('YmdHis').'111115';
/*
  $month = date
  $post_str = '<?xml version="1.0" encoding="UTF-8"?><request><msgType>ChargeUpReq</msgType><sender>202</sender><userIdType>3</userIdType><userLabel>'.$userId.'</userLabel><channelId>15077000</channelId><cpId>701001</cpId><cpServiceId>400120002000</cpServiceId><transIDO>'.$transIDO.'</transIDO><versionId>2_0_0</versionId></request>';
*/
  $consumeRecord = '<?xml version="1.0" encoding="UTF-8"?><request><msgType>QueryConsumeRecordReq</msgType><queryType>3</queryType><sender>202</sender><channelId>40204000</channelId><userIdType>3</userIdType><userLabel>'.$userId.'</userLabel><queryMonth></queryMonth><queryRange>1</queryRange><payType>1</payType><cpServiceId></cpServiceId><packageId></packageId><cpId></cpId></request>';
  
//	echo $post_str;
//	echo $transIDO;
  $ch_consumeRecord = curl_init();
  curl_setopt($ch_consumeRecord,CURLOPT_HEADER,0);
  curl_setopt($ch_consumeRecord,CURLOPT_RETURNTRANSFER,1);
  curl_setopt($ch_consumeRecord, CURLOPT_URL, "http://gmp.i139.cn/bizcontrol/QueryConsumeRecord");
  curl_setopt($ch_consumeRecord, CURLOPT_POST, 1);
  curl_setopt($ch_consumeRecord, CURLOPT_POSTFIELDS, $consumeRecord);
  $content_consumeRecord = curl_exec($ch_consumeRecord);

  $xml_consumeRecord = simplexml_load_string($content_consumeRecord);
  
  $status_consumeRecord = $xml_consumeRecord->status ;

//	echo $userId;
//  echo 'var js_content ='."'$post_str'";
//  echo "<script type='text/javascript'>alert($userId)</script>";
?>