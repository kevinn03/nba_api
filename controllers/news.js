const newsRouter = require('express').Router();
const {
  websites,
  shuffleArray,
  limitBlogs,
  getData,
  getArticles,
} = require('../utils/news_helper');

let mainArticle = [];

newsRouter.get('/', async (request, response) => {
  try {
    if (mainArticle.length === 0) {
      mainArticle = await getArticles();
    }

    const articles = mainArticle;

    const retArticles = articles.filter((ele) => ele.title !== '');
    shuffleArray(retArticles);
    response.json(limitBlogs(request, retArticles));
  } catch (err) {
    response.json({ error: err.messaage });
  }
});

newsRouter.get('/source/:site', async (request, response) => {
  try {
    const site = request.params.site;
    let retArticles;
    if (mainArticle.length === 0) {
      const website = websites.find((web) => web.name === site.toLowerCase());
      retArticles = await getData(website);
      console.log('used scrape');
    } else {
      retArticles = mainArticle;
      console.log('used mainArticle');
    }
    const filterArr = retArticles.filter((ele) => ele.title !== '');

    response.json(limitBlogs(request, filterArr));
  } catch (err) {
    response.json({ error: err.messaage });
  }
});

newsRouter.get('/player/:id', async (request, response) => {
  const id = request.params.id;

  const retArticles = [];
  for (const website of websites) {
    const data = await getData(website);
    retArticles.push(...data);
  }

  const filterArr = retArticles.filter(
    (ele) =>
      (ele.title.includes(id) || ele.url.includes(id)) && ele.title !== ''
  );

  response.json(limitBlogs(request, filterArr));
});

newsRouter.get('/team/:id', async (request, response) => {
  const id = request.params.id;

  const retArticles = [];
  for (const website of websites) {
    const data = await getData(website);
    retArticles.push(...data);
  }

  const filterArr = retArticles.filter(
    (ele) =>
      (ele.title.includes(id) || ele.url.includes(id)) && ele.title !== ''
  );

  response.json(limitBlogs(request, filterArr));
});

module.exports = newsRouter;
