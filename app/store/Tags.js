Ext.define('AddressBook.store.Tags', {
    extend: 'Ext.data.Store',


    config: {
        id: 'tagStore',
        model: 'AddressBook.model.Tags',
        autoLoad: false,
        sorters: 'name',
        proxy: {
            type: 'ajax',
            url: 'http://www.gpsname.com/index.php/feed/tags'
			}
    }
});
