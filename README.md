
# Machine Test

Implement NodeJS api application using NodeJS(express) as server and MongoDB as database, with below functionality.

### SignUp
- implement one signup API for user registration(with just username and password), should store the data in the DB
- should check for user name duplication 
- implement hashing for password 
### Login
- implement one login API, should verify the given credentials with the one in DB, proceed accordingly.
- if login failed: return error message in api response
### Products List
- implement one products API(with get method), which should fetch data from the given("https://dummyjson.com/products") external API and return to the client.
- only logged in users should be able to access this api. 




## Requirements

```
Node 20.8.0
Mongodb 7.0.2
Mongosh 2.0.1
```

## Run Locally

### - Docker Container
Clone the project

```bash
  git clone https://github.com/rajeshkrc/store.git
```

Go to the project directory

```bash
  cd my-project
```

Build image and run containers 

```bash
  docker-compose up
```

### - Manual setup 
Clone the project

```bash
  git clone https://github.com/rajeshkrc/store.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## API Reference

#### Register user

```http
  POST /api/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required** |
| `Password` | `string` | **Required** |

#### Login user

```http
  POST /auth/api/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required** |
| `Password` | `string` | **Required** |

#### Get all products

```http
  GET /api/products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `string` | **Required**. JWT token in request header |


#### Logout user

```http
  GET /auth/api/logout
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `string` | **Required**. JWT token in request header |

