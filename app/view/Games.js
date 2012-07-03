Ext.define('GolfTracker.view.Games', {
    extend: 'Ext.List',
    
    xtype: 'games',
    id: 'gameslist',

    config: {
            onItemDisclosure:true,
listeners : {
  itemtap : function(record,index,item,e){
  //alert (e.data.name);
  var application= GolfTracker.app.getController('Application');
  application.onShowHoles(e.data.id);
 
  }
},
        items:[
], 
        title: 'Games',
        cls: 'x-games',
        store: 'Games',
        itemTpl: [
            '<div>{id} {name}</div>'
        ].join('')
    }
});
