<?
try {
    session_start();
    $mem_no=$_SESSION['MEM_NO'];
    //order增加
    require_once("./connect.php");
    $sql = "INSERT INTO orders (ORDERS_NO ,MEMBER ,DEL_STATE ,ORD_DATE, DELIVERY, PAY, DISCOUNT ,TOTAL, RECEIVER_NAME ,RECEIVER_ADDRESS ,RECEIVER_TEL)
            VALUES (NULL,:MEMBER, 0, :ORD_DATE, :DELIVERY, :PAY, :DISCOUNT, :TOTAL, :RECEIVER_NAME, :RECEIVER_ADDRESS, :RECEIVER_TEL);";
    $orderList = $pdo->prepare($sql);
    if($_POST['delivery']=='宅配'){
        $DELIVERY=0;
    }
    elseif ($_POST['delivery']=='7-11店到店'  ) {
        $DELIVERY=1;
    };
    if($_POST['pay']=='貨到付款'){
        $PAY=0;
    }
    elseif ($_POST['pay']=='ATM付款') {
        $PAY=1;
    };
    $orderList->bindValue(":MEMBER",  $mem_no);
    $orderList->bindValue(":ORD_DATE",  date('Y/m/d/H/i'));
    $orderList->bindValue(":DELIVERY",  $DELIVERY);
    $orderList->bindValue(":PAY",  $PAY);
    $orderList->bindValue(":DISCOUNT",  $_POST['discount']);
    $orderList->bindValue(":TOTAL",  $_POST['total']);
    $orderList->bindValue(":RECEIVER_NAME",  $_POST['reciever']);
    $orderList->bindValue(":RECEIVER_ADDRESS",  $_POST['address']);
    $orderList->bindValue(":RECEIVER_TEL",  $_POST['phone']);
    $affectedRows=$orderList->execute();
    // echo "成功異動了{$affectedRows}筆資料";
    $orderNo = $pdo->lastInsertId();




    
    require_once("./connect.php");
    $sql ="UPDATE member SET GAME_POINT =GAME_POINT - :DISCOUNT WHERE MEM_NO = :MEMBER;";
    $DISCOUNTUPDATE = $pdo->prepare($sql);
    $DISCOUNTUPDATE->bindValue(":MEMBER",  $_POST['mem_no']);
    $DISCOUNTUPDATE->bindValue(":DISCOUNT",  $_POST['discount']);
    $DISCOUNTUPDATE->execute();
     //搜尋訂單編號
    //  require_once("./connect.php");
    //  $sql = "select * from ORDERS where MEMBER = :MEMBER ORDER BY 1 DESC LIMIT 1";
    //  $orderListNo = $pdo->prepare($sql);
    //  $orderListNo->bindValue(":MEMBER",  $_POST['mem_no']);
    //  $orderListNo->execute();
    //  $prodRow = $orderListNo->fetch(PDO::FETCH_ASSOC);

    //orderList增加
    require_once("./connect.php");
    $list=preg_split('/,/', $_POST['addItemList'], -1, PREG_SPLIT_NO_EMPTY);
    // $n=0;
    for($i=0 ; $i<count($list) ; $i++){
    $sql = "INSERT INTO orderlist (ODRDER_NO, PSN, QUANTITY) VALUES (:ODRDER_NO, :PSN, :QUANTITY);
    update product set sold=sold+ :QUANTITY where psn=:PSN";
    $product= $_POST[$list[$i]];
    $productInfo=preg_split('/,/', $product, -1, PREG_SPLIT_NO_EMPTY);
    $QUANTITY=$productInfo[1];
    $orders = $pdo->prepare($sql);
    $orders->bindValue(":ODRDER_NO", $orderNo);
    $orders->bindValue(":PSN",  $list[$i]);
    $orders->bindValue(":QUANTITY",  $QUANTITY);
    $orders->execute();
    // $n++;
};
// echo "成功異動了{$n}筆資料";
    header("Location: ../04_orders.html?orders_no={$orderNo}");
    exit();
} catch (PDOException $e) {
    echo  $e->getMessage() ;
};
?>