const Qoutes = require('../models/qoutes');
const User = require('../models/user');

module.exports = {

    createQoutes: function(req, res) {

        User.findOne({_id: req.user._id})
        .then((user) => {
            if(user){
                Qoutes.create({
                    status: req.body.status,
                    user: req.user._id
                })
                .then((result) => {
                    res.status(201).json({
                        result
                    })
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                });
            }else {
                res.status(400).json({
                    message: "you not authorized"
                });
            }
        }).catch((err) => {
            res.status(400).json({
                message: err.message
            });
        });
        

    },

    deleteQoutes: function(req, res) {
        
        Qoutes.findOne({_id: req.params.id})
        .then((qoutes) => {
            
            if(qoutes.user.toString() == req.user._id.toString()){

                Qoutes.deleteOne({
                    _id: req.params.id
                })
                .then((result) => {
                    res.status(201).json({
                        success: true,
                        message: `Quote with id ${req.params.id} deleted`,
                        result
                    })
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                }); 

            }else {
                res.status(400).json({
                    message: "you not authorized"
                });
            }
        }).catch((err) => {
            res.status(400).json({
                message: err.message
            });
        });
  
    },

    editQoutes: function(req, res) {



    },

    oneQoutes: function(req, res) {

        Qoutes.findOne({_id: req.params.id})
        .populate('user')
        .then((result) => {
            res.status(201).json({
                result
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });

    },

    allQoutes: function(req, res) {


        Qoutes.find({})
        .populate('user')
        .then((result) => {
            res.status(201).json({
                result
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });

    }


}