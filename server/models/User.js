const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // salt 의 글자수
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // 이메일 안에 블랭크(스페이스빈칸)을 지우는 코드
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  var user = this;
  //userScema의 모델들을 의미함
  //  비밀번호를 암호화 시킨다.

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        // Store hash in your password DB
        next();
      });
    });
  } else {
    next();
  }
});

// 비밀번호를 확인할때 원래 비밀번호와 암호화된 비밀번호를 확인하는 코드
// 원래 비밀번호와 암호화된 비밀번호를 그냥 확인할 수 없으니 원래 비밀번호를 다시 암호화해서 확인한다
userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

//jsonwebtoken을 이용해서 token을 생성하기
userSchema.methods.generateToken = function (cb) {
  var user = this;

  var token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  //토큰을 디코드 한다
  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
