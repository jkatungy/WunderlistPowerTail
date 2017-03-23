var onoff = require('onoff'); //#A

var Gpio = onoff.Gpio,
  led = new Gpio(18, 'out'), //#B
  powerSwitch = new Gpio(17, 'out'),
  value = 0,
  interval;

// interval = setInterval(function () { //#C
//   var value = (led.readSync() + 1) % 2; //#D
//   led.write(value, function() { //#E
//     console.log("Changed LED state to: " + value);
//   });
// }, 2000);

// process.on('SIGINT', function () { //#F
//   clearInterval(interval);
//   led.writeSync(0); //#G
//   led.unexport();
//   console.log('Bye, bye!');
//   process.exit();
// });

var WunderlistSDK = require('wunderlist');
var wunderlistAPI = new WunderlistSDK({
  'accessToken': '15ca424b09548cffbe10fa7b1eb470d129620415f1875b0ed9f2b6f0e932',
  'clientID': '962961959642ef25cc92'
});

interval = setInterval(function () {
var listID = 292613974;
   wunderlistAPI.http.tasks.forList(listID)
     .done(function (listData, statusCode) {
         // ...
       console.log(listData.length);
       //interval = setInterval(function () {

       if (listData.length < 1){
        
          value = 1;
          led.write(value, function() {
              console.log("Changed LED state to: " + value);
                });                                                                    
          //https://gist.github.com/marsman12019/6b3087c886babe152291e1f37205f6ab
          powerSwitch.write(value == 1 ? 0 : 1, function() {
              console.log("powerTailSwitch is now on"); 
          })
        }
        else if (listData.length > 0){
          value = 0;
          led.write(value, function() {
              console.log("Changed LED state to: " + value);
                });                                                                    
          //https://gist.github.com/marsman12019/6b3087c886babe152291e1f37205f6ab
          powerSwitch.write(value == 1 ? 0 : 1, function() {
              console.log("powerTailSwitch is now off"); 
          })
        }
      //
     })
     .fail(function (resp, code) {
       // ...
     });
     console.log('straight run');
}, 5000);