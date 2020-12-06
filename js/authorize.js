


eventHandler = function(){
	const authEndpoint = 'https://accounts.spotify.com/authorize';
	const clientId = '9ff915fc57e646e9af5e89bb9d6df6c7';
  	const redirectUri = 'http://localhost/project/music_admin.php';
  	let query = `client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`;
 	window.location = `${authEndpoint}?${query}`;
}


if (document.readyState !== 'loading') {
  eventHandler();
} else {
  document.addEventListener('DOMContentLoaded', eventHandler);
}



