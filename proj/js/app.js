
var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => {

const getUrlParameter = (sParam) => {
      let sPageURL = window.location.search.substring(1),
          sURLVariables = sPageURL.split('#'),
          sParameterName,
          i;
      let split_str = window.location.href.split('#');
      sURLVariables = split_str[1].split('&');
      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');
          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
          }
      }
  };

  const accessToken = getUrlParameter('access_token');
  const buttonElement = document.querySelector('#search-button');
  const inputElement = document.querySelector('#inputValue');
  const musicRow = document.querySelector('#music');

  buttonElement.onclick = function(event) {
  event.preventDefault();
  const value = inputElement.value;
  const url = 'https://api.spotify.com/v1/search?q=';
  const newUrl = url + value +'&type=track' + '&limit=10&offset=5';

  var myOptions = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
    mode: 'cors',
    cache: 'default'
  };

  fetch(newUrl,myOptions)
  .then((res) => res.json())
  .then((data) => {
    
    appendTheMusic(data);
    console.log(data);
  })
  .catch((error) => {
  console.log('Error', error);
  });

  }
});


 function appendTheMusic(data){

  
  var id = ""; 
  var tracks = data.tracks; 
  document.getElementById("music").innerHTML = null; 
  var id = 0; 
  tracks.items.forEach(item => {
    var button = document.createElement("button");
    button.setAttribute("class", "add-button")
    button.setAttribute("id", "button"+id);
    button.setAttribute("type", "button");
    button.setAttribute("action", "./spotify_link.php");
    button.setAttribute("onclick", "javascript:abc(this.id);");


    button.innerHTML = "Add to Recommended";
    var makeIframe = document.createElement("iframe");
    makeIframe.setAttribute('width', '300');
    makeIframe.setAttribute('height', '350');
    makeIframe.setAttribute('frameborder', '0');
    makeIframe.setAttribute('transparency', 'true');
    makeIframe.setAttribute("id", "frame"+id);
    makeIframe.setAttribute('action', './index.js');
    makeIframe.setAttribute('allow', 'encrypted-media');
    makeIframe.setAttribute('src',"https://open.spotify.com/embed/track/"+item.id );
    document.getElementById("music").append(makeIframe);
    document.getElementById("music").append(button);
    console.log(item.id);

    id++;
  });

}

function abc (classniya){
 
  alert("meow");
    /**ar active, prev, next;
    active = prev = next = document.getElementById(classniya);
    do prev = prev.previousSibling; while(prev && prev.nodeType !== 1);
    do next = next.nextSibling;     while(next && next.nodeType !== 1);
    var active = document.getElementById(classniya);
    var prev = active.previousElementSibling;
    var next = active.nextElementSibling;**/

    var string = classniya;
    var id = string.charAt(string.length-1);
    var mysql = require('mysql');

    

    console.log(document.getElementById('frame'+id).getAttribute("src"));
    cookie("link", document.getElementById('frame'+id).getAttribute("src"));

          

      var con = mysql.createConnection({
        host: "localhost",
        user: "yourusername",
        password: "yourpassword",
        database: "mydb"
      });

      con.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT INTO webiste";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted, ID: " + result.insertId);
        });
      });
}






/**
button.addEventListener ("click", function() {
  alert("did something");
  var active, prev, next;
  active = prev = next = element.querySelector(this);
  do prev = prev.previousSibling; while(prev && prev.nodeType !== 1);
  do next = next.nextSibling;     while(next && next.nodeType !== 1);
  var active = element.querySelector('button');
  var prev = active.previousElementSibling;
  var next = active.nextElementSibling;
});**/



// Function to create the cookie 
function cookie(name, value) { 
    document.cookie = escape(name) + "=" + escape(value) + "; path=/"; 
} 