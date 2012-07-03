Ext.define('GolfTracker.model.Games', {
    extend: 'Ext.data.Model',

    config: {
       proxy: {
            type: 'localstorage',
            id  : 'games'
            
        },
   
        fields: [
            {name: 'id', type:'string'},
            {name: 'courses_id', type:'string'},
            {name: 'name', type:'string'},
            {name: 'date', type:'string'},
        ],
        validations: [

        ]
    }
});