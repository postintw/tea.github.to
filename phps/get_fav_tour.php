<?php
try {
    session_start();
    require_once("./connect.php");
    if(isset($_SESSION["MEM_ID"])){

    
	$sql = "select t.TOUR_ID, t.TOUR_IMG, t.TOUR_TITLE, t.TOUR_INFRO, c.MEM_NO 
    from tour t join tour_collect c
    on t.TOUR_ID = c.TOUR_ID
    where c.MEM_NO = :MEM_NO
            ";

    $get_fav_tour = $pdo->prepare($sql);
    $get_fav_tour->bindValue(":MEM_NO", $_SESSION["MEM_NO"]);

    $get_fav_tour->execute();

    // echo "修改成功~!!";
    if ($get_fav_tour->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{錯誤}";

    } else { //找得到
        $get_fav_tour = $get_fav_tour->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($get_fav_tour);
    }
}else{
        echo "[]";
    }
} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
