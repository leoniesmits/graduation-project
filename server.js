// Third party modules
const express = require('express')
// const request = require('request')
const bodyParser = require('body-parser')
// const fs = require('fs')
// const dataJson = require('./app/data/ingredients.json')

// Create new express app in const app
const app = express()

// Add a config object and define port
const config = {
    port: 7777
}

// async function dataParse() {
//     // let data = fs.readFile('./app/data/ingredients.json', (err, data) => {  
//     //     if (err) throw err;
//     //     return JSON.parse(data);
//     // });



// };

// for parsing application/xwww-
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'))

// const router = require('./router/router.js')

// Link templating engine to my express app
app.set('view engine', 'ejs');

// Create a route for home
app.get('/', function (req, res) {
    res.render('home');
})

app.get('/variables', function (req, res) {
    res.render('variables')
})

app.get('/article', function (req, res) {
    res.render('article')
})

// .post is communicating with the post method on the form
// by clicking submit, this funtion is triggered
// the state variable stores the value of the chosen radiobutton
// this variable is also put in the cookies as a stringified JSON type
// lastly, the second page of the quiz is rendered with the state as parameter

app.post('/variables/mapping', function (req, res) {
    const state = {
        variables: req.body.variables
    };

    // res.cookie('filled_in_values', JSON.stringify(state), {
    //     maxAge: 900000,
    //     httpOnly: true
    // })
    res.render('variables/mapping', state)
})

// if the second quiz page is loaded without being redirected from the submit button
// app.get is triggered and the values of state variable aren't stored 
// the app can fall back on the cookies and store them as the values in variable state
// this way, the app can still continue by using the last filled in values of the previous form(s)
// the page is once again rendered with variable state as parameter
// if the cookies aren't available either, the user is redirected to the first form of the quiz

app.get('/quiz/2', function (req, res) {
    res.redirect('/quiz')
})

// repeat for all following quiz pages
// the state variable gets another value; the one filled in on the previous page

// app.post('/quiz/3', function (req, res) {
//     console.log(res.body)
//     const state = {
//         routine: req.body.routine,
//         skin_type: req.body.skin_type
//     }
//     res.cookie('filled_in_values', JSON.stringify(state), {
//         maxAge: 900000,
//         httpOnly: true
//     })
//     res.render('quiz/3', state)
// })

// app.get('/quiz/3', function (req, res) {
//     res.redirect('/quiz')
// })

// app.post('/quiz/4', function (req, res) {
//     console.log(res.body)
//     const state = {
//         skin_type: req.body.skin_type,
//         routine: req.body.routine,
//         skin_concern: req.body.skin_concern
//     }
//     console.log(state)
//     res.render('quiz/4', state)
// })

// app.get('/quiz/4', function (req, res) {
//     res.redirect('/quiz')
// })


// app.post('/quiz/result', async function (req, res) {
//     await fs.readFile('./app/data/ingredients.json', (err, data) => {
//         if (err) throw err;
//         const state = {
//             skin_type: req.body.skin_type,
//             routine: req.body.routine,
//             skin_concern: req.body.skin_concern.split(','),
//             shave: req.body.shave,
//             makeup: req.body.makeup,
//             data: JSON.parse(data)
//         }
//         console.log(state)
//         res.render('quiz/result', state)
//     });
// })

// app.get('/quiz/results', async function (req, res) {
//     res.redirect('/quiz')
// });

// app.get('/quiz/results', async function (req, res) {
//     await fs.readFile('./app/data/ingredients.json', (err, data) => {  
//         if (req.cookies && req.cookies.filled_in_values) {
//             const cookieValue = JSON.parse(req.cookies.filled_in_values)
//             console.log(cookieValue)
//             const state = {
//                 routine: cookieValue.routine,
//                 skin_type: cookieValue.skin_type,
//                 skin_concern: cookieValue.skin_concern
//             }

//             res.render('quiz/2', state)
//         } else {
//             res.redirect('/quiz/1')
//         }
//     })
// })


app.listen(config.port, () => console.log(`${config.port} is the magic port!`))