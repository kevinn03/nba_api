const express = require('express');
const app = express();

const middleware = require('./utils/middleware');
const newsRouter = require('./controllers/news');
const PORT = process.env.PORT || 8000;

app.get('', async (request, response) => response.send('NBA-API'));
app.use('/news', newsRouter);
app.use(middleware.unknownEndpoint);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
