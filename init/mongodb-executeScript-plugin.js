var reg = require("cla/reg");

reg.register('service.mongodb.executeScript', {
    name: 'Run a script in MongoDB database',
    icon: '/plugin/cla-mongodb-plugin/icon/mongodb.svg',
    form: '/plugin/cla-mongodb-plugin/form/mongodb-executeScript-form.js',
    handler: function(ctx, config) {

        var ci = require("cla/ci");
        var log = require('cla/log');

        var mongodb = config.mongodb || '';
        var MongoDB = ci.findOne({
            mid: mongodb + ''
        });
        var script = config.script || '';
        var server = ci.load(MongoDB.server);
        var agent = server.connect();
        var scriptExecution = '';
        var mongoConection = server.hostname() + ':' + MongoDB.port + '/' + MongoDB.dbName;
        var config = '';

        script = script.replace(/"/g, "\\\"");

        config += 'Hostname: ' + server.hostname() + '\n';
        config += 'Port: ' + MongoDB.port + '\n';
        config += 'Database: ' + MongoDB.dbName + '\n';

        if (!MongoDB.pwd || !MongoDB.userName) {
            scriptExecution = 'mongo ' + mongoConection + ' --eval ' + '"' + script + '"';

        } else {
            config += 'User: ' + MongoDB.userName + '\n';
            scriptExecution = 'mongo ' + mongoConection;
            scriptExecution += ' --eval ' + '"db.auth(' + "'" + MongoDB.userName + "', '" + MongoDB.pwd + "'); " + script + '"';
        }

        config += 'Script: ' + '\n' + script;
        log.info("STARTING to execute the script in " + mongoConection, config);
        agent.execute(scriptExecution);

        if (agent.tuple().rc == 0) {
            log.info("The script was executed successfully in " + mongoConection, agent.tuple().output);
        } else {
            log.error("Error running script ", agent.tuple().output);
            throw new Error('Error running script');
        }

    }
});