const express = require('express');
const cors = require('cors');
const app = express();
import router from './routes/index.js';

app.use("/api/v1", router);
app.use(cors());
app.use(express.json());

app.listen(3000);