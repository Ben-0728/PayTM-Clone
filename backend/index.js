const express = require('express');

const app = express();

import router from './routes/index.js';

app.use("/api/v1", router);

app.listen(3000);