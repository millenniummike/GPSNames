Ext.define('GolfTracker.view.Courses', {
    extend: 'Ext.List',
    
    xtype: 'courses',
    id: 'courseslist',

    config: {
            onItemDisclosure:true,
listeners : {
  itemtap : function(record,index,item,e){
  //alert (e.data.name);
  var application= GolfTracker.app.getController('Application');
  application.onShowGames(e.data.id);
 
  }
},
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
