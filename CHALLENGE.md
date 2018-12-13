# Trial Day - Description of Work

<!-- vim-markdown-toc GitLab -->

- [Introduction](#introduction)
- [caniuse - Minimal data management prototype](#caniuse-minimal-data-management-prototype)
  - [First Version](#first-version)
  - [Second Version](#second-version)
  - [Third Version](#third-version)
  - [Fourth Version](#fourth-version)
- [Technologies and Constraints](#technologies-and-constraints)

## caniuse - Minimal data management prototype

Based on the [given JSON dataset](./data/data-2.0.json) a user interface should be created with the following versions:

### First Version

- as a user, I want to have a way to explore caniuse.com features in a tabular way (incl. pagination)
- at least label and description should be used as columns
- more columns could be global usage percentage and sub-features

### Second Version

- as a user I want to have a way to search for a specific feature entry
- case-insensitive text search in labels and descriptions

### Third Version

- as a user I want to have a detailed view on an entry
- a plain data view is acceptable here
- the detail view of a feature should be available as a deep link to the app (routing)

### Fourth Version

- as a user, I want to assign and remove tags to specific features
- tags should be available as columns as well
- tags should be found when searching by its name
- tag assignments should be saved in my browser

## Technologies and Constraints

The following technologies / constraints should be used:

- react 16
- react routing
- adequate (S)CSS framework
- Browser support: Chrome
- no backend - the dataset can be integrated in the application
- adequate build setup
- git repository usage (gitlab) using adequate developer standards
- gitlab based project management (organise versions, tasks / issues, spec there, communicate there)
- basic documentation (code and readme)
- stretch goal: basic unit testing
