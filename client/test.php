<?php
  session_start();
  $_SESSION['userId'] =$_GET['userId'];
  header('Location: test2.php');
print(0);
?>