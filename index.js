var firebase = require("firebase")

const firebaseConfig = {

    apiKey: "AIzaSyCgCBxz9u9Q-IKgBZk8mlJUw2icHa0aqU4",
  
    authDomain: "ussd-be4c3.firebaseapp.com",
  
    databaseURL: "https://ussd-be4c3-default-rtdb.firebaseio.com",
  
    projectId: "ussd-be4c3",
  
    storageBucket: "ussd-be4c3.appspot.com",
  
    messagingSenderId: "195880245900",
  
    appId: "1:195880245900:web:25477a933deae90d1339a9",
  
    measurementId: "G-9JEGRHY1GM"
  
  };
  

  //inintilizing the app 
  firebase.initializeApp(firebaseConfig)

  //getting database
  var db=firebase.database();

  const ref = db.ref("weather")
  
/*
  ref.set({
    likoma:{
    districtname:'likoma',
    actions: 'hie there its lonely',
    expection:'hie jjgdlndnfi',
    weatherdata:{
      max: '27',
       min: '21',
       status: 'Cloudy with thunderstorms',
       title: 'Tue'
 }
    },
    mzimba:{
      districtname:'mzimba',
      actions: 'hie there its lonely',
      expection:'hie jjgdlndnfi',
      weatherdata:{
           max: '27',
            min: '21',
            status: 'Cloudy with thunderstorms',
            title: 'Tue'
      }
      },
      lilongwe:{
        districtname:'lilongwe',
        actions: 'hie there its lonely',
        expection:'hie jjgdlndnfi',
        weatherdata:{
          max: '27',
           min: '21',
           status: 'Cloudy with thunderstorms',
           title: 'Tue'
     }
        },
        tchitsi:{
          districtname:'tchisi',
          actions: 'hie there its lonely',
          expection:'hie jjgdlndnfi',
          weatherdata:{
            max: '27',
             min: '21',
             status: 'Cloudy with thunderstorms',
             title: 'Tue'
       }
          }
    

  })
*/
  //getting all districts from the database from the databse
  
  ref.on('value',function(snapshot){
    var dataweather =snapshot.val()
    var keys = Object.keys(dataweather)

    //looping throug an array of districts
    for (let i = 0; i < keys.length; i++) {
      const element = keys[i];
      const responsedata = keys.indexOf(element) + ". " + element
      //displaying all available districts
      console.log(responsedata)

    }


    //getting data of the specific district
    //displaying the district name
    var districtname = ref.child('likoma' + '/districtname')
    districtname.on("value",(snapshot)=>{
      console.log('weather data for ' +' ' + snapshot.val() + ' ' + 'district')
    })

    //actions
    var actions = ref.child('likoma' + '/actions')
    actions.on("value",(snapshot)=>{
      console.log('actions:' +'' + snapshot.val())
    })

    //expections
    var expectations= ref.child('likoma' + '/expections')
    actions.on("value",(snapshot)=>{
      console.log('expections:' +'' + snapshot.val())
    })

    //weather data
    var weatherdata = ref.child('likoma').child('weatherdata')
    weatherdata.on("value",(snapshot)=>{
      weatherdataarray =snapshot.val()
    })

  })
 
  

