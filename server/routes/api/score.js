const Score = require('../../models/score');

module.exports = (app) => {
	app.get('/api/score', (req, res, next) => {
		Score.find()
			.exec()
			.then((score) =>
				console.log('Random Score: ' + score);
			)
			.catch((err) => next(err));
	});
	
	app.post('/api/score', function (req, res, next) {
		const score = new Score({name: req.body.name, score: req.body.score});
		score.save()
			.then(newScore => {
				console.log('Score saved: ' + newScore);
				res.status(201).redirect('/');
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	});
};