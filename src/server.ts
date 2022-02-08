const {app, setup} = require('./index')
if(require.main === module){
    setup();
    app.listen(3001, () => console.log('Server started at http://localhost:3001'));
}