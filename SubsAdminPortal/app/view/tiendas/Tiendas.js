Ext.define('SubsAdminPortal.view.tiendas.Tiendas', {
	extend: 'Ext.panel.Panel',
	controller: 'tiendas',

	title: 'Stores Management',
	itemId: 'storeManagement',
	xtype: 'tienda',

	alias: ['widget.tienda'],
	layout: 'fit',

	requires: [
		'SubsAdminPortal.store.TiendasStore'
	],

	items: [{
		xtype: 'grid',
		reference: 'gridTiendas',
		forceFit: true,
		enableColumnMove: false,
		enableColumnHide: false,
		store: Ext.create('SubsAdminPortal.store.TiendasStore', {
			storeId: 'tiendasStore'
		}),
		columns: [

			{
				text: "Nombres",
				dataIndex: "nombreTienda"
			}, {
				text: "Descripcion",
				dataIndex: "descripcionTienda"
			}, {
				xtype: 'actioncolumn',
				width: 50,
				text: 'Acciones',
				align: 'center',
				items: [{
					icon: 'assets/images/edit.png',
					tooltip: 'Editar',
					handler: 'editarTiendas'
				}]
			}
		],
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'top',
			items: [{
					xtype: 'textfield',
					name: 'nombre',
					fieldLabel: 'Nombre de la Tienda',
					labelWidth: 120,
					width: 330,
					valueField: 'nombre',
					emptyText: 'Digite el nombre de la Tienda',
				},
				'->', {
					xtype: 'button',
					text: 'Buscar Tiendas',
					iconCls: 'icon-search',
					handler: 'buscarTiendas'
				}, {
					xtype: 'button',
					text: 'Limpiar Filtros',
					iconCls: 'icon-reset',
					handler: 'limpiarFiltros'
				}, {
					xtype: 'button',
					text: 'Registrar',
					iconCls: 'icon-add',
					handler: 'registrarTiendas'
				}
			]
		}, {
			xtype: 'pagingtoolbar',
			store: Ext.getStore('tiendasStore'),
			dock: 'bottom',
			displayInfo: true
		}]
	}],
	listeners: {
		activate: function(self) {
			self.down('grid[reference="gridTiendas"]').getStore().reload();
		}
	}
});
Ext.define('SubsAdminPortal.view.tiendas.tiendasController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.tiendas',
	registrarTiendas: function(self) {

		var grid = this.lookupReference('gridTiendas');
		console.log(grid)
		Ext.create('Ext.window.Window', {
			title: 'Registrar Tienda',
			width: 300,
			layout: 'fit',
			modal: true,
			constrainHeader: true,
			resizable: false,
			items: [
				Ext.create('SubsAdminPortal.view.tiendas.FormTienda', {
					grid: grid,
					url: constants.URL_CREAR_TIENDAS
				})
			]
		}).show();
	},
	editarTiendas: function(grid, rowIndex, colIndex) {

		var record = grid.getStore().getAt(rowIndex),
			grid = this.lookupReference('gridTiendas');

		Ext.create('Ext.window.Window', {
			title: 'Editar Tienda',
			width: 300,
			layout: 'fit',
			modal: true,
			constrainHeader: true,
			resizable: false,
			items: [
				Ext.create('SubsAdminPortal.view.tiendas.FormTienda', {
					grid: grid,
					url: constants.URL_EDIT_TIENDAS,
					editar: true,
					record: record
				})
			]
		}).show();
	},
	buscarTiendas: function(self) {

		var toolbar = self.up('toolbar[dock="top"]'),
			grid = this.lookupReference('gridTiendas'),
			params = {};

		Ext.Array.each(toolbar.query('field'), function(field, index, total) {
			params[field.name] = field.getValue();
		});

		grid.getStore().getProxy().extraParams = params;
		grid.getStore().loadPage(1);
	},
	limpiarFiltros: function(self) {

		var toolbar = self.up('toolbar[dock="top"]'),
			grid = this.lookupReference('gridTiendas');

		Ext.Array.each(toolbar.query('field'), function(field, index, total) {
			field.reset();
		});
		grid.getStore().proxy.extraParams.nombre = "";
		grid.getStore().load();
		grid.down('pagingtoolbar').onLoad();
	},
});