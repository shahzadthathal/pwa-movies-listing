const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../model/User");
const auth = require("../middleware/auth")



/**
 * @method - POST
 * @description - Check item into user favorite list
 * @param - /user/check-favorite
 */
router.post("/check-favorite", auth, [
        check('id', "Please select movie").not().isEmpty(),
    ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                msg: "Please select movie"
            });
      }
      const itemId = parseInt(req.body.id);
      console.log("typeof itme id")
      console.log(typeof(itemId))
      const userId = req.user.id;
      console.log("itemId "+itemId)
      console.log("userId "+userId)
      let favItemExists = await User.findOne({
                _id:userId,
                favoriteItemsArr:itemId
            });
      console.log("favItemExists")
      console.log(favItemExists)
      if (favItemExists) {
          return res.status(200).json({
              isFavorite:true,
          });
      }else{
        return res.status(200).json({
              isFavorite:false,
          });
      }
    } catch (err) {
      throw err;
      return res.status(500).json({
            msg: "Server Error",
            error: err.message

          });
    }
  });




/**
 * @method - POST
 * @description - Add item into user favorite list
 * @param - /user/add-favorite
 */
router.post("/add-favorite", auth, [
        check('id', "Please select movie").not().isEmpty(),
    ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                msg: "Please select movie"
            });
      }
      const itemId = req.body.id;
      const userId = req.user.id;
      let favItemExists = await User.findOne({
                _id:userId,
                favoriteItemsArr:itemId
            });
      console.log("add favItemExists")
      console.log(favItemExists)
      if (favItemExists) {
          return res.status(403).json({
              msg: "Item already exists"
          });
      }else{

        let updateObj = {};

        if(favItemExists){
              console.log("req 1")
              if(favItemExists.favoriteItemsArr==null){
                console.log("req 2")
                updateObj.favoriteItemsArr = [];
              }
              else{
                console.log("req 3")
                updateObj.favoriteItemsArr = favItemExists.favoriteItemsArr;
              }
        }else{
            console.log("req 4")
            let userFound = await User.findOne({_id:userId});
            if(userFound.favoriteItemsArr){
              updateObj.favoriteItemsArr = userFound.favoriteItemsArr;
            }else{
              updateObj.favoriteItemsArr = [];
            }
            
        }

        // updateObj.favoriteItemsArr.push({
        //     item_id:itemId,
        //     created_at:Date.now()
        // });
        console.log(updateObj)
        updateObj.favoriteItemsArr.push(itemId);

        await User.findOneAndUpdate({'_id': userId}, {$set:updateObj}, {new: true}, (err, user) => {
            if (err){
              return res.status(500).json({
                msg: "Server Error",
                error: err.message

              });
            }
            if(user) {
              return res.status(200).send({ msg: "Item added into favorite list." });
            } else {
                return res.status(500).json({
                msg: "User not found",
              });
            }
        });
      }
    } catch (err) {
      throw err;
      return res.status(500).json({
            msg: "Server Error",
            error: err.message

          });
    }
  });

/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /user/me
 */
router.get("/me", auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });

/**
 * @method - POST
 * @param - /register
 * @description - User SignUp
 */

router.post(
    "/register",
    [
        check('full_name', "Please Enter a Valid Name").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        console.log(req.body.full_name)
        console.log(req.body.email)
        console.log(req.body.password)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            full_name,
            email,
            password
        } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                full_name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            user.createdAt = Date.now();
            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);


/**
 * @method - POST
 * @param - /login
 * @description - User Login
 */
router.post(
    "/login",
    [
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 6
      })
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
  
      const { email, password } = req.body;
      try {
        let user = await User.findOne({
          email
        });
        if (!user)
          return res.status(400).json({
            message: "User Not Exist"
          });
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
          });
  
        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(
          payload,
          "randomString",
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token
            });
          }
        );
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }
  );




  module.exports = router;