Ext.define('SubsAdminPortal.model.SubscriberModel', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'subscriberID',
        mapping: "id"
    }, {
        name: 'Email',
        mapping: "email"

    }, {
        name: 'nombreTienda',
        mapping: "idStore.nombre"

    }, {
        name: 'Date',
        mapping: "registereddate"

    }, {
        name: 'idStore',
        mapping: "idStore.id"

    }]
});