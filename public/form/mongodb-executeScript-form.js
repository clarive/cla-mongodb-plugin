(function(params) {

    var mongodb = Cla.ui.ciCombo({
        name: 'mongodb',
        value: params.data.mongodb || '',
        class: 'BaselinerX::CI::MongoDB',
        fieldLabel: _('MongoDB Database'),
        allowBlank: false,
        with_vars: 1
    });

    var script = Cla.ui.codeEditor({
        name: 'script',
        fieldLabel: _('Script'),
        mode: 'javascript',
        height: 300,
        value: params.data.script,
        allowBlank: false,
        anchor: '100%'
    });

    return [

        mongodb,
        script
    ]
})