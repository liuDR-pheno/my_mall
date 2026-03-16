const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// ??????????? 8080 -> 3000 ??????
app.use(cors());

// ?? JSON ???
app.use(express.json());

// Hello World ???GET /api/hello
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'this is my first express server',
    from: 'Express ??'
  });
});

// ?????????????????????
app.get('/', (req, res) => {
  res.send('<p>pheno? API ?????? <a href="/api/hello">/api/hello</a></p>');
});

// ??????????????????? /api/user ?
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

// ?????????????????? /api/goods ?
const goodsRoutes = require('./routes/goods');
app.use('/api/goods', goodsRoutes);

// ?????????????
const { sequelize, Goods } = require('./models');
sequelize.sync().then(() => {
  return Goods.findAndCountAll().then(({ count }) => {
    if (count === 0) {
      return Goods.bulkCreate([
        { name: '????A', image: '/img/a.jpg', price: 99.00, description: '??A??', category: '??1', stock: 10 },
        { name: '????B', image: '/img/b.jpg', price: 199.00, description: '??B??', category: '??1', stock: 5 },
        { name: '????C', image: '/img/c.jpg', price: 299.00, description: '??C??', category: '??2', stock: 8 }
      ]);
    }
  });
}).then(() => {
  app.listen(PORT, () => {
    console.log(`??????: http://localhost:${PORT}`);
    console.log(`??: POST http://localhost:${PORT}/api/user/register`);
    console.log(`??: POST http://localhost:${PORT}/api/user/login`);
    console.log(`????: GET http://localhost:${PORT}/api/goods/list`);
    console.log(`????: GET http://localhost:${PORT}/api/goods/1`);
  });
}).catch(err => {
  console.error('???????', err);
});
