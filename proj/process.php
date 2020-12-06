<?php 
$mysqli = new mysqli("localhost", "root", "", "music_list");


if (isset($_POST['save'])) {
	$artist = $_POST['name'];
	$title = $_POST['title'];
	$description = $_POST['description'];
	$genre = $_POST['genre'];

	$mysqli->query("INSERT INTO playlist(artist, title, description,genre) VALUES('$artist', '$title', '$description', '$genre')");
}
?>