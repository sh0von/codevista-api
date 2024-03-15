# API Documentation

## Authentication Endpoints

### Register User
- **Endpoint:** `/api/users/register`
- **Method:** POST
- **Description:** Register a new user.
- **Request Body:**
  - `username` (String, required): User's username.
  - `email` (String, required): User's email address.
  - `password` (String, required): User's password.
- **Response:**
  - Status Code: 201 Created
  - Body: Newly registered user object
- **Error Responses:** Same as above

### Login User
- **Endpoint:** `/api/users/login`
- **Method:** POST
- **Description:** Authenticate and login a user.
- **Request Body:**
  - `email` (String, required): User's email address.
  - `password` (String, required): User's password.
- **Response:**
  - Status Code: 200 OK
  - Body: JWT token for authenticated user
- **Error Responses:** Same as above

## User Endpoints

### Get User Profile
- **Endpoint:** `/api/users`
- **Method:** GET
- **Description:** Retrieve the profile information of the authenticated user.
- **Authorization:** Required (Bearer Token)
- **Response:**
  - Status Code: 200 OK
  - Body: User profile object
- **Error Responses:** Same as above

### Update User Profile
- **Endpoint:** `/api/users`
- **Method:** PUT
- **Description:** Update the profile information of the authenticated user.
- **Authorization:** Required (Bearer Token)
- **Request Body:** Same as register user endpoint, excluding password
- **Response:** Same as register user endpoint
- **Error Responses:** Same as above

### Delete User Account
- **Endpoint:** `/api/users`
- **Method:** DELETE
- **Description:** Delete the account of the authenticated user.
- **Authorization:** Required (Bearer Token)
- **Response:**
  - Status Code: 204 No Content
  - Body: Empty
- **Error Responses:** Same as above

## Snippet Endpoints

### Get All Snippets
- **Endpoint:** `/api/snippets`
- **Method:** GET
- **Description:** Retrieve a list of all snippets.
- **Authorization:** Optional
- **Response:**
  - Status Code: 200 OK
  - Body: List of snippets
- **Error Responses:** Same as above

### Get Snippet by ID
- **Endpoint:** `/api/snippets/:snippetId`
- **Method:** GET
- **Description:** Retrieve a specific snippet by its ID.
- **Authorization:** Optional
- **Response:**
  - Status Code: 200 OK
  - Body: Snippet object
- **Error Responses:** Same as above

### Create Snippet
- **Endpoint:** `/api/snippets`
- **Method:** POST
- **Description:** Create a new snippet.
- **Authorization:** Required (Bearer Token)
- **Request Body:**
  - `title` (String, required): Title of the snippet.
  - `description` (String): Description of the snippet.
  - `code` (String, required): Code content of the snippet.
  - `language` (String, required): Programming language of the snippet.
- **Response:**
  - Status Code: 201 Created
  - Body: Newly created snippet object
- **Error Responses:** Same as above

### Update Snippet
- **Endpoint:** `/api/snippets/:snippetId`
- **Method:** PUT
- **Description:** Update an existing snippet by its ID.
- **Authorization:** Required (Bearer Token)
- **Request Body:** Same as create snippet endpoint
- **Response:** Same as create snippet endpoint
- **Error Responses:** Same as above

### Delete Snippet
- **Endpoint:** `/api/snippets/:snippetId`
- **Method:** DELETE
- **Description:** Delete a snippet by its ID.
- **Authorization:** Required (Bearer Token)
- **Response:**
  - Status Code: 204 No Content
  - Body: Empty
- **Error Responses:** Same as above

### Approve/Disapprove Snippet
- **Endpoint:** `/api/snippets/approve/:snippetId`
- **Method:** PUT
- **Description:** Approve or disapprove a snippet by its ID.
- **Authorization:** Required (Bearer Token)
- **Request Body:**
  - `is_approved` (Boolean): Set to true to approve, false to disapprove.
- **Response:**
  - Status Code: 200 OK
  - Body: Message confirming snippet approval/disapproval
- **Error Responses:** Same as above

### Love a Snippet
- **Endpoint:** `/api/snippets/love/:snippetId`
- **Method:** PUT
- **Description:** Love a snippet by its ID.
- **Authorization:** Required (Bearer Token)
- **Response:**
  - Status Code: 200 OK
  - Body: Message confirming snippet loved
- **Error Responses:** Same as above

## Comment Endpoints

### Add Comment to Snippet
- **Endpoint:** `/api/comments/:snippetId`
- **Method:** POST
- **Description:** Add a comment to a specific snippet.
- **Authorization:** Required (Bearer Token)
- **Request Body:**
  - `content` (String, required): Content of the comment.
- **Response:**
  - Status Code: 201 Created
  - Body: Newly created comment object
- **Error Responses:** Same as above

### Delete Comment
- **Endpoint:** `/api/comments/:commentId`
- **Method:** DELETE
- **Description:** Delete a comment by its ID.
- **Authorization:** Required (Bearer Token)
- **Response:**
  - Status Code: 204 No Content
  - Body: Empty
- **Error Responses:** Same as above

### Get All Comments for Snippet
- **Endpoint:** `/api/comments/:snippetId`
- **Method:** GET
- **Description:** Retrieve a list of comments for a specific snippet.
- **Authorization:** Optional
- **Response:**
  - Status Code: 200 OK
  - Body: List of comments for the snippet
- **Error Responses:** Same as above

## Favorite Endpoints

### Add Snippet to Favorites
- **Endpoint:** `/api/favorites/:snippetId`
- **Method:** POST
- **Description:** Add a snippet to the authenticated user's favorites.
- **Authorization:** Required (Bearer Token)
- **Response:**
  - Status Code: 200 OK
  - Body: Message confirming snippet added to favorites
- **Error Responses:** Same as above

### Remove Snippet from Favorites
- **Endpoint:** `/api/favorites/:snippetId`
- **Method:** DELETE
- **Description:** Remove a snippet from the authenticated user's favorites.
- **Authorization:** Required (Bearer Token)
- **Response:**
  - Status Code: 200 OK
  - Body: Message confirming snippet removed from favorites
- **Error Responses:** Same as above

## Notification Endpoints

### Get Notifications for User
- **Endpoint:** `/api/notifications`
- **Method:** GET
- **Description:** Retrieve notifications for the authenticated user.
- **Authorization:** Required (Bearer Token)
- **Response:**
  - Status Code: 200 OK
  - Body: List of notifications
- **Error Responses:** Same as above
