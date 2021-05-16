require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const projectRouter = require("./routes/projectRouter");
const path=require('path')


const app = express()
app.use(express.json())
app.use(cors())

//Routes
app.use('/users', userRouter)
app.use("/api/projects", projectRouter);






//Connect to MongoDB
const URI = process.env.MONGOOSE_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology:true
    
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB')
})



//work 
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
}




//listen server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('server is running on port ', PORT);
})

