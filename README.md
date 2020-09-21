# TASK MANAGEMENT SYSTEM
This app is created as part of the recruitment process at 2359

## Build by
This app build using:
1. node v12.18.4
2. npm v6.14.6
3. postgreSql 10
4. npx v6.14.6

## Setup
1. Clone repo
2. Run `npm install`
3. Run `npm run db:create`
4. Run `npm test` for unit test

## Routes 

### Index
If nothing wrong when build the app this routes should render index page
* **[Get]** /
    * response success

            Index page with `Express` as content

### User
User have three APIs, signup, signin and signout
* **[Post]** /user/signup
  Add new user
    * request

            json:
            {
                "username": string, --mandatory
                "password": string  --mandatory
            }
            
            example:
            {
                "username": "username",
                "password": "username"
            }

    * response success

            json:
            {
                "message": "Success to register",
                "data" : {
                  user_model
                }
            }
            response code:
                201

    * response error

            json:
            {
                "message": "Validation Error"
            }
            response code:
                400 -> Bad Request

* **[Post]** /user/signin
  User signin
    * request

            json:
            {
                "username": string, --mandatory
                "password": string  --mandatory
            }
            
            example:
            {
                "username": "username",
                "password": "username"
            }

    * response success

            json:
            {
                "message": "Success to login",
                "data" : {
                  "message": "Authentication successful!",
                  "token": token_string
                }
            }
            response code:
                200

    * response error

            json:
            {
                "message": "Validation Error"
            }
            response code:
                400 -> Bad Request

            json:
            {
                "message": "User not found"
            }
            response code:
                404 -> Not Found   

            json:
            {
                "message": "Incorrect password"
            }
            response code:
                401 -> Unauthorized
    
* **[Post]** /user/signout
  User signout
    * response success

            json:
            {
                "message": "Success to logout"
            }
            response code:
                200

### Task
Task is used for adding and get list of task based on user logon
* **[Post]** /task/add
  Add new task
    * request
            header:
              Authorization: Bearer token
            json:
            {
                "startTime": string,  --mandatory
                "endTime": string,
                "location": string,
                "eventTask": string   --mandatory
            }
            
            example:
            {
                "startTime": "2020-03-03 17:00:00",
                "endTime": "2020-03-03 20:00:00",
                "location": "Swimming pool",
                "eventTask": "swimming"
            }

    * response success

            json:
            {
                "message": "Success to create task",
                "data" : {
                  task_model
                }
            }
            response code:
                201

    * response error

            json:
            {
                "message": "Validation Error"
            }
            response code:
                400 -> Bad Request

            json:
            {
                "message": "Failed to validate token"
            }
            response code:
                401 -> Unauthorized

* **[Get]** /task/list
  Add new task
    * request
            header:
              Authorization: Bearer token
            query param:
              startTime: string
              location: string
            
            example:
              startTime: "2020-03-03 17:00:00",
              location: "Swimming pool"

    * response success

            json:
            {
                "message": "Success",
                "data" : [
                    task_model
                ]
            }
            response code:
                200

    * response error

            json:
            {
                "message": "Not Found"
            }
            response code:
                404 -> Bad Request

            json:
            {
                "message": "Failed to validate token"
            }
            response code:
                401 -> Unauthorized