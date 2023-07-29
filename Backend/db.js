const mongoose=require('mongoose');

const mongoURI ="mongodb+srv://priyanshukumar4969:XfJzfYR0Q7UIM19u@priyanshu.jegqzdm.mongodb.net/inotebook?retryWrites=true&w=majority"
// mongoose.set("strictQuery", false);
const connectToMongo=()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected To Mongo Successfully");
    })
    
}

module.exports= connectToMongo;