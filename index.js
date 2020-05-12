const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const config = require("./config/key");

app.use(bodyParser.urlencoded({ extended: true }));
//application/x-www-form-urlencoded 이런 데이터를 분석(parsing)해서 가져옴

app.use(bodyParser.json());
//application/json 타입의 데이터를 분석해서 가져옴

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected.."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World! 안녕하세요!!"));

//회원가입 기능 만들기
app.post("/register", (req, res) => {
  // 회원가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어주는 코드.

  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
//서버 종료하는 법 ctrl + c
// Node MON 서버 소스를 변경할 때 그걸 감지해서 자동으로 서버를 리로드해주는 툴
