Ext.define('SubsAdminPortal.store.InventoryStore', {
	extend: 'Ext.data.Store',
	model: 'SubsAdminPortal.model.InventoryModel',
	proxy: {
		extraParams: {
			storeKey: '',
			prizeKey: ''
		},
		type: 'ajax',
		actionMethods: {
			read: 'POST'
		},
		url: constants.URL_LIST_INVENTORY,
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	},
	autoLoad: false
});