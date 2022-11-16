const fetch = require('node-fetch');
const CHAT_ID = '1001832762595'
const BOT = '5424318541:AAGUOvfXVFkbuUdjYNmuGTZ4K46dkhyXxvE'
const URL = 'https://api.telegram.org/bot'

const constructText = (data) => {
  if (data && !Object.keys(data).length) {
    return ''
  }
  return Object.keys(data).reduce((text, holName) => {
    text = text + `

${holName}

    `
    data[holName].forEach(element => {
      if (element.class && element.time) {
        text = text + `
${element.time} - ${element.class}
        `
      }
    });
    return text
  }, 'Today \r')

}

const getUrl = (classesForToday) => {
  const text = constructText(classesForToday)
  if (text) {
    return `${URL}${BOT}/sendMessage?chat_id=-${CHAT_ID}&text=${text}`
  } else {
    return ''
  }
}

const sendRequestToTelegramBot = (classesForToday) => {
  const url= getUrl(classesForToday)
  if (url) {
    return fetch(url)
  } else {
    return Promise.resolve()
  }
}

module.exports = {
  sendRequestToTelegramBot
}