const app = require("express")();
const bodyParser = require("body-parser");
const logger = require("morgan");
var firebase = require("firebase");
const { response } = require("express");

const firebaseConfig = {
  apiKey: "AIzaSyCgCBxz9u9Q-IKgBZk8mlJUw2icHa0aqU4",

  authDomain: "ussd-be4c3.firebaseapp.com",

  databaseURL: "https://ussd-be4c3-default-rtdb.firebaseio.com",

  projectId: "ussd-be4c3",

  storageBucket: "ussd-be4c3.appspot.com",

  messagingSenderId: "195880245900",

  appId: "1:195880245900:web:25477a933deae90d1339a9",

  measurementId: "G-9JEGRHY1GM",
};

var getdistrictname = "lonely chisalel";
//inintilizing the app
firebase.initializeApp(firebaseConfig);

//getting database
var db = firebase.database();
const ref = db.ref("weather/districts");


const port = process.env.PORT || 3030;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("*", (req, res) => {
  res.send("USSD deployed successfully");
});

app.post("*", (req, res) => {
  let { sessionId, serviceCode, phoneNumber, text, response } = req.body;

   //creating an array of data
   let dataarray=text.split('*');

   //array length
   let dataarraysize=dataarray.length
  //first
  if (text == "") {
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~First request for the FRT main menu~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    response = `CON Welcome to Farm Radio Trust
        1. Register
        2. Main Menu
        3. Help`;
  }
  //seconds
  else if (text == "1") {
    response = `CON Welcome to Mlimi Registration services. 
        
        1. Start Registration
        0. Main Menu
        `;
  } else if (text == "2") {
    response = `CON Mlimi Main Manu
		1. Advesories
		2. Weather reports
		3. Marketing
		4. Account
		5. help`;
  } else if (text == "2*2") {
    function getdistricts() {
      ref.on("value", (snapshot) => {
        let districts = [];
        var selector=0
        console.log(snapshot.val())
        snapshot.forEach(element => {
          var datadistrict =element.val().name;
          districts.push(datadistrict);
        });
    
        const indexDistricts = districts.map(
          (ds, index) => `${index + 1}. ${ds}`
        );
    
        const spliting=indexDistricts.toString().split(',')
        const joiingdistricts=spliting.join('\n')
    
        response = `CON choose district for weather \n ${joiingdistricts}`;
        
      });
    }
     getdistricts();
  } 
  
else if(dataarray[1]=='2' && dataarraysize==3){
response=`CON choose weather information category \n 
          1.actions
          2.expected
          3.weakily weather`
  }

   else if(dataarray[1]=='2' && dataarraysize==4 && dataarray[3]==1){
    function getactions(){
      var index=`/${--dataarray[2]}`;
      const actionsref=ref.child(index)
    
      
      actionsref.on("value",(snapshot)=>{
        var actionsarray=[]
        var selector=0
        var districtname=snapshot.val().name
        actions=snapshot.val().actions
    
        actions.forEach(element => {
          var allactions=++selector + '.' + element
          actionsarray.push(allactions)
          
        });
        
        //conerting an array to sting
        var arraytostring=actionsarray.toString()
        var splitactions=arraytostring.split(',')
        var spacedaction=splitactions.join('\n')
    
        response=`END actions for ${districtname} district \n ${spacedaction}`
      })
    }
    getactions() 
  
  }

  else if(dataarray[1]=='2' && dataarraysize==4 && dataarray[3]==2){
    function getexpected(){
      var index=`/${--dataarray[2]}`;
      const actionsref=ref.child(index)
    
      
      actionsref.on("value",(snapshot)=>{
        var expectedarray=[]
        var selector=0
        var districtname=snapshot.val().name
        expecteds=snapshot.val().expected
    
        expecteds.forEach(element => {
          var allexpecteds=++selector + '.' + element
          expectedarray.push(allexpecteds)
          
        });
        
        //conerting an array to sting
        var arraytostring=expectedarray.toString()
        var splitexpecteds=arraytostring.split(',')
        var spaceExpecteds=splitexpecteds.join('\n')
    
        response=`END expectetions for ${districtname} district \n ${spaceExpecteds}`
      })
    }
    getexpected() 
  }

  else if(dataarray[1]=='2' && dataarraysize==4 && dataarray[3]==3){
   
function weeklyweather(){
  var index = `/${--dataarray[2]}`;
  const actionsref=ref.child(index + '/weeklyTemps')

  
  actionsref.on("value",(snapshot)=>{
    var titlemaxmintemparray=[]
    var titlestatusarray=[]
    snapshot.forEach(element => {
      var titlemaxmintemp=element.val().title + ' : ' + element.val().max + ' ' + element.val().min
      var titlestatus=element.val().title + ' : ' + element.val().status

      //pushing data to specific arrays
      titlemaxmintemparray.push(titlemaxmintemp)
      titlestatusarray.push(titlestatus)
    });

    //changing an array to string
    var titlemaxmintempstring=titlemaxmintemparray.toString()
    var titlestatusstring=titlestatusarray.toString()

    //splinting data
    var titlemaxmintempsplit=titlemaxmintempstring.split(',')
    var titilestatussplit=titlestatusstring.split(',')

    //adding next spaces
    var titlesmaxmintemppace=titlemaxmintempsplit.join('\n')
    var titlestatusSpace=titilestatussplit.join('\n')


    response=`END weekly weather report for distict chosen \n DAYS  MAX  MIN \n${titlesmaxmintemppace}\n\nWeather status for specific days\n${titlestatusSpace}
    `
  })
}
weeklyweather()
}

  else if (text == "3") {
    response = `CON choose options below for help
		1.call center`;
  }
  //send the response back
  res.set("Content-Type: text/plain");
   res.send(response);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
