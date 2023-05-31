//Import dependencies.
require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')


//Create Express
const app = express()


//Route
app.get('/',(req, res) => {
    res.send('Hello NODE API!')
} )







//connect to MongoDB
mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://niorfani123:123456nikos@orfanidisapi.ubajhpr.mongodb.net/Node-Api?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000, ()=> {
        console.log('connected to MongoDB')
    console.log('Node API app is running on port 3000')
});
}).catch(() => {
    console.log(error)
})
