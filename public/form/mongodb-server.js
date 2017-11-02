(function(params) {

    var server = Cla.ui.ciCombo({
        name: 'server',
        value: params.rec.server || '',
        role: 'Server',
        fieldLabel: _('Server'),
        allowBlank: false
    });

    var port = Cla.ui.numberField({
        name: 'port',
        fieldLabel: _('Port'),
        allowBlank: false,
        maxValue: '99999',
        type: 'int',
        vtype: 'port'
    });

    var path = Cla.ui.textField({
        name: 'path',
        fieldLabel: _('Path'),
    });

    var dbName = Cla.ui.textField({
        name: 'dbName',
        fieldLabel: _('Database Name'),
        allowBlank: false
    });

    var userName = Cla.ui.textField({
        name: 'userName',
        fieldLabel: _('User name')
    });

    var pwd = Cla.ui.textField({
        name: 'pwd',
        fieldLabel: _('Password')
    });

    return [
        server,
        port,
        path,
        dbName,
        userName,
        pwd
    ]
})