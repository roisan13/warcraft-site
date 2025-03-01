
var jsonNews;
async function fetchAndParseJSON() {
    try {
        const response = await fetch('../json/news.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.news);
        jsonNews = data.news;

        cardsAddEvents();

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function cardsAddEvents(){
    
    var newsArticle = document.getElementById("newsArticle");

    for (let i = 0; i < jsonNews.length; i++){
        let article = document.getElementById("news" + i);

        article.addEventListener("click", (event) => {
            newsArticle.innerHTML = "";


            let titleH2 = document.createElement("h3");
            let newsImg = document.createElement("div");
            newsImg.id = "newsImg";
            let newsText = document.createElement("div");
            newsText.id = "newsText";

            let img = document.createElement("img");
            img.src = jsonNews[i].image;
            img.alt = "News Image";
            newsImg.append(img);
            newsArticle.append(newsImg);


            let titlu = document.createElement("h3");
            titlu.textContent = jsonNews[i].title;

            let p = document.createElement("p");
            p.textContent = jsonNews[i].article;

            newsText.append(titlu);
            newsText.append(p);
            newsArticle.append(newsText);
            newsArticle.appendChild(titleH2);

        })
        
    }
}

 window.onload = function(){
    fetchAndParseJSON();
 }

 