import squidexApi from './squidexApi'

const playersApi = {
  authToken: {}
}

function Player (squidexPlayers) {
  if (squidexPlayers == null) {
    this.id = null
    this.firstname = ''
    this.lastname = ''
  } else {
    this.id = squidexPlayers.id
    this.firstname = squidexPlayers.data.firstname.iv
    this.lastname = squidexPlayers.data.lastname.iv
  }

  this.fullName = this.firstname + ' ' + this.lastname
}

const transformPlayers = function (squidexPlayers) {
  var players = []
  for (var i = 0, len = squidexPlayers.length; i < len; i++) {
    players.push(new Player(squidexPlayers[i]))
  }
  return players
}

const toPlayerDateObject = function (player) {
  var playerDTO = '{ ' +
    'firstname: { iv: \'' + player.firstname + '\' }, ' +
    'lastname: { iv: \'' + player.lastname + '\' }, ' +
    '}'
  return playerDTO
}

playersApi.list = () => new Promise((resolve, reject) => {
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/players'
  setTimeout(() => {
    try {
      squidexApi.makeXMLHTTPRequest({url: url, method: 'GET', authToken: playersApi.authToken}).then((value) => {
        var players = JSON.parse(value)
        resolve({ total: players.total, players: transformPlayers(players.items) })
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

playersApi.get = (player) => new Promise((resolve, reject) => {
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/players/' + player.id
  setTimeout(() => {
    try {
      squidexApi.makeXMLHTTPRequest({url: url, method: 'GET', authToken: playersApi.authToken}).then((value) => {
        var player = JSON.parse(value)
        if (player) {
          // resolve({ id: player.id, firstname: player.data.firstname.iv, lastname: player.data.lastname.iv })
          resolve(new Player(player))
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
      squidexApi.makeXMLHTTPRequest({url: url, method: 'POST', authToken: playersApi.authToken, data: toPlayerDateObject(player)}).then((value) => {
        resolve(new Player(value))
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
      squidexApi.makeXMLHTTPRequest({url: url, method: 'PATCH', authToken: playersApi.authToken, data: toPlayerDateObject(player)}).then((value) => {
        resolve(player)
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

export default playersApi
