# prototype-content-consumer - API


### Background

The project will allow users to capture data on pages and store it to catalogue and organize for later use.

### Getting Started

Follow the steps below to setup a development environment. This project
expects you will be using a flavor of Unix that supports a standard node.js
environment.

1. Clone repository

    `$ git clone git@github.com:chadwpry/prototype-content-consumer.git`

2. Set NODE_ENV variable to development. It can be included in a .bash_profile or .bashrc configuration.

    `$ export NODE_ENV=development`

3. Install node packages

    `$ npm install`

4. Create configuration
    `$ cp config/config.json.example config.json

    Modify the path to your Google Cloud credentials

5. Create a 'self signed' SSL certificate

    `$ openssl req -nodes -x509 -newkey rsa:2048 -keyout credentials/key.pem -out credentials/cert.pem -days 365`

6. Seed datastore

    `$ npm run seeds`

7. Start server

    `$ npm start`


### API Endpoints

*Request Example*

    https://localhost/api/v1/selectors/www.lumens.com

*Response Example*

    {"data": {
      "type": "Selector",
      "id": 5649391675244544,
      "attributes": {
        source_id: {
          attribute: "data-pid",
          selector: "[itemscope][itemtype='http://schema.org/Product'] > [data-pid]:first"
        },
        product_url: {
          attribute: "content",
          selector: "[itemscope][itemtype='http://schema.org/Product'] [itemprop='url']:first"
        },
        product_image_url: {
          attribute: "content",
          selector: "[itemscope][itemtype='http://schema.org/Product'] .productimages meta[property='og:image']"
        },
        product_brand_name: {
          attribute: "content",
          selector: "[itemscope][itemtype='http://schema.org/Product'] [itemscope][itemtype='http://schema.org/Brand'] meta[itemprop='name']:first"
        },
        product_brand_url: {
          attribute: "href",
          selector: "[itemscope][itemtype='http://schema.org/Product'] [itemscope][itemtype='http://schema.org/Brand'] a[itemprop='url']:first"
        },
        product_offer: {
          attribute: "content",
          selector: "[itemscope][itemtype='http://schema.org/Product'] [itemscope][itemtype='http://schema.org/Offer'] meta[itemprop='price']:first"
        },
        product_offer_currency: {
          attribute: "content",
          selector: "[itemscope][itemtype='http://schema.org/Product'] [itemscope][itemtype='http://schema.org/Offer'] meta[itemprop='priceCurrency']:first"
        }
      }
    },
    "jsonapi": {
      "version":"1.0.0"
    }

### Contributing

* Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet
* Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it
* Fork the project
* Start a feature/bugfix branch
* Commit and push until you are happy with your contribution
* Make sure to add tests for it. This is important so future version are not broken unintentionally.
