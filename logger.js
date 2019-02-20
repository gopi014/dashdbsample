const log4js = require('log4js');
// log4js.configure({
// //  appenders: { cognipay: { type: 'file', filename: __dirname+'/logs/coginpay.log',maxLogSize: 5000000 } },
// //  categories: { default: { appenders: ['cognipay'], level: 'info' },
// //                error:     {appenders: ['cognipay'], level: 'error'}}
// });
function logger(){
  return log4js.getLogger('cognipay');
}
exports.logger = logger;
