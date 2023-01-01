let episodes = null;
const cardContainer = document.querySelector(".cardContainer");
const searchInput = document.querySelector("input")
const select = document.querySelector("select");

// Fetch Api and episodes 
fetchEpisodes();
async function fetchEpisodes() {
    const res = await fetch("https://api.tvmaze.com/shows/82/episodes");
    episodes = await res.json();
    renderEpisodes(episodes);
    renderOptions(episodes);
}

// Render Episodes and details
function renderEpisodes(data) {
    const cards = document.createElement("div")
    cards.classList.add("cards")
   data.forEach((item) => {
        const makingCard = `<div class="card bg-dark" style="width: 18rem;">
        <img class="card-img-top" src="${item.image.medium}" alt="${item.name}">
        <div class="card-body">
        <h5 class="episode-name text-center">${item.name}</h5>
        </div>
        <div class="card-body text-center summary">${item.summary.length > 70 ? item.summary.substring(0, 70) + "..." : item.summary}</div>
        <div class="episode-parent card-header text-center">
            <p class="card-text">${item.season < 10 ? "S0" + item.season : "S" + item.season}${item.number < 10 ? "E0" + item.number : "E" + item.number}</p>
        </div>
      </div>`;
      cardContainer.appendChild(cards)
      cards.innerHTML += makingCard;
  })
}

// Live search 
function liveSearch(data, value) {
    const cards = document.querySelector(".cards");
    if (value) {
      cards && cards.remove();
      const filterEpisodes = data.filter(
        ({ name, summary }) =>
          name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          summary.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
      renderEpisodes(filterEpisodes);
    } else {
      cards && cards.remove();
      renderEpisodes(episodes);
    }
  }

searchInput.addEventListener("input", (e) => {
    liveSearch(episodes, e.target.value)
}) 

// Select part and render options
function renderOptions(data) {
    data.map(({ name, season, number, id }) => {
      const option = `
        <option value="${id}">${season < 10 ? "S0" + season : "S" + season}${number < 10 ? "E0" + number : "E" + number} - ${name}</option>`;
      select.innerHTML += option;
    });
  }

function selectEpisode(data, value) {
    const cards = document.querySelector(".cards");
    if (value !== "all-episodes") {
      cards && cards.remove();
      const filterEpisode = data.filter(({ id }) => id === parseInt(value));
      renderEpisodes(filterEpisode);
    } else {
      cards && cards.remove();
      renderEpisodes(episodes);
    }
  }

select.addEventListener("change", (e) => {
    selectEpisode(episodes, e.target.value);
  });