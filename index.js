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
    res.send('Hello World! zzz')
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
app.post('/login',(req,res)=>{

    User.findOne({ email:req.body.email },(err,user)=>{
        if(!user){
            return res.json({
                loginSuccess : false,
                message : "이메일을 찾을수가 없습니다."
            })
        }
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch)
                return res.json({loginSuccess:false,message:"비밀번호가 옳지않습니다."})
            user.generateToken((err,user)=>{

            })
        })
    })

})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})