<?
try {
    require_once("./connect.php");
    $sql = "select * from shopping_adv";
    $advs = $pdo->prepare($sql);
    $advs->execute();

    if ($advs->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";
    } else { //找得到
        $productRow = $advs->fetchAll(PDO::FETCH_ASSOC);
        //送出json字串
        echo json_encode($productRow);
    }
} catch (PDOException $e) {
    echo "錯誤行號 : " . $e->getLine() . "<br>"; //"->"唸成"的"
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
};?>