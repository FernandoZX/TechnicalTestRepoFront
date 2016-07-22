Ext.define('SubsAdminPortal.model.TiendasModel', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'idTienda',
        mapping: "id"
    }, {
        name: 'nombreTienda',
        mapping: "nombre"

    }, {
        name: 'descripcionTienda',
        mapping: "descripcion"
    }]
});