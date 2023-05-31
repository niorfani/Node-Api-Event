//Import dependencies.
require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')

//Import the Model
const Event = require('./models/eventModel')


//Create Express
const app = express()

//Create Middlewear
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//Route
app.get('/',(req, res) => {
    res.send('Hello NODE API!')
} )


//Create an Event
app.post('/event', async(req,res) => {
   try {
       const event = await Event.create(req.body)
       res.status(200).json(event);
   } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message})
   }
})


//Fetch Data
app.get('/event', async(req, res) => {
    try {
        const event = await Event.find({});
        res.status(200).json(event);
        } catch (erro) {
            res.status(500).json({message: error.message})
        }
    })

    //Fetch Data by ID
    app.get('/event/:id', async(req,res) =>{
        try {
            const {id}  = req.params;
            const event = await Event.findById(id);
        res.status(200).json(event);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })

    //Update Data
    app.put('/event/:id', async(req,res) => {
        try {
    
            const {id} = req.params;
            const event = await Event.findByIdAndUpdate(id,req.body);
            //We cannot find any event in database
            if(!event){
                return res.status(404).json({message: `Cannot find any event with ID ${id}`})
            }
            const updatedEvent = await Event.findById(id);
            res.status(200).json(updatedEvent);
    
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })


//Delete Data
app.delete('/events/:id', async(req,res) =>{
    try {
        const {id} = req.params;
        const event = await Event.findByIdAndDelete(id);
        if(!event){
            return res.status(404).json({message: `Cannot find any event with ID ${id}`})
        }
        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})


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

//Filter Implementation
app.get('/events/search/:name', async(req,res) =>{
    try{
        const {name} = req.params;

        const event = await Event.find({$or:[
        {name: {$regex: '.*' + name + '.*', $options:'i'}},
        {description: {$regex: '.*' + name + '.*', $options:'i'}},
        {detailedDescription: {$regex: '.*' + name + '.*', $options:'i'}},
        {eventCategory: {$regex: '.*' + name + '.*', $options:'i'}},
        {location: {$regex: '.*' + name + '.*', $options:'i'}},
       {date: {$regex: '.*' + name + '.*', $options: 'i' }}  
       
        ]})

        res.status(200).json(event)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})
