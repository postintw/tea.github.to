<?
try {
    require_once("./connect.php");

    $orderby=str_replace("_"," ",$_GET['orderby']);
    $orderby =htmlspecialchars($orderby);
    if( strlen($orderby)<20){  
            if($_GET['type']=='所有商品'){
            $sql = "select * from product  where ONSALE = 1 order by $orderby";
        }else{
            $sql = "select * from product where type= :type and ONSALE = 1 order by $orderby";
        }
        
        $products = $pdo->prepare($sql);
        if($_GET['type']=='所有商品'){
        }else{
            $products->bindValue(":type", $_GET['type']);
        }
        $products->execute();
    }else{
            echo '篩選條件錯誤，請重新設定。';
    }

    if ($products->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";
    } else { //找得到
        $productRow = $products->fetchAll(PDO::FETCH_ASSOC);
        //送出json字串
        echo json_encode($productRow);
    }
} catch (PDOException $e) {
    echo "錯誤行號 : " . $e->getLine() . "<br>"; //"->"唸成"的"
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
};?>