const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

require('dotenv').config();

connectDB();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
