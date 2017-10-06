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
        dbName,
        userName,
        pwd
    ]
})