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
    "email": "youremail@domain.com"
  }
```

* Response: 200, 400, 409

2. GET /api/v1/verify
* Description - verify hash of email
* Response: 200, 401

3. POST /api/v1/deploy
* Description - deploy the function
* Response body

```json
  {
    "code": "function func(){}; func();",
    "language": "javascript"
  }
```

* Response - 200, 400, 401

4. GET /api/v1/:compressedToken/userFunction
* Description - HTTP trigger for the serverless function
* Response - 200

## Example
```js
  //Authenticate user
  await axios.post("/api/v1/auth", { email: "email@sus.com" });

  //Verify user
  await axios.get("/api/v1/verify");

  //Deploy function
  await axios.post("/api/v1/deploy", 
  {
    "code": "function F(){}; F();"
    "language": "javascript" 
  });

  // HTTP trigger for function
  await axios.post("/api/v1/:compressedToken/userFunction") //compressed token is the first 10 characters of your hashed email

```

## License
### [wtfpl](https://choosealicense.com/licenses/wtfpl/)