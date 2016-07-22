Ext.define('SubsAdminPortal.model.SubscriberWinnerModel', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'subscriberID',
        mapping: "id"
    }, {
        name: 'Email',
        mapping: "email"

    }, {
        name: 'nombreTienda',
        mapping: "storename"

    }, {
        name: 'Date',
        mapping: "registereddate"

    }, {
        name: 'idStore',
        mapping: "storeid"

    }]
});