const newsRouter = require('express').Router();
const {
  websites,
  shuffleArray,
  limitBlogs,
  getData,
  getArticles,
} = require('../utils/news_helper');
const cron = require('node-cron');

let mainArticle = [];
cron.schedule('*/10 * * * * *', async function () {
  // mainArticle = await getArticles();
  console.log('running a task every 10 second');
  console.log('---------------------------');
  // console.log(mainArticle);
});

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
    let filterArr;
    if (mainArticle.length === 0) {
      const website = websites.find((web) => web.name === site.toLowerCase());
      retArticles = await getData(website);
      filterArr = retArticles.filter((ele) => ele.title !== '');
    } else {
      retArticles = mainArticle;
      filterArr = retArticles.filter(
        (ele) => ele.title !== '' && ele.source === site.toLowerCase()
      );
    }

    response.json(limitBlogs(request, filterArr));
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
      (ele) =>
        (ele.title.includes(id) || ele.url.includes(id)) && ele.title !== ''
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
      (ele) =>
        (ele.title.includes(id) || ele.url.includes(id)) && ele.title !== ''
    );

    response.json(limitBlogs(request, filterArr));
  } catch (err) {
    response.json({ error: err.messaage });
  }
});

module.exports = newsRouter;
