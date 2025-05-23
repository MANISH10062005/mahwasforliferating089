
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const filePath = './data.json';

// Read data from file
const getData = () => {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath));
};

// Save data to file
const saveData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Get all manhwas
app.get('/api/manhwas', (req, res) => {
    res.json(getData());
});

// Add a new manhwa
app.post('/api/manhwas', (req, res) => {
    const manhwas = getData();
    manhwas.push(req.body);
    saveData(manhwas);
    res.status(201).send("Added");
});

// Delete a manhwa by name
app.delete('/api/manhwas/:name', (req, res) => {
    const name = req.params.name;
    let manhwas = getData();
    manhwas = manhwas.filter(m => m.name !== name);
    saveData(manhwas);
    res.status(200).send("Deleted");
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
