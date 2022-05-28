const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        if(conn){
            console.log(`MongoDB connection successful : ${conn.connection.host}`.cyan.underline)
        }else{
            console.error('MongoDB connection not successful')
        }
    }catch(err){
        console.error(err.message);
    }
}

module.exports = connectDB