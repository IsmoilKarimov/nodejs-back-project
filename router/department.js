const {Router} = require('express')
const router = Router()
const Department = require('../model/department')

// deaprtment bo'lim sahifani render qiladi READ
router.get('/', async(req,res)=>{
    let departments = await Department.find().lean()
    departments = departments.map(department => {
        department.status = department.status == 0 ? '<span class="badge badge-danger">Nofaol</span>' : '<span class="badge badge-success">Faol</span>'
        return department
    })
    res.render('department/index',{
        title: `Bo'limlar ro'yhati`,
        departments
    })
})
// department ma'lumotni bazaga yozadi CREATE
router.post('/',async(req,res)=>{
    let {title,status} = req.body
    status = status || 0
    let department = await new Department({title,status})
    await department.save()
    res.redirect('/department')
})

// _id dagi ma'lumotni o'chiradi DELETE
router.get('/delete/:id',async(req,res)=>{
    let _id = req.params.id
    await Department.findByIdAndRemove({_id})
    res.redirect('/department')
})

// _id dagi ma'lumotni api bo'yicha qaytaradi READ
router.get('/get/:id',async(req,res)=>{
    let _id = req.params.id
    let department = await Department.findOne({_id}).lean()
    res.send(department)
})

// _id dagi ma'lumotni o'zgartiradi UPDATE
router.post('/save',async(req,res)=>{ 
    let {_id,title,status} = req.body
    status = status || 0 
    await Department.findByIdAndUpdate(_id,{title,status})
    res.redirect('/department')
})

module.exports = router
