<?php
$host='127.0.0.1';
$uname='root';
$upwd='';
$dbname='netease';
$port=3306;
$conn=mysqli_connect($host, $uname, $upwd, $dbname, $port);
if(!$conn){
	echo 'connect failed with '.mysqli_error;
}
$charset=mysqli_query($conn, 'SET NAMES UTF8');
if(!$charset){
	echo 'charset error: '.mysqli_error.'<br>';
}
?>