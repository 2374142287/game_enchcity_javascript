<?php
/*
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
  */
 require("fee.php");
 require("buytool.php");
 require("queryChargeUpRecord.php");
 require("queryBalance.php");
 require("queryConsumeRecord.php");
 header('Location: index.html');
// echo $status;
// echo $buytool;
//echo 'login:'.$status;
//echo 'buytool:'.$buytool_status;
//echo 'charge:'.$status_chargeUp;
//echo 'balance:'.$status_balance;
//echo 'consumeRecord'.$status_consumeRecord;
exit;

?>