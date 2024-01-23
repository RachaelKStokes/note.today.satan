const express = require('express');
const fs = require('fs');
const PORT = 3001;
const app = express();
const uuid = require('./helpers/uuid');
const path = require('path');

//Allows use of public folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//API routes
//Get
app.get('/api/notes', (req, res) => {
    // const notes = fs.readFileAsync("./db/db.json", "utf8");
    // console.log(notes);
    // res.json(notes);
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        let dbData = JSON.parse(data);
        console.log(data);
        //Returns new database
        res.json(dbData);
    });
});

//Post
app.post('/api/notes', (req, res) => {
        const data = fs.readFileSync('./db/db.json', 'utf8');
        const reviews = data ? JSON.parse(data) : [];
        const newNote = req.body;
        console.log(req.body.id);
            reviews.push({...newNote, id: uuid()});
        const reviewsStr = JSON.stringify(reviews);
        fs.writeFileSync('db/db.json', reviewsStr);
        res.json(req.body);
});

// //Delete
// app.delete('/api/notes/:id', (req, res) => {
//     const newDb = db.filter((note) =>
//         note.id !== req.params.id);
//     fs.writeFileSync('db/db.json', JSON.stringify(newDb));
//     readFile.json(newDb);
// });

//HTML routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/index.html'));
});

//Notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//Wildcard 
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

//App listener
app.listen(PORT, () =>
    console.log(`App listening on ${PORT}`));
