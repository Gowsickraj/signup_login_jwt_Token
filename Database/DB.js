const mongoose =require("mongoose")

const DBurl =()=>{
   let db= mongoose.createConnection(process.env.DP_URL)
    return db;
}
module.exports=DBurl();
