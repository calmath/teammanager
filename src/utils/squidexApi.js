// import squidexModels from 'utils/squidexModels'

// const bcrypt = require('bcrypt')
// const crypto = require('crypto')
var config = require('../../settings.json')
// const saltRounds = 10

const squidexApi = {
  url: 'https://cloud.squidex.io',
  appName: config.appName,
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  authToken: {}
}

squidexApi.getAccessToken = () => new Promise((resolve, reject) => {
  var url = squidexApi.url + '/identity-server/connect/token'
  var data = 'grant_type=client_credentials&client_id=' + squidexApi.clientId + '&client_secret=' + squidexApi.clientSecret + '&scope=squidex-api'
  setTimeout(() => {
    try {
      var request = new XMLHttpRequest()
      request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
            resolve(JSON.parse(request.response))
          }
        }
      }
      request.open('POST', url)
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      request.send(data)
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

/*
const makeXMLHTTPRequest = ({url, method, ...args}) => new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      var request = new XMLHttpRequest()
      request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200 || request.status === 201) {
            resolve(request.response)
          } else {
            reject(new Error(request.response))
          }
        }
      }
      request.open(method, url)
      request.setRequestHeader('Content-Type', 'application/json')
      request.setRequestHeader('Accept', 'application/json')
      request.setRequestHeader('Authorization', 'Bearer ' + squidexApi.authToken.access_token)
      if (args.data) {
        request.send(args.data)
      } else {
        request.send()
      }
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})
*/

export default squidexApi
