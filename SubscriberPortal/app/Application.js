/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('SubscriberPortal.Application', {
    extend: 'Ext.app.Application',

    name: 'SubscriberPortal',

    stores: [
        // TODO: add global / shared stores here
        'SubscriberPortal.store.PrizeStoreStore'
    ],
    requires: [
        'SubscriberPortal.helpers.constants'
    ],
    views: [
        'SubscriberPortal.view.prizeslist.PrizeList'
    ],
    launch: function() {
        // TODO - Launch the application
        Ext.create({
            xtype: 'login'
        });
    },

    onAppUpdate: function() {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function(choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});