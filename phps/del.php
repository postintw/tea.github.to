<?php
try {
    session_start();
    require_once "./connect.php";
    // if(isset($_SESSION["MEM_ID"])){

    //先接受前端送來的資料
    $content = trim(file_get_contents("php://input")); 
    $decoded = json_decode($content, true);

    $art_id = $decoded["art_id"]; //php叫物件內屬性的寫法

    //接到之後要做的SQL指令
    //:後面+名字會變成一個變數 ->Php 寫sql的時候的寫法
    $sql = "update my_art
            set ART_STATUS = 0
            where ART_NO = :art_id
            ";

    // $grouporddata = $pdo->query($sql);
    $del_art = $pdo->prepare($sql);

    //把接到的資料寫進SQL (要先經過PHP轉譯 所以不能直接寫入SQL指令內)
    $del_art->bindValue(":art_id", $art_id);


    $del_art->execute();
    // }else{
    //     echo "[]";
    // }
    echo "hi";
} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
