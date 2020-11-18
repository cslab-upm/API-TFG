require('dotenv/config');
var mongoose = require('mongoose');
const db_path = process.env.DB_CONNECTION;

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var conn = mongoose.connection

conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));

module.exports = conn;