/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SubsAdminPortal.view.main.Main', {

    extend: 'Ext.container.Container',
    controller: 'main',
    layout: 'border',
    requires: ['SubsAdminPortal.store.ModuloStore'],
    items: [{
            xtype: 'container',
            region: 'south',
            split: false,
            height: 125,
            layout: 'border',
            style: 'background-color: #f5f5f5;',
            items: [{
                xtype: 'button',
                region: 'west',
                splitterResize: false,
                split: false,
                baseCls: 'menu-button-base',
                cls: 'menu-button',
                text: sessvars.subscriberUser === undefined ? '' : '<span style="font-size: 14px;">' + sessvars.subscriberUser.username + '</span><br><br>' + sessvars.subscriberUser.nombreCompleto,
                width: 210,
                menu: {
                    cls: 'menu-button-options',
                    floating: {
                        shadow: false
                    },
                    defaults: {
                        width: 210,
                        cls: 'menu-item-option'
                    },
                    items: [{
                            text: 'Salir',
                            handler: 'salir',
                            iconCls: 'icon-close'
                        }
                        /*, {
                                                text: 'Cambiar contraseña',
                                                handler: 'cambiarContrasena',
                                                iconCls: 'icon-password'
                                                + sessvars.subscriberUser.username +
                                            }*/
                    ]
                }
            }, {
                xtype: 'dataview',
                region: 'center',
                style: 'background-color: #f5f5f5;overflow-y:hidden; display: inline-block; white-space: nowrap',
                store: Ext.create('SubsAdminPortal.store.ModuloStore'),
                tpl: new Ext.XTemplate(
                    '<tpl for=".">',
                    '<div class="menu-option">',
                    '<img class="menu-icon" src="assets/images/{icono}.png" />',
                    '<br/><center><span class="menu-title">{nombre}</span></center>',
                    '</div>',
                    '</tpl>'
                ),
                itemSelector: 'div.menu-option',
                emptyText: 'No images available',
                selectedItemCls: 'selected-item-menu',
                listeners: {
                    itemclick: 'abrirModulo',
                    afterrender: function(self) {
                        console.log(sessvars)
                        self.selModel.select(self.store.getAt(0));
                    }
                }
            }, {
                xtype: 'image',
                region: 'east',
                width: 150,
                style: 'height: 90px !important;',
                margin: '10 10 10 0',
                src: constants.URL_COMPANY_LOGO
            }, ]
        }, {
            xtype: 'container',
            region: 'center',
            layout: 'card',
            reference: 'moduleContainer',
            defaults: {
                cls: 'custom-panel-header'
            },
            items: [{
                xtype: 'tienda'
            }, {
                xtype: 'prizes'
            }, {
                xtype: 'inventory'
            }, {
                xtype: 'subscriber'
            }]
        }]
        /*extend: 'Ext.container.Container',
        controller: 'main',
        layout: 'border',
        requires: ['OrdenesTransporte.store.modulos.ModuloStore'],
        items: [{
            xtype: 'container',
            region: 'north',
            split: false,
            height: 125,
            layout: 'border',
            items: [{
                xtype: 'button',
                region: 'west',
                splitterResize: false,
                split: false,
                baseCls: 'menu-button-base',
                cls: 'menu-button',
                text: '<span style="font-size: 14px;">' + sessvars.ordenesTransporte.username + '</span><br><br>' + sessvars.ordenesTransporte.nombreCompleto,
                width: 210,
                menu: {
                    cls: 'menu-button-options',
                    floating: {
                        shadow: false
                    },
                    defaults: {
                        width: 210,
                        cls: 'menu-item-option'
                    },
                    items: [{
                        text: 'Salir',
                        handler: 'salir',
                        iconCls: 'icon-close'
                    }]
                }
            }, {
                xtype: 'dataview',
                style: 'background-color: #f5f5f5;overflow-y:hidden; display: inline-block; white-space: nowrap',
                store: Ext.create('OrdenesTransporte.store.modulos.ModuloStore'),
                tpl: new Ext.XTemplate(
                    '<tpl for=".">',
                    '<div class="menu-option">',
                    '<img class="menu-icon" src="assets/images/{icono}.png" />',
                    '<br/><center><span class="menu-title">{nombre}</span></center>',
                    '</div>',
                    '</tpl>'
                ),
                itemSelector: 'div.menu-option',
                emptyText: 'No images available',
                selectedItemCls: 'selected-item-menu',
                listeners: {
                    itemclick: 'abrirModulo',
                    afterrender: function(self) {
                        self.selModel.select(self.store.getAt(0));
                    }
                }
            }, {
                xtype: 'image',
                region: 'east',
                style: 'background-color: #f5f5f5;',
                width: 240,
                src: constants.URL_LOGO
            }]
        }]*/

});
Ext.define('AdminPortal.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    abrirModulo: function(self, record, item, index, e, eOpts) {

        var moduleContainer = this.lookupReference('moduleContainer');
        console.log(moduleContainer, ' ', record.get('nombre_int'))

        moduleContainer.getLayout().setActiveItem(record.get('nombre_int'));
        // moduleContainer.removeAll();
        /*
         moduleContainer.add({
             xtype: record.get('nombre_int'),
             title: record.get('nombre')
         });*/
        console.log(record)
    },
    salir: function(self) {

        Ext.Msg.confirm('Confirmación', 'Está seguro que desea salir de la aplicación?', function(buttonId, text, v) {
            if (buttonId == 'yes') {

                var cerrarSessionMask = new Ext.LoadMask(this.getView(), {
                    msg: "Cerrando sesión..."
                });

                cerrarSessionMask.show();

                Ext.Ajax.request({
                    scope: this,
                    url: constants.URL_LOGOUT,
                    method: 'POST',
                    success: function(response) {
                        var responseObject = Ext.decode(response.responseText);

                        cerrarSessionMask.destroy();

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
        }, this);
    },

});