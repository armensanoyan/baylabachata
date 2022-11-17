const fetch = require('node-fetch');
const CHAT_ID = '661530020'
const BOT = '5424318541:AAGUOvfXVFkbuUdjYNmuGTZ4K46dkhyXxvE'
const URL = 'https://api.telegram.org/bot'

const constructText = (data) => {
  if (data && !Object.keys(data).length) {
    return ''
  }
  return Object.keys(data).reduce((text, holName) => {
    text = text + `%0A
%0A
${holName}
%0A
    `
    data[holName].forEach(element => {
      if (element.class && element.time) {
        text = text + `
        %0A${element.time} - ${element.class}
        `
      }
    });
    return text
  }, 'Today ')

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
    console.log('url', url)
    return fetch(url)
  } else {
    return Promise.resolve()
  }
}

module.exports = {
  sendRequestToTelegramBot
}