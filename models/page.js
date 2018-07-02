var mongoose=require('mongoose');

var PageScchema=mongoose.Schema({

    title:{
            type:String,
            required:true
    },
    slug:{
        type:String,

    },
    content:{
        type:String,
        required:true
    },
    sorting:{
        type:String,

    }

});

var Pageee=module.exports=mongoose.model('pageeee',PageScchema);