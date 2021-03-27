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

    sarjat.forEach((sarja, index)=>{

        const kuva = sarja.show.image ? sarja.show.image.medium : 'http://placekitten.com/210/295';
        const kotisivu = sarja.show.officialSite || sarja.show.url;
        let summary = sarja.show.summary ? sarja.show.summary : "Description not available"
        const html = `<article>
                        <table>
                        <tr>
                        <th>
                        <h2>${sarja.show.name}</h2>
                        <figure data-id="${index}">
                          <img src="${kuva}" alt="${sarja.show.name}">
                          <figcaption>${sarja.show.name}</figcaption>
                        </figure>
                        <a href="${kotisivu}">Kotisivu</a>
                        <p>Genres: ${sarja.show.genres.join(' | ')}</p>
                        </th>
                        <th>
                        ${summary}
                        </th>
                        </tr>
                        </table>
                       </article>`;
        main.innerHTML += html;
    });

    const figuret = document.querySelectorAll('figure');
    figuret.forEach((figure, index) => {
      figure.addEventListener('click', ()=>{
        const id = figure.dataset.id;
        console.log(sarjat[id].show.image.original);
      })
    })

} catch (e) {
  console.log(e.message);
}

});

