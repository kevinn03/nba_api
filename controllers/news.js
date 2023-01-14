const newsRouter = require('express').Router();

const {
  shuffleArray,
  limitBlogs,
  getArticles,
  filteredArticles,
} = require('../utils/news_helper');
const cron = require('node-cron');

let mainArticle = [];

setInterval(async () => {
  mainArticle = await getArticles();
  console.log('after 13 min');
}, 13 * 60000);

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
