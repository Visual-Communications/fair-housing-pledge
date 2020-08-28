//CRON JOB====================
const cron = require('node-cron');
let shell = require('shelljs');

function init() {
    cron.schedule("* * * * * *", function() {
        console.log('running a task every interval');
        if (shell.exec("npm run pledge:results").code !== 0) {
          // if (shell.exec("dir").code !== 0) {
      
          console.log("something went wrong");
        }
      
      });
}
//====================

module.exports = init;