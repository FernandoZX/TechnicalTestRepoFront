/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.Ajax.on('requestcomplete', function(conn, response, options, eOpts) {

    var responseObject = Ext.JSON.decode(response.responseText);
    console.log(responseObject)
    if (responseObject.status == 21) {

        Ext.Msg.show({
            title: 'Información',
            msg: 'La sesión ha expirado, por favor, inicie sesión de nuevo.',
            buttons: Ext.Msg.OK,
            closable: false,
            icon: Ext.Msg.INFO,
            fn: function(buttonId, text, opt) {

                var cerrarSesionMask = new Ext.LoadMask(Ext.ComponentQuery.query('viewport')[0], {
                    msg: "Procesando petición..."
                });

                cerrarSesionMask.show();

                Ext.TaskManager.stopAll();

                Ext.Ajax.request({
                    scope: this,
                    method: 'POST',
                    url: constants.URL_LOGOUT,
                    success: function(response) {
                        var responseObject = Ext.decode(response.responseText);

                        cerrarSesionMask.destroy();
                        sessvars.$.clearMem();
                        location.reload();
                    },
                    failure: function(response) {

                        cerrarSesionMask.destroy();

                        Ext.Msg.show({
                            title: 'Error',
                            msg: 'Error al procesar la petición.',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
                    }
                });
            }
        });
    }
});
Ext.define('SubsAdminPortal.Application', {
    extend: 'Ext.app.Application',

    name: 'SubsAdminPortal',

    stores: [
        // TODO: add global / shared stores here
    ],
    requires: [
        'SubsAdminPortal.helpers.constants'
    ],
    views: [
        'SubsAdminPortal.view.login.Login',
        'SubsAdminPortal.view.main.Main',
        'SubsAdminPortal.view.tiendas.Tiendas',
        'SubsAdminPortal.view.prizes.Prizes',
        'SubsAdminPortal.view.inventory.Inventory',
        'SubsAdminPortal.view.subscriber.Subscriber',
        'SubsAdminPortal.view.subscriber.SubscriberWinner'
    ],
    launch: function() {
        // TODO - Launch the application
        Ext.tip.QuickTipManager.init();
        // TODO - Launch the application
        var viewport = Ext.ComponentQuery.query('viewport')[0],
            layout = {};

        if (viewport !== undefined) viewport.destroy();
        console.log(sessvars.subscriberUser)
        if (sessvars.subscriberUser === undefined) {

            layout = Ext.create('SubsAdminPortal.view.login.Login');

        } else {

            layout = Ext.create('SubsAdminPortal.view.main.Main');
        }

        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: layout
        });
    },

    onAppUpdate: function() {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function(choice) {
                if (choice === 'yes') {


                    Ext.Ajax.request({
                        scope: this,
                        url: constants.URL_LOGOUT,
                        method: 'POST',
                        success: function(response) {
                            var responseObject = Ext.decode(response.responseText);


                            if (responseObject.success) {

                                //Ext.Ajax.un('requestcomplete', DotacionesESW.getApplication().alertSession);

                                sessvars.$.clearMem();
                                console.log(sessvars)
                                sessvars.$.flush();
                                location.reload();
                            } else {

                                Ext.Msg.show({
                                    title: 'Error',
                                    msg: responseObject.msg,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.ERROR
                                });
                            }
                        },
                        failure: function(response) {

                            cerrarSessionMask.destroy();

                            Ext.Msg.show({
                                title: 'Error',
                                msg: 'Error al procesar la petición.',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.ERROR
                            });
                        }
                    });
                }
            }
        );
    }
});