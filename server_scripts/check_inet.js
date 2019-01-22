const dns = require('dns')
var os = require('os')

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
	console.log(k)
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

console.log(addresses);


function checkInternet(cb) {
  dns.lookup('gwilken.com',function(err) {
      if (err && err.code == "ENOTFOUND") {
          cb(false);
      } else {
          cb(true);
      }
  })
}

// example usage:
checkInternet(function(isConnected) {
  if (isConnected) {
    console.log('ok')
    // connected to the internet
  } else {
    // not connected to the internet
    console.log('poop')
  }
});