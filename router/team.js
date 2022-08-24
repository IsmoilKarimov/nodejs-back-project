const {Router} = require('express')
const router = Router()
const Team = require('../model/team')

// deaprtment bo'lim sahifani render qiladi READ
router.get('/', async(req,res)=>{
    let teams = await Team.find().lean()
    teams = teams.map(team => {
        team.status = team.status == 0 ? '<span class="badge badge-danger">Nofaol</span>' : '<span class="badge badge-success">Faol</span>'
        return team
    })
    res.render('team/index',{
        title: `Guruh ro'yhati`,
        teams
    })
})
// team ma'lumotni bazaga yozadi CREATE
router.post('/',async(req,res)=>{
    let {name,status} = req.body
    status = status || 0
    let team = await new Team({name,status})
    await team.save()
    res.redirect('/team')
})

// _id dagi ma'lumotni o'chiradi DELETE
router.get('/delete/:id',async(req,res)=>{
    let _id = req.params.id
    await Team.findByIdAndRemove({_id})
    res.redirect('/team')
})

// _id dagi ma'lumotni api bo'yicha qaytaradi READ
router.get('/get/:id',async(req,res)=>{
    let _id = req.params.id
    let team = await Team.findOne({_id}).lean()
    res.send(team)
})

// _id dagi ma'lumotni o'zgartiradi UPDATE
router.post('/save',async(req,res)=>{ 
    let {_id,name,status} = req.body
    status = status || 0 
    await Team.findByIdAndUpdate(_id,{name,status})
    res.redirect('/team')
})

module.exports = router
