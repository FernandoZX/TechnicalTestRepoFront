Ext.define('SubsAdminPortal.helpers.constants', {
	alternateClassName: 'constants',
	singleton: true,
	URL_LOGO: '../assets/images/userIcon.png',
	URL_COMPANY_LOGO: '../assets/images/koombea_logo.jpg',
	// Usuarios
	URL_LOGIN: 'SubscriptionServicesApi/webresources/user/login',
	URL_LOGOUT: 'SubscriptionServicesApi/webresources/user/logout',

	//Tiendas
	URL_LIST_TIENDAS: 'SubscriptionServicesApi/webresources/store/list',
	URL_CREAR_TIENDAS: 'SubscriptionServicesApi/webresources/store/crear',
	URL_EDIT_TIENDAS: 'SubscriptionServicesApi/webresources/store/edit',

	//Prizes
	URL_LIST_PRIZES: 'SubscriptionServicesApi/webresources/prizes/list',
	URL_CREATE_PRIZES: 'SubscriptionServicesApi/webresources/prizes/crear',
	URL_EDIT_PRIZES: 'SubscriptionServicesApi/webresources/prizes/edit',
	URL_DELETE_PRIZES: 'SubscriptionServicesApi/webresources/prizes/delete',

	//Inventory
	URL_LIST_INVENTORY: 'SubscriptionServicesApi/webresources/inventory/list',
	URL_CREATE_INVENTORY: 'SubscriptionServicesApi/webresources/inventory/crear',
	URL_EDIT_INVENTORY: 'SubscriptionServicesApi/webresources/inventory/edit',
	URL_DELETE_INVENTORY: 'SubscriptionServicesApi/webresources/inventory/delete',

	//Subscriber
	URL_LIST_SUBCRIBER: 'SubscriptionServicesApi/webresources/subscription/list',
	URL_LIST_WINNER_SUBCRIBER: 'SubscriptionServicesApi/webresources/subscription/listWinners',
	URL_COUNT_SUBCRIBER: 'SubscriptionServicesApi/webresources/subscription/countSubscribers',
	URL_SEND_WINNERS_SUBCRIBER: 'SubscriptionServicesApi/webresources/subscription/sendWinners',
});