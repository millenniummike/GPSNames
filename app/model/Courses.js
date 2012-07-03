Ext.define('GolfTracker.model.Courses', {
    extend: 'Ext.data.Model',

    config: {
       proxy: {
            type: 'localstorage',
            id  : 'courses'
            
        },
   
        fields: [
            {name: 'id', type:'string'},
            {name: 'name', type:'string'},
            {name: 'description', type:'string'},
        ],
        validations: [

        ],
         associations: [
        {type: 'hasMany', model: 'GolfTracker.model.Holes', name: 'holes'}
    ]
    }
});