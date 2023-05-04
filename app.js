const express = require("express");
const {list, find} = require("./postBank");
const morgan = require("morgan");
const app = express();

app.use(morgan('dev'));

const posts = list();

// app.get("/", (req, res) => res.send("Hello World!"));

app.get('/posts', (req, res) => {
  res.send(`<ul>${posts.map(post => `<li>${post.title} by ${post.name}</li>`).join('')}</ul>`);
});


const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
