const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const configdb = require('./config/database');

const userRouter = require('./routes/userRouter');


// connect to database
mongoose.connect(configdb.database);

// on connection
mongoose.connection.on('connected', () => {
    console.log('Database is ON: ' + configdb.database );
});

// on Error
mongoose.connection.on('error', (err) => {
    console.log('*** Database error *** ==> ' + err);
});


// application
const app = express();


// port number
const port = 3000;

// CORS middleware
app.use( cors() );

// set static folder
app.use( express.static(path.join(__dirname, 'public')) );

// body parser middleware
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded(  {extended:true} ) );

// routes
app.use( '/users', userRouter );


// index route
app.get( '/', (req, res) => {
    res.send('Invalid Endpoint');
} );



// started server
app.listen( port, (err, res)=>{
    if (err){
        console.log('Error opn port ' + port );
    }
    console.log('Server running on port: ' + port );
} );