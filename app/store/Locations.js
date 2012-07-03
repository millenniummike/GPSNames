Ext.define('GPSName.store.Locations', {
    extend: 'Ext.data.Store',

    config: {
        model: 'GPSName.model.Locations',
        autoLoad: true,
        sorters: 'title',
        proxy: {
            type: 'ajax',
            url: 'http://www.onebiglink.com/gpsname.com/index.php/feed/json'
			}
    }
});
