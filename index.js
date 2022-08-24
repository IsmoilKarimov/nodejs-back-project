const express = require('express')
const app = express()
const mongoose = require('mongoose')
const expHbs = require('express-handlebars')

// routers
const pageRouter = require('./router/page')
const departmentRouter = require('./router/department')
const teamRouter = require('./router/team') 
const companyRouter = require('./router/company') 
const clientRouter = require('./router/client') 
const projectRouter = require('./router/project') 

const hbs = expHbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})          

app.engine('hbs', hbs.engine)
app.set('view engine','hbs')
app.set('views','temp')

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use('/files',express.static('files'))

app.post('/',(req,res)=>{
    let {title, age} = req.body
    res.end(`
        ${title} | ${age}
    `)
})


app.use(pageRouter)
app.use('/department', departmentRouter)
app.use('/team', teamRouter)
app.use('/company', companyRouter)
app.use('/client', clientRouter)
app.use('/project', projectRouter)

const PORT = 3003

async function dev(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/portall',{
            useNewUrlParser:true
        }),
        app.listen(PORT,()=>{
            console.log(`Server is running at ${PORT} port`);
        })
    } catch (error) {
        console.log(error);
    }
}
dev()