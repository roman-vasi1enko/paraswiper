<<<<<<< HEAD
export function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
}
export function ensureGuest(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/wizard");
  }
}
=======
module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.redirect("/");
      }
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect("/wizard");
      }
    },
  };
>>>>>>> main-holder
