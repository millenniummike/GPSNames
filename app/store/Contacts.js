Ext.define('AddressBook.store.Contacts', {
    extend: 'Ext.data.Store',

    config: {
        model: 'AddressBook.model.Contact',
        autoLoad: true,
        sorters: 'title',
        proxy: {
            type: 'ajax',
            url: 'http://www.gpsname.com/index.php/feed/json'
			}
    }
});
