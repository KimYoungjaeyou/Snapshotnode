var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var main = require('./main/main')
var trigger = require('./trigger/trigger')
var monitoring = require('./monitoring/monitoring')
var elasticsearch = require('elasticsearch');


var client = elasticsearch.Client({
  host: 'localhost:9200'
});


// client.indices.create({
// index: 'test1'
// },function(err,resp,status) {
// if(err) {
// 	console.log("Console already exists.");
// }
// else {
// 	console.log("create",resp.index);
// }
// });
client.search({
index: 'basketball'
},function(err,resp,status) {
var hits = resp.hits.hits;

if(err) {
	console.log("Console already exists.");
}
else {
	console.log(hits);
}
});

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});
//
// client.search({
//   q: 'basketball'
// }).then(function (body) {
//   var hits = body.hits.hits;
// }, function (error) {
//   if (error) {
//     console.error('elasticsearch cluster is down!');
//   } else {
//     console.log(hits);
//   }
// });
//
//
//
// //url routing
// client.search({
// 	index: 'basketball'
// })

router.post('/test', function(req,res) {

  client.search({
  index: req.body.startDate
  },function(err,resp,status) {
  var hits = resp.hits.hits;

  if(err) {
  	console.log("Console already exists.");
  }
  else {
  	console.log(hits);
  }
  })
  console.log(req.body.trigger);
  console.log(req.body.note);
  console.log(index);
});


router.get('/', function(req,res) {
	res.render('main.ejs', {
    title : 'test'
  });
});

// client.search({
//   index: 'error_log-2018.06.18'}, function(err,resp,status){
//     if(err){
//         console.log("Console already exists.");
//     }
//     else {
//       var result = resp.hits.hits.map(function(hit){
//         console.log(hit._source.Controller);
//         const { count } = client.count({
//           index: 'error_log-2018.06.18'}).then(function(count){
//             console.log(count.count);
//           })
//       })
//     }
//   })


router.post('/api_result_count', function(req,res) {
   client.count({
    index: 'b'+req.body.startDate},
    function(err,resp,status){
      var responsedate = {'ccount' : resp.count}
      console.log(resp.count)
      return res.json(responsedate);
     //res.render('monitoring.ejs', {'count' : resp.count});
    }
  )
  //
  // client.search({
  // index: 'called_api-'req.body.startDate
  // },function(err,resp,status) {
  // var hits = resp.hits.hits;
  //
  // if(err) {
  //   console.log("Console already exists.");
  // }
  // else {
  //   console.log(hits);
  // }
  // })
  console.log(req.body.startDate);
  console.log(req.body.fromDate);
});

router.post('/api_create_count', function(req,res) {
   client.count({
    index: 'classes'},
    function(err,resp,status){
      var responsedate = {'scount' : resp.count}
      console.log(resp.count)
      return res.json(responsedate);
      // res.render('monitoring.ejs', {'count' : resp.count});
    }
  )

});




router.use('/main', main)
router.use('/trigger', trigger)
router.use('/monitoring', monitoring)

module.exports = router;
