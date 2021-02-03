<?php 
try {
    session_start();
    require_once("./connect.php");
    // $MEM_ID = $_POST["MEM_ID"];
    // $MEM_PW = $_POST["MEM_PW"];
    // $sql = "select * from member where MEM_ID = 'amin' and MEM_PW = '0000'";
    if(isset($_SESSION["ADMIN_ID"])){
        // echo "{}";

        // $text["text"] = "登入";
        echo json_encode ($_SESSION);
    } else {
        // $text["text"] = "沒有登入";
        // echo json_encode ($text);
        echo "{}";

    };
} 
catch (PDOException $e) {
    echo "錯誤原因 : ", $e->getMessage(), "<br>";
    echo "錯誤行號 : ", $e->getLine(), "<br>";
    echo "系統錯誤, 請通知系統維護人員<br>";
}
?>