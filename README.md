# Little Guy Creator

### Team Members:
- Luca Guerrera (33%)
- Maze Labowitz (33%)
- Kate Lyman (33%)

### To Use Online: [online link](https://littleguycreator.great-site.net/)

### Postman Screenshots:

#### Luca Guerrera:
![Luca's SS](https://raw.githubusercontent.com/lucaguerrera/little-guy-website/refs/heads/issue-43-readme/assets/screenshots/LucaSS.png)

#### Maze Labowitz:
![Maze's SS](https://raw.githubusercontent.com/lucaguerrera/little-guy-website/refs/heads/issue-43-readme/assets/screenshots/MazeSS.png)

#### Kate Lyman:
![Kate's SS](https://raw.githubusercontent.com/lucaguerrera/little-guy-website/refs/heads/issue-43-readme/assets/screenshots/KateSS.png)

### Development Environment:

#### Little Guy local table:
![Development environment for little guy data](https://raw.githubusercontent.com/lucaguerrera/little-guy-website/refs/heads/issue-43-readme/assets/screenshots/DevGuys.png)

#### Users local table:
![Development environment for little guy data](https://raw.githubusercontent.com/lucaguerrera/little-guy-website/refs/heads/issue-43-readme/assets/screenshots/DevUsers.png)

### File Guide:
- README.md: description of the project.
- ad.html: a site advertising green beans, used in the landing page.
- checksignin.php: verifies a sign in attempt, setting the current user/isloggedin variables.
- config.php: connect to the database. MODIFY THESE FIELDS ON YOUR LOCAL MACHINE.
- createaccount.php: inserts new credentials into the user database after a successful registration attempt.
- createguyhelper.php: inserts little guy data into database after creation.
- creator.php: form for creating a little guy.
- delete.php: remove little guy information when deleted.
- editguyhelper.php: change data in little guy database after edit.
- editor.php: form for editing a little guy.
- favicon.ico: icon for little guy website.
- home.php: main page for showing your little guys and other users' little guys.
- index.php: landing page.
- logout.php: logs user out by destroying the session. Redirects to landing page.
- registration.php: form for making an account.
- signin.php: form for signing into an account.
- style.css: visual information for html.
- under-construction-notice.html: under construction page for portions of the app not yet developed.

### How to run locally:

1. Install XAMPP, navigate to localhost/phpmyadmin/ in your browser (or equivalent depending on the xampp specifications for your OS), and under the SQL tab run the following command:
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
    variant INT(1) NOT NULL,
    FOREIGN KEY (username) REFERENCES `users`(username)
        ON DELETE CASCADE ON UPDATE CASCADE
);
```

2. In the little-guy-website repository, edit config.php and replace the $hostname, $username, and $password fields to match your user account (information found under the user accounts tab in phpmyadmin).

3. Put the little-guy-website repository into the htdocs folder on your machine (located in the xampp folder). Put all files straight into htdocs, not in its own folder.

### How to use the site:

From the landing page, use the far-right button on the navigation bar at the top (labelled "sign in") to sign in to the site. You may either sign in to an existing account or register a new account using the link below the entry fields. After logging in, the site will direct you to the home page, where the CRUD functionality is. The home page displays all of the users Little Guys, as well as all the Little Guys of the other users.

You may Create a little guy using the link titled "Create a new Little Guy". After making at least one little guy, little guys can be Read and are displayed at the top of the page. The little guys can be Updated using the "edit" button to the right of your little guy, and can be Deleted using the "edit" button and then opting to delete.
