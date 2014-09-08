# Country Data Interface

## About

A web interface for viewing and searching the country data provided by [this project][1].

Provides a filterable summary list of all countries and regions and a detail view for individual countries.

Intended for use on [countries.petethompson.net][2], but should be usable anywhere.

## Installation

To setup a usable version of this site:

1. Clone this repo to your webserver and point its document root to the `web/` directory.
2. From a copy of the [countries data][1]:
    1. Copy the `countries.json` file to `web/data/`.
    2. Copy all of the `data/*geo.json` files to `web/data/geo/`.
    3. Copy all of the `data/*.svg` files to `web/data/flags`.
3. There is no step three.

## Credits

Massive thanks to [@mledoze][3] and all of the other contributors to the [World countries in JSON, CSV and XML][1] project.

[1]: https://github.com/mledoze/countries
[2]: http://countries.petethompson.net
[3]: https://github.com/mledoze