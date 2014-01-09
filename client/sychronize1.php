<?php
  session_start();
  $_SESSION['userId'] =$_GET['userId'];
  header('Location: fee.php');
	print(0);
?>