import express from 'express';
import bodyParser from 'body-parser';

import routeHandler from './routes/index';

const app = express();

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Credentials', true);
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   // res.header('Access-Control-Allow-Origin', '*');
   next();
 });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routeHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});

export default app;