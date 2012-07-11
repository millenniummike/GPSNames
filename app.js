// global variables
var gpsname_user='';
var gpsname_password=''; 
 
 // Wait for PhoneGap to load

document.addEventListener("deviceready", onDeviceReady, false);

//onDeviceReady(); // non phone gap enviroment

// PhoneGap is ready

function onDeviceReady() {

alert ('PhoneGap Loaded!');

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
        
         
        var settingsStore = Ext.getStore('Settings');
        var item = settingsStore.getAt(0);

        if (item){
            gpsname_user=item.data.username;
            gpsname_password=item.data.password; 
            var application= GPSName.app.getController('Application');
            application.Login(gpsname_user,gpsname_password);
        }

        var store = Ext.getStore('Locations');
        store.getProxy().setExtraParam('gpsname', gpsname_user); 
        store.load();
        
       
        Ext.Viewport.add({
            xclass: 'GPSName.view.Main'
        });
    }
});
    }