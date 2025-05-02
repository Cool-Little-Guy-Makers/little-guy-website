# Little Guy Creator

### Team Members:
- Luca Guerrera (33%)
- Maze Labowitz (33%)
- Kate Lyman (33%)

### Chapters:
- [Web Server Backend](#web-server-backend) (`/little-guy-creator-web/`)
- [Mobile Frontend](#mobile-frontend) (`/little-guy-creator-app/`)
- [Using the REST API](#using-the-rest-api)


## Web Server Backend
*Please note: In an effort to focus production on a polished mobile experience, the web frontend was
deprecated and removed from this repository. See Release 1.1.0 for a version with a web frontend.*


### File Guide:
REST API Files In `/little-guy-creator-web/api/`
- `index.php`: entry point for REST API calls
- `Controller/Api/BaseController.php`: helper methods for API requests
- `Controller/Api/LittleGuyController.php`: handles specific implementation details for each type of API request (see table below)
- `inc/authenticate.php`: handles authentication with JWTs
- `inc/bootstrap.php`: loads necessary files
- `inc/config.php`: database configuration (Replace this with your database's details!)
- `Model/Database.php`: generic methods to interact with SQL queries
- `Model/UserModel.php`: methods for base useful single-query requests for the program
- `test-little-guys/tests/UserTests.php`: module for running backend user tests

### How to run locally:
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
    head_hex VARCHAR(8) NOT NULL,
    face_variant INT(2) NOT NULL,
    face_color VARCHAR(8) NOT NULL,
    body_variant INT(2) NOT NULL,
    body_hex VARCHAR(8) NOT NULL,
    arms_variant INT(2) NOT NULL,
    arms_hex VARCHAR(8) NOT NULL,
    legs_variant INT(2) NOT NULL,
    legs_hex VARCHAR(8) NOT NULL,
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

### Running the testing environment:

1. In your terminal, navigate to `htdocs/api/test-guys`.
2. Make sure that you have composer installed. Run the terminal command `composer require guzzlehttp/guzzle` to install guzzle.
3. Run `./vendor/bin/phpunit ./tests/UserTests.php`.

#### Exploring the use of Generative AI in software testing:

I love making software, but I hate writing code, learning about code, making mistakes, being able to explain my code to my peers, having direct involvement in what the final product is, and the environment. To account for these preferences, Generative AI is a helpful tool that can expedite the process of test-writing and code review. It can write appropriate stress-tests, or provide a helpful framework for more specific use-cases. Peer-review and specialized testing that takes into consideration the holistic product and how it will be used both by clients and developers? No thanks! I prefer a soulless amalgamation of proverbial fecal matter that is billions of stack overflow discussions, reddit threads, and blog posts so that when I am sitting in my bed at 4 AM, sweat tracing its way down my neck, hours-deep into my "Synthwave/Breakcore/T-Girl Producer" playlist, I can let my eyes glaze over as I type, "Now design a test using PHPUnit that is supposed to give a 401 Response" and watch in helpless dismay as this text-predictor generates the same malfunctioning test for a fourth time. In fact, I love using Generative AI so much that I made it write this whole section of the README. I am so averse to effort that I outsourced the process of evaluating and analyzing a piece of software to the software itself. I hate creation. I hate thinking. I like stealing work and I think that Apple TV's "Severance" is interesting because of the goats. I am excited by the future of Generative AI.

## Mobile Frontend
### File Guide:
In `/little-guy-creator-app/`:
- `App.js`: Contains the root level native navigation stack
- `app.json`: app base data
- `config.js`: stores base url for http requests
- `index.js`: entry point for the mobile frontend
- `package.json` and `package-lock.json`: dependency data for `npm install` command
- `styles.js`: visual styles for components
- `assets/assetList.js`: loads asset files

Files in `/little-guy-creator-app/components/`
- `creatorHelpers.js`: helper functions to add, edit, and delete little guys from the database
- `creatorScreen.js`: screen for creating a new little guy or editing an existing little guy, with tabs for each body part (each is an optionsSection)
- `feedbackTextInput.js`: variant on TextInput with a line of text for feedback, i.e. for username and password fields that need to conform to different constraints
- `landingPage.js`: a static landing page while logged out, and a list of users' Rooms to visit while logged in.
Contains buttons to sign in/out
- `littleGuy.js`: functions and a component to help get and display little guys
- `littleGuyEntity.js`: component for a little guy that roams around a rectangle randomly
- `littleGuyImage.js`: component to render a custom little guy image, given a little guy variant object
- `loginScreen.js`: screen for user log-in
- `logoutScreen.js`: screen for user log-out
- `optionsSection.js`: displays all the options for one body part which can be selected and recolored
- `registrationScreen.js`: screen to create a new account. Accessible from login screen.
- `roomScreen.js`: screen with a room of a users little guys as LittleGuyEntities. Can create, edit, and take a screenshot of little guys
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

8. Follow the instructions to run it on your device or emulator
### How to use the app:

While not signed in, the landing page displays a static image and a "Sign In" button in the top right. While
signed in, it instead shows a home page with a list of all users' Rooms, with your Room at the top, and a "Sign
Out" button in the top right. Pressing on a button lets you view that room. *You may need to scroll to see all
rooms.*

#### Creating an account: 

Press "Sign In" in the upper right, then press "Create an account" and follow the instructions. After creating an account, you will be automatically signed in.

#### Sign In/Sign Out: 

Press "Sign In" or "Sign out" in the top right of the Home page.

#### Viewing your room:

While signed in, a button leading to your room appears at the top of the home page, starting with a 👑.
In your room, you will see your little guys, and they will randomly pick a location to move to and move towards
that location. While moving, the little guys waddle.

#### Creating a little guy: 

From your room, press "Create New Little Guy" in the bottom left. This brings you to a page where you can customize your new little guy with preset heads, faces, bodies, arms, and legs.

To customize each body part, select the corresponding tab, then tap on the chosen style for that part.
Press "Change Color" to select a color for that body part. Hex codes are used for all colors except for the
face details which may only be black or white.

You must also give your guy a name in the "Name" box.

Once you're ready, tap "Create My Guy".

#### Editing a little guy:

While in your room, tap on a little guy that you would like to edit. This brings you to a page similar to the original create page.

#### Deleting a little guy: 

While in your room, tap on a little guy that you would like to delete. This brings you to the edit dialog, where there is also a button you can press to "Delete This Guy".

#### Visiting other users' rooms:

While signed in, you can access any user's room from the home page. You may need to scroll to see all rooms.
While visiting someone else's room, you cannot create a new little guy or edit a little guy in that room, but
you may take a screenshot just like in your room.

#### Taking a screenshot:

While in any room, you can press the "Take A Screenshot" button which will capture the image of the current
room and prompt a share dialog where you can save the image or send it to your friends.

## Using the REST API
The following table describes API calls that can be made.

Use the base URL `http://localhost/api/index.php`, where `localhost` can be replaced with however you are running the backend server.

Protected calls require an authorization header `'Authorization': 'Bearer YOUR_TOKEN_HERE'`. Clients receive an
authorization token on a successful login.

| Append to URL      | Request Type | Protected? | Request Body (JSON)       | Query Params | Returns (JSON or Status Code)                                                                                                                                                             |
| ------------------ | ------------ | ---------- | ------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/guy/listAll`     | GET          |            |                           |              | `200 OK` + array of all little guys                                                                                                                                                       |
| `/guy/listUser`    | GET          |            |                           | `username`   | `200 OK` + array of all little guys belonging to `username`                                                                                                                               |
| `/guy/listNonUser` | GET          |            |                           | `username`   | `200 OK` + array of all little guys belonging to everyone except `username`                                                                                                               |
| `/guy/new`         | POST         | Yes        | `username, name, variant {head_variant, head_hex, face_variant, face_color, body_variant, body_hex, arms_variant, arms_hex, legs_variant, legs_hex}` |              | `201 CREATED` or `400 BAD REQUEST` (name or variant is blank, invalid hex code or variant) or `401 UNAUTHORIZED` (no authorization given) or `403 FORBIDDEN` (user not authorized) or `404 NOT FOUND` (user not found) |
| `/guy/change`      | PUT          | Yes        | `id, name, variant {head_variant, head_hex, face_variant, face_color, body_variant, body_hex, arms_variant, arms_hex, legs_variant, legs_hex}`       |              | `200 OK` or `400 BAD REQUEST` (name or variant is blank, invalid hex code or variant) or `401 UNAUTHORIZED` (no authorization given) or `403 FORBIDDEN` (user not authorized) or `404 NOT FOUND` (id not found)        |
| `/guy/trash`       | DELETE       | Yes        |                           | `id`         | `204 NO CONTENT` (successfully deleted) or `401 UNAUTHORIZED` (no authorization given) or `403 FORBIDDEN` (user not authorized) or `404 NOT FOUND` (id not found)                         |
| `/user/register`   | POST         |            | `username, password`      |              | `201 CREATED` or `400 BAD REQUEST` (usename or password is blank or too short) or `409 CONFLICT` (username already taken)                                                                 |
| `/user/login`      | POST         |            | `username, password`      |              | `200 OK` + username and authentication token, or `401 UNAUTHORIZED` (username or password is incorrect)                                                                                   
### Example NEW and CHANGE request bodies:

NEW: 
```json
{
    "username" : "myUserName",
    "name": "guyName",
    "variant" : {
        "head_variant" : 0,
        "head_hex" : "#ffffff",
        "face_variant" : 0,
        "face_color" : "black",
        "body_variant" : 0,
        "body_hex" : "#ffffff",
        "arms_variant" : 0,
        "arms_hex" : "#ffffff",
        "legs_variant" : 0,
        "legs_hex" : "#ffffff"  
    }    
}
```

CHANGE: 
```json
{
    "id" : 0,
    "username" : "myUserName",
    "name": "newName",
    "variant" : {
        "head_variant" : 0,
        "head_hex" : "#ffffff",
        "face_variant" : 0,
        "face_color" : "black",
        "body_variant" : 0,
        "body_hex" : "#ffffff",
        "arms_variant" : 0,
        "arms_hex" : "#ffffff",
        "legs_variant" : 0,
        "legs_hex" : "#ffffff"  
    }    
}
```
