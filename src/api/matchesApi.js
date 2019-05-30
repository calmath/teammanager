import squidexApi from './squidexApi'

const matchesApi = {
  authToken: {}
}

function Match (squidexMatch) {
  if (squidexMatch == null) {
    this.id = null
    this.date = new Date()
    this.player = null
    this.result = null
    this.isprimary = null
    this.subs = null
  } else {
    this.id = squidexMatch.id
    this.date = squidexMatch.data.date.iv
    this.player = squidexMatch.data.player.iv
    this.result = squidexMatch.data.result.iv
    this.isprimary = squidexMatch.data.isprimary.iv
    this.subs = squidexMatch.data.subs.iv
  }

  var currentDate = new Date(this.date)
  var day = currentDate.getDate()
  var month = currentDate.getMonth() + 1
  var year = currentDate.getFullYear()
  this.displayDate = day + '/0' + month + '/' + year
  this.playerName = ''
}

const transformMatches = function (squidexMatches) {
  var matches = []
  for (var i = 0, len = squidexMatches.length; i < len; i++) {
    matches.push(new Match(squidexMatches[i]))
  }
  return matches
}

const toMatchDataObject = function (match) {
  var matchDTO = '{ ' +
    'date: { iv: \'' + match.date + '\' }, ' +
    'player: { iv: ["' + match.player + '"] }, ' +
    'result: { iv: ' + match.result + ' }, ' +
    'isprimary: { iv: ' + match.isprimary + ' }, ' +
    'subs: { iv: ' + match.subs + ' } ' +
    '}'
  return matchDTO
}

matchesApi.new = function () {
  return new Match()
}

matchesApi.getTodays = () => new Promise((resolve, reject) => {
  var currentDate = new Date()
  var date = currentDate.getFullYear() + '-0' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate() + 'T00:00:00Z'

  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/matches?$filter=data/date/iv eq ' + date + ''
  setTimeout(() => {
    try {
      squidexApi.makeXMLHTTPRequest({url: url, method: 'GET', authToken: matchesApi.authToken}).then((value) => {
        var matches = JSON.parse(value)
        resolve({ total: matches.total, matches: transformMatches(matches.items) })
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

matchesApi.list = () => new Promise((resolve, reject) => {
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/matches'
  setTimeout(() => {
    try {
      squidexApi.makeXMLHTTPRequest({url: url, method: 'GET', authToken: matchesApi.authToken}).then((value) => {
        var matches = JSON.parse(value)
        resolve({ total: matches.total, matches: transformMatches(matches.items) })
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

matchesApi.get = (match) => new Promise((resolve, reject) => {
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/matches/' + match.id
  setTimeout(() => {
    try {
      squidexApi.makeXMLHTTPRequest({url: url, method: 'GET', authToken: matchesApi.authToken}).then((value) => {
        var match = JSON.parse(value)
        if (match) {
          resolve(new Match(match))
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

matchesApi.create = (match) => new Promise((resolve, reject) => {
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/matches?publish=true'
  setTimeout(() => {
    try {
      squidexApi.makeXMLHTTPRequest({url: url, method: 'POST', authToken: matchesApi.authToken, data: toMatchDataObject(match)}).then((value) => {
        resolve(new Match(value))
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

matchesApi.update = (match) => new Promise((resolve, reject) => {
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/matches/' + match.id
  setTimeout(() => {
    try {
      squidexApi.makeXMLHTTPRequest({url: url, method: 'PATCH', authToken: matchesApi.authToken, data: toMatchDataObject(match)}).then((value) => {
        resolve(match)
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

export default matchesApi
