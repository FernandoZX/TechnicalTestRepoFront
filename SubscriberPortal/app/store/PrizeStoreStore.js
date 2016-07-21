Ext.define('SubscriberPortal.store.PrizeStoreStore', {
    extend: 'Ext.data.Store',
    model: 'SubscriberPortal.model.PrizeStoreModel',
    pageSize: 999,
    proxy: {
        extraParams: {
            nombre: ''
        },
        type: 'ajax',
        actionMethods: { read: 'POST' },
        url: constants.URL_PRIZE_LIST,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false
});