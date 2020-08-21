# Express

[TOC]



## Getting started

### Installing

1. express 다운로드

  ```bash
  npm install express --save
  ```

2. 앱을 들고 있을 폴더를 생성해 들어가기

   ```bash
   mkdir helloworld
   cd helloworld
   ```

3. 앱의 `package.json` 생성하고 디폴트 값으로 설정

   ```bash
   npm init
   // 이후는 전부 enter
   ```

4. express 앱에 설치하고 디펜던시 리스트에 추가해주기

   ```bash
   npm install express --save
   ```

   

- `package.json`과 `package-lock.json` 

  ```bash
  npm install packagename --save
  ```

  위 명령어를 통해 express의 최근 버전이 앱에 추가되며 `package.json` 파일에 캐럿(^)과 함께 버전 정보가 디펜던시 리스트에 추가된다. 이때 캐럿은 해당 버전이상이란 뜻이다. 

  이와달리, `package-lock.json`은 앱에 설치된 패키지의 해당 버전만을 기록하며, `npm install`을 통해 앱의 디펜던시한 패키지들을 다운로드받을 때 `package-lock.json`에 기록된 버전들만을 다운로드 할 수 있게 된다. **즉 패키지들의 완벽하고 깔끔한 버전관리를 위해 반드시 필요한 파일**이다. 

  npm 으로 부터 패키지들을 다운받아야 하기 때문에 `package.json`에 비해 더 자세한 메타 정보가 포함되어있다. 다운로드된 패키지들은 `node_moduels`폴더에 저장된다.

  [여기](https://medium.com/@hossam.hilal0/package-json-vs-package-lock-json-vs-npm-shrinkwrap-json-33fcddc1521a) 참고



### Hello world example

> 다음 코드는 파일 하나로 구성된 앱으로 가장 간단한 익스프레스 앱이다. 이 다음 예시에서는 express generator을 통해 수많은 자바스크립트 파일들과 Jade 템플릿과 다양한 목적들을 위한 하위 폴더들로 이루어진 express 앱을 만든다.

1. `app.js` 파일 생성 후 코드 작성

   ```js
   const express = require('express')
   const app = express()
   const port = 3000
   
   app.get('/', (req, res) => {
       res.send('Hello World!')
   })
   
   app.listen(port, () => {
       console.log(`Example app listening at http://localhost:${port}`)
   })
   ```

   - 이 앱은 서버를 시작하고 3000번 포트에서 클라이언트의 접속요청을 기다리며, 루트 URL(/)로 요청시 "Hello World!"라고 응답한다. 루트 URL 이외는 전부 404 Not Found 로 응답한다.

     

2. 로컬에서 실행하기

   ```bash
   node app.js
   ```

   - 위의 명령어를 통해 실제로 서버가 동작하기 시작하며 브라우저의 http://localhost:3000/ 에서 응답을 확인할 수 있다. 또한 내 활동에 따라 페이지에 실시간으로 로그가 남겨진다.
- 노드와 웹브라우저가 연결된 반응형 자바스크립 플레이그라운드인 [RunKit](https://runkit.com/home)를 통해서 이렇게 로컬에서 실시간으로 확인하며 서버를 개발할 수 있다.
  

![image-20200820130835681](C:\Users\lucid\ming\express\images\image-20200820130835681.png)

   

- `listen`과 `Tcp`

   웹에서 서버와 클라이언트가 통신하기 위해 여러 프로토콜을 거치게된다. 조금 더 자세하게는 HTTP, TCP, IP 등의 프로토콜을 거쳐 데이터가 호스트에서 호스트로 전달되는데, TCP는 HTTP와 IP의 중간에서 데이터를 분해하고 옮기고 다시 조립하는 역할을 한다.

   이때 `port`는 앱(프로세스)의 식별 값이다. 호스트 내에 통신하는 수많은 앱(프로세스)들이 있기 때문에 각각을 구별해야하기 때문이다. 위 코드는 호스트에서 3000번 `port`를 `app.js`에게 부여한다.

   모든 `port`에는 `passive socket`이 하나씩 부여된다. `socket`은 TCP 계층에서 데이터가 도착해야 할 앱을 식별할 수 있는 endpoint로 역할하는 구조체로, `socket`을 통해 각각 데이터 전송이 이루어진다.(socket이 많으면 동시에 처리할 수 있는 통신이 많아진다.) 다시 `passive socket`은 접속 요청을 기다리는 데, 연결이 이루어지면 실제 데이터를 주고 받는 `active socket`을 하나 생성하고 전송이 끝나면 해당 소켓을 제거한다. 

   `passive socket`이 접속 요청을 기다리는 상태를 `listen`이라고 한다. 간단히 정리하면 서버가 클라이언트의 접속요청을 기다리는 것이 `listen`이다.

  [TCP](https://ko.wikipedia.org/wiki/%EC%A0%84%EC%86%A1_%EC%A0%9C%EC%96%B4_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C), [OSI계층과 TCP/IP 모델](https://medium.com/harrythegreat/osi%EA%B3%84%EC%B8%B5-tcp-ip-%EB%AA%A8%EB%8D%B8-%EC%89%BD%EA%B2%8C-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-f308b1115359), [HTTP, TCP/IP](https://medium.com/@chrisjune_13837/web-http-tcp-ip-%EB%A9%94%EC%8B%9C%EC%A7%80%EB%9E%80-4b2721fe296f), [TCP의 hand shake](https://medium.com/@saven7788/layer4%EC%97%90%EC%84%9C-%ED%95%98%EB%8A%94-%EC%9D%BC-tcp-vs-udp-49ad6ade602), [소켓과 포트](http://blog.naver.com/PostView.nhn?blogId=myca11&logNo=221389847130), [소켓과 포트2](https://medium.com/fantageek/understanding-socket-and-port-in-tcp-2213dc2e9b0c), [소켓](https://docs.oracle.com/javase/tutorial/networking/sockets/definition.html)를 참고함



###  express application generator

앱생성도구인 `express-generator`을 사용하면 앱의 스켈레톤을 빠르게 생성할 수 있다.

1. express-generator 설치

   ```bash
   npx express-generator //Node.js 8.2.0
   npm install -g express-generator //earlier node version
   ```

   npx 는 패키지를 설치없이 실행시켜주는 명령어이다. 위 코드의 첫번째 줄을 실행시킨다면 현재 작업 공간에 앱의 스켈레톤이 바로 생성된다. npx에 관한 자세한 내용은 [여기](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) 참고

   자주 사용할 패키지니 두번째 코드를 실행시켜 글로벌로 설치했다.

2. express 실행

   ```bash
   express
   ```

   (다시 말하지만 npx로 실행시 위 명령어는 필요없다.)

   위 명령어를 실행하면 현재 작업 공간에 앱의 스켈레톤이 생성된다.

3. 옵션

   ```bash
   express -h
   express --view=pug myapp
   ```

   첫번째 명령어를 실행하면 express 명령어에 사용할 수 있는 옵션들이 나온다.

   공식 문서에서 뷰 엔진을 pug로, 앱 이름을 myapp으로 설정해 express 명령어를 실행했기 때문에 그대로 따라해본다. 앱이름을 설정하면 앱 이름의 폴더아래 스켈레톤 앱이 생성된다.

   (뷰엔진의 옵션은 디폴트가 jade인데 pug의 옛이름이 jade라고 하니 결국 pug가 디폴트로 사용되는 view 엔진인 듯 하다.) 

   스켈레톤 앱이 생성되고 나면 이후 디펜던시를 설치하고 앱을 디버그모드로 실행하는 명령어를 안내해준다.

4. 디펜던시 설치

   ```bash
   cd myapp
   npm install
   ```

5. 앱실행

   ```bash
   DEBUG=myapp:* npm start
   ```

   브라우저에 http://localhost:3000/를 입력하면 express 앱이 실행된 것을 확인할 수 있다.

   ![image-20200820133637883](C:\Users\lucid\ming\express\images\image-20200820133637883.png)

6. 앱구조

   ```
   .
   ├── app.js
   ├── bin
   │   └── www
   ├── package.json
   ├── public
   │   ├── images
   │   ├── javascripts
   │   └── stylesheets
   │       └── style.css
   ├── routes
   │   ├── index.js
   │   └── users.js
   └── views
       ├── error.pug
       ├── index.pug
       └── layout.pug
   ```

   생성된 앱의 구조는 위와 같다. 공식문서에서는 express에서 생성해주는 앱의 구조는 다양한 구조 중 하나의 방법이기 때문에 자신에게 맞는 방법으로 앱을 자유롭게 구성할 것을 권한다.

   

### Basic routing

- routing

  `routing`은 앱이 클라이언트의 특정 endpoint에 대한 요청(URI(또는 path)나 특정한 HTTP 요청방법(GET, POST, 등등)) 에 대해서 어떻게 응답할지를 결정하는 것을 말한다. 각 `route`는 하나 이상의 `handler` 함수를 가질 수 있는데, `handler` 함수는 `route` 가 매칭될 때 실행된다. 

- routing을 코드로 작성하기

  `route` 는 다음과 같은 구조로 정의된다.

  ```js
  app.METHOD(PATH, HANDLER)
  ```

  - `app`은 `express` 인스턴스를 말한다. 위에서 만든 `helloworld`나 `myapp` 의 `app.js`에서 `app` 변수에 `express` 인스턴스를 할당하는 데 그 변수를 말한다.
  - `METHOD`는 HTTP 요청 메서드(GET, POST, PUT 등등)을 말한다
  - `PATH`는 서버의 path를 말한다.
  - `HANDLER`는 `route`가 매칭될 때 실행될 함수를 말한다.

  즉 `routing` 정의 그대로 어떤 path로 HTTP 요청이 들어올 때 실행될 `handler`함수를 앱이 정의하는 코드인 것이다.

- 코드 예시

  다음 예시는 간단한 라우팅을 정의하는 코드이다.

  ```js
  // 루트 path에 대한 get요청에 'Hello World!'로 응답하기
  app.get('/', function(req, res) {
  	res.send('Hello World!')
  })
  
  // 루트 path에 대한 POST 요청에 응답하기
  app.post('/', function(req, res) {
      res.send('Got a POST request')
  })
  
  // /user path에 대한 PUT 요청에 응답하기
  app.put('/user', function(req, res){
      res.send('Got a PUT request at /user')
  })
  
  // /user path에 대한 DELETE 요청에 응답하기
  
  app.delete('/user', function(req, res) {
      res.send('Got a DELETE request at /user')
  })
  ```

- 스켈레톤 앱 까보기

  `express application generator`단계에서 만든 폴더구조에서 `routes/users.js`의 코드는 다음과 같이 작성되어있다.

  ```js
  var express = require('express');
  var router = express.Router();
  
  /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });
  
  module.exports = router;
  ```

  예시와 다르게 `express`의 `Router `인스턴스로 라우팅을 정의한다. `/users` 로 GET 요청이 들어올 때 'respond with a resource'란 메시지로 응답하고 있다.

  ![image-20200820140944944](C:\Users\lucid\ming\express\images\image-20200820140944944.png)

  `/users`로 요청이 들어올 때 `routes/users.js`가 라우터로 역할한다는 것을 알려주는 코드는 `app.js`에서 쉽게 찾을 수 있다.

  ```js
  var indexRouter = require('./routes/index');
  var usersRouter = require('./routes/users');
  
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  
  // catch 404 and forward to error handler
  // 루트와 `/users` 외의 다른 path에 대해서 에러 처리하는 코드
  app.use(function(req, res, next) {
    next(createError(404));
  });
  ```

  예시와 `routes/users.js` 에서 사용하는 메서드인 `send` 와 달리 `routes/index.js`에서는 `render` 메서드를 사용한다.

  ```js
  //routes/index.js
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  ```

  - [send](https://expressjs.com/en/5x/api.html#res.send)

    send 메서드는 인자로 들어온 값을 body로 HTTP 응답을 보내는 역할을 한다. 그래서 http://localhost:3000/users 에서는 body가 스트링 값이 전부인 페이지를 보게 되는 것이다.

    ![image-20200820142354120](C:\Users\lucid\ming\express\images\image-20200820142354120.png)

  - [render](https://expressjs.com/en/5x/api.html#res.render)

    반면 루트 path 에서는 html 문서같은 페이지가 렌더링 된다.

    ![image-20200820142506124](C:\Users\lucid\ming\express\images\image-20200820142506124.png)

    ```js
    res.render(view [, locals][, callback])
    ```

    - render 함수의 첫번째 인자 view는 렌더링할 뷰 파일의 파일 경로이다. 절대경로일 수도 있고 views 세팅에 따라 상대적일 수도 있다. 파일 경로에 파일의 확장자가 포함되어있지 않다면 view engine 설정에 따라 파일 확장자를 결정하고 확장자가 포함되어있다면 해당하는 템플릿 엔진에 따라 모듈을 로드해 페이지를 보여줄 것이다.
    - 두번째 인자는 해당 view 파일에서 사용할 로컬 변수를 설정해 준다. `{변수이름: 변수값}` 의 형태이다.
    - 세번째는 콜백함수로 공식문서에서는 에러처리용으로 사용했다.

    

    즉 `routes/index.js` 에서 `res.render('index', { title: 'Express' });` 부분은 루트 path로 요청이 들어올 때 상대경로로 설정된 index.pug 파일을 찾아서 렌더링 하는데, 이때 변수 title에는 'Express'를 할당한다는 뜻이다.

    

    상대경로로 view 파일 경로를 설정한 것은 `app.js` 에서 확인할 수 있다.

    ```js
    app.set('views', path.join(__dirname, 'views')); // 현재위치/views/ 로 view 파일경로 설정
    app.set('view engine', 'pug'); // 파일확장자는 pug, 뷰 엔진은 pug
    ```

    

    마지막으로 렌더링 된 `pug` 파일을 살펴보았다. `pug`는 장고 템플릿 언어와 비슷한데 훨씬 간단해 보였다.

    ```jade
    // views/index.pug
    extends layout // layout.pug에서 확장
    
    block content
      h1= title
      p Welcome to #{title} //지역변수 title을 확인할 수 있다.
      
    // views/layout.pug
    doctype html
    html
      head
        title= title
        link(rel='stylesheet', href='/stylesheets/style.css')
      body
        block content // 이 부분에 views/index.pug 의 block content 부분이 들어가게 되는 것
    ```



### Serving static files in Express

이미지파일이나 css, js 파일 등 정적 파일들을 서빙하기 위해선 빌트인 미들웨어 함수인 `express.static`를 사용하면 된다.

```js
express.static(root, [options])
```

root 인자는 정적 파일들을 제공한 루트 폴더를 말한다.

```js
app.use(express.static(path.join(__dirname, 'public')));
```

위 코드를 통해 `public` 폴더 아래의 모든 정적 파일들을 앱이 서빙할 수 있게 된다. 즉 path를 통해 웹브라우저상에서 파일에 접근할 수 있게 된다. express는 정적 폴더에 상대적으로 찾아보기 때문에 정적 폴더를 path에 포함하지 않아도 된다. 다음은 `http://localhost:3000/images/kitty.jpg로 정적 파일을 요청한 결과이다.

![image-20200820155610637](C:\Users\lucid\ming\express\images\image-20200820155610637.png)

 만약 정적파일들의 path에 접두사 prefix를 붙이고 싶다면 다음과 같이 작성하면 된다.

```
app.use('/static', express.static(path.join(__dirname, 'public')));
```

```plain-text
http://localhost:3000/static/images/kitten.jpg
```

![image-20200820160400224](C:\Users\lucid\ming\express\images\image-20200820160400224.png)



## Guide

### Writing Middleware

- Middleware 함수

  route의 핸들러 함수가 미들웨어 함수였는데, 미들웨어는 앱의 요청-응답 사이클에서 요청 객체 `req`와 응답 객체 `res`, `next` 함수(요청-응답 사이클에서 다음 미들웨어 함수)에 접근하는 함수들을 말한다. `next` 함수는 콜백 인자이며 요청과 응답사이클이 현재의 미들웨어에서 끝나지 않을 때 `next()` 함수를 호출해 다음 미들웨어 함수에게 컨트롤을 전달해야 요청을 제대로 처리할 수 있다.  

  ```js
  app.get('/', function(req, res, next) {
      next()
  })
  ```

  

  미들웨어 함수들은 다음과 같은 작업들을 수행할 수 있다.

  1. 코드 실행
  2. 요청 객체와 응답객체 조작
  3. 요청-응답 사이클 종료
  4. 스택에서 다음 미들웨어 호출하기

  

- 예시1. myLogger

  ```js
  const express = require('express')
  const app = express()
  
  const myLogger = function (req, res, next) {
      console.log('Logged')
  //    next()
  }
  
  const testNext = function (req, res, next) {
      console.log('It should not be seen')
  }
  
  app.use(myLogger)
  app.use(testNext)
  
  app.get('/', function (req, res) {
      res.send('Hello World')
  })
  
  app.listen(3000)
  ```

  미들웨어 함수를 불러오기 위해선 `call.use()` 를 호출해 미들웨어 함수를 명시해줘야한다. 위의 코드는 루트 path로 라우팅하기 전에 `myLogger` 미들웨어 함수를 불러오는 코드다. 앱이 요청을 받을 때마다 "Logged" 메시지가 터미널에 프린트 될 것이다.

  ![image-20200820213043570](C:\Users\lucid\AppData\Roaming\Typora\typora-user-images\image-20200820213043570.png)

  `next()`를 불러야만 앱의 다음 미들웨어 함수가 호출된다. 위의 코드에서는 `next()`를 주석 처리했기 때문에 다음 미들웨어 함수인 `textNext`가 호출되지 않았다. 

   3번째 인자는 `next()`함수는 next 외의 이름으로 사용할 수 있지만 `req`, `res`와 같이 관례상 `next()`를 사용한다.

  이때 만약 `next()` 에 인자로 어떤 것이든 넘기게 되면 ('route', 'router' 제외) Express는 현재 요청을 에러로 처리하고 이후 모든 미들웨어를 스킵한다. 다음은 위의 코드에서 `myLogger`의 `next()`에 '1'을 인자로 넘긴 결과이다. 탭이 에러로 바뀌었으며 '1'만 화면에 띄우고 있다.

  ![image-20200820224309624](C:\Users\lucid\ming\express\images\image-20200820224309624.png)

  만약 에러헨들러가 있다면 에러 코드를 띄운다.

  ![image-20200820224428094](C:\Users\lucid\ming\express\images\image-20200820224428094.png)

  

- 예시2. validateCookies

  ```js
  const express = require('express')
  const cookieParser = require('cookie-parser')
  
  async function cookieValidator (cookies) {
    try {
      await externallyValidateCookie(cookies.testCookie)
    } catch {
      throw new Error('Invalid cookies')
    }
  }
  
  const app = express()
  
  async function validateCookies (req, res, next) {
    await cookieValidator(req.cookies)
    next()
  }
  
  app.use(cookieParser())
  
  app.use(validateCookies)
  
  // error handler
  app.use(function (err, req, res, next) {
    res.status(400).send(err.message)
  })
  
  app.listen(3000)
  ```

  

  쿠키의 유효성을 검사하고 만약 쿠키가 유효하지 않으면 응답 400 코드를 보내는 미들웨어를 생성하는 예시이다. 위 코드를 실행하기 위해선 `cookie-parser`와 쿠키의 유효성을 검사하는 함수가 필요하다. 

  npm으로 [`cookie-parser` 패키지](https://www.npmjs.com/package/cookie-parser)를 설치해 준다. `cookie-parser`는 요청 헤더에 있는 cookie를 읽고 `{cookie 이름: 값}` 형태의 `req.cookies`를 생성해준다. 유효성을 검사하는 함수는 `externallyValidateCookie` 부분에 입력하면 된다. 함수를 자체적으로 만들거나 외부 함수를 불러와 사용하면 된다.

  `validateCookies` 미들웨어는 `Promise`객체를 반환하는데 거절되면 자동적으로 에러헨들러가 호출된다. `next()`가 `await cookieValidator` 뒤에 호출되었기 때문에 `cookieValidator`가 해결되고 난 이후에 다음에 스택에 있는 다음 미들웨어가 호출되는 것을 보장할 수 있다. 

  

  - [쿠키](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)와 `cookie-parser`

    쿠키는 HTTP cookie는 서버가 유저의 웹브라우저에 보낸 작은 데이터 조각이다. 브라우저는 쿠키를 저장해 다음에 같은 서버에 요청을 보낼 때 쿠키를 함께 보내 서버측에서 요청이 같은 브라우저에서 보내진 것인지를 판별한다. 

    쿠키를 통해서 stateless 한 HTTP 통신에서 stateful 하게 정보를 유지할 수 있게 되는데, 대표적으로 로그인을 유지하거나, 유저의 선호도, 유저 활동 기록 등에 사용된다.

    `Session` 쿠키는 현재 세션이 끝날 때 함께 지워지며, `Permanent` 쿠키는 `Expire` 속성에 명시된 날짜에 지워진다.

    ![image-20200820215151575](C:\Users\lucid\ming\express\images\image-20200820215151575.png)

    개발자도구의 Network의 Headers를 살펴보면 위와 같이 요청 헤더에 포함되어있는 쿠키를 확인할 수 있다. 이 쿠키는 인코딩 되어있는데 `cookie-parser` 패키지는 인코딩된 쿠키를 파싱해 주는 역할을 하는 것이다.

    파싱된 결과 생성되는 `req.cookie`는 브라우저에 저장된 Cookies와 같이 키-값 형태이다.

    ![image-20200820220515928](C:\Users\lucid\ming\express\images\image-20200820220515928.png)

    

- middleware 설정

  만약 미들웨어를 설정가능하게 하고 싶으면, 옵션 객체나 다른 매개변수를 입력받아 그에 따라 미들웨어가 실행하는 함수를 `export` 해주면 된다.

### Using middle ware

Express는 각각 최소한의 기능성을 가진 라우팅과 미들웨어로 이루어진 웹프레임워크라고 할 수 있다. 다시말해, Express는 일련의 미들웨어 함수들의 호출이다.

- 미들웨어의 종류

  Express 앱은 다음과 같은 미들웨어 종류들을 사용할 수 있다.

  - 앱 수준의 미들웨어
  - 라우터 수준의 미들웨어
  - 에러 처리 미들웨어
  - 빌트인 미들웨어 
  - third party 미들웨어

  마운트 할 경로로 앱 수준의 미들웨어나 라우터 수준의 미들웨어를 불러올 수 있다. 일련의 미들웨어 함수들을 함께 불러올 수 있는데, 이를 통해 마운트할 위치에 미들웨어 시스템의 하위 스택이 생성된다.

- 앱 수준의 미들웨어

  `app.use()`와 `app.METHOD()`를 통해 앱수준의 미들웨어를 앱 객체의 인스턴스에 바인딩(특정 객체이 실행되게끔 고정시키는 역할)할 수 있다. (`METHOD`는 미들웨어 함수가 처리할 수 있는 HTTP 요청 메서드의 소문자. i.e. get, post)

  ```js
  const express = require('express')
  const app = express()
  // 마운팅할 path 가 없는 미들웨어 함수. 앱이 요청을 받을 때마다 실행된다.
  app.use(function (req, res, next) {
      console.log('Time:', Date.now())
      next()
  })
  // /user/:id 경로에 대한 요청 때마다 실행되는 미들웨어 함수
  app.use('/user/:id', function (req, res, next) {
      console.log('Request Type:', req.method)
      next()
  })
  // /user/:id 경로에 대한 get 요청을 처리하는 라우터와 미들웨어 시스템
  app.get('/user/:id', function (req, res, next) {
      res.send('USER')
  })
  // 마운트할 경로에 대한 연속적인 미들웨어를 불러오는 예시. /user/:id 경로에 대한 모든 HTTP 요청에 대해 요청을 프린트하는 미들웨어 하위 스택이다.
  app.use('/user/:id', function (req, res, next) {
      console.log('Request URL:', req.originalUrl)
      next()
  }, function (req, res, next) {
      console.log('Request Type:', req.method)
      next()
  })
  // 라우터 미들웨어 스택의 나머지 미들웨어 함수들을 스킵하기 위해서 next('route')를 호출하면 다음 라우터로 control을 넘길 수 있다. next('route')는 오직 app.MEHTOD()나 router.METHOD()함수들을 사용한 미들웨어 함수들에서만 동작한다. 
  app.get('/user/:id', function (req, res, next) {
      // 만약 user ID 가 0 이라면 스킵하고 다음 라우트로 넘김
      if (req.params.id === '0') next('route')
      // 그렇지 않으면 스택의 다음 미들웨어 함수에 넘김
      else next()
  }, function (req, res, next) {
      // reqular 응답을 보냄
      res.send('reqular')
  })
  
  // /user/:id 경로에 대한 라우트와 라우트내의 핸들러 함수. special 응답을 보낸다.
  app.get('/user/:id', function (req, res, next) {
      res.send('special')
  })
  
  // 미들웨어는 재사용성을 위해 배열 내에서 선언할 수 있다. 다음은 /user/:id 경로에 대한 GET 요청을 처리하는 미들웨어 하위 스택의 배열이다.
  function logOriginalUrl (req, res, next) {
      console.log('Request URL:', req.originalUrl)
      next()
  }
  
  function logMethod (req, res, next) {
      console.log('Request Type:', req.method)
      next()
  }
  
  const logStuff = [logOriginalUrl, logMethod]
  app.get('/user/:id', logStuff, function(req, res, next) {
      res.send('User Info')
  })
  
  ```

  위의 코드는 한번에 전부 동작하지 않는다. send() 명령어가 실행되고 나면 응답이 끝나버리기 때문이다. 모든 미들웨어를 실행시키고 싶다면 중간에 send() 를 console.log()로 바꾸는 편이 좋다. 마찬가지로 next() 함수가 있어야 다음 미들웨어가 실행된다. 

  app.METHOD 내에서만 next('route') 가 실행된다는 것 주의

  - 용어 정리

    - route (라우트 또는 라우터)

      `app.METHOD()` 처럼 path와 HTTP 메서드에 대한 요청을 받을 때 실행되는 콜백함수(핸들러 함수, 라우팅 메서드)

    - 미들웨어 함수

      요청과 응답과 next함수에 접근하는 모든 함수. 라우트 내에도 미들웨어 함수가 있다.

    - 미들웨어 스택

      미들웨어들의 실행목록. 한 함수 안에 연속적인 미들웨어 함수들이 실행될 때 미들웨어 하위 스택이라 하거나 특정 라우터 안에서 미들웨어 함수들이 사용될 때 라우터 미들웨어 스택이라는 용어를 사용했다.

      

- 라우터 수준의 미들웨어

- 에러 처리 미들웨어

- 빌트인 미들웨어

- third-party 미들웨어

### Routing

- Routing

  HTTP 메서드에 따른 Express `app` 객체의 메서드를 사용해 `routing`을 정의하면 된다. 예를 들어서 POST 요청에는 `app.post()`, GET요청에는 `app.get()`을 사용해 요청을 처리하면 된다. `app.all()`을 사용하면 모든 HTTP 메서드를 처리할 수 있고, `app.use()` 는 콜백함수로서 미들웨어들을 사용할 수 있다(라우터는아니다).

  이러한 라우팅 메서드들은 앱이 특정한 endpoint(라우트)와 HTTP메서드에 대한 요청을 받을 때 실행되는 콜백함수(핸들러 함수)이다. 즉, 앱은 특정한 라우트와 메서드에 매치될 요청들을 "`listen`" 하며, 요청이 매치되면 특정한 콜백 함수를 실행하는 것이다.

  사실, 라우팅 메서드들은 하나 이상의 콜백함수를 인자로 가질 수 있다. 다수의 콜백함수로 인해, `next`를 콜백함수의 인자로서 제공하는 것이 중요하고, 그 콜백  함수의 body 내에서 `next()`를 호출해 다음 콜백함수에게 control을 전달하는 것 역시 중요하다.

  다음은 `app.all()` 예시이다.

  ```js
  app.all('/secret', function (req, res, next) {
      console.log('Accessing the secret section ...')
      next() // pass control to the next handler
  })
  ```

- Route paths

  `Route paths` 는 요청이 이루어질 수 있는 endpoints를 정의한다. 문자열이거나 문자열 패턴, 또는 정규식이 `Route paths` 가 될 수 있다.

  ?, +, *, () 와 같은 문자들은 정규 표현식의 일부이다.  하이픈 - 이나 온점 . 은 문자열 기반의 paths 로 해석된다. 만약 달러 기호 $ 는 ([]) 로 감싸일 때 문자열 path 로 사용할 수 있다.

  다음은 문자열로 이루어진 `route paths`의 예시이다. 

  ```js
  // /about 에 대한 요청
  app.get('/about', function (req, res) {
    res.send('about')
  })
  // /random.text 에 대한 요청
  app.get('/random.text', function (req, res) {
    res.send('random.text')
  })
  // /acd 또는 /abcd 에 대한 요청, ?가 붙은 문자가 포함되거나 포함되지 않는 경우
  app.get('/ab?cd', function (req, res) {
    res.send('ab?cd')
  })
  // /abcd, /abbcd, /abbbcd 등에 대한 요청, +가 붙은 문자가 n개 만큼 포함되는 경우
  app.get('/ab+cd', function (req, res) {
    res.send('ab+cd')
  })
  // /abcd, /abxcd, /abRANDOMcd, /ab123cd 등에 대한 요청, ab와 cd 사이에 어떤 문자열이든 올 수 있다.
  app.get('/ab*cd', function (req, res) {
    res.send('ab*cd')
  })
  ```

- Route parameters

  라우트 매개변수는 URL의 일부분으로 해당하는 위치에 입력될 값들을 나타내기위해 사용된다. 매개변수의 값들은 `req.params` 객체 내부에서 할당하는데, `{매개변수 이름: 매개변수 값}` 의 형태이다.

  매개변수의 이름은 문자열이어야하며 -와 .이 포함될 수 있다.

  ```js
  // /users/34/books/8989에 대한 요청
  // req.params: { "userId": "34", "bookId": "8989" }
  app.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params)
  })
  ```

- Route handlers

  요청을 처리하기 위해 미들웨어같이 동작하는 다수의 콜백함수들을 제공할 수 있다. 이러한 콜백함수들은 남아있는 콜백들을 피해 처리하기 위해 `next('route')`를 호출할 수 있다. 

  You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there’s no reason to proceed with the current route.

  라우트 핸들러들은 함수의 형태일 수도, 함수들의 배열일 수도, 함수와 배열의 조합일 수도 있다. 다음은 예시이다. 

  ```js
  // 다수의 콜백함수를 사용하는 경우
  app.get('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
  }, function (req, res) {
    res.send('Hello from B!')
  })
  
  // 콜백함수들의 배열을 사용하는 경우
  const cb0 = function (req, res, next) {
    console.log('CB0')
    next()
  }
  
  const cb1 = function (req, res, next) {
    console.log('CB1')
    next()
  }
  
  const cb2 = function (req, res) {
    res.send('Hello from C!')
  }
  
  app.get('/example/c', [cb0, cb1, cb2])
  
  // 콜백함수들의 배열과 콜백함수를 함께 사용하는 경우
  const cb0 = function (req, res, next) {
    console.log('CB0')
    next()
  }
  
  const cb1 = function (req, res, next) {
    console.log('CB1')
    next()
  }
  
  app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
  }, function (req, res) {
    res.send('Hello from D!')
  })
  ```

  

  



사실 node express 를 서버용 프레임워크로 사용해보려하기 때문에 템플릿 렌더링이나 static files 부분과 관계된 내용은 깊게 찾아보진 않을 것 같다.

express 앱 구조를 다른 사람들은 어떻게 구성하고 있나 찾아보았다.

mvc 패턴 https://medium.com/swlh/best-practices-for-structuring-express-apps-1b3f0b7c9be5