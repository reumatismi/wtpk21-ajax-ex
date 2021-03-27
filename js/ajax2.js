'use strict';

const form = document.querySelector('#search-form');
const main = document.querySelector('main');

form.addEventListener('submit', async (evt)=>{
  evt.preventDefault();
  //console.log(evt);
  try {
    main.innerHTML = '';
    const hakusana = document.querySelector('input[name=search-field]').value; // overkill?
    //console.log(hakusana);
    const vastaus = await fetch('http://api.tvmaze.com/search/shows?q=' + hakusana); // promise as long as pending
    const sarjat = await vastaus.json();
    console.log(sarjat);

    sarjat.forEach((sarja)=>{

      const article = document.createElement('article');
      const h2 = document.createElement('h2');
      const figure = document.createElement('figure');
      const figcaption = document.createElement('figcaption');
      const img = document.createElement('img');
      const p = document.createElement('p');
      const div = document.createElement('div');

      h2.innerHTML = sarja.show.name;
      figcaption.innerHTML = sarja.show.name;
      p.innerHTML = sarja.show.genres.join(' | ');

      img.src = sarja.show.image ? sarja.show.image.medium : 'http://placekitten.com/320/320';
      img.alt = sarja.show.name;
      div.innerHTML = sarja.show.summary;

      figure.appendChild(img);
      figure.appendChild(figcaption);
      article.appendChild(h2);
      article.appendChild(figure);
      article.appendChild(p);
      article.appendChild(div);

      figure.addEventListener('click', (evt)=>{
        console.log(evt.currentTarget);
        console.log(sarja.show.image ? sarja.show.image.original : 'http://placekitten.com/320/320');
      });

      main.appendChild(article);
    });
  } catch (e) {
    console.log(e.message);
  }
});