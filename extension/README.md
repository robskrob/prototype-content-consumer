# prototype-content-consumer - Extension

### Background

The project will allow users to capture data on pages and store it to catalogue and organize for later use.

### Getting Started

Follow the steps below to setup a development environment. This project
expects you will be using a flavor of Unix that supports a standard node.js
environment.

1. Clone repository

    `git clone git@github.com:chadwpry/prototype-content-consumer.git`

2. Set NODE_ENV variable to development. It can be included in a .bash_profile or .bashrc configuration.

    `$ export NODE_ENV=development`

3. Install node packages

    `npm install`

4. Create webpack bundle

    `npm run build`

5. Go to chrome://extensions/ in your browser and click developer mode

6. Load unpacked extensions, select the extension directory in our project and click Reload

7. Go to, https://jobs.lever.co/pathgather/e700098b-b552-4b10-a5a5-e0e1e49a4154, click the extension and you should see the following in chrome console:


*Response Example in Chrome Console*

    {
      title: "Backend Engineer",
      categories: "New York, NY", "Engineering", "Full-time"
      url: "https://jobs.lever.co/pathgather/e700098b-b552-4b10-a5a5-e0e1e49a4154"
    }


### Contributing

* Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet
* Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it
* Fork the project
* Start a feature/bugfix branch
* Commit and push until you are happy with your contribution
* Make sure to add tests for it. This is important so future version are not broken unintentionally.
