const router = require('express').Router();

router.get('/', (req, res) => {
    req.serverMsg = {msg: "Server up and running" }
    res.status(200).json(req.serverMsg);
});
  //após tentar casar todas as rotas a ultima rota que sobrou é not found
router.get('*', (req, res) => {
    res.status(404).json({ errors: [{location: req.path, msg: 'Not found', param: null}]});
});

module.exports = router;