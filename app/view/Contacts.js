Ext.define('AddressBook.view.Contacts', {
    extend: 'Ext.List',
    
    xtype: 'contacts',

    config: {
        items:[
         {
                                xtype: 'searchfield',
                                label: '',
                                height:'30px',
                                placeHolder: 'Filter',
                                id:'searchbox',
                                align:'center'
                            }], 
        title: 'GPSNames',
        cls: 'x-contacts',

        store: 'Contacts',
        itemTpl: [
            '<div class="headshot" style="float:left;width:32px;height:37px;background-image:url({image});"></div>',
            '{title}',
            '<div style="font-size:80%;color:grey;">{description}</div>'
        ].join('')
    }
});
