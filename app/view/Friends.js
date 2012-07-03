Ext.define('GPSName.view.Friends', {
    extend: 'Ext.List',
    
    xtype: 'friends',

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
        title: 'GPSName Connections',
        cls: 'x-friends',

        store: 'Locations',
        itemTpl: [
            '<div class="headshot" style="float:left;width:32px;height:37px;background-image:url({image});"></div>',
            '{title}',
            '<div style="font-size:80%;color:grey;">{description}</div>'
        ].join('')
    }
});
