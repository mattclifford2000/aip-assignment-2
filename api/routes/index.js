var express = require('express');
const port = 4000;


//var router = express.Router();

const app = express();
module.exports = app;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//GET USERS
app.get('/api/users', (req, res) => {
  res.json({ count });
});


//DATABASE
mongoose.connect('mongodb+srv://lachlan:pass@test.wdram.mongodb.net/test?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }, () =>
  console.log("Connected to DB")
);

app.listen(port, () => {
  console.log(`API available at http://localhost:${port}/api`);
});