const passport = require("passport");
const validator = require("validator");
const bcrypt = require("bcrypt")
const User = require("../models/User");

// BLAKE'S
module.exports = {
	serverMessage: (req, res) => {
		res.end(
			JSON.stringify({
				message: 'Server Running...',
			})
		);
	},

	signup: (req, res) => {
		if (!validator.isEmail(req.body.email)) {
			res.status(400).json({
				message: {
					msgBody: 'Please enter a valid email address.',
					msgError: true,
				},
			});
			return;
		}
		if (!validator.isLength(req.body.password, { min: 8 })) {
			res.status(400).json({
				message: {
					msgBody: 'Password must be at least 8 characters long.',
					msgError: true,
				},
			});
			return;
		}

		if (req.body.password !== req.body.confirmPassword) {
			res.status(400).json({
				message: {
					msgBody: 'Passwords do not match.',
					msgError: true,
				},
			});
			return;
		}

		req.body.email = validator.normalizeEmail(req.body.email, {
			gmail_remove_dots: false,
		});

		const user = new User({
			email: req.body.email,
			password: req.body.password,
		});

		User.findOne({ email: req.body.email },(err, existingUser) => {
				if (err) {
					res.status(500).json({
						message: {
							msgBody: 'Error has occured during find',
							msgError: true,
							err,
						},
					});
					return;
				}
				if (existingUser) {
					res.status(400).json({
						message: {
							msgBody: 'Email already taken.',
							msgError: true,
						},
					});
					return;
				}
				user.save(err => {
					if (err) {
						res.status(500).json({
							message: {
								msgBody: 'Error has occured during save.',
								msgError: true,
								err,
							},
						});
					} else {
						res.status(201).json({
							message: {
								msgBody: 'Account successfully created!',
								msgError: false,
							},
						});
					}
				});
			}
		);
	},

	login: (req, res, next) => {
		if (!validator.isEmail(req.body.email)) {
			res.status(400).json({
				message: {
					msgBody: 'Please enter a valid email address.',
					msgError: true,
				},
			});
			return;
		}
		if (validator.isEmpty(req.body.password)) {
			res.status(400).json({
				message: {
					msgBody: 'Password cannot be blank.',
					msgError: true,
				},
			});
			return;
		}

		req.body.email = validator.normalizeEmail(req.body.email, {
			gmail_remove_dots: false,
		});

		passport.authenticate('local', (err, user, info) => {
			console.log(user);
			if (err) {
				return next(err);
			}
			if (!user) {
				res.status(500).json({
					message: {
						msgBody: 'Incorrect email or password.',
						msgError: true,
						err,
					},
				});
				return;
			}
			req.logIn(user, err => {
				if (err) {
					return next(err);
				}
				res.status(201).json({
					user: user,
					message: {
						msgBody: 'Success! You are logged in.',
						msgError: false,
					},
				});
			});
		})(req, res, next);
	},

	logout: (req, res) => {
		req.session.destroy(err => {
			if (err)
				console.log(
					'Error : Failed to destroy the session during logout.',
					err
				);
			req.user = null;
			res.status(200).json({
				message: {
					msgBody: 'Successfully logged out',
					msgError: false,
				},
			});
		});
	},

	getAuthenticated: (req, res) => {
		User.findById(req.session?.passport?.user, (err, user) => {
			if (err) {
				res.status(500).json({
					message: {
						msgBody: 'Error has occured trying to find session.',
						msgError: true,
						err,
					},
				});
				return;
			}
			if (!user) {
				res.status(204).json({
					message: {
						msgBody: 'No session found.',
						msgError: true,
					},
				});
				return;
			} else {
				res.json(user);
			}
		});
	},
};



// LEON's
// exports.getLogin = (req, res) => {
//   if (req.user) {
//     return res.redirect("/wizard");
//   }
//   res.render("login", {
//     title: "Login",
//   });
// };

// exports.postLogin = (req, res, next) => {
//   const validationErrors = [];
//   if (!validator.isEmail(req.body.email))
//     validationErrors.push({ msg: "Please enter a valid email address." });
//   if (validator.isEmpty(req.body.password))
//     validationErrors.push({ msg: "Password cannot be blank." });

//   if (validationErrors.length) {
//     req.flash("errors", validationErrors);
//     return res.redirect("/login");
//   }
//   req.body.email = validator.normalizeEmail(req.body.email, {
//     gmail_remove_dots: false,
//   });

//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       req.flash("errors", info);
//       return res.redirect("/login");
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return next(err);
//       }
//       req.flash("success", { msg: "Success! You are logged in." });
//       res.redirect(req.session.returnTo || "/wizard");
//     });
//   })(req, res, next);
// };

// LEON's
// exports.postSignup = (req, res, next) => {
//   const validationErrors = [];
//   if (!validator.isEmail(req.body.email))
//     validationErrors.push({ msg: "Please enter a valid email address." });
//   if (!validator.isLength(req.body.password, { min: 8 }))
//     validationErrors.push({
//       msg: "Password must be at least 8 characters long",
//     });
//   if (req.body.password !== req.body.confirmPassword)
//     validationErrors.push({ msg: "Passwords do not match" });

//   if (validationErrors.length) {
//     req.flash("errors", validationErrors);
//     return res.redirect("../signup");
//   }
//   req.body.email = validator.normalizeEmail(req.body.email, {
//     gmail_remove_dots: false,
//   });

//   const user = new User({
//     email: req.body.email,
//     password: req.body.password,
//   });

// LEON's
//   User.findOne(
//     { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
//     (err, existingUser) => {
//       if (err) {
//         return next(err);
//       }
//       if (existingUser) {
//         req.flash("errors", {
//           msg: "Account with that email address or username already exists.",
//         });
//         return res.redirect("../signup");
//       }
//       user.save((err) => {
//         if (err) {
//           return next(err);
//         }
//         req.logIn(user, (err) => {
//           if (err) {
//             return next(err);
//           }
//           res.redirect("/wizard");
//         });
//       });
//     }
//   );
// };




// // SOMEONE FROM YT
// exports.postLogin = (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) throw err;
//     if (!user) res.send("No User Exists");
//     else {
//       req.logIn(user, (err) => {
//         if (err) throw err;
//         res.send("Successfully Authenticated");
//         console.log(req.user);
//       });
//     }
//   })(req, res, next);
// };

// // SOMEONE FROM YT
// exports.postSignup = (req, res) => {
//   User.findOne({ email: req.body.email }, async (err, doc) => {
//     if (err) throw err;
//     if (doc) res.send("User Already Exists");
//     if (!doc) {
//       const hashedPassword = await bcrypt.hash(req.body.password, 10);

//       const newUser = new User({
//         email: req.body.email,
//         password: hashedPassword,
//       });
//       await newUser.save();
//       console.log("User Created");
//     }
//   });
// };

// SOMEONE FROM YT
// exports.logout = (req, res) => {
//   req.logout(() => {
//     console.log('User has logged out.')
//   })
//   req.session.destroy((err) => {
//     if (err)
//       console.log("Error : Failed to destroy the session during logout.", err);
//     req.user = null;
//     res.redirect("/");
//   });
// };

// exports.getSignup = (req, res) => {
//   if (req.user) {
//     return res.redirect("/wizard");
//   }
//   res.render("/signup", {
//     title: "Create Account",
//   });
// };