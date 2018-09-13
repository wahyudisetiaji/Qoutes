const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {

  register: function (req, res) {
    console.log(req.body);

    if (req.body.name.length == 0) {

        res.status(400).json({
            message: "name is required"
        });

    } else if (req.body.email.length == 0) {

        res.status(400).json({
            message: "email is required"
        });
        

    } else if (req.body.password.length == 0) {

        res.status(400).json({
            message: "password is required"
        });
        
    } else {

        const salt = bcryptjs.genSaltSync(8);
        const hashedPassword = bcryptjs.hashSync(req.body.password, salt);
    
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
        })
          .then(user => {
    
            res.status(201).json({
              success: true,
              message: `Account ${user.name} registered`,
            });
    
          })
          .catch(err => {
    
            res.status(400).json({
              message: err.message
            });
    
          });

    }
    
   
  },

  login: function (req, res) {

    if(req.body.email.length == 0) {

      res.status(400).json({
        message: 'email is required'
      })

    }else if (req.body.password.length ==  0) {

      res.status(400).json({
        message: 'password is required'
      })

    }else {

      User.findOne({ email: req.body.email })
        .then(user => {

          const checkPassword = bcryptjs.compareSync(
            req.body.password,
            user.password
          );
  
          if (checkPassword) {
            const userToken = jwt.sign(
              {
                id: user._id,
                name: user.name,
                email: user.email
              },
              process.env.JWT_SECRET_KEY
            );
  
            let data = {
              token: userToken,
              userId: user._id,
              name: user.name,
              email: user.email
            };

            res.status(201).json({
              token: userToken
            });

          }else {

            res.status(400).json({
              message: 'email/password is wrong'
            })

          }
        })
        .catch(err => {

          res.status(400).json({
            message: err.message
          });

        });
    }
  }

}

