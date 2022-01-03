const newsRouter = require('express').Router();
const {
  websites,
  shuffleArray,
  limitBlogs,
  getData,
} = require('../utils/news_helper');

newsRouter.get('/', async (request, response) => {
  try {
    const articles = [];
    for (const website of websites) {
      const data = await getData(website);
      articles.push(...data);
    }
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
    const website = websites.find((web) => web.name === site.toLowerCase());

    const retArticles = await getData(website);
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
