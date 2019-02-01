const Car = require('../models/Car');
const Rent = require('../models/Rent');

module.exports = {
    addCarGet: (req, res) => {
        res.render('car/add');
    },
    addCarPost: (req, res) => {
        let carBody = req.body;

        if (!carBody.image || !carBody.pricePerDay || !carBody.model) {
            carBody.error = 'All fields are required!';
            res.render('car/add', carBody);
            return;
        }
        Car.create({
            model: carBody.model,
            image: carBody.image,
            pricePerDay: carBody.pricePerDay
        }).then(() => {
            res.redirect('car/all');
        }).catch((err) => {
            carBody.error = err;
            res.render('car/add', carBody);
        });
    },
    allCarsGet: async (req, res) => {
        let cars = await Car.find({});
        res.render('car/all', {cars});
    },
    getCarById: (req, res) => {
        let id = req.params.id;
        Car.findById(id)
            .then(car => {
                res.render('car/rent', car);
            }).catch(() => {
                res.redirect('/car/all');
        });
    },
    editCarGet: (req, res) => {
        let id = req.params.id;
        Car.findById(id)
            .then(car => {
               res.render('car/edit', car);
            });
    },
    editCarPost: (req, res) => {
        let model = req.body.model;
        let image = req.body.image;
        let pricePerDay = +req.body.pricePerDay;
        let id = req.params.id;
        Car.findByIdAndUpdate(id, {
            $set: {model, image, pricePerDay}
        }).then(() => {
           res.redirect('/car/all');
        });
    },
    addRentPost: (req, res) => {
        let days = req.body.days;
        let carId = req.params.id;
        let ownerId = req.user._id;

        Rent.create({
            days: days,
            car: carId,
            owner: ownerId
        }).then(() => {
            res.redirect('/car/all');
        }).catch(() => {
           res.redirect('/car/all');
        });
    },
    userRentsGet: async (req, res) => {
        Rent.find({})
            .populate('car')
            .then(rents => {
                let cars = rents.map(x => x.car);
                console.log(cars);
                res.render('user/rented', {cars})
            });
    }
};