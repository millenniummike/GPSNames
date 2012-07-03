Ext.define('AddressBook.model.Settings', {
    extend: 'Ext.data.Model',

    config: {
        proxy: {
            type: 'localstorage',
            id  : 'settings'
        },
        fields: [
            {name: 'username', type:'string'},
            {name: 'password', type:'string'},
            {name: 'id', type:'int'}
        ],
        validations: [
        ]
    }
});