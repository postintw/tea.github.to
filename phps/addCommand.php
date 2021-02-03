<?php
    session_start();
    $command = isset($_POST["command"])?$_POST["command"]:"";
    $artNo =   isset($_POST["artNo"])?$_POST["artNo"]:"";
    $mem = $_SESSION["MEM_NO"];
try{
    require_once("./connect.php");
    
    $sql = "INSERT INTO art_msg(
                MEM_NO,
                ART_NO,
                MSG_CONTENT,
                MSG_DATE,
                MSG_STATUS
            ) 
            VALUES(
                '$mem',
                '$artNo',
                '$command',
                now(),
                1)";

    $article = $pdo->prepare($sql);
    $article->execute(); 

    $sql = "Update my_art set ART_REPLYS = ART_REPLYS +1 where ART_NO= ?";
    $msg = $pdo->prepare($sql);
    $msg->bindValue(1, $_POST["artNo"]);
    $msg->execute();


    $sql = "select * from art_msg a join member b on a.MEM_NO = b.MEM_NO where ART_NO = ?";
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