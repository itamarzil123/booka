/**
 * A DEV/DEPLOY SERVER -> ONLY USED FOR DEPLOYMENTS (HEROKU ?) TO SERVER THE STATIC STUFF IN BUILD
 * NOT IN PRACTICAL USE IN THE PROJECT
 */

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);
