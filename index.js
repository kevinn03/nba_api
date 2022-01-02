const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express');

const PORT = process.env.PORT || 8000;

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
    address: 'https://www.slamonline.com/',
    base: '',
    selector: '.h-bloglist-block-content-top > h3 > a',
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

const limitBlogs = (request, articles) => {
  const retArticles = [...articles];
  if (request.query && request.query.limit) {
    if (request.query.limit < 0) {
      request.query.limit = 0;
    }
    return retArticles.slice(0, request.query.limit);
  }
  return retArticles;
};

const getData = async (website) => {
  try {
    const originalArticles = [];
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
    return originalArticles;
  } catch (err) {
    return err.messaage;
  }
};

app.get('/', (request, response) => {
  response.json('NBA');
});

app.get('/news', async (request, response) => {
  try {
    let articles = [];
    for (const website of websites) {
      const data = await getData(website);
      articles = [...articles, ...data];
    }
    shuffleArray(articles);
    response.json(articles);
  } catch (err) {
    response.json({ error: err.messaage });
  }
});

app.get('/news/:site', async (request, response) => {
  try {
    const site = request.params.site;
    const website = websites.find((web) => web.name === site.toLowerCase());

    const retArticles = await getData(website);

    response.json(limitBlogs(request, retArticles));
  } catch (err) {
    response.json({ error: err.messaage });
  }
});

app.get('/news/player/:id', async (request, response) => {
  const id = request.params.id;

  let retArticles = [];
  for (const website of websites) {
    const data = await getData(website);
    retArticles = [...retArticles, ...data];
  }

  const filterArr = retArticles.filter(
    (ele) =>
      (ele.title.includes(id) || ele.url.includes(id)) && ele.title !== ''
  );

  response.json(limitBlogs(request, filterArr));
});

app.get('/news/team/:id', async (request, response) => {
  const id = request.params.id;

  let retArticles = [];
  for (const website of websites) {
    const data = await getData(website);
    retArticles = [...retArticles, ...data];
  }

  const filterArr = retArticles.filter(
    (ele) =>
      (ele.title.includes(id) || ele.url.includes(id)) && ele.title !== ''
  );

  response.json(limitBlogs(request, filterArr));
});

// app.get('/test', async (request, response) => {});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
