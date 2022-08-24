const {Router} = require('express')
const router = Router()
const Company = require('../model/company')
const upload = require('../middleware/file')

router.get('/',async(req,  res)=>{
    let companies = await Company.find().lean()
    companies = companies.map(company => {
        company.status = company.status == 0 ? '<span class="badge badge-danger">Nofaol</span>' : '<span class="badge badge-success">Faol</span>'
        return company
    })
    res.render('company/index',{
        title: 'Kompaniyalar nomi',
        companies
    })
})

router.post('/',upload.single('logo'),async(req,res)=>{
    let {name,country,address,phone,email,website,status} = req.body
    status = status || 0
    let logo = ''
    if(req.file){
        logo = req.file.path
    }                               
    let newCompany = await new Company({name,country,address,phone,email,website,status,logo})
    await newCompany.save()
    res.redirect('/company')
})

router.get('/delete/:id',async(req,res)=>{
    let _id = req.params.id
    await Company.findByIdAndRemove({_id})
    res.redirect('/company')
})

router.get('/get/:id',async(req,res)=>{
    let _id = req.params.id
    let company = await Company.findOne({_id}).lean()
    res.send(company)
})

router.post('/save',upload.single('logo'),async(req,res)=>{
    let {_id,name,country,address,phone,email,website,status} = req.body
    status = status || 0
    
    let company = {name,country,address,phone,email,website,status}
        
    if(req.file){
        company.logo = req.file.path
    }                               
    
    await Company.findByIdAndUpdate(_id,company)
    res.redirect('/company')    
})
module.exports = router