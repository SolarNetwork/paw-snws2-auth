# SNWS2 Signature Auth Dynamic Value (Paw Extension)

A [Paw Extension](http://luckymarmot.com/paw/extensions/) to compute SNWS2
Signature authentication header values for accessing SolarNetwork REST APIs.

## Installation

* Install this extension. For now, you should install by using the Makefile (see
  Development section below). * Add a header `Authorization` and set the value to
  this extension (start typing "SolarNetwork" and select **SolarNetwork Signature
  V2 Auth**). * Enter your credentials by clicking on the dynamic value extension.
* Add a date header `Date` or `X-SN-Date`. Set the value to a custom timestamp
  (start typing **timestamp** and select any of the timestamp options). Make sure
  the date is formatted as RFC 1123/2822.

## Development

Edit source javascript file and run the following to install in Paw.

```shell
make install
```

## License

This Paw Extension is released under the [Apache 2](LICENSE). Feel free to fork, and modify!

## Contributors

See [Contributors](https://github.com/SolarNetwork/paw-snws2-auth/graphs/contributors).
Inspired by @badslug and adapted from
[Paw-AWSSignature4DynamicValue](https://github.com/badslug/Paw-AWSSignature4DynamicValue).
