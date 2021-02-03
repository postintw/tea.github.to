<?php 
session_start();
if(isset($_SESSION["ADMIN_ID"])){
	$result = array("ADMIN_ID"=>$_SESSION["ADMIN_ID"], "ADMIN_PW"=>$_SESSION["ADMIN_PW"]);
    echo json_encode($result);
}else{
	echo "{}";
}
?>