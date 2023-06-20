const getSpotifyToken = async () => {
  let token;
  await fetch('https://accounts.spotify.com/api/token', {
  headers: {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization' : 'Basic NTM2YjcyYjIwMzY2NDVkMWIwYjY3NTgwZjE5MjQ3N2E6NDM0YTQ5NTA2Mzc0NDM5YjlkOThiMjUzMDJmNmRjMTc=',
  },
  body: new URLSearchParams({
  'grant_type': 'client_credentials'
  }),
  json: true,
  method: 'post'
  }).then(result => result.json())
  .then(json => token = json.access_token)

  return token;
  }
  
  
const getSpotifyPlaylist = async (playlistId) => {
  const token = await getSpotifyToken();
  
  let Id = playlistId;
  if(playlistId == ''){
    Id = '6gJj32s2qLIYTnAJwjBSrF'
  }

  let playlist;
  
  await fetch(`https://api.spotify.com/v1/playlists/${Id}`, {
  headers: {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization' : `Bearer ${token}`,
  },
  json: true,
  method: 'get'
  }).then(result => result.json())
  .then(json => playlist = json)
  return {result:playlist.tracks.items, name:playlist.name};
  }

  const linkPlaylist = () => {
    const link = document.getElementById('linkPlaylist').value;
    var res = link.match('[^/]+(?=/$|$)')[0];
    console.log(res)
    forItens(res)
  }

const createP = (text) => {
  let tituloMusicas = document.createElement("p");
  tituloMusicas.setAttribute("class", 'tamanho');

  if(typeof(text) == 'object'){
    let textNode;

    for(artist of text){
      textNode = document.createTextNode(artist.name + ' ');
      tituloMusicas.appendChild(textNode);
    }
  }else{
    const textNode = document.createTextNode(text);
    tituloMusicas.appendChild(textNode);
  }

  return tituloMusicas;
}

const createMusic = (musica) => {
  let contentMusics = document.createElement("div");
  contentMusics.setAttribute("class", 'contentMusics efeito efeito1');

  let newP = createP(musica.name)
  contentMusics.appendChild(newP);

  newP = createP(musica.artists);
  contentMusics.appendChild(newP);

  newP = createP(musica.album.name);
  contentMusics.appendChild(newP);

  newP = createP(millisToMinutesAndSeconds(musica.duration_ms));
  contentMusics.appendChild(newP);

  const resultMusics = document.getElementById('resultMusics');

  resultMusics.appendChild(contentMusics);
}

const forItens = async (playlistId) => {
  console.log(playlistId)
  const playlist = await getSpotifyPlaylist(playlistId);

  document.getElementById('name').innerText = 'Musicas: ' + playlist.name

  const resultMusics = document.getElementById('resultMusics');
  resultMusics.innerHTML = ''
  for(item of playlist.result){
    createMusic(item.track);
  }
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


forItens('');




