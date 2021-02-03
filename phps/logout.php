<?php 
session_start();
session_unset();
// unset($_SESSION["memName"]);
echo "<script>location.href='../homepage.html'</script>";
?>