Ext.define('SubsAdminPortal.view.inventory.Inventory', {
	extend: 'Ext.panel.Panel',
	controller: 'inventory',

	title: 'Inventory Management',
	itemId: 'inventoryManagement',
	xtype: 'inventory',

	alias: ['widget.inventory'],
	layout: 'fit',

	requires: [
		'SubsAdminPortal.store.InventoryStore'
	],

	items: [{
		xtype: 'grid',
		reference: 'gridInventory',
		forceFit: true,
		enableColumnMove: false,
		enableColumnHide: false,
		store: Ext.create('SubsAdminPortal.store.InventoryStore', {
			storeId: 'inventoryStore'
		}),
		columns: [

			{
				text: "Premio",
				dataIndex: "nombrePremio"
			}, {
				text: "Tienda",
				dataIndex: "nombreTienda"
			}, {
				text: "Stock",
				dataIndex: "Stock"
			}, {
				xtype: 'actioncolumn',
				width: 50,
				text: 'Acciones',
				align: 'center',
				items: [{
					icon: 'assets/images/edit.png',
					tooltip: 'Editar',
					handler: 'editarInventario'
				}, {
					icon: 'assets/images/delete.png',
					tooltip: 'Eliminar',
					handler: 'deleteInventario'
				}]
			}
		],
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'top',
			items: [{
					xtype: 'textfield',
					name: 'storeKey',
					fieldLabel: 'Nombre de la tienda',
					labelWidth: 120,
					width: 330,
					valueField: 'storeKey',
					emptyText: 'Digite el nombre de la tienda',
				}, {
					xtype: 'textfield',
					name: 'prizeKey',
					fieldLabel: 'Nombre del Premio',
					labelWidth: 120,
					width: 330,
					valueField: 'prizeKey',
					emptyText: 'Digite el nombre del premio',
				},
				'->', {
					xtype: 'button',
					text: 'Buscar Inventario',
					iconCls: 'icon-search',
					handler: 'buscarInventarios'
				}, {
					xtype: 'button',
					text: 'Limpiar Filtros',
					iconCls: 'icon-reset',
					handler: 'limpiarFiltros'
				}, {
					xtype: 'button',
					text: 'Registrar',
					iconCls: 'icon-add',
					handler: 'registrarInventario'
				}
			]
		}, {
			xtype: 'pagingtoolbar',
			store: Ext.getStore('inventoryStore'),
			dock: 'bottom',
			displayInfo: true
		}]
	}],
	listeners: {
		activate: function(self) {
			self.down('grid[reference="gridInventory"]').getStore().reload();
		}
	}
});
Ext.define('SubsAdminPortal.view.inventory.inventoryController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.inventory',
	registrarInventario: function(self) {

		var grid = this.lookupReference('gridInventory');
		console.log(grid)
		Ext.create('Ext.window.Window', {
			title: 'Registrar Premios',
			width: 300,
			layout: 'fit',
			modal: true,
			constrainHeader: true,
			resizable: false,
			items: [
				Ext.create('SubsAdminPortal.view.inventory.FormInventory', {
					grid: grid,
					url: constants.URL_CREATE_INVENTORY
				})
			]
		}).show();
	},
	editarInventario: function(grid, rowIndex, colIndex) {

		var record = grid.getStore().getAt(rowIndex),
			grid = this.lookupReference('gridInventory');

		Ext.create('Ext.window.Window', {
			title: 'Editar Premios',
			width: 300,
			layout: 'fit',
			modal: true,
			constrainHeader: true,
			resizable: false,
			items: [
				Ext.create('SubsAdminPortal.view.inventory.FormInventory', {
					grid: grid,
					url: constants.URL_EDIT_INVENTORY,
					editar: true,
					record: record
				})
			]
		}).show();
	},
	deleteInventario: function(grid, rowIndex, colIndex) {

		var record = grid.getStore().getAt(rowIndex);
		console.log(record.get('idInventory'))

		Ext.Msg.confirm('Confirmación', 'Está seguro que desea eliminar este Premio?', function(buttonId, text, v) {
			if (buttonId == 'yes') {

				var eliminarPrizesMask = new Ext.LoadMask(grid, {
					msg: "Procesando petición..."
				});
				eliminarPrizesMask.show();

				Ext.Ajax.request({
					scope: this,
					url: constants.URL_DELETE_INVENTORY,
					params: {
						inventoryID: record.get('idInventory')
					},
					success: function(response) {
						var responseObject = Ext.decode(response.responseText);

						grid.getStore().reload();
						eliminarPrizesMask.destroy();

						Ext.Msg.show({
							title: 'Información',
							msg: responseObject.msg,
							buttons: Ext.Msg.OK,
							icon: Ext.Msg.INFO
						});
					},
					failure: function(response) {

						eliminarPrizesMask.destroy();

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
	buscarInventarios: function(self) {

		var toolbar = self.up('toolbar[dock="top"]'),
			grid = this.lookupReference('gridInventory'),
			params = {};

		Ext.Array.each(toolbar.query('field'), function(field, index, total) {
			params[field.name] = field.getValue();
		});

		grid.getStore().getProxy().extraParams = params;
		grid.getStore().loadPage(1);
	},
	limpiarFiltros: function(self) {

		var toolbar = self.up('toolbar[dock="top"]'),
			grid = this.lookupReference('gridInventory');

		Ext.Array.each(toolbar.query('field'), function(field, index, total) {
			field.reset();
		});
		grid.getStore().proxy.extraParams.storeKey = "";
		grid.getStore().proxy.extraParams.prizeKey = "";
		grid.getStore().load();
		grid.down('pagingtoolbar').onLoad();
	},
});