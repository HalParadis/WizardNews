const express = require("express");
const {list, find} = require("./postBank");
const morgan = require("morgan");
const app = express();

app.use(express.static('public'))
app.use(morgan('dev'));

const posts = list();

// app.get("/", (req, res) => res.send("Hello World!"));

app.get('/', (req, res) => {
//   res.send(`<ul>${posts.map(post => `<li>${post.title} by ${post.name}</li>`).join('')}</ul>`);

    res.send(
        `<!DOCTYPE html>
        <html>
            <head>
                <title>Wizard News</title>
                <link rel="stylesheet" href="/style.css" />
            </head>

            <body>
                <div class="news-list">
                <header><img src="/logo.png"/>Wizard News</header>

                ${posts.map(post => `
                    <div class='news-item'>
                        <p>
                            <span class="news-position">${post.id}. ▲</span>
                            <a href="/posts/${post.id}">${post.title}</a>
                            <small>(by ${post.name})</small>
                        </p>

                        <small class="news-info">
                            ${post.upvotes} upvotes | ${post.date}
                        </small>

                    </div>`
                ).join('')}
                </div>
            </body>
        </html>`
    )
});

app.get('/posts/:id', (req, res, next) => {
    const id = req.params.id;
    const post = find(id);
    console.log(post);

    if(post.id){
        res.send(
            `<!DOCTYPE html>
            <html>
                <head>
                    <title>Wizard News</title>
                    <link rel="stylesheet" href="/style.css" />
                </head>

                <body>
                    <div class="news-list">
                    <header><img src="/logo.png"/>Wizard News</header>

                        <div class='news-item'>
                            <p>
                                ${post.title}
                                <small>(by ${post.name})</small>
                            </p>

                            <small class="news-info">
                                ${post.upvotes} upvotes | ${post.date}
                            </small>

                            <p>
                                ${post.content}
                            </p>
                        </div>
                    </div>
                </body>
            </html>`
        );
    } else{
        next(err)
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(404).send('Something broke!')
});


const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
