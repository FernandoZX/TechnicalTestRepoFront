Ext.define('SubscriberPortal.view.prizeslist.FormSubscribe', {
    extend: 'Ext.form.Panel',
    controller: 'formsubscribe',

    bodyPadding: 10,
    layout: 'anchor',
    defaults: {
        anchor: '100%',
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'storeID'
    }, {
        xtype: 'textfield',
        name: 'email',
        fieldLabel: 'Email',
        vtype: 'email' 
    }],
    buttons: [{
        text: 'Subscribe',
        formBind: true,
        disabled: true,
        handler: 'saveSubscription'
    }],
    listeners: {
        afterrender: 'cargarDatos'
    }
});
Ext.define('OrdenesTransporte.view.prizeslist.FormSubscribeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.formsubscribe',

    cargarDatos: function(self) {

        var form = this.getView();
        console.log(form);
        if (form.editar !== undefined) {
            console.log(form.record)
            form.loadRecord(form.record);
        }
    },
    saveSubscription: function(self) {

        var form = self.up('form');
        console.log(form)


        if (form.isValid()) {
            form.submit({
                scope: this.getView(),
                waitMsg: 'Procesing subscription...',
                success: function(f, action) {

                    form.up('window').close();
                    this.grid.getStore().reload();

                    Ext.Msg.show({
                        title: 'Información',
                        msg: action.result.msg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                },
                failure: function(f, action) {

                    Ext.Msg.show({
                        title: 'Error',
                        msg: action.result.msg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            });
        }
    }
});