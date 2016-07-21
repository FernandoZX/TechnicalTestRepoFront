Ext.define('SubscriberPortal.view.prizeslist.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'prizes',

    requires: [
        'SubscriberPortal.store.PrizeStoreStore'
    ],

    title: 'Prizes',

    store: {
        type: 'prizes'
    },

    columns: [{
        text: 'ID',
        dataIndex: 'ID'
    }, {
        text: 'Name',
        dataIndex: 'Tienda',
        flex: 1
    }, {
        text: 'Prizes',
        dataIndex: 'Premios'
    }],

/*    listeners: {
        select: 'onItemSelected'
    }*/
});