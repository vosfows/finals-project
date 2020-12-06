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
  //var []tracks = [10];
  /*for (var i = 0; i < tracks.items.length; i++) {
    tracks[i] = "https://open.spotify.com/embed/track/"+tracks.items[i].id;
  }*/

  tracks.items.forEach(item => {
    var button = document.createElement("button");
    button.setAttribute("class", "add-button")
    button.setAttribute("id", "button"+id);
    button.setAttribute("type", "button");
    button.setAttribute("action", "./spotify_link.php");
    button.setAttribute("onclick", "javascript:abc(this.id);");


    var s = document.createElement("input"); 
        s.setAttribute("type", "button"); 
        s.setAttribute("value", "Song"+id); 
        s.setAttribute("name", "save");
 

    button.innerHTML = "Add to Recommended";
    var makeIframe = document.createElement("iframe");
        makeIframe.setAttribute('width', '300');
        makeIframe.setAttribute('height', '350');
        makeIframe.setAttribute('frameborder', '0');
        makeIframe.setAttribute('transparency', 'true');
        makeIframe.setAttribute("id", "frame"+id);
        makeIframe.setAttribute('allow', 'encrypted-media');
        makeIframe.setAttribute('src',"https://open.spotify.com/embed/track/"+item.id );
      
      document.getElementById("music").appendChild(makeIframe);
      document.getElementById("music").append(s);
      //document.getElementById("music").append(button);
    
    
    
    console.log(item.id);
    id++;
  });


}

/*function createTheForm (data){
  var tracks = data.tracks; 

  var makeIframe = document.createElement("iframe");
        makeIframe.setAttribute('width', '300');
        makeIframe.setAttribute('height', '350');
        makeIframe.setAttribute('frameborder', '0');
        makeIframe.setAttribute('transparency', 'true');
        makeIframe.setAttribute("id", "frame"+id);
        makeIframe.setAttribute('allow', 'encrypted-media');
        makeIframe.setAttribute('src',"https://open.spotify.com/embed/track/"+item.id );
  
  for (var i = 0; i < tracks.items.length; i++) {
    links[i] = "https://open.spotify.com/embed/track/"+tracks.items[i].id;
  }




}

function abc (classniya){
 
  //alert("meow");
    /**ar active, prev, next;
    active = prev = next = document.getElementById(classniya);
    do prev = prev.previousSibling; while(prev && prev.nodeType !== 1);
    do next = next.nextSibling;     while(next && next.nodeType !== 1);
    var active = document.getElementById(classniya);
    var prev = active.previousElementSibling;
    var next = active.nextElementSibling;

    var string = classniya;
    var id = string.charAt(string.length-1);
    console.log(document.getElementById('frame'+id).getAttribute("src"));
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

/*
function addfeilds()
{
    var totalFields = 10;
    

    var container = document.getElementById("music");
    //create the form     
    var form = document.createElement("form");
    form.setAttribute("method", "POST");

    for(var i=0; i<totalFields; ++i)
    {
       var button = document.createElement("input");
      button.setAttribute("type", "submit");
      button.setAttribute("value", "submit");
      button.setAttribute("name", "submit"+i);
      form.appendChild(button);
    }


    container.appendChild(form); //append the form to the div.
}*/