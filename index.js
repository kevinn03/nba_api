const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');

const PORT = 8000;

const websites = [
  {
    name: 'nba',
    address: 'https://ca.nba.com/news',
    base: '',
    selector: 'article a',
  },
  {
    name: 'espn',
    address: 'https://www.espn.com/nba/',
    base: 'https://www.espn.com',
    selector: '.headlineStack__header + section > ul > li > a',
  },
  {
    name: 'bleacherreport',
    address: 'https://bleacherreport.com/nba',
    base: '',
    selector: '.articleTitle',
  },
  {
    name: 'slam',
    address: 'https://www.slamonline.com/news/',
    base: '',
    selector: '.blog-post-vert-content h3 a',
  },
  {
    name: 'yahoo',
    address: 'https://sports.yahoo.com/nba/?guccounter=1',
    base: 'https://sports.yahoo.com',
    selector: '.js-content-viewer',
  },
];

const getTitle = (strTitle, digit) => {
  let retTitle = strTitle.split('/');
  return retTitle[digit];
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const originalArticles = [];
let articles = [];

const loadArticle = async () => {
  for (const website of websites) {
    const res = await axios.get(website.address);
    const html = res.data;
    const $ = cheerio.load(html);

    $(website.selector, html).each(function () {
      const resUrl = $(this).attr('href');
      const url = website.base + resUrl;
      let title = '';
      if (website.name === 'nba') {
        title = getTitle(resUrl, 4);
      } else if (website.name === 'espn') {
        title = $(this).text();
      } else if (website.name === 'bleacherreport') {
        title = $(this).text();
      } else if (website.name === 'slam') {
        title = $(this).text();
      } else if (website.name === 'yahoo') {
        title = $(this).text();
      }
      originalArticles.push({ title, url, source: website.name });
    });
  }
  articles = [...originalArticles];
  shuffleArray(articles);
};

loadArticle();

const limitBlogs = (request, articles) => {
  const retArticles = [...articles];
  if (request.query && request.query.limit) {
    return retArticles.slice(0, request.query.limit);
  }
  return retArticles;
};
app.get('/', (request, response) => {
  response.json('NBA');
});

app.get('/news', (request, response) => {
  response.json(limitBlogs(request, articles));
});

app.get('/news/:site', (request, response) => {
  const retArticles = [...articles];
  const site = request.params.site;

  const filterArr = retArticles.filter(
    (ele) => ele.source.toLowerCase() === site.toLowerCase()
  );

  response.json(limitBlogs(request, filterArr));
});

app.get('/news/player/:id', (request, response) => {
  const retArticles = [...articles];
  const id = request.params.id;

  const filterArr = retArticles.filter(
    (ele) => ele.title.includes(id) || ele.url.includes(id)
  );

  response.json(limitBlogs(request, filterArr));
});

app.get('/news/team/:id', (request, response) => {
  const retArticles = [...articles];
  const id = request.params.id;

  const filterArr = retArticles.filter(
    (ele) => ele.title.toLowerCase().includes(id) || ele.url.includes(id)
  );

  response.json(limitBlogs(request, filterArr));
});

app.get('/test', async (request, response) => {
  //   console.log(originalArticles);
  //   console.log('----------------------------------------------------');
  //   let articles = [...originalArticles];
  //   console.log(articles);
  //   console.log('----------------------------------------------------');
  //   shuffleArray(articles);
  //   console.log(articles);
  //   const arr = [];
  //   const res = await axios.get('https://www.espn.com/nba/');
  //   const html = res.data;
  //   const $ = cheerio.load(html);
  //   $('.headlineStack__header + section > ul > li > a', html).each(function () {
  //     console.log($(this));
  //     console.log($(this).text());
  //     console.log($(this).attr('href'));
  //     const resUrl = $(this).attr('href');
  //     const url = website.base + resUrl;
  //     let title = '';
  //     if (website.name === 'nba') {
  //       title = getTitle(resUrl);
  //     } else if (website.name === 'espn') {
  //       title = $(this).text();
  //     }
  //     arr.push({ title, url, source: website.name });
  //   });
  //   if (request.query && request.query.limit) {
  //     const query = request.query;
  //     response.json(arr.slice(0, 2));
  //   }
  //   response.json(arr);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
