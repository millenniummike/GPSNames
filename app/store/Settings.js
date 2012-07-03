Ext.define('GolfTracker.store.Settings', {
    extend: 'Ext.data.Store',

    config: {
       proxy: {
            type: 'localstorage',
            id  : 'settings'
        },
        model: 'GolfTracker.model.Settings',
        autoLoad: true
    }
});


