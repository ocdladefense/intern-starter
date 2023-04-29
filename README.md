# Intern-starter
Demonstrate PHP, HTTP request/response, and JavaScript competency.  Uses PHP and JavaScript package management facilities via Composer and NPM.

## Dependencies
* Apache >= 2.4
* PHP > 7.3
* Composer (PHP package manager)
* <code>lib-http</code> - PHP wrapper for HTTP requests and responses.

## Installation
Intern-starter should be installed in a working sub-directory of an Apache2 web server.  Alternatively, it can be installed in the <code>modules/</code> directory of a PHP application server (although this repo will need a working module.php or module.json file to export routes and callbacks).

```php
git clone [this-repository-url]
cd [this-repository-folder]
composer update
// Git checkout main and git pull on relevant node modules (node_modules/@ocdladefense/)
git submodule update --init --recursive
npm install --savedev
npm install
npm update
```
