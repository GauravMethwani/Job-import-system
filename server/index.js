const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const importLogRoutes = require('./routes/log');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());


app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/api/import-logs', importLogRoutes);


app.get('/', (req, res) => res.send('Job Importer API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
require('./jobShedule');
require('./worker/jobWoker');