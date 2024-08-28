const express = require('express');
const cors =require("cors")
const name = require("dotenv")
const node = require("node-rsa")
const app = express();
const port = 5000
const PORT = process.env.PORT
app.use(express.json())
app.use(cors())
app.post('/api/method', (req, res) => {
    console.log(req.body);

    const key = nodersa({b:512})
    console.log(key);
    const encrypt = key.encrypt("Gowsick","base64")
    console.log(encrypt);
    const private = key.exportkey("Private")
    const public =key.exportkey("Public")
    //
    const newkey = new nodersa(public)
    //
    const encryt =newkey.encrypt("hello","base64")
    //
    const nkey = new nodersa(private)
    const decrypt =nkey.decrypt(encrypt,"utf8")
    //
});

app.listen(port, () => {
    console.log(`Server is running ${port}`);
});









// const { username, dateofbirth } = req.body;
// console.log('Dataaaaa', username, dateofbirth );
// const datas =(()=>{
//     [{
//         username: '',
//         dateofbirth: ''
    
//     }]
// })
// res.json({ mge: 'Data received ' });