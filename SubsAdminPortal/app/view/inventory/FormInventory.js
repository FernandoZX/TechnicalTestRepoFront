Ext.define('SubsAdminPortal.view.inventory.FormInventory', {
    extend: 'Ext.form.Panel',
    controller: 'forminventory',

    bodyPadding: 10,
    layout: 'anchor',
    defaults: {
        anchor: '100%',
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'inventoryID'
    }, {
        xtype: 'combo',
        name: 'storeID',
        fieldLabel: 'Tiendas',
        queryCaching: false,
        emptyText: 'Seleccione la Tienda',
        submitEmptyText: false,
        store: Ext.create('SubsAdminPortal.store.TiendasStore'),
        queryMode: 'remote',
        queryParam: 'nombre',
        minChars: 3,
        displayField: 'nombre',
        valueField: 'idTienda',
        allowBlank: true
    }, {
        xtype: 'combo',
        name: 'prizesID',
        fieldLabel: 'Premios',
        queryCaching: false,
        emptyText: 'Seleccione el Premio',
        submitEmptyText: false,
        store: Ext.create('SubsAdminPortal.store.PrizesStore'),
        queryMode: 'remote',
        queryParam: 'prizesName',
        minChars: 3,
        displayField: 'prizesName',
        valueField: 'idPrizes',
        allowBlank: true
    }, {
        xtype: 'numberfield',
        name: 'stock',
        fieldLabel: 'Stock #',
        hideTrigger: true
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
Ext.define('SubsAdminPortal.view.inventory.FormInventoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.forminventory',

    cargarDatos: function(self) {

        var form = this.getView();
        console.log('form info', form);
        console.log('down to premios', form.down("combo[name=prizesID]"));
        console.log('down to tienda', form.down("combo[name=storeID]"));
        if (form.editar !== undefined) {
            console.log(form.record.get("idPrizes"))
            form.down("combo[name=prizesID]").getStore().load(function() {
                console.log("loaded!!")
                form.down("combo[name=prizesID]").setValue(form.record.get("idPrizes"));
            });
            form.down("combo[name=storeID]").getStore().load(function() {
                form.down("combo[name=storeID]").setValue(form.record.get("idStore"));
            });

            form.down("numberfield[name=stock]").setValue(form.record.get("Stock"));
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