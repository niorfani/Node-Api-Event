//Link Mongo
const mongoose = require('mongoose');

//Create the EventScema
const eventSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Please enter an eventName'],
      },
      date: {
        type: String,
        required: [true, 'Please enter a date'],
      },
      description: {
        type: String,
        required: [true, 'Please enter a description'],
      },
      image: {
        type: String,
        required: [true, 'Please enter an Image URL'],
      },
      eventPrice: {
        type: Number,
        required: [true, 'Please enter an eventPrice'],
      },
      eventCategory: {
        type: String,
        required: [true, 'Please enter an eventCategory'],
      },
      totalTickets: {
        type: Number,
        required: [true, 'Please enter totalTickets'],
      },
      totalSoldTickets: {
        type: Number,
        default: 0,
      },
      detailedDescription: {
        type: String,
        required: [true, 'Please enter a detailedDescription'],
      },
      location: {
        type: String,
        required: [true, 'Please enter a location'],
      },
    },
    {
      timestamps: true, 
    }
  );

 //Create Event Model

const Event = mongoose.model('Event', eventSchema);

//Export the event Model
module.exports = Event;