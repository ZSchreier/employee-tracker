

const express = require('express');
const fs = require('fs');
const mysql = require('mysql2');
const app = express();

const PORT = process.env.PORT || 3001;
// const { productRoutes, customerRoutes, orderRoutes } = require("./routes")

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'something',
    database: 'movies_db'
  },
  console.log(`Connected to the movies_db database.`)
);

// app.use("/api/products", productRoutes)

app.get('/api/movies', (req, res) => {
  db.query(`SELECT * FROM movies_db.movies`, (err, result) => {
    if (err) {
      return err;
    }
    res.json(result)
  })
})

app.get('/api/movie-reviews', (req, res) => {
  db.query(`SELECT * FROM movies_db.reviews`, (err, result) => {
    if (err) {
      return err;
    }
    res.json(result)
  })
})

app.post('/api/add-movie', (req, res) => {
  db.query(`INSERT INTO movies_db.movies (movie_name) VALUES (${req})`, (err, result) => {
    if (err) {
      return err;
    }
    res.json(result)
  })
})




app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));