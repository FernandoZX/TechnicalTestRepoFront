Ext.define('SubsAdminPortal.view.prizes.FormPrizes', {
    extend: 'Ext.form.Panel',
    controller: 'formprizes',

    bodyPadding: 10,
    layout: 'anchor',
    defaults: {
        anchor: '100%',
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'idPrizes'
    }, {
        xtype: 'textfield',
        name: 'prizesName',
        fieldLabel: 'Nombre del Premio'
    }],
    buttons: [{
        text: 'Guardar',
        formBind: true,
        disabled: true,
        handler: 'savePrizes'
    }],
    listeners: {
        afterrender: 'cargarDatos'
    }
});
Ext.define('SubsAdminPortal.view.tiendas.FormPrizesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.formprizes',

    cargarDatos: function(self) {

        var form = this.getView();
        console.log(form);
        if (form.editar !== undefined) {
            console.log(form.record)
            form.loadRecord(form.record);
        }
    },
    savePrizes: function(self) {

        var form = self.up('form');
        console.log(form)


        if (form.isValid()) {
            form.submit({
                scope: this.getView(),
                waitMsg: 'Procesando solicitud...',
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