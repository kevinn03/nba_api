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

<h3>/articles</h3>
<p>Returns a list of all the latest nba articles from sports sites espn, slam, yahoo, bleacher report and nba</p>

<div>
<p><em>Optional param</em>: <strong>source</strong> returns articles based on chosen source</p>
<ul>
  <li>nba</li>
  <li>nba-canada</li>
  <li>espn</li>
  <li>bleacher-report</li>
  <li>slam</li>
  <li>yahoo</li>
</ul>
<p> Example /articles?source=bleacher-report</p>
</div>


<div>
<p><em>Optional param</em>: <strong>limit</strong> returns the maximum number of articles desired
</br>
Example /articles?limit=5</p>
</div>

<div>
<p><em>Optional param</em>: <strong>player</strong> returns articles based on chosen player
</br>
Use names seperated by a hypen for best results
</br>
Example /articles?player=kevin-durant&source=espn</p>
</div>

<div>
<p><em>Optional param</em>: <strong>team</strong> returns articles base on chosen team
</br>
Example /articles?team=lakers</p>
</div>
`)
);
app.use('/articles', newsRouter);
app.use(middleware.unknownEndpoint);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
