# Popup

A backend for the Popup app built in the Node.js Express framework and MySQL

### /posts

Returns a list of all posts

### /events

Returns a list from all events

## /p - Post Routes

### /p/:postid

Returns the particular post whose id matches <postid>

## /u - User Routes

### /u/:username

Returns the particular user whose username matches <username>

### /u/:username/posts

Returns a list of all posts posted by the user whose username matches <username>

### /u/:username/events

Returns a list of all events the user whose username matches <username> belongs to

## /e - Event Routes

### /e/:eventname

Returns the particular event whose name matches <eventname>

### /e/:eventname/posts

Returns a list of all posts whose event matches <eventname>

### /e/:eventname/users

Returns a list of all users who belong to the event whose name matches <eventname>

##Session ROutes - Browser Only

### /login

Creates a session for the user if username and password are correct

### /logout

Destroys the session created with the /login route

### /signup

Creates a user with provided username, bio, and password

### /edit

Replaces the current user's username, bio, and password with those provided

## Content Creation Routes

### /newpost

Uploads the provided image

### /newevent

Creates a new event from the provided name, description, and owner

### /delpost

Deletes a post with id matching <postid>

### /delevent

Deletes an event with id matching <eventid>