var reg = require("cla/reg");

reg.register('service.mongodb.executeScript', {
    name: _('Run a script in MongoDB database'),
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

        script = script.replace(/"/g, "\\\"");

        if (!MongoDB.pwd || !MongoDB.userName) {
            scriptExecution = 'mongo ' + mongoConection + ' --eval ' + '"' + script + '"';

        } else {
            scriptExecution = 'mongo ' + mongoConection;
            scriptExecution += ' --eval ' + '"db.auth(' + "'" + MongoDB.userName + "', '" + MongoDB.pwd + "'); " + script + '"';
        }

        agent.execute(scriptExecution);

        if (agent.tuple().rc == 0) {
            log.info(_("Script finished"), agent.tuple().output);
        } else {
            log.fatal(_("Error running script "), agent.tuple().output);
        }

    }
});