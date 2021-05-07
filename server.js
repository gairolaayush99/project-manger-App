require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const projectRouter = require("./routes/projectRouter");

const app = express()
app.use(express.json())
app.use(cors())


app.use('/users', userRouter)
app.use("/api/projects", projectRouter);

app.get('/details', function (req, res) {
    res.sendFile(__dirname + '/details.html');
});

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('server is running on port ', PORT);
})
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