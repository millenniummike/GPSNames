var contactStore=Ext.define('GolfTracker.store.Courses', {
    extend: 'Ext.data.Store',
    config: {
        model: 'GolfTracker.model.Courses',
        autoLoad: true
    }
});
