const express = require("express");
require("dotenv").config();
const cors = require("cors");
const node = require("node-rsa");
const router = require("./ROUTER/Router");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
// const { urlencoded } = require('body-parser');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);
app.use(cors());
app.use(bodyParser.json());

// app.post('/api/method', (req, res) => {
//     console.log(req.body);
// kavi
// const key = nodersa({b:512})
// console.log(key);
// const encrypt = key.encrypt("Gowsick","base64")
// console.log(encrypt);
// const private = key.exportkey("Private")
// const public =key.exportkey("Public")
// //
// const newkey = new nodersa(public)
// //
// const encryt =newkey.encrypt("hello","base64")
// //
// const nkey = new nodersa(private)
// const decrypt =nkey.decrypt(encrypt,"utf8")
// //

// });

const Secrt_key = "khascie";
const users = [];
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) return res.status(401).send("Request denied")
        try{
            const verified = jwt.verify(token,Secrt_key)
            req.user = verified;
            next()
        }
        catch(err){
            res.status(400).send("invalid token")
        }
};
app.get("/signUp", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashPassword });
    console.log(users);

    res.status(201).send("user created sucessfully");
  } catch (err) {
    res.status(500).send("Error creating user");
  }
});
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);

    const user = users.find((u) => u.username === username);
    console.log(user);

    if (!user) return res.status(400).send("User not found..");
    const validpassword = await bcrypt.compare(password, user.password);
    if (!validpassword) return res.status(400).send("Invalid Password");
    const token = jwt.sign({ username: user.username }, Secrt_key);
    res.send({ token });
  } catch (err) {
    res.status(500).send("error logging");
  }
});
app.get("/profile",verifyToken,(req,res)=>{
    res.send(`wellcome ${req.user.username}`)
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running http://localhost:${process.env.PORT}`);
});
