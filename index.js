const app = require("express")();
const bodyParser = require("body-parser");
const logger = require("morgan");
var firebase = require("firebase");

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
    function responses() {
      ref.on("value", (snapshot) => {
        let districts = [];
        snapshot.forEach((childSnapshot) => {
          datadistrict = ``;
          var datadistrict = `${childSnapshot.val().name}`;
          districts.push(datadistrict);
        });

        const indexDistricts = districts.map(
          (ds, index) => `${index + 1}. ${ds}\n`
        );

        const spliting=indexDistricts.toString().split(',')
        const joiingdistricts=spliting.join('\n')

        response = `CON choose district for weather \n ${joiingdistricts}`;
        
      });
    }
    responses();
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
  var tempindex='/1'
  const actionsref=ref.child(index + '/weeklyTemps' + tempindex)

  
  actionsref.on("value",(snapshot)=>{
    var selector=0
    
    var title=snapshot.val().title
      var maxtemp=snapshot.val().max
      var mintemp=snapshot.val().min
      var status=snapshot.val().status

    response=`END weekly weather report for ${title} \n 
    maximum temperature is : ${maxtemp} \n
    minimum temperature is : ${mintemp}
    weather status is : ${status}`
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
