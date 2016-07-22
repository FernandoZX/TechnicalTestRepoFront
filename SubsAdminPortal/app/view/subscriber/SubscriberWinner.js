Ext.define('SubsAdminPortal.view.subscriber.SubscriberWinner', {
	extend: 'Ext.panel.Panel',
	controller: 'subscriberWinner',

	title: 'Subscriber Winners',
	xtype: 'subscriberWinner',

	alias: ['widget.subscriberWinner'],
	layout: 'fit',

	requires: [
		'SubsAdminPortal.store.SubscriberWinnerStore'
	],

	items: [{
		xtype: 'grid',
		reference: 'gridSubscriber',
		forceFit: true,
		enableColumnMove: false,
		enableColumnHide: false,
		store: Ext.create('SubsAdminPortal.store.SubscriberWinnerStore', {
			storeId: 'subscriberWinnerStore'
		}),
		columns: [

			{
				text: "Nombre Tienda",
				dataIndex: "nombreTienda"
			}, {
				text: "Email Subscriber",
				dataIndex: "Email"
			}, {
				text: "Fecha de Registro",
				dataIndex: "Date"
			}
		],
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'top',
			items: [{
					xtype: 'combo',
					name: 'storeID',
					fieldLabel: 'Tiendas',
					queryCaching: false,
					emptyText: 'Seleccione la Tienda',
					submitEmptyText: false,
					store: Ext.create('SubsAdminPortal.store.TiendasStore'),
					queryMode: 'remote',
					queryParam: 'nombre',
					minChars: 3,
					displayField: 'nombre',
					valueField: 'idTienda',
					allowBlank: false
				}, {
					xtype: 'combo',
					name: 'multiple',
					emptyText: 'Seleccione el multiplo',
					store: Ext.create('Ext.data.Store', {
						fields: ['number', 'name'],
						data: [{
							"number": "50",
							"name": "multiple of 50"
						}, {
							"number": "500",
							"name": "multiple of 500"
						}]
					}),
					queryMode: 'local',
					queryCaching: false,
					minChars: 3,
					displayField: 'name',
					valueField: 'number'
				}, {
					xtype: 'hiddenfield',
					name: 'counter',
					reference: 'hiddenCounter'
				},

				'->', {
					xtype: 'button',
					text: 'Buscar Ganadores',
					iconCls: 'icon-search',
					handler: 'findWinners'
				}, {
					xtype: 'button',
					text: 'Limpiar Filtros',
					iconCls: 'icon-reset',
					handler: 'limpiarFiltros'
				}, {
					xtype: 'button',
					text: 'Send Email To Winners',
					handler: 'sendMail'
				}
			]
		}, {
			xtype: 'pagingtoolbar',
			store: Ext.getStore('subscriberWinnerStore'),
			dock: 'bottom',
			displayInfo: true
		}]
	}],
});
Ext.define('SubsAdminPortal.view.subscriber.subscriberWinnerController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.subscriberWinner',
	counterWinner: null,
	findWinners: function(self) {

		var toolbar = self.up('toolbar[dock="top"]'),
			grid = this.lookupReference('gridSubscriber'),
			params = {};
		var hfCounter = this.lookupReference('hiddenCounter');

		Ext.Array.each(toolbar.query('field'), function(field, index, total) {
			params[field.name] = field.getValue();
		});
		console.log(params)
		if (params.storeID == null || params.multiple == null) {
			Ext.Msg.show({
				title: 'Error',
				msg: 'field store or multiple are required',
				buttons: Ext.Msg.OK,
				icon: Ext.Msg.ERROR
			});
		} else {

			Ext.Ajax.request({
				url: constants.URL_COUNT_SUBCRIBER,
				method: 'POST',
				params: {
					'storeID': params.storeID
				},
				success: function(response) {

					var r = Ext.decode(response.responseText);
					console.log(r);
					//Ext.Msg.alert('Ordenes Transporte', r.msg);

					if (r.object != null) {
						//  textNombreConductor.setValue(r.object.conductor.nombre + " " + r.object.conductor.apellido);
						//textPlacaConductor.setValue(r.object.placa);
						if (r.object < 1000 && params.multiple == 50) {
							Ext.Msg.show({
								title: 'Error',
								msg: 'this store cant apply multiple of 50 because doesnt have more tha 1000 records',
								buttons: Ext.Msg.OK,
								icon: Ext.Msg.ERROR
							});
						}
						if (r.object >= 1000) {
							if (params.multiple == 50) {
								grid.getStore().getProxy().extraParams = params;
								grid.getStore().load();
							}
							if (params.multiple == 500) {
								grid.getStore().getProxy().extraParams = params;
								grid.getStore().load();
							}
						} else if (params.multiple == 500) {
							grid.getStore().getProxy().extraParams = params;
							grid.getStore().load();
						}

					}

				},
				failure: function(response) {
					Ext.Msg.alert('Subscriber Admin', WorkSpace.mensajes.error);
				}
			});
		}
		//grid.getStore().getProxy().extraParams = params;
		//grid.getStore().load();
	},
	sendMail: function(self) {

		var toolbar = self.up('toolbar[dock="top"]'),
			grid = this.lookupReference('gridSubscriber'),
			params = {};

		Ext.Array.each(toolbar.query('field'), function(field, index, total) {
			params[field.name] = field.getValue();
		});
		console.log(grid)
		var size = grid.getStore().getCount();
		console.log(size);
		if (size > 0) {
			Ext.Ajax.request({
				url: constants.URL_COUNT_SUBCRIBER,
				method: 'POST',
				params: {
					'storeID': params.storeID
				},
				success: function(response) {

					var r = Ext.decode(response.responseText);
					console.log(r);
					//Ext.Msg.alert('Ordenes Transporte', r.msg);

					if (r.object != null) {
						//  textNombreConductor.setValue(r.object.conductor.nombre + " " + r.object.conductor.apellido);
						//textPlacaConductor.setValue(r.object.placa);
						if (r.object < 1000 && params.multiple == 50) {
							Ext.Msg.show({
								title: 'Error',
								msg: 'this store cant apply multiple of 50 because doesnt have more tha 1000 records',
								buttons: Ext.Msg.OK,
								icon: Ext.Msg.ERROR
							});
						}
						if (r.object >= 1000) {
							if (params.multiple == 50) {
								this.mailSenderAux(params.storeID, params.multiple);
							}
							if (params.multiple == 500) {
								this.mailSenderAux(params.storeID, params.multiple);
							}
						} else if (params.multiple == 500) {
							this.mailSenderAux(params.storeID, params.multiple);
						}

					}

				},
				failure: function(response) {
					Ext.Msg.alert('Subscriber Admin', WorkSpace.mensajes.error);
				}
			});
		} else {
			Ext.Msg.show({
				title: 'Error',
				msg: 'the grid must be filled before send mail',
				buttons: Ext.Msg.OK,
				icon: Ext.Msg.ERROR
			});
		}
	},
	mailSenderAux: function(storeID, multiple) {
		Ext.Ajax.request({
			url: constants.URL_SEND_WINNERS_SUBCRIBER,
			method: 'POST',
			params: {
				'storeID': params.storeID,
				'multiple': params.multiple
			},
			success: function(response) {

				var r = Ext.decode(response.responseText);
				console.log(r);
				//Ext.Msg.alert('Ordenes Transporte', r.msg);

				if (r.success == true) {
					Ext.Msg.show({
						title: 'Info',
						msg: r.msg,
						buttons: Ext.Msg.OK,
						icon: Ext.Msg.INFO
					});

				} else {
					Ext.Msg.show({
						title: 'Error',
						msg: r.msg,
						buttons: Ext.Msg.OK,
						icon: Ext.Msg.ERROR
					});
				}

			},
			failure: function(response) {
				Ext.Msg.alert('Subscriber Admin', WorkSpace.mensajes.error);
			}
		});
	},
	limpiarFiltros: function(self) {

		var toolbar = self.up('toolbar[dock="top"]'),
			grid = this.lookupReference('gridSubscriber');

		Ext.Array.each(toolbar.query('field'), function(field, index, total) {
			field.reset();
		});
		grid.getStore().proxy.extraParams.storeID = 0;
		grid.getStore().proxy.extraParams.multiple = 0;
		grid.getStore().load();
		grid.down('pagingtoolbar').onLoad();
	},
});