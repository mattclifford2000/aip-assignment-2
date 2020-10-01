module.exports = (app, partials) => {
    app.post('/register', (req, res, next) => {
        console.log(req.header('Content-Type'))
        console.log(req.body.email); // <====
        console.log(req.body.password); // <====
        console.log(req.body.name);    // <====
        console.log(req.body.dateofbirth); // <====
    });
}