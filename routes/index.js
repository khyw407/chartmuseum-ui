const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/detail/:name', (req, res) => {
  res.render('detail', { name: req.params.name });
});

const nocache = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

router.use('/api', nocache, require('./api'));

module.exports = router;
