var keys = ['a', 'b', 'c'];
var vals = [];
for(i=0; i<3; i++) {
    client.get(keys[i], function(err, reply) {
        console.log(reply);
        vals.push(reply);
    });
}
console.log(vals);

