const newsRouter = require('express').Router();

const {
  nbaCanWebsite,
  websites,
  shuffleArray,
  limitBlogs,
  getCanNbaData,
  getData,
  getArticles,
} = require('../utils/news_helper');
const cron = require('node-cron');

let mainArticle = [];

cron.schedule('*/15 * * * *', async function () {
  mainArticle = await getArticles();
  console.log('after 15 min');
});

newsRouter.get('/', async (request, response) => {
  try {
    if (mainArticle.length === 0) {
      mainArticle = await getArticles();
    }

    const articles = mainArticle;

    shuffleArray(articles);
    response.json(limitBlogs(request, articles));
  } catch (err) {
    response.json({ error: err.messaage });
  }
});

newsRouter.get('/source/:site', async (request, response) => {
  try {
    const site = request.params.site;
    let retArticles;
    let filterArr;
    if (mainArticle.length === 0) {
      if (site.toLowerCase() === 'nba_canada') {
        retArticles = await getCanNbaData(nbaCanWebsite);
      } else {
        const website = websites.find((web) => web.name === site.toLowerCase());
        retArticles = await getData(website);
      }
      response.json(limitBlogs(request, retArticles));
    } else {
      retArticles = mainArticle;
      filterArr = retArticles.filter(
        (article) => article.source === site.toLowerCase()
      );
      response.json(limitBlogs(request, filterArr));
    }
  } catch (err) {
    response.json({ error: err.messaage });
  }
});

newsRouter.get('/player/:id', async (request, response) => {
  try {
    const id = request.params.id;
    if (mainArticle.length === 0) {
      mainArticle = await getArticles();
    }
    const articles = mainArticle;

    const filterArr = articles.filter(
      (article) => article.title.includes(id) || article.url.includes(id)
    );

    response.json(limitBlogs(request, filterArr));
  } catch (err) {
    response.json({ error: err.messaage });
  }
});

newsRouter.get('/team/:id', async (request, response) => {
  try {
    const id = request.params.id;
    if (mainArticle.length === 0) {
      mainArticle = await getArticles();
    }
    const articles = mainArticle;

    const filterArr = articles.filter(
      (article) => article.title.includes(id) || article.url.includes(id)
    );

    response.json(limitBlogs(request, filterArr));
  } catch (err) {
    response.json({ error: err.messaage });
  }
});

module.exports = newsRouter;
