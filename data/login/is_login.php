<?php
header('Content-Type:application/json;charset=utf-8');
require('../init.php');
session_start();
@$uname=$_SESSION['uname'];
if($uname){
  $output=['code'=>1,'uname'=>$_SESSION['uname']];
}else{
  $output=['code'=>-1,'msg'=>'not login'];
}
echo json_encode($output);