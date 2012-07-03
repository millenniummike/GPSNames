Ext.define('GolfTracker.model.Holes', {
    extend: 'Ext.data.Model',

    config: {
       proxy: {
            type: 'localstorage',
            id  : 'holes'
            
        },
   
        fields: [
            {name: 'id', type:'string'},
            {name: 'courses_id', type:'string'},
            {name: 'hole', type:'string'},
            {name: 'par', type:'string'},
            {name: 'distance', type:'string'},
        ],
        validations: [

        ],
      associations: [
        {type: 'hasMany', model: 'GolfTracker.model.Shots', name: 'shots'}
    ]
    }
});