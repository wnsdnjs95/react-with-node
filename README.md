# react-with-node

비밀 정보 보호 : 환경변수 process.env.NODE_ENV을 이용해
로컬환경과 배포 한 후 프로덕션 환경의 정보를 나눔

Bcrypt로 노출된 비밀번호를 암호화 한다

// Node MON 서버 소스를 변경할 때 그걸 감지해서 자동으로 서버를 리로드해주는 툴

## Auth route를 만드는 이유

1. 페이지 이동 때마다 로그인 되어있는지 안되어 있는지, 관리자 유저인지 등을 체크

2. 글을 쓸 때나 지울 때 권한이 있는지(로그인되어 있는지) 같은 것도 체크하기 위해

<br />

Babel은 최신 자바스크립트 문법을 지원하지 않는 브라우저를 위해 최신 자바스크립트 문법을 구형 브라우저에서도 돌 수 있게 변환을 시켜줌

Webpack은 웹사이트가 커짐에 따라 복합적인 라이브러리들이 많아지다보니 복잡한 모듈들을 묶어(번들)서 정리해주는 기능

react 에서는 페이지 이동을 할 때 react-router-dom 이라는 라이브러리를 사용한다.

## 여러가지 명령어들

서버 종료하는 법 ctrl + c
./program 현재 디렉토리에 있는 program 실행
React 주석처리 {/\* \*/}
<br />

Proxy 미들웨어를 설치해서 포트넘버가 다를 시에도 Cross Origin Resource Sharing(CORS) 정책 보안과 상관없이 포트를 넘나들수 있게 설정
<br />

## Proxy 서버 사용이유

1. 회사에서 직원들이나 집안에서 아이들 인터넷 사용 제어
2. 캐쉬를 이용해 더 빠른 인터넷 이용 제공
3. 더 나은 보안 제공
4. 이용 제한된 사이트 접근 가능
   <br/>

## 항상 에러 로그를 잘봐야한다

이번에도 폴더 구성변경할 때 pakage.json 에서 node index.js를 node server/index.js로 바꿔야 했는데 에러 로그를 자세히 보지 않고 뭐가 문제인지 코드를 쭉 훑어보다가 시간을 많이 낭비했다...
그런데 Error: Cannot find module '/Users/maegpeule/Documents/boiler-plate/index.js' 라고 떡하니 나와있었다...ㅎㅎ 반성하자
<br/>

## Props 와 State

Props는 부모 자식 컴포넌트가 있을 때 그들이 데이터를 전달하는 방식중 하나이다.
부모 자식 컴포넌트 간의 교류를 하전달 방식으로 일방향적 교류를 함.
한번 정해진 설정은 바뀌지 않고 바꾸려면 부모 컴포넌트에서 자식으로 다시 전달해줘야함

State는 부모자식 컴포넌트가 아닌 액션이 일어난 컴포넌트에서 바로 데이터를 전달하려면 state를 사용한다.
state의 데이터는 변할 수 있다.
예를 들어 검색 창에서 글을 입력할 때 글이 변하는 것은 state를 바꾸는 것이다.
<br/>
