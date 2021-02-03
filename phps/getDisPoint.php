<?
try {
session_start();
if(isset($_SESSION['MEM_NO'])){
   $MEM_NO= $_SESSION['MEM_NO'];
    require_once("./connect.php");
    $sql = "select GAME_POINT from member where MEM_NO= $MEM_NO";
    $DisPoint = $pdo->prepare($sql);
    $DisPoint->execute();
    if ($DisPoint->rowCount() == 0) { //找不到
            //傳回空的JSON字串
            echo "{}";
        } else { //找得到
            //取回一筆資料
            $productRow = $DisPoint->fetchAll(PDO::FETCH_ASSOC);
            //送出json字串
            echo json_encode($productRow);
        }
    } }catch (PDOException $e) {
        echo  $e->getMessage() ;
    };
?>