const Score = require('../../models/score');

module.exports = (app) => {
	app.get('/api/score', (req, res, next) => {
		Score.find()
			.exec()
			.then((city) => console.log(city))
			.catch((err) => next(err));
	});
	
	app.post('/api/score', function (req, res, next) {
		const score = new Score({name: req.body.name, score: 0})
		score.save()
			.then(newScore => {
				console.log(newScore);
			})
			.catch(err => {
				console.log(err);
			});
	});

};