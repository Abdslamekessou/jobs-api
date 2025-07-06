require('dotenv').config();
require('express-async-errors');

//Extra Security Packages
const mongoSanitaize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(express.json());

//Security
app.use(mongoSanitaize())
app.use(xss())
app.use(helmet())
app.use(cors());
app.use( rateLimit({
  windowMs : 15*60*1000 ,
  max : 100 ,
  message: 'Too many requests from this IP, please try again later.',
}));

app.set('trust proxy', 1);

//connectDB
const connectDB = require('./db/connect')

const authentificateUser = require('./middleware/authentication.js')

//router
const authRouter = require('./routes/auth.js')
const jobsRouter = require('./routes/jobs')

app.get('/' , (req , res) =>{
  res.send('jobs api')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs' , authentificateUser,jobsRouter) //but i pass it as a middleware here and the instrutor is getting an object

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  try {
    app.listen(port, () =>
      console.log(`✅ Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
