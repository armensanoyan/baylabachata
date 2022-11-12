const CronJob = require('cron').CronJob
const {downloadCsvFile} = require('./google_api')
const {convertCsvToJSON, getClassesForToday} = require('./utils')
const {sendRequestToTelegramBot} = require('./requests.js')

new CronJob(
  '0 * * * * *',
  () => {
    downloadCsvFile()
      .then(convertCsvToJSON)
      .then(getClassesForToday)
      .then(sendRequestToTelegramBot)
      .catch(console.error)
  },
  null,
  true,
  'America/Los_Angeles'
)