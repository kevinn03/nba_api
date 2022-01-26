const axios = require('axios');
const cheerio = require('cheerio');
const websites = [
  {
    name: 'espn',
    address: 'https://www.espn.com/nba/',
    base: 'https://www.espn.com',
    selector: '.headlineStack__header + section > ul > li > a',
  },
  {
    name: 'bleacher_report',
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
  {
    name: 'nba',
    address: 'https://www.nba.com/news/category/top-stories',
    base: 'https://www.nba.com',
    selector: '.flex-1 > a',
  },
];

const nbaCanWebsite = {
  name: 'nba_canada',
  address: 'https://www.sportingnews.com/ca/nba/news',
  base: 'https://www.sportingnews.com',
  selectorUrl: '.list-item__title > a',
  selectorTitle: '.list-item__title > a > span',
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

const getNbaTitle = (title) => {
  const titleSplit = title.split(' ');
  const newTitleArr = titleSplit.slice(3);
  return newTitleArr.join(' ').trim();
};
const getData = async (website) => {
  try {
    const originalArticles = [];
    const res = await axios.get(website.address);
    const html = res.data;
    const $ = cheerio.load(html);

    $(website.selector, html).each(function () {
      let title;
      const resUrl = $(this).attr('href');
      const url = website.base + resUrl;

      if (website.name === 'nba') {
        title = getNbaTitle($(this).attr('title'));
      } else {
        title = $(this).text();
      }

      originalArticles.push({ title, url, source: website.name });
    });
    return originalArticles.filter((article) => article.title !== '');
  } catch (err) {
    return err.messaage;
  }
};

const getCanNbaData = async (website) => {
  const res = await axios.get(website.address);
  const html = res.data;
  const $ = cheerio.load(html);
  const nbaTitle = [];
  const nbaUrl = [];
  const nbaArticles = [];
  $(website.selectorTitle, html).each(function () {
    nbaTitle.push($(this).text().trim());
  });

  $(website.selectorUrl, html).each(function () {
    nbaUrl.push($(this).attr('href'));
  });
  for (let i = 0; i < nbaTitle.length; i++) {
    const article = {
      title: nbaTitle[i],
      url: website.base + nbaUrl[i],
      source: website.name,
    };
    nbaArticles.push(article);
  }

  return nbaArticles;
};

const getArticles = async () => {
  const articles = [];
  for (const website of websites) {
    const data = await getData(website);
    articles.push(...data);
  }
  const nbaData = await getCanNbaData(nbaCanWebsite);
  articles.push(...nbaData);
  return articles;
};
module.exports = {
  nbaCanWebsite,
  websites,
  shuffleArray,
  limitBlogs,
  getData,
  getArticles,
  getCanNbaData,
};
