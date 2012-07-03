Ext.define('GolfTracker.model.Shots', {
    extend: 'Ext.data.Model',

    config: {
       proxy: {
            type: 'localstorage',
            id  : 'shots'
            
        },
   
        fields: [
            {name: 'id', type:'string'},
            {name: 'holes_id', type:'string'},
            {name: 'lat', type:'string'},
            {name: 'lon', type:'string'},
            {name: 'club', type:'string'},
            {name: 'image', type:'string'},
        ],
        validations: [

        ]
    }
});