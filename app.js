Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath({
    'Ext': 'resources'
});


Ext.application({
    name: 'AddressBook',

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
    views: ['Main'],
    controllers: ['Application'],

    launch: function() {
        Ext.Viewport.add({
            xclass: 'GPSname.view.Main'
        });


    }

});