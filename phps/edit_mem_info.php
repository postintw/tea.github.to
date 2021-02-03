<?php
try {
    // session_start();
    require_once("./connect.php");


    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    $mem_no = $decoded["mem_no"];
    $new_nicname = $decoded["new_nicname"];

    $old_mem_pw = $decoded["old_mem_pw"];
    $new_password = $decoded["new_password"];

    //不改密碼
    if ($new_password == "") {
        $mem_pw = $old_mem_pw;
    //改密碼
    } else {
        $mem_pw = $new_password;
    }
    ;

    $sql = "update member
            set MEM_NICNAME = :new_nicname, MEM_PW = :mem_pw
            where MEM_NO = :mem_no";

    $edit_info = $pdo->prepare($sql);

    $edit_info->bindValue(":mem_no", $mem_no);
    $edit_info->bindValue(":new_nicname", $new_nicname);
    $edit_info->bindValue(":mem_pw", $mem_pw);

    $edit_info->execute();
    session_start();

    $_SESSION["MEM_NICNAME"] = $new_nicname;

    echo "修改成功";

} catch (PDOException $e) {
    echo "修改失敗";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}