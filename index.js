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
    selector: '.headlineStack__list li a',
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

app.get('/', (request, response) => {
  response.json('NBA');
});

const articles = [];

websites.forEach((website) => {
  axios.get(website.address).then((res) => {
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
      articles.push({ title, url, source: website.name });
    });
  });
});

app.get('/news', (request, response) => {
  const retArticles = [...articles];

  response.json(retArticles);
});

app.get('/news/:site', (request, response) => {
  const retArticles = [...articles];
  const site = request.params.site;

  const filterArr = retArticles.filter(
    (ele) => ele.source.toLowerCase() === site.toLowerCase()
  );

  response.json(filterArr);
});

app.get('/news/player-team/:id', (request, response) => {
  const retArticles = [...articles];
  const id = request.params.id;

  const filterArr = retArticles.filter(
    (ele) => ele.title.includes(id) || ele.url.includes(id)
  );

  response.json(filterArr);
});

app.get('/test', async (request, response) => {
  const arr = [];
  const res = await axios.get('https://sports.yahoo.com/nba/?guccounter=1');
  const html = res.data;
  const $ = cheerio.load(html);

  $('.js-content-viewer', html).each(function () {
    // console.log($(this));
    console.log($(this).text());
    console.log($(this).attr('href'));
    // const resUrl = $(this).attr('href');
    // const url = website.base + resUrl;
    // let title = '';
    // if (website.name === 'nba') {
    //   title = getTitle(resUrl);
    // } else if (website.name === 'espn') {
    //   title = $(this).text();
    // }
    // arr.push({ title, url, source: website.name });
  });

  response.json(arr);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
