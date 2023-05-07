import { genSalt, hash as _hash, compare } from "bcrypt";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
});

// Password hash middleware.
UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    _hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

export default model("User", UserSchema);
