# Express

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

     

- `listen`과 `Tcp`

   웹에서 서버와 클라이언트가 통신하기 위해 여러 프로토콜을 거치게된다. 조금 더 자세하게는 HTTP, TCP, IP 등의 프로토콜을 거쳐 데이터가 호스트에서 호스트로 전달되는데, TCP는 HTTP와 IP의 중간에서 데이터를 분해하고 옮기고 다시 조립하는 역할을 한다.

   이때 `port`는 앱(프로세스)의 식별 값이다. 호스트 내에 통신하는 수많은 앱(프로세스)들이 있기 때문에 각각을 구별해야하기 때문이다. 위 코드는 호스트에서 3000번 `port`를 `app.js`에게 부여한다.

   모든 `port`에는 `passive socket`이 하나씩 부여된다. `socket`은 TCP 계층에서 데이터가 도착해야 할 앱을 식별할 수 있는 endpoint로 역할하는 구조체로, `socket`을 통해 각각 데이터 전송이 이루어진다.(socket이 많으면 동시에 처리할 수 있는 통신이 많아진다.) 다시 `passive socket`은 접속 요청을 기다리는 데, 연결이 이루어지면 실제 데이터를 주고 받는 `active socket`을 하나 생성하고 전송이 끝나면 해당 소켓을 제거한다. 

   `passive socket`이 접속 요청을 기다리는 상태를 `listen`이라고 한다. 간단히 정리하면 서버가 클라이언트의 접속요청을 기다리는 것이 `listen`이다.

  [TCP](https://ko.wikipedia.org/wiki/%EC%A0%84%EC%86%A1_%EC%A0%9C%EC%96%B4_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C), [OSI계층과 TCP/IP 모델](https://medium.com/harrythegreat/osi%EA%B3%84%EC%B8%B5-tcp-ip-%EB%AA%A8%EB%8D%B8-%EC%89%BD%EA%B2%8C-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-f308b1115359), [HTTP, TCP/IP](https://medium.com/@chrisjune_13837/web-http-tcp-ip-%EB%A9%94%EC%8B%9C%EC%A7%80%EB%9E%80-4b2721fe296f), [TCP의 hand shake](https://medium.com/@saven7788/layer4%EC%97%90%EC%84%9C-%ED%95%98%EB%8A%94-%EC%9D%BC-tcp-vs-udp-49ad6ade602), [소켓과 포트](http://blog.naver.com/PostView.nhn?blogId=myca11&logNo=221389847130), [소켓과 포트2](https://medium.com/fantageek/understanding-socket-and-port-in-tcp-2213dc2e9b0c), [소켓](https://docs.oracle.com/javase/tutorial/networking/sockets/definition.html)를 참고함



