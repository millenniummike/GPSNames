Ext.define('GolfTracker.view.Courses', {
    extend: 'Ext.List',
    
    xtype: 'courses',
    id: 'courseslist',
    onItemDisclosure:true,
    listeners:{
        afterrender:function(cmp){
            this.store.each(function(record,index,itemsCount){
                if(record.data.type != "link"){
                    Ext.select('.x-list-disclosure',cmp.getNode(index)).remove();
                }
            });                         
        },
        itemtap:function(list,index,item){
            var record = this.store.getAt(index);
            if(record.data.type == "link"){
                // do action
            }               
        }
    },

    config: {
        items:[
], 
        title: 'Courses',
        cls: 'x-contacts',
        store: 'Courses',
        itemTpl: [
            '<div>{name}</div>'
        ].join('')
    }
});
