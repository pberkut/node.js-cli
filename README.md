# Program Node.JS - Command Line Interface

---

## Description

_This application a contacts manager for work with your contacts.
You can get all contacts, get contact by id, add new contact, remove contact by id_

## Table of Contents

- [Program Node.JS - Command Line Interface](#program-nodejs---command-line-interface)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Technologies used](#technologies-used)
  - [Install](#install)
  - [Usage](#usage)

## Technologies used 

- Node.JS
- Node.JS base module "fs"
- Node.JS base module "path"

## Install

```
$ git clone https://github.com/pberkut/node.js-cli.git
$ cd your-project
$ npm install
$ npm start
```


## Usage

```
// Get all contacts
$ node index.js --action list

// Get contact by id
$ node index.js --action get --id 05olLMgyVQdWRwgKfg5J6

// Add contact
$ node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

// Remove contact
node index.js --action remove --id qdggE76Jtbfd9eWJHrssH

// Get help
node index.js --action help
```