import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import fantasyapiRoute from './routes/fantasyapiPlayers.js';
import mongodbRoutes from './routes/mongodbPlayers.js';

const app = express();

app.use(bodyParser.json({ extend: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/fantasyapi-players', fantasyapiRoute);
app.use('/mongodb-players', mongodbRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the F1 Fantasy API')
});

const PORT = process.env.PORT || 5000;

// Main function to start server
async function main() {
    try {
        console.log(process.env.CONNECTION_URL);
        await mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }); 
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}

main();
