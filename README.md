<h1>BLOG_REST_API </h1>

A web app where users can post blogs, then edit and delete them. The blog follows a RESTful routing schema, so a scrapping utility can be made that scrapes all the data the user needs. This ensures that the information once posted on the website can be easily ported to other platforms, conveniently and that no single person have utmost authority over the data, of others just because he/she happens to have admin rights of the website. It follows the idea of open-information and open-source web apps.

<hr>

The teck stack used is:
<ul>
    <li> HTML </li>
    <li> CSS </li>
    <li> EJS </li>
    <li> Semantic UI </li>
    <li> Javascript </li>
    <li> NodeJS </li>
    <li> Express </li>
    <li> MongoDB </li>
    <li> Mongoose </li>
    <li> Git </li>
</ul>

The website itself is deployed on Heroku and the backend Database is deployed on MongoDB Atlas.

Instructions to run the application in your local machine:
<ol>
    <li> Go to the folder where you want to install the application. </li>
    <li> Run the command git clone https://github.com/kartikeytewari/blog_restful_api </li>
    <li> Install NodeJS and MongoDB if you already do not have it. </li>
    <li> In the installed folder run the command ./mongod, to start the server </li>
    <li> The run node server.js to start the application </li>
    <li> Then visit localhost:Port_id to view the app </li>
</ol>

To-Do:
<ul>
    <li> Adding user authorization middleware </li>
    <li> Adding middleware, so only users logged in can view detailed website blogs </li>
    <li> Making a web-scraping API </li>
</ul>

The website is live on <a href="https://vast-caverns-56884.herokuapp.com/">this</a> link.
