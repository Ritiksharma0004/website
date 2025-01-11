// const mongoose = require('mongoose');
// require('dotenv').config();


// const mongoURL = process.env.MONGODB_URL_LOCAL 

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 300000, 
//   });
  


// const db = mongoose.connection;


// db.on('connected', () => {
//     console.log('Connected to MongoDB server');
// });

// db.on('error', (err) => {
//     console.error('MongoDB connection error:', err);
// });

// db.on('disconnected', () => {
//     console.log('MongoDB disconnected');
// });

// module.exports = db;






const mongoose = require('mongoose');
require('dotenv').config();


const mongoURL = process.env.MONGO_URL_ONLINE; 
// const mongoURL = process.env.MONGODB_URL_LOCAL;

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false, // Disable Mongoose's buffering
    serverSelectionTimeoutMS: 3000, // Increase timeout duration
  });
  

const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connected')
})

// Monitor connection events
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;
