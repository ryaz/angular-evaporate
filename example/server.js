'use strict';
var app = require('express')();

// console logger
app.use(require('morgan')('dev'));

// serve static files
app.use('/', require('serve-static')( require('path').join(__dirname, '../') ));

// sign data
var crypto = require('crypto');
app.use('/signer', function (req, res) {
  res.send(crypto
    .createHmac('sha1', process.env.AWS_SECRET_KEY)
    .update(req.query.to_sign)
    .digest('base64')
  );
});

// start server
app.listen(process.env.PORT, function () {
  console.log('Started! Navigate to http://localhost:' + process.env.PORT + '/example');
});