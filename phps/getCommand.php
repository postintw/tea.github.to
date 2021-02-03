<?php
    $command = isset($_POST["command"])?$_POST["command"]:"";
    $artNo =   isset($_POST["artNo"])?$_POST["artNo"]:"";

try{
    require_once("./connect.php");
    
    $sql = "select * from art_msg a join member b on a.MEM_NO = b.MEM_NO where ART_NO = ? and MSG_STATUS = 1";
    $msg = $pdo->prepare($sql);
    $msg->bindValue(1, $_POST["artNo"]);
    $msg->execute();
    $msgRows = $msg->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($msgRows);

}catch(PDOException $e){
    $error = array("errorMsg"=>$e->getMessage());
    // $error.= $e->getLine() . '<br>' . $e->getMessage() ;
    echo json_encode($error);
}
?>