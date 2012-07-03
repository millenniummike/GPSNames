Ext.define('AddressBook.view.Tags', {
    extend: 'Ext.List',
    xtype: 'tags',
    

    config: {
        title: 'GPSNames',
        cls: 'x-contacts',

        store: 'Tags',
        
        scrollable: 'false',
        
        listeners:{
            itemtap: function(view, index, target, record, event){                
                var value = record.get('name');               
                var existingvalue=Ext.getCmp('tagged').getValue();
                
                Ext.getCmp('tagged').setValue(existingvalue+','+value);
            },
            
            refresh: function () {
                
                var items;
                
                var component=Ext.getCmp('tags');
                if (component){
                items=component.getStore().getCount();
                component.setHeight(10+items*50+10); 
                }
                component=Ext.getCmp('tags_edit');
                if (component){
                items=component.getStore().getCount();
                component.setHeight(10+items*50+10); 
                }
                
            }
        },

        itemTpl: [
            '<div class="headshot" style="float:left;width:32px;height:37px;background-image:url({image});"></div>',
            '{name}'
        ].join('')
    }
});
