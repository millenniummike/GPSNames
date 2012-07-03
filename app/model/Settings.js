Ext.define('GolfTracker.model.Settings', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'username', type:'string'},
            {name: 'password', type:'string'},
            {name: 'id', type:'int'}
        ],
        validations: [
        ]
    }
});