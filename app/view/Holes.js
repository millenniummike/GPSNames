Ext.define('GolfTracker.view.Holes', {
    extend: 'Ext.List',
    
    xtype: 'holes',
    id: 'holeslist',

    config: {
            onItemDisclosure:true,
listeners : {
  itemtap : function(record,index,item,e){
  //alert (e.data.name);
  var application= GolfTracker.app.getController('Application');
  application.onAction(e.data.hole);
 
  }
},
        items:[
], 
        title: 'Holes',
        cls: 'x-holes',
        store: 'Holes',
        itemTpl: [
            '<div>{hole}</div>'
        ].join('')
    }
});
