<?php
    session_start();    
    $reason = isset($_POST["size"])?$_POST["size"]:""; 
    $msgNo = isset($_POST["msg_reg"])?$_POST["msg_reg"]:""; 
    $mem = $_SESSION["MEM_NO"];
    //------------------
try{
    require_once("./connect.php");
    $sql = "INSERT INTO art_msg_rep(
                MEM_NO,
                MSG_NO,
                AMR_DATE,
                AMR_CONTENT,
                AMR_STATUS
            ) 
            VALUES('$mem','$msgNo',now(),'$reason',0)";

    $article = $pdo->prepare($sql);
    $article->execute();
// -------------------------------------------------------------------------------------------------


}catch(PDOException $e){
    $error = array("errorMsg"=>$e->getMessage());
    // $error.= $e->getLine() . '<br>' . $e->getMessage() ;
    echo json_encode($error);
}
?>



