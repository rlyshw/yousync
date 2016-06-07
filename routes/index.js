var express = require('express');
var router = express.Router();
var url = require('url');
var uuid = require('node-uuid');
var querystring = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Yousync' });
});

router.post('/', function(req,res,next){
    console.log(req.query.url)
    var url_parts = url.parse(req.query.url);
    var query = querystring.parse(url_parts.query);
    var videoId = query.v || url_parts.pathname.slice(1);
    var t = query.t;
    console.log(videoId);
    if(!videoId){
        res.end(500);
        return;
    }
    var id = uuid.v1()
    res.send({id: id,videoId: videoId});
})

router.get('/:id', function(req,res,next){
    res.render('video',{title:req.params.id});
})

module.exports = router;