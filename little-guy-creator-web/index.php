<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!--
        NEED TO FILL IN DESCRIPTION LATER:
        The description is a tag for displaying a summary (155-160 characters) 
        describing the content of a web page, e.g., for search engines to show 
        in search results.
    -->
    <meta name="description" 
    content="The Little Guy Website is the website users use to make Little Guys, socialize with friends, design fun characters, and have a great time." /> 
    <!--
        CHANGE TITLE LATER
    -->
    <title>Little Guy Creator</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="icon" type="image/x-icon" href="favicon.ico">
  </head>

  <body>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/under-construction-notice.html">About</a></li>
        <li><a href="/under-construction-notice.html">Our Team</a></li>
        <li><a href="/under-construction-notice.html">Pricing</a></li>
        <li><a href="/under-construction-notice.html">FAQ</a></li>
        <?php
          session_start();

          if (!isset($_SESSION["loggedin"])) {
            echo "<li id='signinbutton'><a href='/signin.php'>Sign In</a></li>";
          }
          else {
            $user = $_SESSION["user"];
            $logged_in = $_SESSION["loggedin"];
            echo "<li id='signinbutton'><a href='/logout.php'>Log Out ($user)</a></li>";
          }
        ?>
      </ul>
    </nav>
    <h1 id="title">Little Guy Creator</h1>

    <div id="content-box">

      <div class = "elevator"> <!-- Elevator Pitch -->
        <h2>The Little Guy Creator is an online character-creator and social platform, 
            where users can design their own and visit each other's "Little Guy"s.</h2>
        <div class = "flex-el">
          <div>
            <p>Unleash your creativity and form new connections with your own Little Guys, either through our library 
              of assets on the cutting-edge of contemporary character design, or your own unrestrained imagination. 
              Explore a new way of interacting with your friends that no other service has ever provided.</p>
          </div>
          <div>
            <img src = "assets/hero.png" alt = "Heads of Little Guys with different faces in many different colors." width = 100% >
          </div>
        </div>
      </div>

      <div id="features"> <!--Features Section-->
        <h1>What We Offer</h1>

        <div class="feature">

          <div class="description">
            <h2>
              Create your own little guys.
            </h2>
            <p>
              Choose from hundreds of shapes, colors, and styles for each part of your little guy.
              With <a href="https://www.piday.org/million/" target="_blank">millions</a> of different little guys to create, each one will stand out from the crowd.
            </p>
          </div>

          <img src="assets/screenshots/character-creator.png" class="screenshot" alt="Character creator for little guys. Currently editing head shape.">

        </div>
        
        <div class="feature" id="middle-feature">

          <img src="assets/screenshots/your-world.png" class="screenshot" alt="Personal world for little guys, with text 'Your World'. Features 3 little guys.">

          <div class="description">
            <h2>
              Your world, your adventure.
            </h2>
            <p>
              Design a world for your little guys to thrive in. Watch them walk around, <a href="https://www.youtube.com/watch?v=5lItJronkSA" target="_blank">talk to each
              other</a>, and interact with the environment according to unique personality traits and skills.
            </p>
          </div>

        </div>

        <div class="feature">

          <div class="description">
            <h2>
              Explore and make friends online.
            </h2>
            <p>
              View other players' worlds over the <a href="https://en.wikipedia.org/wiki/Internet" target="_blank">internet</a>. Look at their little guys, get inspired,
              leave comments, and make friends. You can "heart" your favorite worlds to save them to your library.
            </p>
          </div>

          <img src="assets/screenshots/world-menu.png" class="screenshot" alt="World menu to view other users' worlds. Lists @kateralphy's world, @dinocaptain's world, and @mazmystic's world. @dinocaptain's world is 'heart'ed and the user is followed.">

        </div>

      </div>

      <div style="margin-top: 100px;"> <!-- Testimonials Section -->
        <h1>People Love Their Little Guys!</h1>

        <div class="flex-container">
          <div>
            <h6>"Little Guy Creator changed my worldview. I've never known joy like this."</h6>
            <p>- Julien "Orteil" Thiennot, Creator of <a href="https://orteil.dashnet.org/cookieclicker/" target="_blank">Cookie Clicker</a></p>
          </div>
          <div class="lighter-color">
            <h6>"There are a lot of options for your Little Guy. It's impressive that
              they put all that work into a class project."
            </h6>
            <p>- Guy Mignonne, New York Times journalist</p>
          </div>
          <div>
            <h6>"It's not a bad idea."</h6>
            <p>- Christopher Weaver, Founder of Bethesda Games</p>
          </div>
          <div class="lighter-color">
            <h6>"This game saved my life. It saved my life."</h6>
            <p>- Sammy Sackett, Wesleyan Student</p>
          </div>
        </div>
      </div>


      <!-- Ad -->
      <iframe src="ad.html" frameborder="1" title="an advertisement selling green beans"></iframe>

      <h1>Pricing Tiers</h1> <!-- Pricing -->

      <div id = "pricing">
        <div class = "price">
          <h3>
            Big Guy
          </h3>
          <div class = "perks">
            <h2>
              $9.99 / month
            </h2>
            <p>&#10003; Minimal Ads</p>
            <p>&#10003; Make up to 3 Little Guys</p>
            <p>&#10003; Elite Hats</p>
          </div>
        </div>
        <div class = "price">
          <h3>
            Huge Guy
          </h3>
          <div class = "perks">
            <h2>
              $19.99 / month
            </h2>
            <p>&#10003; No Ads</p>
            <p>&#10003; Make up to 5 Little Guys</p>
            <p>&#10003; Elite Hats</p>
            <p>&#10003; Elite Faces</p>
          </div>
        </div>
        <div class = "price">
          <h3>
            Gargantuan Guy
          </h3>
          <div class = "perks">
            <h2>
              $199.99 / month
            </h2>
            <p>&#10003; No Ads</p>
            <p>&#10003; Make Unlimited Little Guys</p>
            <p>&#10003; Elite Hats</p>
            <p>&#10003; Elite Faces</p>
            <p>&#10003; Unlock Shoes</p>
            <p>&#10003; Free Green Bean</p>
          </div>
        </div>
      </div>

    </div>

    <footer>
      <p id="endnote">
        Note: This site was designed and published as part of the COMP 333 Software 
        Engineering class at Wesleyan University. This is an exercise.
      </p>
    </footer>
    

  </body>