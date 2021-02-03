<?php
try {
    require_once "./connect.php";

    //先接受前端送來的資料
    $content = trim(file_get_contents("php://input")); 
    $decoded = json_decode($content, true);

    // $add_no = $decoded["add_no"]; //php叫物件內屬性的寫法
    $add_id = $decoded["add_id"];
    $add_name = $decoded["add_name"];
    $add_psw = $decoded["add_psw"];
  
    //接到之後要做的SQL指令
    //:後面+名字會變成一個變數 ->Php 寫sql的時候的寫法
    $sql = "insert into admin (ADMIN_ID,ADMIN_NAME,ADMIN_PW)
                values(:ADMIN_ID,:ADMIN_NAME,:ADMIN_PW)
            ";

    // $grouporddata = $pdo->query($sql);
    $per_ord_data = $pdo->prepare($sql);

    //把接到的資料寫進SQL (要先經過PHP轉譯 所以不能直接寫入SQL指令內)
    // $per_ord_data->bindValue(":ADMIN_NO", $add_no);
    $per_ord_data->bindValue(":ADMIN_ID", $add_id);
    $per_ord_data->bindValue(":ADMIN_NAME", $add_name);
    $per_ord_data->bindValue(":ADMIN_PW", $add_psw);


    $per_ord_data->execute();

    // echo "修改成功~!!";
    // if ($per_ord_data->rowCount() == 0) { //找不到
    //     //傳回空的JSON字串
    //     echo "{}";

    // } else { //找得到
    //     //取回一筆資料
    //     $per_ord_datarow = $per_ord_data->fetchAll(PDO::FETCH_ASSOC);

    //     //送出json字串
    //     echo json_encode($per_ord_datarow);
    //     // echo $managerdatarow;
    // }

} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
