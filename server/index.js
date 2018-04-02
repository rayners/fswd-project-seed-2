import Server from './server';
import Config from './config';

Server.set('port', process.env.PORT || Config.devPort);

Server.listen(Server.get('port'), () => {
    console.log(`Application listening on ${Server.get('port')}`);
});