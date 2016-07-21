Ext.define('SubscriberPortal.view.prizeslist.PrizeList', {
    extend: 'Ext.container.Viewport',
    xtype: 'login',
    layout: 'border',
    width: 540,
    height: 620,
    requires: [
        'SubscriberPortal.view.prizeslist.PrizeListController',
        'SubscriberPortal.store.PrizeStoreStore'
    ],
    controller: 'prizelist',
    items: [{
        region: 'center',
        xtype: 'panel', // TabPanel itself has no title
        items: {
            title: 'Default Tab',
            items: {
                xtype: 'gridpanel',
                store: Ext.create('SubscriberPortal.store.PrizeStoreStore', {
                    storeId: 'prizeStore'
                }),
                reference: 'gridpanelPrizeList',
                columns: [{
                    text: '#',
                    dataIndex: 'ID'
                }, {
                    text: 'Store',
                    dataIndex: 'Tienda'
                }, {
                    text: 'Prizes',
                    width: 450,
                    dataIndex: 'Premios'
                }, {
                    xtype: 'actioncolumn',
                    width: 150,
                    text: 'Acciones',
                    items: [{
                        icon: 'assets/images/add.png',
                        tooltip: 'Subscribe to win this prizes',
                        handler: 'onSubscribe'
                    }]
                }],
                width: 1000
            }
        }
    }],

    listeners: {
        afterrender: function(self) {
            console.log(self.down('gridpanel[reference="gridpanelPrizeList"]'))
            console.log(self.down('gridpanel[reference="gridpanelPrizeList"]').getStore())
            var store = self.down('gridpanel[reference="gridpanelPrizeList"]').getStore();
            store.load();
        }
    }
});