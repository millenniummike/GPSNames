// global variables
var gpsname_user='nick1';   

Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath({
    'Ext': 'resources'
});


Ext.application({
    name: 'GPSName',

    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

    glossOnIcon: false,
    icon: {
        57: 'resources/icons/icon.png',
        72: 'resources/icons/icon@72.png',
        114: 'resources/icons/icon@2x.png',
        144: 'resources/icons/icon@114.png'
    },

    models: ['Locations','Tags','Settings'],
    stores: ['Locations','Tags','Settings'],
    views: ['Main','Locations','Tags','Add','Edit','Show','Friends'],
    controllers: ['Application'],
        launch: function() {
        
        var store = Ext.getStore('Locations');
        store.getProxy().setExtraParam('gpsname', gpsname_user);   
        store.load();
        
        Ext.Viewport.add({
            xclass: 'GPSName.view.Main'
        });
        
  
    }


});