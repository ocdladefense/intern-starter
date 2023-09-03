# Intern-starter
Demonstrate PHP, HTTP request/response, web server routing and JavaScript competency.  Uses PHP and JavaScript package management facilities via Composer and NPM.

## Dependencies
* Apache >= 2.4
* PHP > 7.3
* Composer (PHP package manager)
** For installation on Windows see [the documentation](https://getcomposer.org/doc/00-intro.md#installation-windows).

## Installation
Intern-starter should be installed in a working sub-directory of an Apache2 web server.

```bash
git clone https://github.com/ocdladefense/intern-starter.git
cd $APACHE_DOCUMENTS_DIR/intern-starter
composer update
npm update
cp sites/example-sites.php sites/sites.php
```
You should then be able to open a web browser and navigate to http://localhost/intern-starter.
