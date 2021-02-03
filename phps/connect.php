<?php
	$dsn = "mysql:host=localhost;port=3306;dbname=tibamefe_ced101g2;charset=utf8";
	// $user = "root";
	// $password = "root";
	$user = "tibamefe_since2021";
	$password = "vwRBSb.j&K#E";
// $options=array(3=>2,8=>0);
$options=array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING,PDO::ATTR_CASE => PDO::CASE_NATURAL);
$pdo=new PDO($dsn,$user,$password,$options);
?>