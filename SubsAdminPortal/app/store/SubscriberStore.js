Ext.define('SubsAdminPortal.store.SubscriberStore', {
	extend: 'Ext.data.Store',
	model: 'SubsAdminPortal.model.SubscriberModel',
	proxy: {
		extraParams: {
			storeName: ''
		},
		type: 'ajax',
		actionMethods: { read: 'POST' },
		url: constants.URL_LIST_SUBCRIBER,
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	},
	autoLoad: false
});