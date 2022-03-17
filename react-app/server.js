const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.use(function(req, res, next) {
  if (req.path == '/healthcheck') {
    return res.status(200).send({
      success: true,
      message: 'Everything is Ok'
    });
  } else {
      next()
  }
})
 

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

 
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });