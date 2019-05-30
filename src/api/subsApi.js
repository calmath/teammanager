import squidexApi from './squidexApi'

const subsApi = {
  authToken: {}
}

function Sub (squidexSub) {
  if (squidexSub == null) {
    this.id = null
    this.effectivedate = new Date()
    this.amount = 0
    this.active = true
  } else {
    this.id = squidexSub.id
    this.effectivedate = squidexSub.data.effectivedate.iv
    this.amount = squidexSub.data.amount.iv
    this.active = squidexSub.data.active.iv
  }

  var currentDate = new Date(this.effectivedate)
  var day = currentDate.getDate()
  var month = currentDate.getMonth() + 1
  var year = currentDate.getFullYear()
  this.displayDate = day + '/0' + month + '/' + year
}

const transformSubs = function (squidexSubs) {
  var subs = []
  for (var i = 0, len = squidexSubs.length; i < len; i++) {
    subs.push(new Sub(squidexSubs[i]))
  }
  return subs
}

const toSubDataObject = function (sub) {
  var subDTO = '{ ' +
    'effectivedate: { iv: \'' + sub.effectivedate + '\' }, ' +
    'amount: { iv: ' + sub.amount + ' }, ' +
    'active: { iv: ' + sub.active + ' } ' +
    '}'
  return subDTO
}

subsApi.new = function () {
  return new Sub()
}

subsApi.list = () => new Promise((resolve, reject) => {
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/subs'
  setTimeout(() => {
    try {
      squidexApi.makeXMLHTTPRequest({url: url, method: 'GET', authToken: subsApi.authToken}).then((value) => {
        var subs = JSON.parse(value)
        resolve({ total: subs.total, subs: transformSubs(subs.items) })
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

subsApi.get = (sub) => new Promise((resolve, reject) => {
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/subs/' + sub.id
  setTimeout(() => {
    try {
      squidexApi.makeXMLHTTPRequest({url: url, method: 'GET', authToken: subsApi.authToken}).then((value) => {
        var sub = JSON.parse(value)
        if (sub) {
          resolve(new Sub(sub))
        } else {
          reject(new Error('Sub details incorrect'))
        }
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

subsApi.getActive = (sub) => new Promise((resolve, reject) => {
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/subs?$filter=data/active/iv eq true'
  setTimeout(() => {
    try {
      squidexApi.makeXMLHTTPRequest({url: url, method: 'GET', authToken: subsApi.authToken}).then((value) => {
        var subs = JSON.parse(value)
        if (subs.total === 1) {
          resolve(new Sub(sub[0]))
        } else {
          reject(new Error('Sub details incorrect'))
        }
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

subsApi.create = (sub) => new Promise((resolve, reject) => {
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/subs?publish=true'
  setTimeout(() => {
    try {
      squidexApi.makeXMLHTTPRequest({url: url, method: 'POST', authToken: subsApi.authToken, data: toSubDataObject(sub)}).then((value) => {
        var sub = JSON.parse(value)
        resolve(new Sub(sub))
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

subsApi.update = (sub) => new Promise((resolve, reject) => {
  var url = squidexApi.url + '/api/content/' + squidexApi.appName + '/subs/' + sub.id
  setTimeout(() => {
    try {
      squidexApi.makeXMLHTTPRequest({url: url, method: 'PATCH', authToken: subsApi.authToken, data: toSubDataObject(sub)}).then((value) => {
        resolve(sub)
      }, (reason) => {
        reject(new Error(reason))
      })
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

export default subsApi
