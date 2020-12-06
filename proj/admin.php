Cachopoy
<!DOCTYPE html>
<html lang='en'>
	<head>
	<body>
	<?php
	include("includes/database.php");
	include("includes/banner.html");
	echo <a href='.php'><input type='button' class='btn1' name='update-btn' value='Add new product ' /> 
	</a> <br> <br>
	$query = "SELECT * FROM movie ORDER BY movienane, Genre";
	$stmt  = $db->stmt_init();
	$stmt->prepare($query);
	$stmt->execute();
	$stmt->bind_result($moviename,$Genre.$Year_released,$Image>;
	
	include("includes/data.php");
	
	
	$movie = [];
	
	
	while ($stmt->fetch()){
		
		$movie = new Movie($moviename,$Genre,$Year_released,$Image);
		$movie[] = $movie;
	}
	?>	
	
</head>
</body>