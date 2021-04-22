const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const {User} = require('./models/User')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
require('dotenv').config()
mongoose.connect(process.env.mongoURL,{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>console.log('몽고DB연결완료.')).catch(err=>console.log(err))
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/register',(req, res) => {


    const user = new User(req.body)

    user.save((err,userInfo)=>{
        if(err) return res.json({success:false,err})
        return res.status(200).json({
            success:true
        })
    })

})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})