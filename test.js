const { expect } = require('chai')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const { Sequelize, Op, Model, DataTypes } = require('sequelize')
const auth = require('basic-auth')
const axios = require('axios')

// GLOBAL VARIABLES:
const localhost = 'http://localhost:5000'

/**
 * Function creates and returns an axios configuration object based on the params passed in
 * @param {string} username contains the users email address
 * @param {string} password contains the users password
 * @param {string} url contains the url axios will send the info to
 * @param {string} method contains the type of request (get, put, post, delete)
 * @param {object} data contains the data to be submitted to the database
 * Credit to srijan439 for the solution https://stackoverflow.com/questions/44072750/how-to-send-basic-auth-with-axios
 * Shoutout to Craig Maples for this!!!
 */
function createToken (username, password, url, method, data) {
  const token = `${username}:${password}`
  const encodedToken = Buffer.from(token).toString('base64')
  return { method: method, url: url, data: data, headers: { Authorization: 'Basic ' + encodedToken } }
}

/**********************************************************
 * TREEHOUSE REQUIREMENTS #4 - DEFINE THE MODELS
 * Tests to determine if models meet requirements
 * NOTE: Generally better to just check models themselves
/**********************************************************/

// USER MODEL:
describe('The User Model', function () {
  const { User } = require('./models')
  it('should have a first name attribute', async () => {
    const user = await User.findOne()
    const actual = user.firstName
    console.log('firstName: ' + actual)
    expect(actual).to.not.be.null
    // using null here, but not sure if there is something better to use? (could still be undefined and pass)
  })
  it('should have a last name attribute', async () => {
    const user = await User.findOne()
    const actual = user.lastName
    console.log('lastName: ' + actual)
    expect(actual).to.not.be.null
  })
  it('should have an email attribute', async () => {
    const user = await User.findOne()
    const actual = user.emailAddress
    console.log('emailAddress: ' + actual)
    expect(actual).to.not.be.null
  })
  it('should have a password attribute', async () => {
    const user = await User.findOne()
    const actual = user.password
    console.log('password: ' + actual)
    expect(actual).to.not.be.null
  })
})

// User - firstName:
describe('The User firstName', function () {
  const { User } = require('./models')
  it('should be a string', async () => {
    const user = await User.findOne()
    const firstName = user.firstName
    const actual = typeof (firstName)
    console.log('type of firstName: ' + actual)
    expect(actual).to.be.a.string
  })
})

// User - lastName:
describe('The User lastName', function () {
  const { User } = require('./models')
  it('should be a string', async () => {
    const user = await User.findOne()
    const lastName = user.lastName
    const actual = typeof (lastName)
    console.log('type of lastName: ' + actual)
    expect(actual).to.be.a.string
  })
})

// User - emailAddress:
describe('The User emailAddress', function () {
  const { User } = require('./models')
  it('should be a string', async () => {
    const user = await User.findOne()
    const emailAddress = user.emailAddress
    const actual = typeof (emailAddress)
    console.log('type of emailAddress: ' + actual)
    expect(actual).to.be.a.string
  })
})

// User - password:
describe('The User password', function () {
  const { User } = require('./models')
  it('should be a string', async () => {
    const user = await User.findOne()
    const password = user.password
    const actual = typeof (password)
    console.log('type of password: ' + actual)
    expect(actual).to.be.a.string
  })
})

// COURSE MODEL
describe('The Course Model', function () {
  const { Course } = require('./models')
  it('should have a title attribute', async () => {
    const course = await Course.findOne()
    const actual = course.title
    console.log('title: ' + actual)
    expect(actual).to.not.be.null
  })
  it('should have a description attribute', async () => {
    const course = await Course.findOne()
    const actual = course.description
    console.log('description: ' + actual)
    expect(actual).to.not.be.null
  })
  it('should have an estimatedTime attribute', async () => {
    const course = await Course.findOne()
    const actual = course.estimatedTime
    console.log('estimatedTime: ' + actual)
    expect(actual).to.not.be.null
  })
  it('should have a materialsNeeded attribute', async () => {
    const course = await Course.findOne()
    const actual = course.materialsNeeded
    console.log('materialsNeeded: ' + actual)
    expect(actual).to.not.be.null
  })
  it('should have a userId attribute', async () => {
    const course = await Course.findOne()
    const actual = course.userId
    console.log('userId: ' + actual)
    expect(actual).to.not.be.null
  })
})

// Course - title:
describe('The Course title', function () {
  const { Course } = require('./models')
  it('should be a string', async () => {
    const course = await Course.findOne()
    const title = course.title
    const actual = typeof (title)
    console.log('type of title: ' + actual)
    expect(actual).to.be.a.string
  })
})

// // Course - description [SKIPPED]:
// describe('The Course description', function () {
//   const { Course } = require('./models')
//   it('should be TEXT', async function () {
//     const course = await Course.findOne()
//     const description = course.description
//     const actual = description
//     console.log('type of description: ' + actual)
//     expect(actual).to.match(/TEXT/)
//   })
// })

// Course - estimatedTime:
describe('The Course estimatedTime', function () {
  const { Course } = require('./models')
  it('should be a string', async () => {
    const course = await Course.findOne()
    const estimatedTime = course.estimatedTime
    const actual = typeof (estimatedTime)
    console.log('type of estimatedTime: ' + actual)
    expect(actual).to.be.a.string
  })
})

// Course - materialsNeeded:
describe('The Course materialsNeeded', function () {
  const { Course } = require('./models')
  it('should be a string', async () => {
    const course = await Course.findOne()
    const materialsNeeded = course.materialsNeeded
    const actual = typeof (materialsNeeded)
    console.log('type of materialsNeeded: ' + actual)
    expect(actual).to.be.a.string
  })
})

// Course - userId:
// NOTE: This also validates Treehouse requirement #5, as the userId
// is a model association
describe('The Course userId', function () {
  const { Course } = require('./models')
  it('should be a number', async () => {
    const course = await Course.findOne()
    const userId = course.userId
    const actual = typeof (userId)
    console.log('type of userId: ' + actual)
    expect(actual).to.match(/number/)
  })
})

/**********************************************************
 * TREEHOUSE REQUIREMENTS #6 & #7 - ROUTES (IN PROGRESS)
 * Tests to determine if routes meet requirementS
/**********************************************************/
describe('The User GET route', function () {
  it('should return the currently authenticated user', async () => {
    const { User } = require('./models')
    const testUser = await User.findOne()
    const testEmail = testUser.emailAddress
    const testFirstName = testUser.firstName
    const testLastName = testUser.lastName
    const testPassword = 'joepassword'
    const url = localhost + '/api/users'
    const method = 'get'

    const axiosConfig = createToken(testEmail, testPassword, url, method)
    const response = await axios(axiosConfig)
    console.log(response)
    const actual = response.data.emailAddress
    expect(actual).to.equal(testEmail)
  })
  // it('should return a 200 HTTP status code', async function () {
  //   const course = await User.findOne()
  //   const userId = course.userId
  //   const actual = typeof (userId)
  //   console.log('type of userId: ' + actual)
  //   expect(actual).to.match(/number/)
  // })
})
