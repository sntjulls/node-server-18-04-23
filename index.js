const http = require('http');
const fs = require('fs');
const users = []; //db

const reqListen = {
  GET: {
    '/' : './views/index.html'
  }
}

const requestListener = (req, res) => {
  // console.log('req method: ', req.method);
  // console.log('req url: ', req.url);
  const { method, url } = req;
  if (method === "GET") {
    if (url === "/") {
      fs.readFile("./views/index.html", "utf-8", (err, data) => {
        if (err) {
          console.log("======>>>>> err: ", err);
          res.end("500");
        }
        res.end(data);
      });
      return;
    }
    if (url === "/about") {
      fs.readFile("./views/about.html", "utf-8", (err, data) => {
        if (err) {
          console.log("======>>>>> err: ", err);
          res.end("500");
        }
        res.end(data);
      });
      return;
    }
    if (url === "/contacts") {
      fs.readFile("./views/contacts.html", "utf-8", (err, data) => {
        if (err) {
          console.log("======>>>>> err: ", err);
          res.end("500");
        }
        res.end(data);
      });
      return;
    }
  }
  if (method === "POST") {
    if (url === "/users") {
      let jsonString = '';
    req.on('data', (chunk) => {
jsonString += chunk;
    })
    req.on('end', () => {
      const user = JSON.parse(jsonString);
      delete user.password;
      user.id = Date.now();
      user.push(user);
      res.end(JSON.stringify(user))
    })
      return;
    }
  }
  fs.readFile("./views/404.html", "utf-8", (err, data) => {
    if (err) {
      console.log("======>>>>> err: ", err);
      res.end("500");
    }
    res.end(data);
  });
};

const server = http.createServer(requestListener);

const port = 3000;
server.listen(port);
