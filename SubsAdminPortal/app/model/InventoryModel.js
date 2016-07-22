Ext.define('SubsAdminPortal.model.InventoryModel', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'inventoryID',
        mapping: "id"
    }, {
        name: 'nombrePremio',
        mapping: "idPrize.name"

    }, {
        name: 'nombreTienda',
        mapping: "idStore.nombre"

    }, {
        name: 'idPrizes',
        mapping: "idPrize.id"

    }, {
        name: 'idStore',
        mapping: "idStore.id"

    }, {
        name: 'Stock',
        mapping: "stock"
    }]
});