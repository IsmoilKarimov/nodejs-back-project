const {Router} = require('express')
const router = Router()

router.get('/',(req,res)=>{
    let rundNum = Math.round(Math.random()*100)
    res.render('index',{
        isHome:true,
        rundNum
    })
})

router.get('/contact', (req,res)=>{
    res.render('page/contact',{
        isContact:true
    })
})


module.exports = router