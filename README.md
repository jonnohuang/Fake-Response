# Fake Response [![](https://badge.fury.io/js/fake-response.svg)](http://badge.fury.io/js/fake-response)

Get a full fake REST API with **zero coding** in **less than 30 seconds** (seriously)

Created with <3 for front-end developers who need a quick back-end for prototyping and mocking.

## Table of contents

- [Getting started](#getting-started)
- [Advantages](#advantages)
- [Good to Know](#good-to-know)
- [How To Use](#how-to-use)
  - [Default Config](#default-config)
  - [Sample DB](#sample-db)
  - [Default Data](#default-data)
  - [File Data](#file-data)
  - [URL Data](#url-data)
  - [Specific Middleware](#specific-middleware)
  - [Common Middleware](#common-middleware)
  - [Route types](#route-types)
  - [Simple example](#simple-example)
- [Default Routes](#default-routes)
- [API](#api)
- [Author](#author)
- [License](#license)

## Getting started

Install Fake Response

```
npm install  fake-response
```

Create a `db.js` file

```js
import * as fakeResponse from "fake-response";

const db = [
  {
    data: "Hello World",
    routes: ["/hello"],
  },
];

const config = {
  port: 3000,
};

fakeResponse.getResponse(db, config);
```

Run the following command on the node command line

```sh
node db.js
```

Now if you go to [http://localhost:3000/hello](http://localhost:3000/hello), you'll get

```text
Hello World
```

To watch the server for every changes you can use `nodemon`.
To install nodemon run the following command in the node command line

```
  npm i nodemon
```

Once nodemon in installed you can run the following command to watch the server for changes.

```
nodemon db.js
```

## Advantages

- Get a full fake REST API in ease
- A single response can be point to multiple route paths.
- Any file can be send as a response. (json, image, txt, etc..)
- The mock data can be maintained in different json files and urls which helps to organize your mock data
- The return response can be manipulated or overridden by a middleware method. This helps to return a response depending on the post data or request params.

## Good to Know

When doing requests, it's good to know that:

- Always start a routes with a prefix `/`. example : `/data`, `/user` etc..
- You could point multiple routes for a single data. example :

```js
const db = [
  {
    data: "Hello World",
    routes: ["/hello", "/helloWorld", "/hello/:id"],
  },
];
```

- You could also override the response. For example :

```js
const middleware = (req, res, data) => {
  return { ...data, id: 1 }; // you could return any response you wish
};
const db = [
  {
    data: "Hello World",
    routes: ["/hello", "/helloWorld"],
    middlewares: [middleware],
  },
];
```

- Here the function at first index points to the first routes index and will not execute for the second routes
- If the function you provide doesn't return anything then you will receive the default data which u have provided
- It has three different data Types.

  - `default` - The data can be in form of string | number | json
  - `file` - To send any file. Note : you must provide a absolute path of the file in the `data` property
  - `url` - fetch data from any url

## How To Use

Based on the previous `db.js` file, here are all the kinds of data and config you can use. Lets start with default config

### Default Config

You can provide your port, common middleware in the config object, if not the script run by the default config given below.

```js
const config: Config = {
  port: 3000,
  middleware: () => false,
  excludeRoutes: [],
};
```

you can provide your own config by passing the config object in the `getResponse` api. For Example :

```js
import * as fakeResponse from "fake-response";

const db = [
  {
    data: "Hello World",
    routes: ["/hello"],
  },
];

const config: Config = {
  port: 4000,
  middleware: () => (req, res, data) => console.log(new Date()),
  excludeRoutes: ["/excludedRoute"],
};

fakeResponse.getResponse(db, config);
```

### Sample Db

If you don't pass any db to the `getResponse` api by default the script runs the sample db.
You could find the sample db ["here"]("https://github.com/R35007/Fake-Response/blob/master/src/db.ts")

### Default Data

By default the data can be in form of JSON | text | number. The following example are the default data types.
Here the property `dataType` is optional. By default the property `dataType` value is `default`

```js
const db = [
  {
    data: "Hello World",
    routes: ["/text"],
  },
  {
    data: 1234,
    routes: ["/number"],
    dataType: "default", // optional for default data
  },
  {
    data: {
      id: 1,
      author: "Siva",
    },
    routes: ["/json"],
  },
];
```

### File Data

Mock DB provides you to access any file in the api.
All you is to provide the `data` property with **absolute path** of the file and set `dataType` value to `file`.
For Example:

```js
const path = require("path");

const db = [
  {
    data: path.resolve(__dirname, "../assets/users.json"), // path.resolve helps to provide you the absolute path of the file.
    dataType: "file",
    routes: ["/json"],
  },
  {
    data: path.resolve(__dirname, "../assets/Sunset_Birds.jpg"),
    dataType: "file",
    routes: ["/image"],
  },
  {
    data: path.resolve(__dirname, "../assets/article.txt"),
    dataType: "file",
    routes: ["/txt"],
  },
];
```

### URL Data

The data can be fetched from the url you provide. The data endpoint can be defined in two ways.

- Directly give the url as a string in `data` property
- Or provide and object with url and config of the endpoint. In config you could provide your authentication headers
  Here are some examples for you.

```js
const db = [
  {
    data: "https://jsonplaceholder.typicode.com/todos/1",
    dataType: "url",
    routes: ["/todos/:id"],
  },
  {
    data: {
      url: "https://jsonplaceholder.typicode.com/todos",
      config: {}, // can pass any authorization or other option. Please verify Axios
    },
    dataType: "url",
    routes: ["/todos"],
  },
];
```

### Specific Middleware

You could any method as a middleware to perform certain script actions before sending you the response.
This helps in may way that you could also override your response based on any conditions.
The methods are provided in `middlewares` property in an array the index of the method corresponds to the index of the routes.
For Example:

```js
const logTime = (req, res, data) => {
  console.log(new Date());
};

const override = () => ({ ...data, name: "ram" });

const db = [
  {
    data: { id: 1, name: "Siva" },
    routes: ["/users", "/data/:id", "/users/siva"],
    middlewares: [, override, logTime],
  },
];
```

From the above script the first route `/users` don't execute any method.
The second route `/data/:id` execute the `override` method which overrides the response as `{id:1,name:"ram"}`.
The third route `/users/siva` execute the `logTime` method which doesn't override any response but simply logs the time.

### Common Middleware

You could also provide a common middleware which runs for every routes.
The common middleware method is provided inside the `config` object. Some routes can also be excluded from common middleware being executed using the `excludedRoutes`. For Example:

```js
import * as fakeResponse from "fake-response";

const commonMiddleware = () => console.log(new Date());

const db = [
  {
    data: "Hello World",
    routes: ["/hello"],
  },
];

const config: Config = {
  port: 4000,
  middleware: commonMiddleware,
  excludeRoutes: ["/excludedRoute"],
};

fakeResponse.getResponse(db, config);
```

Here the `commonMiddleware` logs time for every route request except the `excludeRoutes`.

### Route types

This package is built upon express jS. Please visit [expressJs](https://expressjs.com/en/guide/routing.html) for configuring different route paths.

### Simple example

Here is simple example for starter. Runs at ["http://localhost:3000"]("http://localhost:3000")

```js
import * as fakeResponse from "fake-response";

fakeResponse.getResponse(); // runs by default sample db and config
```

## Default Routes

- `Home` - [http://localhost:3000](http://localhost:3000)
- `Db` - [http://localhost:3000/db](http://localhost:3000/db)
- `Routes List` - [http://localhost:3000/routesList](http://localhost:3000/routesList)

The routes and port can be overridden in the `db.js` configs

## API

- `getResponse(db,config)` = generates a API and returns a promise of response `{db,config,fullDbData}`
- `getSampleDb()` = gets the sample db provided inside the script

## Author

**Sivaraman** - sendmsg2siva.siva@gmail.com

- _Website_ - [https://r35007.github.io/Siva_Profile/](https://r35007.github.io/Siva_Profile/)
- _Portfolio_ - [https://r35007.github.io/Siva_Profile/portfolio](https://r35007.github.io/Siva_Profile/portfolio)
- _GitHub_ - [https://github.com/R35007/Fake-Response](https://github.com/R35007/Fake-Response)

## License

MIT
