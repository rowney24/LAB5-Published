/* var httpServer = require('./servers/http'),
  resources = require('./resources/model');

// Internal Plugins
var ledsPlugin = require('./plugins/ledsPlugin'), //#A
  pirPlugin = require('./plugins/pirPlugin'), //#A
  

// Internal Plugins for sensors/actuators connected to the PI GPIOs
// If you test this with real sensors do not forget to set simulate to 'false'
pirPlugin.start({'simulate': true, 'frequency': 2000}); //#B
ledsPlugin.start({'simulate': true, 'frequency': 10000}); //#B

// HTTP Server
var server = httpServer.listen(resources.pi.port, function () {
  console.log('HTTP server started...');

  console.info('Your WoT Pi is up and running on port %s', resources.pi.port);
});
*/

var resources = require('./resources/model');
var interval, sensor;
var model = resources.pi.sensors.pir;
var pluginName = resources.pi.sensors.pir.name;
var localParams = {'simulate': false, 'frequency': 2000};
exports.start = function (params) {
  localParams = params;
  if (localParams.simulate) {
    simulate();
  } else {
    connectHardware();
  }
};
exports.stop = function () {
  if (localParams.simulate) {
    clearInterval(interval);
  } else {
    sensor.unexport();
  }
  console.info('%s plugin stopped!', pluginName);
};

function connectHardware() {
  var Gpio = require('onoff').Gpio;
  sensor = new Gpio(model.gpio, 'in', 'both');
  sensor.watch(function (err, value) {
    if (err) exit(err);
    model.value = !!value;
    showValue();
});
console.info('Hardware %s sensor started!', pluginName);
};

function simulate() {
  interval = setInterval(function () {
    model.value = !model.value;
  showValue();
}, localParams.frequency);
console.info('Simulated %s sensor started!', pluginName);
};


function showValue() {
  console.info(model.value ? 'there is someone!' : 'not anymore!');
};
