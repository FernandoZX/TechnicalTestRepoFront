Ext.define('SubsAdminPortal.store.TiendasStore', {
	extend: 'Ext.data.Store',
	model: 'SubsAdminPortal.model.TiendasModel',
	proxy: {
		extraParams: {
			nombre: ''
		},
		type: 'ajax',
		actionMethods: { read: 'POST' },
		url: constants.URL_LIST_TIENDAS,
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	},
	autoLoad: false
});