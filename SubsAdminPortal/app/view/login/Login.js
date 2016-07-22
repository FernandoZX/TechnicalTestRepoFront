Ext.define('SubsAdminPortal.view.login.Login', {
    extend: 'Ext.container.Container',

    controller: 'login',
    layout: 'center',

    cls: 'login-background',
    items: [{
        xtype: 'form',
        width: 300,
        minHeight: 300,
        cls: 'custom-login-form',
        url: constants.URL_LOGIN,
        bodyPadding: 10,
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },
        items: [{
            xtype: 'image',
            src: constants.URL_LOGO,
            minHeight: 120,
            width:100
        }, {
            xtype: 'textfield',
            name: 'username',
            emptyText: 'Usuario',
            allowBlank: false,
            cls: 'custom-login-fields',
            style: 'margin-bottom: 8px;',
            msgTarget: 'under',
            listeners: {
                specialkey: 'accederEnter'
            }
        }, {
            xtype: 'textfield',
            name: 'password',
            emptyText: 'Contraseña',
            inputType: 'password',
            allowBlank: false,
            cls: 'custom-login-fields',
            style: 'margin-bottom: 24px;',
            msgTarget: 'under',
            listeners: {
                specialkey: 'accederEnter'
            }
        }, {
            xtype: 'button',
            text: 'Ingresar',
            formBind: true,
            disabled: true,
            cls: 'custom-login-button',
            handler: 'acceder'
        }]
    }]
});

Ext.define('SubsAdminPortal.view.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    accederEnter: function(field, e) {
        if (e.getKey() == e.ENTER) {
            this.acceder(field);
        }
    },
    acceder: function(self) {

        var form = self.up('form');

        if (form.isValid()) {

            form.submit({
                waitMsg: 'Procesando solicitud...',
                success: function(f, action) {

                    var dataUsuario = action.result.object;
                    console.log(dataUsuario)
                    sessvars.subscriberUser = {
                        expiration_time: 36000,
                        username: dataUsuario.username,
                        id_usuario: dataUsuario.idUser,
                        nombreCompleto: dataUsuario.firstname + '<br/>' + dataUsuario.secondname,
                    };
                    console.log(sessvars.subscriberUser)
                    location.reload();
                },
                failure: function(f, action) {

                    Ext.Msg.show({
                        title: 'Error',
                        msg: action.result.msg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            });
        }
    }
});