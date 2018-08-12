// https://qiita.com/n0bisuke/items/75b238ec88c96aa0dee8
// https://dev.classmethod.jp/server-side/cron/
// https://ambidata.io/refs/node-js/

'use strict'

var cronJob = require('cron').CronJob;
var cronTime = process.env.COUNTER_CRON;

var ambient = require('ambient-lib');
ambient.connect(process.env.AMBIENT_CHANNEL_ID, process.env.AMBIENT_WRITE_KEY, process.env.AMBIENT_READ_KEY, process.env.AMBIENT_USER_KEY);

const Nightmare = require('nightmare');
const vo = require('vo');
const URL = 'https://devlove.doorkeeper.jp/';
const MY_SELECTOR = '.community-members-count';

function getInfo(nightmare){
  return nightmare
    .goto(URL)
    .wait(MY_SELECTOR)
    .evaluate((selector) => {
      return document.querySelector(selector).innerText.replace('人', '');
    }, MY_SELECTOR);
}

var job = new cronJob({
    cronTime: cronTime
    , onTick: function() {
        //メインのフロー
        vo(function* () {
            let nightmare = Nightmare({ show: true });
            let contribution = yield getInfo(nightmare);
            yield nightmare.end();
            return contribution;
            })((err, result) => {
            if (err) return console.log(err);
            console.log(result);
                ambient.send({d1: result}, function(err, res, body) {
                        if (err) {
                            console.log(err);
                        }
                        console.log(res.statusCode);
                });
            });
        //console.log('onTick!');
    }
    , start: false
    , timeZone: "Asia/Tokyo"
})
job.start();