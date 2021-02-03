<?php 
 
try {

		$today = getdate();
		date("Y/m/d H:i");  //日期格式化
		$year=$today["year"]; //年 
		$month=$today["mon"]; //月
		$day=$today["mday"];  //日
	 
		if(strlen($month)=='1')$month='0'.$month;
		if(strlen($day)=='1')$day='0'.$day;
		$today=$year."-".$month."-".$day;
		//echo "今天日期 : ".$today;
	 
		
	
	require_once("./connect.php");
	$sql = "select *
	from tour a join garden b on a.gard_id = b.gard_id 
	where a.TOUR_STATUS = 1 and a.DEADLINE_DATE > $today and a.NUM_OF_PARTICIPANTS<=a.TOUR_PEOPLE
    order by TOUR_ID desc ";
	$tours = $pdo->prepare($sql);
	$tours->execute();
	$tours = $tours->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($tours);
} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "系統錯誤, 請通知系統維護人員<br>";
}
?>