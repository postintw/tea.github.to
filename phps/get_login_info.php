<?php 
session_start();
if(isset($_SESSION["MEM_ID"])){
	$result = array("MEM_NO"=>$_SESSION["MEM_NO"], "MEM_ID"=>$_SESSION["MEM_ID"], "MEM_NICNAME"=>$_SESSION["MEM_NICNAME"], "MEM_IMG"=>$_SESSION["MEM_IMG"]);
    echo json_encode($result);
}else{
	echo "{}";
}
?>