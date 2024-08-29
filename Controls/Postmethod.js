const Return = require("../Model/Schema");

const Postmethod = async (req, res) => {

    try {
        const {firstName , lastName} = req.body;


    let data = await Return.create({
        firstName: firstName,
        lastName: lastName

    })
    console.log(data);
    if (data) {
        return res.status(200).json({ msg: "Updated succesfully" })
    }
} catch(err){
    console.log(err);
    return res.status(500).json({msg:"Internal server error"})
}
}
module.exports=Postmethod