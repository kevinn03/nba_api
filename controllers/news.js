const newsRouter = require('express').Router();

const {
  shuffleArray,
  limitBlogs,
  getArticles,
  filteredArticles,
} = require('../utils/news_helper');
const cron = require('node-cron');

let mainArticle = [];

const http = require('http');
setInterval(async () => {
  http.get('https://nba-stories.onrender.com/articles');
  mainArticle = await getArticles();
  console.log('after 10 min');
}, 600000);

newsRouter.get('/', async (request, response) => {
  try {
    if (mainArticle.length === 0) {
      mainArticle = await getArticles();
    }

    let articles = mainArticle;
    articles = filteredArticles(request, articles);
    shuffleArray(articles);
    response.json(limitBlogs(request, articles));
  } catch (err) {
    response.json({ error: err.messaage });
  }
});

module.exports = newsRouter;
