Ext.define('GPSName.store.Tags', {
    extend: 'Ext.data.Store',


    config: {
        id: 'tagStore',
        model: 'GPSName.model.Tags',
        autoLoad: false,
        sorters: 'name',
        proxy: {
            type: 'ajax',
            url: 'http://www.onebiglink.com/gpsname.com/index.php/feed/tags'
			}
    }
});
