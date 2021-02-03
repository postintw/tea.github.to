<?php
    session_start();
    
    //取得上傳檔案資訊
    $filename=$_FILES['profile_pic_input']['name'];
    // $tmpname=$_FILES['profile_pic_input']['tmp_name'];
    // $filetype=$_FILES['profile_pic_input']['type'];
    // $filesize=$_FILES['profile_pic_input']['size'];    
    $file=NULL;
    
    if(isset($_FILES['profile_pic_input']['error'])){    
        if($_FILES['profile_pic_input']['error']==0){                                    
            $instr = fopen($tmpname,"rb" );
            $file = addslashes(fread($instr,filesize($tmpname)));        
        }
    }
    
    //新增圖片到資料庫
    require_once "./connect.php";
                    
    $sql="update member
    set MEM_IMG = './images/member/new_member.jpg + :filename'
    where MEM_NO = :MEM_NO
    ";
    $changeImg = $pdo->prepare($sql);
    $changeImg->bindValue(":filename", $filename);
    $changeImg->bindValue(":MEM_NO", $_SESSION["MEM_NO"]);
    $changeImg->execute();    
?>