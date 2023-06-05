# Intern-starter
Demonstrate PHP, HTTP request/response, and JavaScript competency.  Uses PHP and JavaScript package management facilities via Composer and NPM.

## What does it do?
See the [example link](https://appdev.ocdla.org/simple-server/duii/1).  The project automatically converts inline references to Oregon Revised Statutes (ORS) to HTML links.  The links then provide inline and full-screen modal features containing the text of the referenced legal statutes.

## Dependencies
* Apache >= 2.4
* PHP > 7.3
* Composer (PHP package manager)
** For installation on Windows see [the documentation](https://getcomposer.org/doc/00-intro.md#installation-windows).
* <code>lib-http</code> - PHP wrapper for HTTP requests and responses.

## Installation
Intern-starter should be installed in a working sub-directory of an Apache2 web server.  Alternatively, it can be installed in the <code>modules/</code> directory of a PHP application server (although this repo will need a working <code>module.php</code> or <code>module.json</code> file to export routes and callbacks).

```bash
git clone [this-repository-url]
cd [this-repository-folder]
// Git checkout main and git pull on relevant node modules (node_modules/@ocdladefense/)
git submodule update --init --recursive
composer install
npm install
npm update
```
