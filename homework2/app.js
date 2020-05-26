const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');

const app = express();

const User = require('./models/User')

app.engine('hbs', expressHbs({
    layoutsDir: 'views/layouts/', //с использованием шаблонов путь
    defaultLayout: 'main-layout',// название шаблона
    extname: 'hbs'// расширение файлов
}));

app.set('view engine', 'hbs');
app.set('views', 'views');// путь к папке где лежат hbs

app.use(express.json());
app.use(express. urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/users', (req, res) => {
//   const users = User.fetchAll();
//   res.render('users', {users})
// });

app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/login', (req, res, next) => {
  const {email, password} = req.body;
  const user = User.findUser(email,password);
  if (user) {
      // res.redirect('users')
      next();
  } else {
      res.render('login', {message: 'wrong data'})
  }},
  (req, res) => {
        const users = User.fetchAll();
        res.render('users', {users})
 });

// register
app.get('/register', (req, res) => {
    res.render('register')
});

app.post('/register', (req, res) => {
    // console.log(req.body);
    const {email, password} = req.body;
    const user = new User(email, password);
    const answer = user.save();
    if (answer) {
        res.redirect('login')
    } else {
        res.render('register', {message: 'error is register'})
    }
});

// app.get('/video', function(req, res) {
//     const videoPath = `https://www.youtube.com/watch?v=atz_aZA3rf0`;
//     const stat = fs.statSync(videoPath)
//     const fileSize = stat.size
//     const range = req.headers.range
//     if (range) {
//         const parts = range.replace(/bytes=/, "").split("-")
//         const start = parseInt(parts[0], 10)
//         const end = parts[1]
//             ? parseInt(parts[1], 10)
//             : fileSize-1
//         const chunksize = (end-start)+1
//         const file = fs.createReadStream(videoPath, {start, end})
//         const head = {
//             'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//             'Accept-Ranges': 'bytes',
//             'Content-Length': chunksize,
//             'Content-Type': 'video/mp4',
//         }
//         res.writeHead(206, head);
//         file.pipe(res);
//     } else {
//         const head = {
//             'Content-Length': fileSize,
//             'Content-Type': 'video/mp4',
//         }
//         res.writeHead(200, head)
//         fs.createReadStream(videoPath).pipe(res)
//     }
// });


app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(3000, () => console.log('server was started on port 3000'))
