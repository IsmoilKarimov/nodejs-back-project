const {Router} = require('express')
const router = Router()
const Client = require('../model/client')
const Company = require('../model/company')
const upload = require('../middleware/file')
                
router.get('/',async(req,res)=>{
    let clients = await Client.find().populate('company').lean()
    let companies = await Company.find({status:1}).lean()
    clients = clients.map(client => {
        client.status = client.status == 0 ? '<span class="badge badge-danger">Nofaol</span>' : '<span class="badge badge-success">Faol</span>'
        return client
    })
    res.render('client/index',{
        title: 'Mijozlar ro`yhati',
        clients, companies
    })
})

router.post('/',upload.single('avatar'),async(req,res)=>{
    let {name,company,phone,email,status} = req.body
    status = status || 0
    let avatar = ''
    if(req.file){
        avatar = req.file.path
    }                               
    let newclient = await new Client({name,company,phone,email,status,avatar})
    await newclient.save()
    res.redirect('/client')
})

router.get('/delete/:id',async(req,res)=>{
    let _id = req.params.id
    await Client.findByIdAndRemove({_id})
    res.redirect('/client')
})

router.get('/show/:id',async(req,res)=>{
    let _id = req.params.id
    let client = await Client.findOne({_id}).populate('company').lean()
    client.status = client.status == 1?'<span class="badge badge-success">Faol</span>':'<span class="badge badge-danger">Nofaol</span>'
    res.render('client/show',{
        title: `Mijoz: ${client.name} ning ma'lumotlari`,
        client
    })
})

router.get('/get/:id',async(req,res)=>{
    let _id = req.params.id
    let client = await Client.findOne({_id}).lean()
    res.send(client)
})

router.post('/save',upload.single('avatar'),async(req,res)=>{
    let {_id,name,company,phone,email,status} = req.body
    status = status || 0
    let client = {name,company,phone,email,status}
        
    if(req.file){
        client.avatar = req.file.path
    }  
    await Client.findByIdAndUpdate(_id,client)
    res.redirect('/client')    
})
module.exports = router