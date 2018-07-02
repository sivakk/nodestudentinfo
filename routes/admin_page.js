var express=require('express');
var router=express.Router();
const server=express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
router.use(expressValidator());

var Page = require('../models/page');

router.get('/pages',function (req,res) {

    res.send('admin area');

})

router.use( jsonParser = bodyParser.json());
router.use( urlencodedParser = bodyParser.urlencoded({ extended: false }));

router.get('/addpage',function (req,res) {

    var title = "";
    var slug = "";
    var content = "";

    res.render('admin/add_page',{
        
        title: title,
        slug: slug,
        content: content

    });

})

//post page

router.post('/addpage',function (req,res) {

    console.log( req.body.title);
    req.checkBody('title', 'Title must have a value.').notEmpty();
    req.checkBody('content', 'Content must have a value.').notEmpty(); 

    var title = req.body.title;
    var slug= req.body.slug.replace(/\s+/g, '-').toLowerCase();
    if (slug== "")
        slug= title.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;

    var errors = req.validationErrors();

    if (errors) {
        res.render('admin/add_page', {
            errors: errors,
            title: title,
            slug: slug,
            content: content
        });
    }
    else{

        Page.findOne({slug:slug},function(err,page){
            
            if(page){
              
                req.flash('danger', 'Page slug exists choose another');
                res.render('admin/add_page', {
                    title: title,
                    slug: slug,
                    content: content
                });
            }
            else{
                var page=new Page({

                    title:title,
                    slug: slug,
                    content: content,
                    sorting: 0
                });

                page.save(function (err) {
                    if (err)
                        return console.log(err);

                    

                    req.flash('success', 'Page added!');
                    res.redirect('/admin/pages');
                });
            }

        })


        
       
    }




})


module.exports= router;