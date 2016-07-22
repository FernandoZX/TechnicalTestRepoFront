Ext.define('SubsAdminPortal.store.ModuloStore', {
	extend: 'Ext.data.Store',
	model: 'SubsAdminPortal.model.Modulo',
	data: [{
		icono: 'store',
		nombre: 'Store Management',
		nombre_int: 'storeManagement'
	}, {
		icono: 'prizes',
		nombre: 'Prizes Management',
		nombre_int: 'prizesManagement'
	}, {
		icono: 'inventario',
		nombre: 'Inventory Management',
		nombre_int: 'inventoryManagement'
	}, {
		icono: 'subscriber',
		nombre: 'Subscriber Management',
		nombre_int: 'subscriberManagement'
	}]
});