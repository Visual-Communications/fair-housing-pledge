//CRON JOB====================
const cron = require('node-cron');
// let shell = require('shelljs');
const pledgeResults = require('./pledge-results')

function init() {
    cron.schedule("28 * * * *", function() {
        console.log('running a task every interval');
        // if (pledgeResults.exec("npm run pledge:results").code !== 0) {
          // if (shell.exec("dir").code !== 0) {
      
        //   console.log("something went wrong");
        // }
      pledgeResults( () => {
          console.log('pass function in pledgeResults')
      });
      });
}
//====================

module.exports = init;
