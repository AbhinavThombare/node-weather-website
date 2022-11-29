const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { default: chalk } = require('chalk');
require('chalk')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname,'../public'));

const app = express();

// this is used for css, js, img file in that we can stored.
// also we can create html file and we can see in server using
// localhost:3000/index.html or /about.html
// this is used without any api or route
const publicDir = path.join(__dirname, '../public')

//if we define different name from views of folder then 
//we have to write this
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Abhinav'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Abhinav'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Abhinav',
    age: 22,
    contact: 1234567890
  })
})
app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You must provide a address'
    })
  }
  else {
    geoCode(address, (error, { latitude, longitude, Location } = {}) => {   // ( = {} it used to we can set default value to that function )
      if (error) {
        return res.send({
          error: error
        })
      }
      // console.log(latitude+' '+longitude+ ' '+Location);
      else {
        forecast(latitude, longitude, (error, { temperature, feelsliketemp, weatherDescription }) => {
          if (error) {
            return res.send({
              error:error
            })
          }
          else {
            res.send({
              'Address':address,
              'Location': Location,
              'Temperature': temperature,
              'Feelslike_Temperature': feelsliketemp,
              'Weather_Descriptions':weatherDescription
            })
          }
        })
      }
    })
  }
})

app.get('/products', (req, res) => {
  if (!req.query.serach) {
    //because of return code crash is avoid.
    //because it cannot run below code because of return .
    return res.send({
      error: 'You must provide a serach term'
    })
  }
  else {
    console.log(req.query.serach);
    res.send({
      products: []
    })
  }

})

app.get('/help/*', (req, res) => {
  res.render('404Page', {
    title: '404',
    name: 'Abhinav',
    errorMessage: 'Help article not found'
  })
})

// this code always write at end of all api or routes
app.get('*', (req, res) => {
  res.render('404Page', {
    title: '404',
    name: 'Abhinav',
    errorMessage: 'Page Not Found'
  })
})

app.listen(3000, () => {
  console.log('Express Web server is running at 3000 port');
})