const express = require('express');
const routes = require('./routes/api');

const app = express();
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({extended: false, limit: '25mb'}));

app.use(routes);

app.get('/', (req, res) => {
    res.send("Home route");
    res.end();
})

// Listen for requests
app.listen(4000, function(){
    console.log(`Server is online @ port:4000`);
});
