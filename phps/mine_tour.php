<?php
session_start();
try {
    
    require_once "./connect.php";

	$sql = "select * 
            from tour
            where mem_no = 1
            ";

    // $grouporddata = $pdo->query($sql);
    $get_tour = $pdo->prepare($sql);

    //把接到的資料寫進SQL (要先經過PHP轉譯 所以不能直接寫入SQL指令內)
    // $per_ord_data->bindValue(":ADMIN_NO", $add_no);
    // $per_ord_data->bindValue(":ADMIN_ID", $add_id);
    // $per_ord_data->bindValue(":ADMIN_NAME", $add_name);
    // $per_ord_data->bindValue(":ADMIN_PW", $add_psw);


    $get_tour->execute();

    // echo "修改成功~!!";
    if ($get_tour->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $get_tour_row = $get_tour->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($get_tour_row);
        // echo $managerdatarow;
    }

} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
