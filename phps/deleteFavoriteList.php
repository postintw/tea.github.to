<?
try {
    require_once("./connect.php");
    $sql = "DELETE FROM product_f WHERE MEM_NO = :mem_no ";
    $FavoriteList = $pdo->prepare($sql);
    $FavoriteList->bindValue(":mem_no", $_GET['mem_no']);
    $affectedRows=$FavoriteList->execute();
    echo "成功異動了{$affectedRows}筆資料";
    header("Location:../04_orders.html");
    exit();
} catch (PDOException $e) {
    echo  $e->getMessage() ;
};?>