<h1 align="center">Nba News Api</h1>

## About

Api server providing endpoints that allow for:

- Getting latest nba news articles from sports sites espn, slam, yahoo, and nba
- Getting latest nba news articles by sports sites
- Getting latest nba news articles by player
- Getting latest nba news articles by team


## Install



```sh
git clone https://github.com/kevinn03/nba_api.git

npm install


## Endpoint Documentation


### GET /news

Returns a list of all the latest nba articles.

Optional params:
limit     returns the maximum number of articles desired



Optional params:
limit     returns the maximum number of articles desired
example   /news?limit=5

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

### GET /news/{sportsite}

Returns a list of all the latest nba articles from the {sportsite}.

Optional params:
limit     returns the maximum number of articles desired

Example  /news/espn 

### GET /news/player/{player name}

Returns a list of all the latest nba articles of{player name}.
Use dash to seperate names

Optional params:
limit     returns the maximum number of articles desired

Example /news/player/kevin-durant?limit=10

### GET /news/player/{team}

Returns a list of all the latest nba articles of{team}.
Use dash to seperate names

Optional params:
limit     returns the maximum number of articles desired

Example /news/team/raptors
## To Do:

- Add query string option for original order of articles

## Dependencies

|                                                                      |                                                                                                                              |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [axios](https://www.npmjs.com/package/bcrypt)
| [cheerio] (https://www.npmjs.com/package/cheerio)                    |   Cheerio parses markup and provides an API for traversing/manipulating the resulting data structure                         |
| [express](https://www.npmjs.com/package/express)                     | Simple, robust web framework for Node                                                                                        |                                                                                              |
| [nodemon](https://www.npmjs.com/package/nodemon)                     | Performs hot reloading of the application                                                                                    |

## Author

👤 **Kevin Nguyen**

