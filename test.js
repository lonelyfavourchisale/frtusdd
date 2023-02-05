var emptyarray=[]
var names=['lonely','martha','praise','annie']
function namess(){
names.forEach(element => {
    emptyarray.push(element)
   
});
}
namess()
console.log(emptyarray)

snapshot.forEach((childSnapshot) => {
    datadistrict = ``;
    var datadistrict = `${childSnapshot.val().name}`;
    districts.push(datadistrict);
  });

  const indexDistricts = districts.map(
    (ds, index) => `${index + 1}. ${ds}`
  );

  var array=indexDistricts.toString().split(',')
  console.log(array.join('\n'))

  response = `CON choose district for weather \n ${indexDistricts.toString()}`;
});
}