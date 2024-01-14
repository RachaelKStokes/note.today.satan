const express = require('express');
const fs = require('fs');
const PORT = 3001;
const app = express();
const db = require('./db/db.json');
const uuid = require('./helpers/uuid');
const path = require('path');

//Allows use of public folder
app.use(express.static('public'));
app.use(express.json());

//API routes
//Get
app.get('/api/notes', (req, res) => {
    fs.readFile(db, (data) => {
        let dbData = JSON.parse(data);
        //Returns new database
        res.json(dbData);
    });
});

//Post
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuid;
    db.push(newNote);
    fs.writeFileSync(db, JSON.stringify(db));
    res.json(db);
});

//Delete
app.delete('/api/notes/:id', (req, res) => {
    const newDb = db.filter((note) =>
        note.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(newDb));
    readFile.json(newDb);
});

//HTML routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

//Notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
})

//Wildcard 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

//App listener
app.listen(PORT, () =>
    console.log(`App listening on ${PORT}`));
