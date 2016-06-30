// BASE SETUP
//forever start -c "node --harmony" main.js
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var session = require('express-session');


var auth = require('http-auth');



app.use(session({
    secret: 'blabla',
    // resave: true,
    cookie: {
        maxAge: 24 * 60 * 60
    }
}));

var basic = auth.basic({
    realm: "Simon Area.",
    file: __dirname + "/something" // gevorg:gpass, Sarah:testpass ...
});




var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
 app.use(allowCrossDomain);


//app.use(auth.connect(basic));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var port = process.env.PORT || 5656; // set our port
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {

    /*    var hour = 10
        req.session.cookie.expires = new Date(Date.now() + hour)
        req.session.cookie.maxAge = hour*/
    res.json({
        message: 'hooray! welcome to our api!'
    });
});
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use(express.static("../client/"));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
router.route("/c").get(function(req, res) {
    console.log(req.body, req.session.cookie.expires)
    res.json({
        message: 'hooray! welcome to our api!'
    });
})


var dbquerys = require('./baseClasses/DbQuerys.js');
var apiManage = require('./baseClasses/apiManager.js');
apiManager = new apiManage()
var controller = require('./baseClasses/controller.js')
var db = new dbquerys()
console.log(db)


//clearDatabase
//insertPlan
//getCurrentPlanData ******
//getSensorData() x sensors *****
//getLogData(from, to) x sensor *****



//****************************get all sensors data************************************(for wigets)
router.route("/getLastActionsResult").post(function(req, res) {
    apiManager.getLastActionsResult(res)
    if (req.body.id !== undefined) {
        console.log(req.body)
    }
})

//****************************get Plan************************************(planTable)
router.route("/getPlan").post(function(req, res) {
    apiManager.getPlan(res);
    if (req.body.id !== undefined) {
        console.log(req.body)
        db.updateAction(req.body)
    }
})



//****************************get all log for charts************************************(planTable)
router.route("/getcharts24Data").post(function(req, res) {
    apiManager.getcharts24Data(res);
})

//****************************get all log Data************************************(planTable)
router.route("/getLogData").post(function(req, res) {
    //  req.body.data = (encoded.toString())
    db.getLogData()
        .then(function(sqlRes) {
            res.json(sqlRes)
        }).catch(function(e) {
            console.log(e)
        })
        //var data = new baseData((req.body));
    if (req.body.id !== undefined) {
        console.log(req.body)

    }
})




router.route("/runCron").post(function(req, res) {

    db.getPlan()

    .then(function(sqlRes) {
        controller.runMainCron()
    })

    .catch(function(e) {
        console.log(e)
    })


    if (req.body.id !== undefined) {
        console.log(req)

    }
})

var request = require('request')
var exec = require('child_process').exec;
