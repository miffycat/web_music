<?php
header("Content-Type:application/json;charset=utf-8");
require('../init.php');
@$language=$_REQUEST['language'];
@$genre=$_REQUEST['genre'];
@$category=$_REQUEST['category'];
@$ages=$_REQUEST['ages'];
@$music_comp=$_REQUEST['music_comp'];
@$curpage=$_REQUEST['curpage'];
$pagesize=20;
$output=[
	'curpage'=>0,
	'maxpage'=>0,
	'data'=>0
];
if(!$curpage){
	$curpage=1;
}
$output['curpage']=$curpage;
$sql=" SELECT pid, ptitle, pcover FROM playlists WHERE 1=1 ";

if($language){
	$sql.=" AND language='$language' ";
}
if($genre){
	$sql.=" AND genre='$genre' ";
}
if($category){
	$sql.=" AND category='$category' ";
}
if($ages){
	$sql.=" AND ages='$ages' ";
}
if($music_comp){
	$sql.=" AND music_comp='$music_comp' ";
}
$result=mysqli_query($conn, $sql);
$rows=mysqli_fetch_all($result,1);
$output['maxpage']=ceil(count($rows)/$pagesize);
$sql.=" LIMIT ".($curpage-1)*$pagesize.", $pagesize ";
// echo $sql;
$result=mysqli_query($conn, $sql);
$rows=mysqli_fetch_all($result,1);
$output['data']=$rows;
echo json_encode($output);
