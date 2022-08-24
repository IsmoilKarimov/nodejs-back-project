const {Router} = require('express')
const router = Router()
const Project = require('../model/project')
const Depatrment = require('../model/department')
const Client = require('../model/client')
const Team = require('../model/team')

router.get('/',async(req,res)=>{
    let projects = await Project.find().lean()
    
    res.render('project/index',{
        title: 'Projects',
        projects
    })
})

router.get('/create',async(req,res)=>{
    let departments = await Depatrment.find().lean()
    let clients = await Client.find().lean()
    let teams = await Team.find().lean()
    res.render('project/create',{
        departments,
        clients,
        teams
    })
})

router.post('/add/:id',async(req,res)=>{
   
})

module.exports = router
