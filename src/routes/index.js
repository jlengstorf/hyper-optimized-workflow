module.exports = function (app) {
    app.get('/', function (req, res, next) {
        res.render('index', { title: 'Meet the Monsters' });
    });

    app.get('/monster/:name', function (req, res, next) {
        var name = req.params.name,
            monster_name = name.charAt(0).toUpperCase() + name.slice(1);
        res.render('index', { title: 'Meet ' + monster_name });
    });
};
