const r = require('array-gpio');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`+(info.splat!==undefined?`${info.splat}`:" "))
),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log', timestamp :true, }),
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  ],
});

let sw = r.in(5);

logger.info('Initial state: ' + sw.state)
sw.watch((state) => {
  if (state === false) {
    logger.info('Button was pressed: about to shutdown')
		require('child_process').exec('sudo systemctl poweroff', console.log)
	}
});