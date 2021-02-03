<?php
try {
    require_once "./connect.php";

    // $content = trim(file_get_contents("php://input"));
    // $decoded = json_decode($content, true);

    $reg_email = $_POST["reg_email"];
    $reg_memId = $_POST["reg_memId"];
    $reg_memPw = $_POST["reg_memPw"];

    $sql = "insert into member(MEM_ID, MEM_NICNAME, MEM_PW, MEM_EMAIL, MEM_IMG, MEM_STATUS, VOTE_DATE, GAME_POINT)
            values (:MEM_ID, :MEM_ID, :MEM_PW, :MEM_EMAIL, './images/member/new_member.jpg', 1, '2021-01-04', 0);
            ";

    $reg_mem = $pdo->prepare($sql);
    // $reg_mem->bindValue(":MEM_NO", $MEM_NO);
    $reg_mem->bindValue(":MEM_ID", $reg_memId);
    $reg_mem->bindValue(":MEM_PW", $reg_memPw);
    $reg_mem->bindValue(":MEM_EMAIL", $reg_email);
    $reg_mem->execute();

    // echo "註冊成功~!!";
    echo "<script>location.href='../homepage.html'</script>";
    // if ($per_ord_data->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        // echo "{}";

    // } else { //找得到
        //取回一筆資料
        // $per_ord_datarow = $per_ord_data->fetchAll(PDO::FETCH_ASSOC);
        //送出json字串
        // echo json_encode($per_ord_datarow);
        // echo $managerdatarow;
    

} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}