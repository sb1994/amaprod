const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const nodemailer = require("nodemailer");

//models
const User = require("../models/User");
const passport = require("passport");
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ _id: req.user.id })

      .populate("order_history.products.product")
      .sort({ "order_history.order_date": -1 })
      .then((user) => {
        let reversedOrder = user[0].order_history.reverse();
        user[0].order_history = reversedOrder;
        res.json(user[0]);
      });
  }
);
router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { _id } = req.user;
    let {
      website,
      location,
      bio,
      githubusername,
      profile_pic,
    } = req.body.updateUserData;

    User.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: {
          bio,
          website,
          location,
          githubusername,
          profile_pic,
        },
      },
      (err, result) => {
        if (err) {
          console.log("Error:", err);
        } else {
          // console.log('Im Herre')

          // console.log(result)

          // res.send(result)

          User.findById(_id)
            .select("-password")

            .populate("order_history.products.product")
            .sort({ "order_history.order_date": -1 })
            .then((result) => {
              res.send({ user: result });
            })
            .catch((err) => {
              console.log(err);
            });
          User.find({})
            .select("-password")
            .populate("friends.user")
            .populate("pendingFriendsRequests.user")
            .then((result) => {
              res.send({ users: result });
            })
            .catch((err) => {
              console.log(err);
            });
        }
        // process.exit(0);
      }
    );
    //   // res.json(req.body);
  }
);
router.get("/", (req, res) => {
  User.find({})
    .select("-password")
    .then((users) => {
      res.json({ users: users });
    })
    .catch((err) => {});
});
router.post(
  "/purchase",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { totalPrice, cart } = req.body;
    let { user } = req;

    let order = {
      products: [],
      total_price: totalPrice,
      order_date: Date.now(),
    };
    for (let i = 0; i < cart.length; i++) {
      order.products.push({
        product: cart[i].id,
        quantity: cart[i].quantity,
      });
    }
    User.findById(user._id)
      .then((user) => {
        user.order_history.push(order);
        user.save().then((savedUser) => {
          User.findById(req.user.id)
            // .sort({ 'order_history.order_date': 1 })
            .populate("order_history.products.product")
            .then((user) => {
              let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: process.env.EMAIL_ADDRESS,
                  pass: process.env.EMAIL_PASSWORD,
                },
              });
              console.log(transporter);
              console.log(user.email);
              let mailOptions = {
                from: process.env.EMAIL_ADDRESS,
                to: user.email,
                subject: "Thank You for Ordering from AmaProd",
                text:
                  "<p>Dear Customer, thank you for placing your order with us. Please come again!<p>",
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
              let reversedOrder = user.order_history.reverse();
              user.order_history = reversedOrder;
              //  res.json(user[0]);
              res.json(user);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // res.json(order)
  }
);
router.post("/register", (req, res) => {
  const errors = {};

  //checks wether the username or email already exists
  User.findOne({
    $or: [
      {
        email: req.body.email,
      },
      { name: req.body.name },
    ],
  })
    .then((user) => {
      if (user) {
        errors.email = "Email or Name already exists";
        return res.status(200).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          profile_pic:
            "https://toppng.com/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png",
          password: req.body.password,
        });
        // console.log(newUser);
        // res.json({ user: newUser })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                const payload = {
                  _id: user.id,
                  name: user.name,
                  profile_pic: user.profile_pic,
                  email: user.email,
                  cart: user.cart,
                };
                jwt.sign(
                  payload,
                  process.env.SECRET,
                  { expiresIn: 3600 * 1000 * 1000 * 20 },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: `${token}`,
                    });
                  }
                );
              })
              .catch((err) => res.json(err));
            // console.log(newUser);
          });
        });
      }
    })
    .catch((err) => res.json(err));
  // // console.log(req.body);
});
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // // //find user by email
  User.findOne({
    email: email,
  }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User Not Found" });
    }
    // console.log(user);
    // //check the password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        //user matched create the payload taht will
        // be sent in the token

        const payload = {
          _id: user.id,
          name: user.name,
          profile_pic: user.profile_pic,
          email: user.email,
          cart: user.cart,
          order_history: user.order_history,
        };
        jwt.sign(
          payload,
          process.env.SECRET,
          { expiresIn: 3600 * 1000 * 1000 * 20 },
          (err, token) => {
            res.json({
              success: true,
              token: `${token}`,
            });
          }
        );
      } else {
        return res.status(200).json({ msg: "password failed" });
      }
    });
  });
});
module.exports = router;
