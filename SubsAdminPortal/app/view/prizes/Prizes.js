Ext.define('SubsAdminPortal.view.prizes.Prizes', {
	extend: 'Ext.panel.Panel',
	controller: 'prizes',

	title: 'Prizes Management',
	itemId: 'prizesManagement',
	xtype: 'prizes',

	alias: ['widget.prizes'],
	layout: 'fit',

	requires: [
		'SubsAdminPortal.store.PrizesStore'
	],

	items: [{
		xtype: 'grid',
		reference: 'gridPrizes',
		forceFit: true,
		enableColumnMove: false,
		enableColumnHide: false,
		store: Ext.create('SubsAdminPortal.store.PrizesStore', {
			storeId: 'prizesStore'
		}),
		columns: [

			{
				text: "Nombres",
				dataIndex: "prizesName"
			}, {
				xtype: 'actioncolumn',
				width: 50,
				text: 'Acciones',
				align: 'center',
				items: [{
					icon: 'assets/images/edit.png',
					tooltip: 'Editar',
					handler: 'editarPremio'
				},
				{
					icon: 'assets/images/delete.png',
					tooltip: 'Eliminar',
					handler: 'deletePremio'
				}]
			}
		],
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'top',
			items: [{
					xtype: 'textfield',
					name: 'prizesName',
					fieldLabel: 'Nombre del Premio',
					labelWidth: 120,
					width: 330,
					valueField: 'prizesName',
					emptyText: 'Digite el nombre del premio',
				},
				'->', {
					xtype: 'button',
					text: 'Buscar Tiendas',
					iconCls: 'icon-search',
					handler: 'buscarPremios'
				}, {
					xtype: 'button',
					text: 'Limpiar Filtros',
					iconCls: 'icon-reset',
					handler: 'limpiarFiltros'
				}, {
					xtype: 'button',
					text: 'Registrar',
					iconCls: 'icon-add',
					handler: 'registrarPremios'
				}
			]
		}, {
			xtype: 'pagingtoolbar',
			store: Ext.getStore('prizesStore'),
			dock: 'bottom',
			displayInfo: true
		}]
	}],
	listeners: {
		activate: function(self) {
			self.down('grid[reference="gridPrizes"]').getStore().reload();
		}
	}
});
Ext.define('SubsAdminPortal.view.prizes.prizesController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.prizes',
	registrarPremios: function(self) {

		var grid = this.lookupReference('gridPrizes');
		console.log(grid)
		Ext.create('Ext.window.Window', {
			title: 'Registrar Premios',
			width: 300,
			layout: 'fit',
			modal: true,
			constrainHeader: true,
			resizable: false,
			items: [
				Ext.create('SubsAdminPortal.view.prizes.FormPrizes', {
					grid: grid,
					url: constants.URL_CREATE_PRIZES
				})
			]
		}).show();
	},
	editarPremio: function(grid, rowIndex, colIndex) {

		var record = grid.getStore().getAt(rowIndex),
			grid = this.lookupReference('gridPrizes');

		Ext.create('Ext.window.Window', {
			title: 'Editar Premios',
			width: 300,
			layout: 'fit',
			modal: true,
			constrainHeader: true,
			resizable: false,
			items: [
				Ext.create('SubsAdminPortal.view.prizes.FormPrizes', {
					grid: grid,
					url: constants.URL_EDIT_PRIZES,
					editar: true,
					record: record
				})
			]
		}).show();
	},
	deletePremio: function(grid, rowIndex, colIndex) {

		var record = grid.getStore().getAt(rowIndex);
		console.log(record.get('idPrizes'))

		Ext.Msg.confirm('Confirmación', 'Está seguro que desea eliminar este Premio?', function(buttonId, text, v) {
			if (buttonId == 'yes') {

				var eliminarPrizesMask = new Ext.LoadMask(grid, {
					msg: "Procesando petición..."
				});
				eliminarPrizesMask.show();

				Ext.Ajax.request({
					scope: this,
					url: constants.URL_DELETE_PRIZES,
					params: {
						idPrizes: record.get('idPrizes')
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
	buscarPremios: function(self) {

		var toolbar = self.up('toolbar[dock="top"]'),
			grid = this.lookupReference('gridPrizes'),
			params = {};

		Ext.Array.each(toolbar.query('field'), function(field, index, total) {
			params[field.name] = field.getValue();
		});

		grid.getStore().getProxy().extraParams = params;
		grid.getStore().loadPage(1);
	},
	limpiarFiltros: function(self) {

		var toolbar = self.up('toolbar[dock="top"]'),
			grid = this.lookupReference('gridPrizes');

		Ext.Array.each(toolbar.query('field'), function(field, index, total) {
			field.reset();
		});
		grid.getStore().proxy.extraParams.prizesName = "";
		grid.getStore().load();
		grid.down('pagingtoolbar').onLoad();
	},
});