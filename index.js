const express = require('express');
const app = express();
const cors = require('cors');

const middleware = require('./utils/middleware');
const newsRouter = require('./controllers/news');
const PORT = process.env.PORT || 8000;
app.use(cors());
app.get('', async (request, response) =>
  response.send(`<h1>NBA-Latest Stories-API</h1>
<h2>About</h2>
<div>Returns latest NBA articles based on teams or players from espn, bleacher report, nba.com, yahoo, and slam</div>

<h2>Endpoints</h2> 

<h3>/news/</h3>
<p>Returns a list of all the latest nba articles from sports sites espn, slam, yahoo, bleacher report and nba</p>
<p>Optional params: limit returns the maximum number of articles desired</p>
<p>Example /news?limit=5</p>

<h3>/news/source/{sportsite}</h3>
<div>
<p>Returns a list of all the latest nba articles from the {sportsite}.</p>
<p>Optional params: limit returns the maximum number of articles desired</p>
<p>Options: nba, nba_canada, bleacher_report, espn, yahoo, slam</p>
<p>Example /news/source/espn?limit=5</p>

<h3>/news/player/{player name}</h3>
<p>Returns a list of all the latest nba articles of{player name}.</p>
<p>Optional params: limit returns the maximum number of articles desired</p>
<p>Use dash to seperate names Searching by players full name seperated by dash produces best results Example /news/player/kevin-durant?limit=10</p>

<h3>/news/team/{team-name}</h3>
<p>Returns a list of all the latest nba articles of{team}.</p>
<p>Optional params: limit returns the maximum number of articles desired</p>
<p>Use dash to seperate names Searching by team name produces best results Example /news/team/raptors</p>
`)
);
app.use('/articles', newsRouter);
app.use(middleware.unknownEndpoint);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
