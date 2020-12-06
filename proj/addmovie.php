<?php
	include("includes/database.php")
	include("includes/banner.html")
	include("includes/addmovie.html")
	
if (isset($_POST['add'])){
	$name = $_POST['moviename'];
	$genre = $_POST['genre'];
	$year = $_POST['year_released'];
	$file_size = $_FILES['file']['size'];
	$file = addslashes(@file_get_contents($_FILES['file']['tmp_name']));
	
	
	
	$stmt = mysqli_prepare($database,"INSERT INTO movie(moviename,genre,year_released,image) 
	VALUES (?,?,?,?)");
	
	mysqli_stmt_bind_param($stmt."ssib",$name,$genre,$year,$file);
	mysqli_stmt_execute($stmt);
	mysqli_stmt_close($stmt);
	header('Location: admin.php');
		
	
}

?>