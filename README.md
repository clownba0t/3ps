# 3ps

3ps is a very basic 3rd party service status amalgamator. It uses Node.js, isomorphic React and MongoDB, and is written in an eclectic mix of basic JavaScript and ECMAScript 6.

Please note that this is a personal project I decided to do in order to learn more about Node.js, NoSQL databases and front end technologies like React. It is not intended for use by anyone else, and especially not in production environments. With that said, if you find it useful then enjoy!

## Installation

This project has the following dependencies:

1. MongoDB v2.4
2. NodeJS v4.2.2

Install MongoDB as appropriate for your platform. Be aware that development to date has used v2.4 - other versions may work, however.

As for NodeJS, the project contains a .nvmrc file that you can use to install the appropriate version of NodeJS provided you have [nvm](https://github.com/creationix/nvm) itself installed. After installing nvm, simply run `nvm install` and `nvm use` in the directory you clone this repository into.

There are also some local configuration items that you'll need to set to reflect your local installation. I'll add more information on these later (once they've stabilised), but for now you should be able to find them by running `ack "config.get"` from the root directory of the project.

## Development

Basically, `npm start` will get you going. See the `scripts` section within `package.json` for more commands. Be aware that this project uses `nodemon` and `webpack-dev-server` to automatically reload the environment when files are changed during development.
