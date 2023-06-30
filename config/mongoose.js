const mongoose = require('mongoose');

// connecting mongoose to its default server and ecommerceDB
// mongoose.connect("mongodb+srv://mohdmamoon480:A1cybnSMiaNPoqc4@cluster0.f25xbqc.mongodb.net/?retryWrites=true&w=majority", {
//     useNewUrlParser: true
// });
mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB1", {
    useNewUrlParser: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;