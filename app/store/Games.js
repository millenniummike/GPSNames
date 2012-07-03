Ext.define('GolfTracker.store.Games', {
    extend: 'Ext.data.Store',
    config: {
        model: 'GolfTracker.model.Games',
        autoLoad: true
    }
});
