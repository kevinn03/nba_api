const newsRouter = require('express').Router();
const cheerio = require('cheerio');
const axios = require('axios');
const {
  websites,
  shuffleArray,
  limitBlogs,
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
      const website = websites.find((web) => web.name === site.toLowerCase());
      retArticles = await getData(website);

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

newsRouter.get('/test', async (request, response) => {
  const res = await axios.get('https://ca.nba.com/news');
  const html = res.data;
  const $ = cheerio.load(html);
  const nbaTitle = [];
  const nbaUrl = [];
  const nbaArticles = [];
  $(
    {
      name: 'nba',
      address: 'https://ca.nba.com/news',
      base: '',
      selector: '.card__headline',
    }.selector,
    html
  ).each(function () {
    nbaTitle.push($(this).text().trim());
  });

  $(
    {
      name: 'nba',
      address: 'https://ca.nba.com/news',
      base: '',
      selector: 'article a',
    }.selector,
    html
  ).each(function () {
    nbaUrl.push($(this).attr('href'));
  });

  for (let i = 0; i < nbaTitle.length; i++) {
    const article = { title: nbaTitle[i], url: nbaUrl[i], source: 'nba' };
    nbaArticles.push(article);
  }

  console.log(nbaTitle.length);
  console.log(nbaUrl.length);
  // console.log(nbaTitle);
  // console.log(nbaUrl);
  console.log(nbaArticles.length);
  response.json(nbaArticles);
});

module.exports = newsRouter;
