Ext.define('SubsAdminPortal.view.subscriber.Subscriber', {
	extend: 'Ext.panel.Panel',
	controller: 'subscriber',

	title: 'Subscriber Management',
	itemId: 'subscriberManagement',
	xtype: 'subscriber',

	alias: ['widget.subscriber'],
	layout: 'fit',

	requires: [
		'SubsAdminPortal.store.SubscriberStore'
	],

	items: [{
		xtype: 'grid',
		reference: 'gridSubscriber',
		forceFit: true,
		enableColumnMove: false,
		enableColumnHide: false,
		store: Ext.create('SubsAdminPortal.store.SubscriberStore', {
			storeId: 'subscriberStore'
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
					xtype: 'textfield',
					name: 'storeName',
					fieldLabel: 'Nombre de la Tienda',
					labelWidth: 120,
					width: 330,
					valueField: 'storeName',
					emptyText: 'Digite el nombre de la Tienda',
				},
				'->', {
					xtype: 'button',
					text: 'Buscar Tiendas',
					iconCls: 'icon-search',
					handler: 'findSubscriptors'
				}, {
					xtype: 'button',
					text: 'Limpiar Filtros',
					iconCls: 'icon-reset',
					handler: 'limpiarFiltros'
				}, {
					xtype: 'button',
					text: 'Mostrar ganadores',
					handler: 'showWinners'
				}
			]
		}, {
			xtype: 'pagingtoolbar',
			store: Ext.getStore('subscriberStore'),
			dock: 'bottom',
			displayInfo: true
		}]
	}],
	listeners: {
		activate: function(self) {
			self.down('grid[reference="gridSubscriber"]').getStore().reload();
		}
	}
});
Ext.define('SubsAdminPortal.view.subscriber.subscriberController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.subscriber',
	findSubscriptors: function(self) {

		var toolbar = self.up('toolbar[dock="top"]'),
			grid = this.lookupReference('gridSubscriber'),
			params = {};

		Ext.Array.each(toolbar.query('field'), function(field, index, total) {
			params[field.name] = field.getValue();
		});

		grid.getStore().getProxy().extraParams = params;
		grid.getStore().loadPage(1);
	},
	limpiarFiltros: function(self) {

		var toolbar = self.up('toolbar[dock="top"]'),
			grid = this.lookupReference('gridSubscriber');

		Ext.Array.each(toolbar.query('field'), function(field, index, total) {
			field.reset();
		});
		grid.getStore().proxy.extraParams.storeName = "";
		grid.getStore().load();
		grid.down('pagingtoolbar').onLoad();
	},
	showWinners: function(self) {
		Ext.create('Ext.window.Window', {
			title: 'Mostrar Ganadores',
			width: 1000,
			height: 500,
			layout: 'fit',
			modal: true,
			constrainHeader: true,
			resizable: true,
			items: [
				Ext.create('SubsAdminPortal.view.subscriber.SubscriberWinner')
			]
		}).show();
	}
});