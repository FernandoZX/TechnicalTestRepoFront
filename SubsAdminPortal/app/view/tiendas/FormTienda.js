Ext.define('SubsAdminPortal.view.tiendas.FormTienda', {
    extend: 'Ext.form.Panel',
    controller: 'formtienda',

    bodyPadding: 10,
    layout: 'anchor',
    defaults: {
        anchor: '100%',
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'idTienda'
    }, {
        xtype: 'textfield',
        name: 'nombre',
        fieldLabel: 'Nombre'
    }, {
        xtype: 'textareafield',
        name: 'descripcion',
        fieldLabel: 'Descripcion'
    }],
    buttons: [{
        text: 'Guardar',
        formBind: true,
        disabled: true,
        handler: 'guardarTienda'
    }],
    listeners: {
        afterrender: 'cargarDatos'
    }
});
Ext.define('SubsAdminPortal.view.tiendas.FormTiendaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.formtienda',

    cargarDatos: function(self) {

        var form = this.getView();
        console.log(form);
        if (form.editar !== undefined) {
            console.log(form.record)
            form.loadRecord(form.record);
        }
    },
    guardarTienda: function(self) {

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