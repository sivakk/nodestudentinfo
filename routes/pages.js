var express=require('express');
var router=express.Router();


 router.get('/edit-page/:slug',function (req,res) {

    res.send("hai");

})

module.exports= router;