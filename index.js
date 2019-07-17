const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const members = require('./Members');

const logger = require('./middleware/logger');

const PORT = process.env.PORT || 4000;

//res => json, render

// app.get('/',(req,res) => {
// res.sendFile(path.join(__dirname,'public','index.html'))
// });


//init middleware
// app.use(logger);

//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//init Bodyparser Miiddleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//homepage route
app.get('/', (req,res) => {
res.render('index', {title: 'Member App', members:members});
});

//set static folder
app.use(express.static(path.join(__dirname,'public')));

//Members API Routes
app.use("/api/members", require('./routes/api/members'));


app.listen(PORT, () => console.log(`Server running at ${PORT}`));