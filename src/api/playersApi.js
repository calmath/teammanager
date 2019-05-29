var squidexApi = require('./squidexApi')

const playersApi = {
  authToken: {}
}

playersApi.get = (player) => new Promise((resolve, reject) => {
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/players/' + player.id
  setTimeout(() => {
    try {
      squidexApi.makeXMLHTTPRequest({url: url, method: 'GET', authToken: playersApi.authToken}).then((value) => {
        var player = JSON.parse(value)
        if (player) {
          resolve({ id: player.id, firstname: player.data.firstname.iv, lastname: player.data.lastname.iv })
        } else {
          reject(new Error('User details incorrect'))
        }
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

playersApi.create = (player) => new Promise((resolve, reject) => {
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/players?publish=true'
  setTimeout(() => {
    try {
      squidexApi.makeXMLHTTPRequest({url: url, method: 'POST', authToken: playersApi.authToken, data: '{ firstname: { iv: \'' + player.firstname + '\' }, lastname: { iv: \'' + player.lastname + '\' }}'}).then((value) => {
        alert(value)
        resolve({ id: value.id, username: value.data.username.iv, name: value.data.name.iv })
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

playersApi.update = (player) => new Promise((resolve, reject) => {
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/players/' + player.id
  setTimeout(() => {
    try {
      squidexApi.makeXMLHTTPRequest({url: url, method: 'PATCH', authToken: playersApi.authToken, data: '{ firstname: { iv: \'' + player.firstname + '\' }, lastname: { iv: \'' + player.lastname + '\' }}'}).then((value) => {
        value = JSON.parse(value)
        resolve({ id: player.id, firstname: value.firstname.iv, lastname: value.lastname.iv })
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

export default playersApi
