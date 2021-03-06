var express=require('express');
var router=express.Router();
const server=express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
router.use(expressValidator());

var Page = require('../models/page');
router.use( jsonParser = bodyParser.json());
router.use( urlencodedParser = bodyParser.urlencoded({ extended: false }));

router.get('/pages',function (req,res) {

    Page.find({}).sort({sorting:1}).exec(function(err,pages){
        res.render('admin/pages',{pages:pages})
    })

})



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



//get edit page
router.get('/edit-page/:slug',function (req,res) {

    
    Page.findOne({slug:req.params.slug}, function (err, page) {


        
          
        if (err)
            return console.log(err);
            
            
        res.render('admin/edit-page', {
            
            title: page.title,
            slug: page.slug,
            content: page.content,
            id: page._id
        });
    });

})

//edit post

router.post('/edit-page/:slug',function (req,res) {

   
    req.checkBody('title', 'Title must have a value.').notEmpty();
    req.checkBody('content', 'Content must have a value.').notEmpty(); 

    var title = req.body.title;
    var slug= req.body.slug.replace(/\s+/g, '-').toLowerCase();
    if (slug== "")
        slug= title.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;
    var id=req.body.id;

    var errors = req.validationErrors();

    if (errors) {
        res.render('admin/edit-page', {
            errors: errors,
            title: title,
            slug: slug,
            content: content,
            id:id
        });
    }
    else{

        Page.findOne({slug:slug,_id:{'$ne':id}},function(err,page){
            
            if(page){
              
                req.flash('danger', 'Page slug exists choose another');
                res.render('admin/edit-page', {
                    title: title,
                    slug: slug,
                    content: content,
                    id:id
                });
            }
            else{
              
               page.findById(id,function(err,page){


                page.title=title;
                page.slug=slug;
                page.content=content;

                if(err)
                    return console.log(err)
                    page.save(function (err) {
                        if (err)
                            return console.log(err);
    
                        
    
                        req.flash('success', 'Page added!');
                        res.redirect('/admin/edit-page/'+page.slug);
                    });

               })

               
            }

        })


        
       
    }




})


router.get('/delete-page/:id',function(req,res){
    page.findByIdAndRemove(req.params.id,function(err){
        if(err){
            return console.log(err);
            req.flash('success','page deleted');
            res.redirect('/admin/pages');
        }
    });
});

module.exports= router;