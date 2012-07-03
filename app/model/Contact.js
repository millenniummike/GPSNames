Ext.define('AddressBook.model.Contact', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'id', type:'string'},
            {name: 'title', type:'string'},
            {name: 'description', type:'string'},
            {name: 'lat', type:'string'},
            {name: 'lon', type:'string'},
            {name: 'image', type:'string'},
            {name: 'tagged', type:'string'},
        ],
        validations: [
            {type: 'presence', name: 'title',message:"Enter Title"},
            {type: 'presence', name: 'description',message:"Enter Description"},
            {type: 'presence', name: 'lat',message:"Enter Latitude"},
            {type: 'presence', name: 'lon',message:"Enter Longitude"},
            {type: 'presence', name: 'tagged',message:"Enter Tagged"}
        ]
    }
});