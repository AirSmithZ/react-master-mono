const exporess = require('express');

const cors = require('cors');

const { mockList } = require('./mockList');

const app = exporess();

const router = exporess.Router();

app.use(cors());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

router.get('/api/recommend', (req, res) => {
    console.log(req.query);
    
    const { startNum, pageSize } = req.query || {};
    res.header("Access-Control-Allow-Origin", "*");

    res.json({
        list: mockList.slice(startNum, pageSize)
    })
})

app.use(router);

app.listen(3010, () => {
    console.log('app in 3010...');
})

// //ssr
// listen: 3018
// server_name: xx.com

// rewrite /view/(.*) /api/ last;
// location /api {
// proxy_pass http://backend-server;
// }

// //csr
// listen: 3018
// server_name: xx.com

// location /view/(.*) {
// try_files: $url index.html
// }
// location /api {
// proxy_pass http://backend-server;
// }
