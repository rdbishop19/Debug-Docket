# Debug Docket -- *Say 'Hello World' to your little friends.*

![debug docket demo gif](./debug-docket.gif)

## What is Debug Docket?

+ Software Bug/Issue Tracker 
+ Time Management Tool
+ Developer Social Platform

Debugging is an important skill for any developer. But bugs can have a bad reputation, being costly, stress-inducing, and annoying. I built DEBUG DOCKET to shift that mindset by approaching bugs with a growth mindset through healthy time management, helpful analytics and team engagement.

## Pre-requisites
1. Make sure you have `npm` installed on your computer. [Installating npm](https://www.npmjs.com/get-npm)
1. You will then need `JSON-server`. After installing `npm`, run the following in your terminal: `npm install -g json-server`

## Installation & Setup

1. Clone this repository
1. `cd` into the directory it creates
1. In the `api` directory, create a copy of the `database.json.example` and remove the .example extension.
1. Run `npm install` and wait for all dependencies to be installed
1. Run `npm start` to verify that installation was successful.

## Running Your Server

1. Open another terminal window and navigate to the `api` folder within `src`
1. Run `json-server -p 5002 -w database.json`

## Using the App

1. In the browser, navigate to `localhost:3000`
1. If you have never used Debug Docket before, `Register` a new account
1. If you are a returning user, `Login` with your account information
1. Start tracking your software bugs in the `To-Do` list
1. Select a specific bug with the timer icon and then start the timer to begin tracking the time spent working on that bug
1. Once you earn a break from your work, check out the `Social Feed` or `Bug History` to add friends or see the stats on the bugs you've worked on.
1. Clock It and Dock It!

---
&copy;2019 - Ryan Bishop