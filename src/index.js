const r = require('array-gpio');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.prettyPrint(),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  ],
});

let sw = r.in(5);

logger.info('Initial state: ' + sw.state)

// Pressing the switch sw button, the led will turn on
// Releasing the switch sw button, the led will turn off
sw.watch((state) => {
  // if(state){
  //   led.on();
  // }
  // else{
  //   led.off();
  // }
	
	if (state === false) {
    logger.info('Button was pressed: about to shutdown')
		require('child_process').exec('sudo systemctl poweroff', console.log)
	}
	
});