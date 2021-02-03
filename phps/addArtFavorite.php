<?php
    session_start();
    //------------------
try{
    require_once("./connect.php");
    $sql = "INSERT INTO art_favorite(ART_NO,MEM_NO) 
        VALUES(:ART_NO,:MEM_NO)";
    $article = $pdo->prepare($sql);
    $article->bindValue(":ART_NO", $_POST["arno"]);
    $MEM_NO = $_SESSION["MEM_NO"];
    $article->bindValue(":MEM_NO", $MEM_NO);
    $article->execute();
// -------------------------------------------------------------------------------------------------


}catch(PDOException $e){
    $error = array("errorMsg"=>$e->getMessage());
    // $error.= $e->getLine() . '<br>' . $e->getMessage() ;
    echo json_encode($error);
}
?>
