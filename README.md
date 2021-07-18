# Bhog-website

(1)A webapp which connects authenticated user based on their preferences and allows to order food which will we stored in their order history for future.
--
(2)Also some middlewares used were (connect-flash, express-session,mongoose, passport-local).
--
(3) Added a admin pannel who can has the control of all the orders; and the order status can be updated as per (order placed, prepared, delivered, completed).
--
(4) Added socket.io to send real-time notifications about the order status to the customer.
--
(5) Integrated Stripe Payment Gateway and web application is in-process to be hosted on AWS.
--
(6) Built on tech-stack Nodejs, MongoDb, SASS, HTML5 and used Laravel-MIX as webpack bundler.
--
---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ yarn install

## Configure app

Open `a/nice/path/to/a.file` then edit it with your settings. You will need:

- A setting;
- Another setting;
- One more setting;

## Running the project

    $ yarn start

## Simple build for production

    $ yarn build
