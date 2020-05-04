const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routeHandler = require('./routes/index');

const app = express();

app.use(cors({origin:true}))

app.use((req, res, next) =>  {
   res.header('Access-Control-Allow-Credentials', true);
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   // res.header('Access-Control-Allow-Origin', '*');
   next();
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// Express 4.0
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(routeHandler);

// const port = process.env.PORT || 8000;

// app.listen(port, () => {
//    console.log(`Server is running on PORT ${port}`);
// });

exports.app = functions.https.onRequest(app)