# Forum API Skeleton for Any Objectives
**Establish a forum with infrastructure rapidly to achieve your desired objective.**
>A Node.js REST API build using Express, Sequelize and more.

## Features
This project provide two types of privileges: Admin and User.
1. Admin privilege:
	+ Manipulate object
		- Create、update and delete object
		- Categorize object.
	+ Manage category
		- Create、update and delete category
	+ Analysis (work in progress)
		- Comments of a specific object
		- Comments from a specific user
		- Objectives that a specific user has commented on or favorited
2. User privilege
	+ Get a list of objects
	+ View detailed information about objects
	+ Favorite and like objects
	+ Leave comment on objects
	+ Follow other users

In addition, the project includes the following features:
+ A feed to display the most recently created objectives and comments
+ A list of the popular objectives and followings
+ Account registration、login and logout.
+ User profile and dashboard for managing personal settings and activities

## Table of Contents
+ [How To Use](#how-to-use)
+ [Directory Stucture](#directory-stucture)
+ [Models](#models)
+ [API Endpoints](#api-endpoints)
+ [User and HTTP Request Authentication](#user-and-http-request-authentication)

## How To Use
```
1. Clone this repository
$ git clone https://github.com/dianaguu/forum-api-skeleton.git

2. Navigate to the repository
$ cd forum-api-skeleton

3. Install dependencies
$ npm install

4. Create a .env file (refer to .env.example)

5.1. Build Database once for all
$ npm run database

5.2. Build Database in steps
a) Create database
   $ npm run db:create
b) Migrate database
   $ npm run db:migrate
c) Setup seed data
   $ npm run db:seed

6. Run the app
$ npm start
```

## Directory Stucture
+ `/routes` navigate incoming HTTP requests and led to a chain of middlewares.
+ `/middlewares` preprocess HTTP requests, or handle third-party modules.
+ `/controllers` (share the identical structure with routes) 
	- pass the necessary data of HTTP requests to services
	- receive the processed result from services, then the controller will generate a response to send back to the client.
+ `/services` perform business logics, mainly like database access or external API call.
+ `/pages` offer a Intuitive demonstration.

```
├─ configs/
│  ├─ database.js
│  ├─ passport.js
├─ controllers/
│  └─ apis/
│  │  └─ admin/
│  │  │   ├─ analysis.controller.js
│  │  │   ├─ category.controller.js
│  │  │   ├─ objective.controller.js
│  │  │   └─ user.controller.js
│  │  └─ main/
│  │  │   ├─ account.controller.js
│  │  │   ├─ comment.controller.js
│  │  │   ├─ favorite.controller.js
│  │  │   ├─ feed.controller.js
│  │  │   ├─ follow.controller.js
│  │  │   ├─ like.controller.js
│  │  │   ├─ objective.controller.js
│  │  │   ├─ popular.controller.js
│  │  │   └─ user.controller.js
│  └─ pages/
├─ helper/
├─ middlewares/
│  ├─ apiAuthentication.js
│  ├─ errorHandler.js
├─ migrations/
├─ models/
├─ routes/
├─ seeders/
├─ services/
├─ views/
├─ app.js
```
## Models
| Table     | Columns                                                                         | FK                                   |
| :-------- | :------------------------------------------------------------------------------ | :----------------------------------- |
| Category  | id, name        | categoryId [1 category : M objectives] |
| Comment   | id, text        | objectiveId [1 comment : 1 objective] <br> userId [1 comment : 1 user] |
| Favorite  | id, objectiveId, userId                                                         |                                      |
| Followship| id, followerId, followingId                                                     |                                      |
| Like      | id, objectiveId, userId                                                         |                                      |
| Objective | id, name, telephone, address, openingHours, description, image, views           | categoryId [1 objective : 1 category] <br> objectiveId [1 objective : M comments] <br> objectiveId as FavoriteUsers [M objective : M user] <br> objectiveId as LikeUsers [M objective : M user] |
| User      | id, name, email, password, isAdmin, image                                       | userId [1 user : M comments] <br> userId as FavoriteObjectives [M users : M objectives] <br> userId as LikeObjectives [M users : M objectives] <br> followingId as Followers [M users : M Followers] <br> followerId as Followings [M users : M Followings] |

## API Endpoints
Two types of privileges: Admin and User.
### 1 Admin
##### 1-1 Objective
| Method     |  Endpoint                                                     | Description         |
| ------------- | -------------------------------------------------------- | ---------------------- |
| POST | http://localhost:3000/api/v1/admin/objectives | Create a Objective |
| GET | http://localhost:3000/api/v1/admin/objectives/ | List all Objectives |
| GET | http://localhost:3000/api/v1/admin/objectives/id | Get a Objective |
| PUT | http://localhost:3000/api/v1/admin/objectives/id | Update a Objective |
| DELETE | http://localhost:3000/api/v1/admin/objectives/id | Delete a Objective|

#####  1-2 User
| Method     |  Endpoint                                                     | Description         |
| ------------- | -------------------------------------------------------- | ---------------------- |
| GET | http://localhost:3000/api/v1/admin/users | List all Users |
| GET | http://localhost:3000/api/v1/admin/users?isAdmin=1 | LIst all Admin Users |
| PATCH | http://localhost:3000/api/v1/admin/users/id | Switch the Privilege of User |

##### 1-3 Category
| Method     |  Endpoint                                                     | Description         |
| ------------- | -------------------------------------------------------- | ---------------------- |
| POST | http://localhost:3000/api/v1/admin/categories | Create a Category |
| GET | http://localhost:3000/api/v1/admin/categories | List all Categories |
| PUT | http://localhost:3000/api/v1/admin/categories/id | Update a Category |
| DELETE | http://localhost:3000/api/v1/admin/categories/id | Delete a Category |

#####  1-4 Analysis/Objective
| Method     |  Endpoint                                                     | Description         |
| ------------- | -------------------------------------------------------- | ---------------------- |
| GET | http://localhost:3000/api/v1/admin/analysis/objective/id?key=comments | List Comments of a Objective |

#####  1-5 Analysis/User
| Method     |  Endpoint                                                     | Description         |
| ------------- | -------------------------------------------------------- | ---------------------- |
| GET | http://localhost:3000/api/v1/admin/analysis/user/id?key=commented-objectives | List Objectives a User commented |
| GET | http://localhost:3000/api/v1/admin/analysis/user/id?key=favorited-objectives | List Objectives a User favorited |
| GET | http://localhost:3000/api/v1/admin/analysis/user/id?key=comments | List Comments from a User |
| GET | http://localhost:3000/api/v1/admin/analysis/user/id?key=followers | List Followers of a User |
| GET | http://localhost:3000/api/v1/admin/analysis/user/id?key=followings |List Followings of a User |

------------
### 2 User/Main
#####  2-1 Objective
| Method     |  Endpoint                                                     | Description         |
| ------------- | -------------------------------------------------------- | ---------------------- |
| GET | http://localhost:3000/api/v1/objectives/id | Get a Objective |
| GET | http://localhost:3000/api/v1/objectives/id/dashboard | Get a Objective's Dashboard |
| GET | http://localhost:3000/api/v1/objectives?limit=10&page=1&categoryId=1 | List all Objectives |

#####  2-2 Account
| Method     |  Endpoint                                                     | Description         |
| ------------- | -------------------------------------------------------- | ---------------------- |
| POST | http://localhost:3000/api/v1/account/signin | Sign In |
| POST | http://localhost:3000/api/v1/account/signup | Sign Up |
| POST | http://localhost:3000/api/v1/account/signoff | Sign Off |

##### 2-3 User
| Method     |  Endpoint                                                     | Description         |
| ------------- | -------------------------------------------------------- | ---------------------- |
| GET | http://localhost:3000/api/v1/users/id | Get a User |
| GET | http://localhost:3000/api/v1/users/id/dashboard | Get a User's Dashboard |
| PUT | http://localhost:3000/api/v1/users/id | Update a User Information |

#####  2-4 Feed
| Method     |  Endpoint                                                     | Description         |
| ------------- | -------------------------------------------------------- | ---------------------- |
| GET | http://localhost:3000/api/v1/feed/objectives?limit=10 | List recent created Objectives|
| GET | http://localhost:3000/api/v1/feed/comments?limit=10 | List recent created Comments |

#####  2-5 Popular
| Method     |  Endpoint                                                     | Description         |
| ------------- | -------------------------------------------------------- | ---------------------- |
| GET | http://localhost:3000/api/v1/popular/objectives?limit=10 | List popular Objectives |
| GET | http://localhost:3000/api/v1/popular/followings?limit=10 | List popular Followings |

#####  2-6 Comment
| Method     |  Endpoint                                                     | Description         |
| ------------- | -------------------------------------------------------- | ---------------------- |
| POST | http://localhost:3000/api/v1/comments | Create a Commet |
| DELETE | http://localhost:3000/api/v1/comments/id | Delete a Comment |

#####  2-7 Favorite
| Method     |  Endpoint                                                     | Description         |
| ------------- | -------------------------------------------------------- | ---------------------- |
| POST | http://localhost:3000/api/v1/favorite/id | Favorite a Objective |
| DELETE | http://localhost:3000/api/v1/favorite/id | Unfavorite a Objective |

#####  2-8 Follow
| Method     |  Endpoint                                                     | Description         |
| ------------- | -------------------------------------------------------- | ---------------------- |
| POST | http://localhost:3000/api/v1/follow/id | Follow a User |
| DELETE | http://localhost:3000/api/v1/follow/id | Unfollow a User |

#####  2-9 Like
| Method     |  Endpoint                                                     | Description         |
| ------------- | -------------------------------------------------------- | ---------------------- |
| POST | http://localhost:3000/api/v1/like/id | LIke a Objectvie |
| DELETE | http://localhost:3000/api/v1/like/id | Unlike a Objective |

## User and HTTP Request Authentication
Use JWT in cookie and set httpOnly
