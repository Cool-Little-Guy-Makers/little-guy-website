# Little Guy Creator

### Team Members:
- Luca Guerrera (33%)
- Maze Labowitz (33%)
- Kate Lyman (33%)

### To Use Online: [online link](https://littleguycreator.great-site.net/)

### Chapters:
- [Web Server Backend and Web Frontend](#web-server-backend-and-web-frontend) (`/little-guy-creator-web/`)
- [Mobile Frontend](#mobile-frontend) (`/little-guy-creator-app/`)
- [Using the REST API](#using-the-rest-api)


## Web Server Backend and Web Frontend


### File Guide:
**UPDATE AS FILES ARE ADDED.**
In `/little-guy-creator-web/`
- `ad.html`: a site advertising green beans, used in the landing page.
- `checksignin.php`: verifies a sign in attempt, setting the current user/isloggedin variables.
- `config.php`: connect to the database. (do not modify directly--it is sourced from the REST API config.php file, see later)
- `createaccount.php`: inserts new credentials into the user database after a successful registration attempt.
- `createguyhelper.php`: inserts little guy data into database after creation.
- `creator.php`: form for creating a little guy.
- `delete.php`: remove little guy information when deleted.
- `editguyhelper.php`: change data in little guy database after edit.
- `editor.php`: form for editing a little guy.
- `favicon.ico`: icon for little guy website.
- `home.php`: main page for showing your little guys and other users' little guys.
- `index.php`: landing page.
- `logout.php`: logs user out by destroying the session. Redirects to landing page.
- `registration.php`: form for making an account.
- `signin.php`: form for signing into an account.
- `style.css`: visual information for html.
- `under-construction-notice.html`: under construction page for portions of the app not yet developed.

### REST API File Guide:
**UPDATE AS FILES ARE ADDED.**
In `/little-guy-creator-web/api/`
- `index.php`: entry point for REST API calls
- `Controller/Api/BaseController.php`: helper methods for API requests
- `Controller/Api/LittleGuyController.php`: handles specific implementation details for each type of API request (see table below)
- `inc/authenticate.php`: handles authentication with JWTs
- `inc/bootstrap.php`: loads necessary files
- `inc/config.php`: database configuration (Replace this with your database's details!)
- `Model/Database.php`: generic methods to interact with SQL queries
- `Model/UserModel.php`: methods for base useful single-query requests for the program
### How to run locally:
**UPDATE AS PARAMETERS ARE ADDED.**
1. Install XAMPP and start your server, navigate to localhost/phpmyadmin/ in your browser (or equivalent depending on the xampp specifications for your OS), and under the SQL tab run the following command:
```sql
CREATE DATABASE `app-db`;

CREATE TABLE `app-db`.`users`(
    username VARCHAR(255) NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE `app-db`.`little-guys`(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    head_variant INT(2) NOT NULL,
    head_hex INT(8) NOT NULL,
    face_variant INT(2) NOT NULL,
    face_color INT(1) NOT NULL,
    body_variant INT(2) NOT NULL,
    body_hex INT(8) NOT NULL,
    arms_variant INT(2) NOT NULL,
    arms_hex INT(8) NOT NULL,
    legs_variant INT(2) NOT NULL,
    legs_hex INT(8) NOT NULL,
    iq VARCHAR(255) NOT NULL,
    FOREIGN KEY (username) REFERENCES `users`(username)
        ON DELETE CASCADE ON UPDATE CASCADE
);
```

2. Install [Composer](https://getcomposer.org/)

3. Edit the file `/little-guy-creator-web/api/inc/config.php`. It currently looks like this:
```php
<?php
define("DB_HOST", "localhost");
define("DB_USERNAME", "root");
define("DB_PASSWORD", "");
define("DB_DATABASE_NAME", "app-db");
define("SECRET_KEY", "your-secret-key");
define("TOKEN_ISSUER", "little-guy-creator");
?>
```
Replace the definitions for host, username, and password to match your user account (information found under the accounts tab in phpmyadmin). Replace the definition for secret key with a long, random string of characters—this is the key used to generate authentication tokens. You may optionally change the definition for token issuer.

4. Put the contents of `/little-guy-creator-web/` into the htdocs folder on your machine (located in the xampp folder). **Put all files straight into htdocs, not in its own folder.**

5. In your terminal, `cd` into `htdocs/api/` then run the command `composer install`

### How to use the site:

From the landing page, use the far-right button on the navigation bar at the top (labelled "sign in") to sign in to the site. You may either sign in to an existing account or register a new account using the link below the entry fields. After logging in, the site will direct you to the home page, where the CRUD functionality is. The home page displays all of the users Little Guys, as well as all the Little Guys of the other users.

You may Create a little guy using the link titled "Create a new Little Guy". After making at least one little guy, little guys can be Read and are displayed at the top of the page. The little guys can be Updated using the "edit" button to the right of your little guy, and can be Deleted using the "edit" button and then opting to delete.

*Insert world specifics*

## Mobile Frontend
### File Guide:
**UPDATE AS FILES ARE ADDED.**

In `/little-guy-creator-app/`
- `App.js`: Contains the root level native navigation stack
- `app.json`: app base data
- `config.js`: stores base url for http requests
- `index.js`: entry point for the mobile frontend
- `package.json` and `package-lock.json`: dependency data for `npm install` command
- `styles.js`: visual styles for components

Files in `/little-guy-creator-app/components/`
- `createScreen.js`: screen for creating a new little guy, contains helper functions
- `editScreen.js`: screen for editing a little guy, contains edit and delete helper functions
- `feedbackTextInput.js`: variant on TextInput with a line of text for feedback, i.e. for username and password fields that need to conform to different constraints
- `homeScreen.js`: home screen, containing little guys and buttons to sign in/out, create and edit little guys
- `inputScreen.js`: base screen for creating a little guy, used in createScreen and editScreen
- `littleGuy.js`: functions and a component to help display little guys on the home page
- `loginScreen.js`: screen for user log-in
- `logoutScreen.js`: screen for user log-out
- `registrationScreen.js`: screen to create a new account. Accessible from login screen.
- `user.js`: helper functions for dealing with user data (signing in, handling a token, etc.)
### How to run locally:
1. Ensure you have installed Node.js and the npm CLI

2. In your terminal, `cd` to the `/little-guy-creator-app/` folder

3. Run `npm install` to install package dependencies

Then, to run with Expo:

4. Download Expo Go on your phone

5. Ensure the backend server is also running (see above)

6. Assuming you're running the backend server on your local computer, replace `YOUR_IP_ADDRESS_HERE` in `/little-guy-creator-app/config.js` with the IP address of your computer.
```js
export const baseURL = 'http://YOUR_IP_ADDRESS_HERE/api/index.php'
```

7. Run `npx expo start`

8. Follow the instructions to run it on your device
### How to use the app:

While not signed in, the home page displays all users' little guys and a "Sign In" button in the top right. While signed in, the home page displays your little guys and other users' little guys in two distinct sections, and your username and a "Sign Out" button in the top right. *You may need to scroll in each section to see all little guys.*

**Creating an account**: 

Press "Sign In" in the upper right, then press "Create an account" and follow the instructions. After creating an account, you will be automatically signed in.

**Sign In/Sign Out**: 

Press "Sign In" or "Sign out" in the top right of the Home page.

**Creating a little guy**: 

Press "Create a New Little Guy". This will bring you to a page where you can customize your new little guy with preset heads, faces, bodies, arms, and legs. All colors can be picked with a hex code, except for the face details which may only be black or white.
*Insert specifics.*

**Editing a little guy**:

While in your world, click on a pre-existing little guy you would like to edit. Press the "edit" button. This will bring you to a page similar to the original create page.
*Insert specifics.*

**Deleting a little guy**: 

Press "Edit" for one of your current little guys, then press Delete Little Guy.
*Insert specifics.*

**Your world**:

*Insert specifics.*

**Visiting other users' worlds**:

*Insert specifics.*

## Using the REST API
**UPDATE AS PARAMETERS ARE ADDED.**
The following table describes API calls that can be made.

Use the base URL `http://localhost/api/index.php`, where `localhost` can be replaced with however you are running the backend server.

Protected calls require an authorization header `'Authorization': 'Bearer YOUR_TOKEN_HERE'`

| Append to URL      | Request Type | Protected? | Request Body (JSON)       | Query Params | Returns (JSON or Status Code)                                                                                                                                                             |
| ------------------ | ------------ | ---------- | ------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/guy/listAll`     | GET          |            |                           |              | `200 OK` + array of all little guys                                                                                                                                                       |
| `/guy/listUser`    | GET          |            |                           | `username`   | `200 OK` + array of all little guys belonging to `username`                                                                                                                               |
| `/guy/listNonUser` | GET          |            |                           | `username`   | `200 OK` + array of all little guys belonging to everyone except `username`                                                                                                               |
| `/guy/new`         | POST         | Yes        | `username, name, variant` |              | `201 CREATED` or `400 BAD REQUEST` (name or variant is blank) or `401 UNAUTHORIZED` (no authorization given) or `403 FORBIDDEN` (user not authorized) or `404 NOT FOUND` (user not found) |
| `/guy/change`      | PUT          | Yes        | `id, name, variant`       |              | `200 OK` or `400 BAD REQUEST` (name or variant is blank) or `401 UNAUTHORIZED` (no authorization given) or `403 FORBIDDEN` (user not authorized) or `404 NOT FOUND` (id not found)        |
| `/guy/trash`       | DELETE       | Yes        |                           | `id`         | `204 NO CONTENT` (successfully deleted) or `401 UNAUTHORIZED` (no authorization given) or `403 FORBIDDEN` (user not authorized) or `404 NOT FOUND` (id not found)                         |
| `/user/register`   | POST         |            | `username, password`      |              | `201 CREATED` or `400 BAD REQUEST` (usename or password is blank or too short) or `409 CONFLICT` (username already taken)                                                                 |
| `/user/login`      | POST         |            | `username, password`      |              | `200 OK` + username and authentication token, or `401 UNAUTHORIZED` (username or password is incorrect)                                                                                   
