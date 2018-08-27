/*import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";*/
import mongoose from "mongoose";

import { Transport } from "nodemailer";
import { Config } from "imap";

export type UserModel = mongoose.Document & {

  user: string,
  db: string,
  pwd: string,
  lang: string,
  sd: string

  token: number,

  email: string,

  mail_smtp: Transport,

  mail_imap: Config

  /*comparePassword: comparePasswordFunction,
  gravatar: (size: number) => string*/
};



const userSchema = new mongoose.Schema({
  user: { type: String, unique: true },
  db: String,
  pwd: String,
  lang: String,
  sd: String,

  token: Number,

  email: String,

  mail_smtp: Object,

  mail_imap: Object

}, {});

// type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;
/**
 * Password hash middleware.
 */
/*userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});*/

/*const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

userSchema.methods.comparePassword = comparePassword;*/

/**
 * Helper method for getting user's gravatar.
 */
/*userSchema.methods.gravatar = function (size: number) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash("md5").update(this.email).digest("hex");
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};*/

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const User = mongoose.model("User", userSchema);
export default User;
