Ext.define('SubscriberPortal.view.prizeslist.PrizeListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.prizelist',

    onItemSelected: function(sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function(choice) {
        if (choice === 'yes') {
            //
        }
    },
    onSubscribe: function(grid, rowIndex, colIndex) {
        var record = grid.getStore().getAt(rowIndex),
            grid = this.lookupReference('gridpanelPrizeList');

        console.log('grid',grid)
        console.log('record',record)

        Ext.create('Ext.window.Window', {
            title: 'Subscribe Form',
            width: 300,
            layout: 'fit',
            modal: true,
            constrainHeader: true,
            resizable: false,
            items: [
                Ext.create('SubscriberPortal.view.prizeslist.FormSubscribe', {
                    grid: grid,
                    url: constants.URL_SUBSCRIBE,
                    editar: true,
                    record: record
                })
            ]
        }).show();

    }
});