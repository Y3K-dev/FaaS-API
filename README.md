# Serverless Functions API
 
## Prerequisites
* Node.js (v12 or later)
* npm(v6 or later)

## Routes
1. POST /api/v1/auth
* Description - passwordless authentication using email 
* Response body 

```json
  {
    "email": "youremail@domain"
  }
```

* Response: 200, 400, 409

2. POST /api/v1/deploy
* Description - deploy the function
* Response body

```json
  {
    "code": "function F(){}; F();",
    "language": "javascript"
  }
```

* Response - 200, 400, 401

3. GET /api/v1/:hash/userFunction
* Description - HTTP trigger for the serverless function
* Response - 200, 400

## Example
```js
  //Authenticate user
  await axios.post("/api/v1/auth", { email: "email@sus.com" });

  //Deploy function
  await axios.post("/api/v1/deploy", 
  {
    "code": "function F(){}; F();"
    "language": "javascript" 
  });

  // HTTP trigger for function
  await axios.get("/api/v1/:hash/userFunction")
```

## License
### [wtfpl](https://choosealicense.com/licenses/wtfpl/)