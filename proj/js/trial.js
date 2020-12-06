
var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => {
const getUrlParameter = (sParam) => {
      let sPageURL = window.location.search.substring(1),////substring will take everything after the https link and split the #/&
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

  function createMusicContainer(music) {
  const musicElement = document.createElement('div');
  musicElement.setAttribute('class','test');

  const musicTemplate = `

  <section class="section">


  ${ music.map((tracks) => {
  return `

  <iframe class="music" width="300" height="350" src="https://open.spotify.com/embed/track/${item.id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
  `;
  })}
  </section>
  `;
  }






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
    //data.result
    createMusicContainer(data.result);
    console.log(data);
  })
  .catch((error) => {
  console.log('Error', error);
  });

  }
});
