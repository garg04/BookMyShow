const mongoose = require('mongoose');

mongoose.connect(process.env.Mongo_Db_Url)
    .then( () => {
        console.log("connection established");
    })
    .catch((e) =>{
        console.log(e)
    });

module.exports = mongoose;