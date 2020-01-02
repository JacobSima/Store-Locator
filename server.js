const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
//load env vars
dotenv.config ({path:'./config/config.env'})
const app = express()
const cors = require('cors')


//load routes
const stores = require('./routes/stores')


// connect to db
require('./config/db')()

// Body parser
app.use(express.json())

//Enable cors
app.use(cors())

//server static folder
app.use(express.static(path.join(__dirname,'public')))

// use routes
app.use('/api/v1/stores',stores)



const PORT = process.env.PORT || 1000

app.listen(PORT,()=>console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
