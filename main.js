const apiKey = '39baaaf0ddc6b42b7cd1db757f91efdb';
const movieTitles = [
  “Avatar Fire & Ash”, “Zootopia 2”, “Jurassic World: Rebirth”, “Wicked: For Good”, “Lilo & Stitch”, “Fantastic Four: First Steps”, “Superman”, “Mission: Impossible – The Final Reckoning”, “How to Train Your Dragon”, “Michael”,
“Captain America: Brave New World”, “Snow White”, “Thunderbolts”, “Minecraft”, “Dog Man”, “Final Destination: Bloodlines”, “The Accountant 2”, “Sinners”, “Den of Thieves 2: Pantera”, “Wolf Man”,
“Back in Action”, “Karate Kid: Legends”, “Bring Her Back”, “A Widow’s Game”, “The Wild Robot”, “Fear Street: Prom Queen”, “Love Me”, “Mountainhead”, “The Better Sister”, “Deep Cover”,
“Countdown”, “We Were Liars”, “Head Over Heels”, “ROMCON”, “Marry My Husband”, “Nosferatu”, “Until Dawn”, “Elio”, “28 Years Later”, “Insidious 6”,
“The Bride!”, “Michael 2”, “Red Notice 2”, “Amateur”, “Badlands”, “Sea Amanda”, “The Running Man”, “Rodeo Man”, “Frankenstein”, “Love Hurts”,
“Polly Pocket”, “Haunted Doll”, “Goosebumps: The Movie”, “Fast & Furious: Final Ride”, “Shazam! Fury of the Gods”, “Black Panther: Wakanda Forever”, “Doctor Strange in the Multiverse of Madness”, “Thor: Love and Thunder”, “Ant-Man and the Wasp: Quantumania”, “Guardians of the Galaxy Vol. 3”,
“Spider-Man: No Way Home”, “Black Widow”, “Eternals”, “Shang-Chi and the Legend of the Ten Rings”, “The Batman”, “The Flash”, “Aquaman and the Lost Kingdom”, “Wonder Woman 1984”, “Justice League: Snyder Cut”, “Suicide Squad”,
“Birds of Prey”, “Joker”, “Tenet”, “Dune”, “No Time to Die”, “Top Gun: Maverick”, “Mission: Impossible 7”, “John Wick: Chapter 4”, “Matrix Resurrections”, “Avatar: The Way of Water”,
“Encanto”, “Turning Red”, “Lightyear”, “Soul”, “Luca”, “Raya and the Last Dragon”, “Onward”, “Frozen II”, “Toy Story 4”, “Incredibles 2”,
“Coco”, “Moana”, “Zootopia”, “Big Hero 6”, “Inside Out”, “Finding Dory”, “Finding Nemo”, “Monsters University”, “Monsters, Inc.”, “Up”,
  "Lilo & Stitch (2025)","Mission: Impossible – The Final Reckoning","HIT: The Third Case","The Prosecutor",
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
