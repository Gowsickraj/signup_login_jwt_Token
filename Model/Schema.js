const mongoose = require("mongoose");
const DBurl = require("../Database/DB");

const pratice = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String}

},{
    timestamps:true
}
)
const Return =DBurl.model("Pratice",pratice)
module.exports=Return;