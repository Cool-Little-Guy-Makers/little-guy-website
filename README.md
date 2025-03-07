# Little Guy Website

### Team members:
- Luca Guerrera (33%)
- Maze Labowitz (33%)
- Kate Lyman (33%)

### [Online Link](https://littleguycreator.great-site.net/)

### phpmyadmin Screenshots:

#### Luca Guerrera:
![Luca's SS](https://raw.githubusercontent.com/lucaguerrera/little-guy-website/refs/heads/issue-43-readme/assets/screenshots/LucaSS.png)

#### Maze Labowitz:
![Maze's SS](https://raw.githubusercontent.com/lucaguerrera/little-guy-website/refs/heads/issue-43-readme/assets/screenshots/MazeSS.png)

#### Kate Lyman:
![Kate's SS](https://raw.githubusercontent.com/lucaguerrera/little-guy-website/refs/heads/issue-43-readme/assets/screenshots/KateSS.png)

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

1. Install XAMPP, navigate to localhost/phpmyadmin/ or equivalent, and under the SQL tab run the following command:
```sql
CREATE DATABASE `app-db`;

CREATE TABLE `app-db`.`users`(username VARCHAR(255) PRIMARY KEY, password VARCHAR(255) NOT NULL);

CREATE TABLE `app-db`.`little-guys`(id INT(11) PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, variant INT(1) NOT NULL);
```

2. Edit config.php and replace the $hostname, $username, and $password fields to match your user account (information found under the user accounts tab in phpmyadmin).

3. Put the little-guy-website repository into the htdocs folder on your machine (located in the xampp folder).

### How to use the site:
To run this code locally, clone the repository onto your machine and open the index.html file in whichever browser you prefer. Alternatively, visit [the website](https://lucaguerrera.github.io/little-guy-website/).
