<?php
try {
    session_start();
    require_once "./connect.php";

    //先接受前端送來的資料
    $content = trim(file_get_contents("php://input")); 
    $decoded = json_decode($content, true);

    $TOUR_ID = $decoded["TOUR_id"]; //php叫物件內屬性的寫法

    //接到之後要做的SQL指令
    //:後面+名字會變成一個變數 ->Php 寫sql的時候的寫法
    $sql = "update tour_join
            set TOUR_ADD = 0
            where TOUR_ID = :TOUR_ID and MEM_NO = :MEM_NO
            ";

    // $grouporddata = $pdo->query($sql);
    $quit_tour = $pdo->prepare($sql);

    //把接到的資料寫進SQL (要先經過PHP轉譯 所以不能直接寫入SQL指令內)
    $quit_tour->bindValue(":TOUR_ID", $TOUR_ID);
    $quit_tour->bindValue(":MEM_ID", $_SESSION["MEM_NO"]);

    $quit_tour->execute();

} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
