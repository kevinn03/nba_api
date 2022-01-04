const axios = require('axios');
const cheerio = require('cheerio');
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

const getArticles = async () => {
  const articles = [];
  for (const website of websites) {
    const data = await getData(website);
    articles.push(...data);
  }
  return articles;
};
module.exports = { websites, shuffleArray, limitBlogs, getData, getArticles };
