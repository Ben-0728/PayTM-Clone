const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes/index.js');

app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1', router);


app.listen(3000, () => console.log("Server running on port 3000"));