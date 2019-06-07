const rm = require('rimraf')

rm("node_modules", err => {
    if (err) throw err
    console.info('Removed node_modules');
})