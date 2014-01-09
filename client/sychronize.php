<?php
  session_start();
  $userId = $_GET['userId'];
  setcookie("userId",$userId,time()+3600);
  $file = fopen('1.txt','w');
  $file_key = fopen('2.txt','w');
  fwrite($file,$userId);
  fwrite($file_key,$_GET['key']);
  fclose($file);
  fclose($file_key);
	print(0);
?>