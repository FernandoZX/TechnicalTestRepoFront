Ext.define('SubsAdminPortal.store.PrizesStore', {
	extend: 'Ext.data.Store',
	model: 'SubsAdminPortal.model.PrizesModel',
	proxy: {
		extraParams: {
			prizesName: ''
		},
		type: 'ajax',
		actionMethods: { read: 'POST' },
		url: constants.URL_LIST_PRIZES,
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	},
	autoLoad: false
});