const express = require('express');
const env = require('dotenv');
const app = express();
const path = require('path');
const cors = require('cors');


//environment variable or you can say constants
env.config();

//middelewares
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));



//api routes
app.use('/api/user',require('./routes/UserRoutes'))

//listen
app.listen(process.env.PORT||2000, () => {
    console.log(`Server is running on port ${process.env.PORT||2000}`);
});