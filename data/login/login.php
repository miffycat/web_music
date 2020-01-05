<?php
header('Content-Type:application/json;charset=utf-8');
require('../init.php');
$uname=$_REQUEST['uname'];
$upwd=$_REQUEST['upwd'];
$sql=" SELECT uid FROM user WHERE uname='$uname' AND upwd='$upwd' ";
$result=mysqli_query($conn, $sql);
$row=mysqli_affected_rows($conn);
if($row>0){
 $output=['code'=>1, 'umsg'=>'login succ'];
 session_start();
 $_SESSION['uname']=$uname;
}else{
 $output=['code'=>-1, 'msg'=>'用户名或密码错误'];
}
echo json_encode($output);