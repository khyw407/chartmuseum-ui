const router = require('express').Router();
const logger = require(`${__basedir}/lib/logger`);
const { apiInstance } = require(`${__basedir}/lib/apiInstance`);

router.get('/health', async(req, res) => {
  logger.debug('chartmuseum server health check');
  let { data } = await apiInstance.get('/health');
  res.json(data); //{healthy: true}
});

router.get('/charts', async (req, res) => {
  logger.debug("list all charts");
  let { data } = await apiInstance.get('/api/charts');
  res.json(data);
});

router.get('/charts/:name', async (req, res) => {
  logger.debug("list all versions of a chart");
  let name = req.params.name;
  let { data } =  await apiInstance.get(`/api/charts/${name}`);
  res.json(data);
});

router.get('/charts/:name/:version', async (req, res) => {
  logger.debug("list all versions of a chart");
  let { name, version } = req.params;
  let { data } =  await apiInstance.get(`/api/charts/${name}/${version}`);
  res.json(data);
});

router.delete('/charts/:name/:version', async (req, res) => {
  logger.debug('delete a chart version (and corresponding provenance file)');
  let { name, version } = req.params;
  let { data } = await apiInstance.delete(`/api/charts/${name}/${version}`);
  res.json(data); //{deleted: true}
});

module.exports = router;
