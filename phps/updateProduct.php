<?
try {
    //用來修改FEATURES資料的程式
    // require_once("./connect.php");
    // $psn=49;
    // $IMG=13;                                                     ;
    // $FEATURES="";
    // for ($i=1; $i <= $IMG; $i++) { 
    //     $FEATURES.="./images/shopping/$psn-$i.jpg|";
    // }
    // $FEATURES=substr($FEATURES,0,-1);
    $sql="UPDATE product set FEATURES='$FEATURES' where PSN=100$psn";
    $sql="INSERT INTO `shopping_adv` (`ADV_NO`, `PSN`, `IMG`) VALUES
    (1, 10006, './images/shopping/adv/adv_6.jpg'),
    (2, 10048, './images/shopping/adv/adv_48.jpg'),
    (3, 10049, './images/shopping/adv/adv_49.jpg');";
    $product = $pdo->prepare($sql);
    $product->execute();
    echo 'update成功';
} catch (PDOException $e) {
    echo  $e->getMessage() ;
};
?>