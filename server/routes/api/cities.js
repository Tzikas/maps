const City = require('../../models/City');

module.exports = (app) => {
	console.log(app)
	
  app.get('/api/cities', (req, res, next) => {
	  console.log(req)
	  console.log(res)
	  
    City.find()
      .exec()
      .then((cities) => {
      	let citiesArr = [];
      	for(let i = 0; i < 2; i++) { 
      		const random = Math.floor(Math.random() * cities.length);
      		citiesArr.push(cities[random]);
      		// console.log(cities[random]);
      	}
      	res.json(citiesArr);
      })
      .catch((err) => next(err));
  });

  app.get('/api/randomcity', (req, res, next) => {
  	City.count()
  		.exec()
  		.then((count) => {
  			const random = Math.floor(Math.random() * count);
  			City.findOne().skip(random)
  				.exec()
  				.then(result => {
  					res.json(result);
  				})
  				.catch((err) => next(err));
  		})
  		.catch((err) => next(err));
  });

  // app.post('/api/counters', function (req, res, next) {
  //   const counter = new Counter();

  //   counter.save()
  //     .then(() => res.json(counter))
  //     .catch((err) => next(err));
  // });

  // app.delete('/api/counters/:id', function (req, res, next) {
  //   Counter.findOneAndRemove({ _id: req.params.id })
  //     .exec()
  //     .then((counter) => res.json())
  //     .catch((err) => next(err));
  // });

  // app.put('/api/counters/:id/increment', (req, res, next) => {
  //   Counter.findById(req.params.id)
  //     .exec()
  //     .then((counter) => {
  //       counter.count++;

  //       counter.save()
  //         .then(() => res.json(counter))
  //         .catch((err) => next(err));
  //     })
  //     .catch((err) => next(err));
  // });

  // app.put('/api/counters/:id/decrement', (req, res, next) => {
  //   Counter.findById(req.params.id)
  //     .exec()
  //     .then((counter) => {
  //       counter.count--;

  //       counter.save()
  //         .then(() => res.json(counter))
  //         .catch((err) => next(err));
  //     })
  //     .catch((err) => next(err));
  // });
};
