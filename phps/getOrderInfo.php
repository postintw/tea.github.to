<?
try {
    session_start();
    if(isset($_SESSION['MEM_NO'])){
    $mem_no=$_SESSION['MEM_NO'];
    require_once("./connect.php");
    $sql = "select * from orders where ORDERS_NO = :orderNo";
    $orderInfo = $pdo->prepare($sql);
    $orderInfo->bindValue(":orderNo", $_POST['orderNo']);
    $orderInfo->execute();
    if ($orderInfo->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";
    } else { //找得到
        //取回一筆資料
        $info = $orderInfo->fetchAll(PDO::FETCH_ASSOC);
        if($info[0]['MEMBER']==$mem_no){
            // 送出json字串
            require_once("./connect.php");
            $sql = "select p.NAME, o.QUANTITY, p.PRICE,p.IMG from orderlist o join product p on o.psn=p.psn where o.ODRDER_NO = :orderNo";
            $orderList = $pdo->prepare($sql);
            $orderList->bindValue(":orderNo", $_POST['orderNo']);
            $orderList->execute();
            $products=$orderList->fetchAll(PDO::FETCH_ASSOC);
            $v=[$info,$products];
            echo json_encode($v);
            }else{echo '無權限';};
        }
    }else{
        echo '無權限';
    };
} catch (PDOException $e) {
    echo  $e->getMessage() ;
};?>