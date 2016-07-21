Ext.define('SubscriberPortal.model.PrizeStoreModel', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'ID',
        mapping: "storeID"
    }, {
        name: 'Tienda',
        mapping: "storeName."
    }, {
        name: 'Premios',
        mapping: "prizes"

    }]
});