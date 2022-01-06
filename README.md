<h1 align="center">Nba News Api</h1>

## About

https://nba-stories.herokuapp.com/

Api providing endpoints that allow for:

- Getting latest nba articles from sports sites espn, slam, yahoo, bleacher report and nba
- Getting latest nba articles by sports sites
- Getting latest nba articles by player
- Getting latest nba articles by team

## Install

git clone https://github.com/kevinn03/nba_api.git

npm install

npm run dev

localhost:8000

## Endpoint Documentation

### GET /news

Returns a list of all the latest nba articles.

Optional params:
limit returns the maximum number of articles desired
example /news?limit=5

**Successful Response:**

```JSON
[
{
title: "Heat Sign Mario Chalmers",
url: "https://bleacherreport.com/articles/10022498-mario-chalmers-heat-agree-to-10-day-contract-won-2-championships-with-miami",
source: "bleacherreport"
},
{
title: "raptors-clippers-game-preview-channel-injury-report",
url: "https://ca.nba.com/news/raptors-clippers-game-preview-channel-injury-report/wd09hzt1cqa1160vk9qanglf2",
source: "nba"
},
{
title: "raptors-76ers-game-preview-channel-postponement-news",
url: "https://ca.nba.com/news/raptors-76ers-game-preview-channel-postponement-news/os7dkg8vx7ae1upt6z2w59g3b",
source: "nba"
},
]
```

### GET /news/source/{sportsite}

Returns a list of all the latest nba articles from the {sportsite}.

Optional params:
limit returns the maximum number of articles desired

Example /news/source/espn

### GET /news/player/{player name}

Returns a list of all the latest nba articles of{player name}.

Optional params:
limit returns the maximum number of articles desired

Use dash to seperate names
Searching by players full name seperated by dash produces best results
Example /news/player/kevin-durant?limit=10

### GET /news/team/{team-name}

Returns a list of all the latest nba articles of{team-name}.

Optional params:
limit returns the maximum number of articles desired

Use dash to seperate names
Searching by team name produces best results
Example /news/team/raptors

## To Do:

- Add query string option for original order of articles

## Dependencies

[axios] (https://www.npmjs.com/package/axios)

[cheerio] (https://www.npmjs.com/package/cheerio)
Cheerio parses markup and provides an API for traversing/manipulating the resulting data structure

[express] (https://www.npmjs.com/package/express)  
Simple, robust web framework for Node

[nodemon] (https://www.npmjs.com/package/nodemon)  
Performs hot reloading of the application

## Author

👤 **Kevin Nguyen**
