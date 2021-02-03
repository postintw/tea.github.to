<?php 
try {
    require_once("./connect.php");

    
    $MEM_ID = $_POST["MEM_ID"];
    $MEM_PW = $_POST["MEM_PW"];
    $sql = "select * from member where MEM_ID='$MEM_ID' and MEM_PW='$MEM_PW' and MEM_STATUS = 1";
    // $sql = "select * from member where MEM_ID=:MEM_ID and MEM_PW=:MEM_PW";
    $member = $pdo->prepare($sql);
    // $member->bindValue(":MEM_ID", $_POST["MEM_ID"]);
    // $member->bindValue(":MEM_PW", $_POST["MEM_PW"]);
    $member->execute();

    if($member->rowCount()===0) { //rowCount()可取得這次select的總筆數
        // echo "error, plz <a href = '1204_pdo_login.html'>login</a> again";
        echo "<script>alert('帳號/密碼錯誤，請重試！'); location.href='../homepage.html'</script>";
        } else {
            session_start();
            $memRow = $member->fetch(PDO::FETCH_ASSOC);
            $_SESSION["MEM_NO"] = $memRow["MEM_NO"];
            $_SESSION["MEM_NICNAME"] = $memRow["MEM_NICNAME"];
            $_SESSION["MEM_ID"] = $memRow["MEM_ID"];
            $_SESSION["MEM_PW"] = $memRow["MEM_PW"];
            $_SESSION["MEM_EMAIL"] = $memRow["MEM_EMAIL"];
            $_SESSION["MEM_IMG"] = $memRow["MEM_IMG"];
            // var_dump($_SESSION);exit();
        // echo $_SESSION["MEM_NICNAME"], "您好~<br>", $_SESSION["MEM_EMAIL"];
            // $result = array("MEM_NO"=>$_SESSION["MEM_NO"], "MEM_ID"=>$_SESSION["MEM_ID"], "MEM_NICNAME"=>$_SESSION["MEM_NICNAME"], "MEM_EMAIL"=>$_SESSION["MEM_EMAIL"], "MEM_IMG"=>$_SESSION["MEM_IMG"]);
            echo "<script>location.href='../membership.html'</script>";
            // echo json_encode($result);
            // echo $_SESSION["MEM_NO"];
            // echo '<script>console.log`歡迎回來，$_SESSION["MEM_NICNAME"]`</script>';
            // echo '<script>
            // self.opener.location.reload();
            
            //     </script>';
        }    

} 
catch (PDOException $e) {
    echo "錯誤原因 : ", $e->getMessage(), "<br>";
    echo "錯誤行號 : ", $e->getLine(), "<br>";
    echo "系統錯誤, 請通知系統維護人員<br>";
}
?>