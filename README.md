
# Tickets and Games

* Heroku Link: https://tickets-and-games.herokuapp.com/
* To use this repository, please follow the following steps:

## Table
- [Google OAuth Signup](#google-oauth-signup)
- [Setting up Random.org](#setting-up-random-api)
- [Setting up Stripe](#setting-up-stripe)
- [Installation](#installation)
- [Running for Development](#running-for-development)
- [Running on Production](#running-on-production)
- [Deploying to Heroku](#deploying-to-heroku)
- [Work Breakdown for Milestone 1](#work-breakdown-for-milestone-1)

## Google OAuth Signup

1) Sign up https://console.developers.google.com/
2) Click create project
3) Click new project
4) Name the project whatever you would like
5) Choose "no organization"
6) Click credentials
7) Click create credentials
8) Click OAuth client ID
9) Click Configure consent screen
10) Choose external
11) For the application name specify something similar to the project name, click save
12) Back to credentials, create credentials, OAuth Client ID, click web application 
13) [back to top](#table)

## Setting up Random API

1) Sign up for Random.org by going to https://www.random.org/
2) You should be directed to the Your Account page
3) Scroll down and find API Services and click on the `Use this Service` button
4) Click on the `Create a New API Key` button
5) Give it a name and click on `Create`
6) From there click on the newly created key to see its details
7) There should be a API Key and to its right the key
8) Use that key for `RANDOM_ORG_KEY` in the .env file
9) [back to top](#table)

## Setting up Stripe

1) Sign up by going to https://dashboard.stripe.com/register
2) Go to API Keys page by clicking on developers link on the left and then API keys link
3) Copy the publishable key and secret key and put them in the .env file (or in your environment variable somehow)
4) Go to Webhooks page by clicking on the webhooks link on the left
5) Click on "Add endpoint" and provide a PUBLIC url/ip (not localhost)
6) Add "payment_intent.succeeded" event by clicking on the dropdown below "Events to send"
7) It will prompt you to enter your password and then redirect you to the webhook details page.
8) Copy the signing secret and put it in your environment variable
9) [back to top](#table)

## Installation
You have to install the npm dependencies and some python modules. Do so by running the following commands.

```bash
git clone https://github.com/CS490-section03-group0/project3
npm install
pip install  -r requirements.txt
```
[back to top](#table)

## Running for Development

First, create `.env` file with all the required environment variables.

Then you have to have the server running
```bash
python -m flask db upgrade
python app.py
```

Change the proxy port in packages.json to  the port you're using for the server.
Then,  in a separate shell, run the client
```bash
npm run start
```

Then, go to http://localhost:3000
All the api calls should be automatically proxied to the flask server.

[back to top](#table)

## Running on Production

If you, for whatever reason, want to run the server on production without something like heroku, you first have to build the client by
```bash
npm run build
```

and then start the server by
```bash
python app.py
```

The server will automatically serve the client files from the build directory.

[back to top](#table)

## Deploying to Heroku

1) First sign up for Heroku using the following link: https://www.heroku.com/
2) Once your account is created, click on `New` in the top right corner and then `Create new app`
3) Name your app and then click on `Create app`
4) Navigate to your newly created app
5) Create a database by clicking on `Configure Add-ons`
6) Enter `Heroku Postgres` in the search bar Heroku Postgres should show up
7) Click on it and make sure to add the free version
8) Add in the apps environment variables by navigating back to Heroku's settings
9) Find 'Config Vars' section and click on `Reveal Config Vars`
10) Transfer all variables and values from .env file respectively
11) Go to where your repository is located and run the following commands
	```bash
	heroku login -i
	heroku git:remote -a [project]
	git push heroku master
	```
	**where [project] is the name of your Heroku project**
12) Navigate the link to visit and view your site

[back to top](#table)

## Work Breakdown for Milestone 1

* Samir Peshori 
  * Responsible for creating front/backend & unit tests for Leaderboard & Coinflip Game
  * Responsible for implementation of Skiball
  * Responsible for creating Homepage
  * Added Material UI to components to style
  * Responsible for completing all styling for sprint 2
* Mohammad Khan 
  * Google OAuth
  * Cirle Ci, Heroku, README
* David Kim
  * Set up the python and react project and maintained it
  * Set up the server sided OAuth to let users log in
  * Fixed various issues as they came up (Bug with leaderboard, default state of profile view, etc)
* Allen Kung
  * Set up tables for postgresql database
  * Profile view, transaction history
  * Sign up, login through username/password, hash and salt passwords
  * Unfinished work:
    - Testing sign up
    - Testing login through username/password

- [back to top](#table)
