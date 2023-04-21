let pesquisa = document.querySelector('.pesquisa')
let result = document.querySelector('.result')
let card = document.querySelector('.card')
let formulario = document.querySelector('.formulario');
let btn = document.querySelector('.btn');
let loadMoreBtn = document.getElementById("load-more");
let currentPage = 1;

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    getApi(pesquisa.value, 1);
    currentPage = 1;
    loadMoreBtn.classList.add("show");
})

loadMoreBtn.addEventListener("click", () => {
    const nextPage = currentPage + 1;
    getApi(pesquisa.value, nextPage);
    currentPage = nextPage;
    card.scrollIntoView({ behavior: 'smooth', block: 'end' });
});

async function getApi(movie, page) {
    let response = await fetch(`https://www.omdbapi.com/?s=${movie}&apikey=75bdc9fb&page=${page}`);
    let data = await response.json();

    for (var i = 0; i < data[`Search`].length; i++) {
        card.innerHTML += `<div class="result">
        <img src = "${data.Search[i].Poster}">
        <h4>${data.Search[i].Title}</h4>
        <h6>${data.Search[i].Year}</h6>
        </div>`
    }

    if (page === 1) {
        loadMoreBtn.classList.add("show");
    }

    if (data[`Search`].length < 10) {
        loadMoreBtn.style.display = "none";
    }

    window.scrollTo({
        top: document.documentElement.scrollHeight - window.innerHeight,
        behavior: 'smooth'
      });
}
