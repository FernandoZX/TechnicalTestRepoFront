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
            title: 'Subscriber Portal',
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
                    flex:1,
                    dataIndex: 'Tienda'
                }, {
                    text: 'Prizes',
                    flex:1,
                    dataIndex: 'Premios'
                }, {
                    xtype: 'actioncolumn',
                    
                    text: 'Acciones',
                    items: [{
                        icon: 'assets/images/add.png',
                        tooltip: 'Subscribe to win this prizes',
                        handler: 'onSubscribe'
                    }]
                }],
                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: Ext.getStore('prizeStore'),
                    dock: 'bottom',
                    displayInfo: true
                }],
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