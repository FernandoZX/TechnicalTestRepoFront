Ext.define('SubsAdminPortal.store.SubscriberWinnerStore', {
	extend: 'Ext.data.Store',
	model: 'SubsAdminPortal.model.SubscriberWinnerModel',
	proxy: {
		extraParams: {
			storeID: '',
			multiple:''
		},
		type: 'ajax',
		actionMethods: { read: 'POST' },
		url: constants.URL_LIST_WINNER_SUBCRIBER,
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	},
	autoLoad: false
});