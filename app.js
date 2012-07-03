

Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath({
    'Ext': '../../sencha/src'
});


Ext.application({
    name: 'GolfTracker',

    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

    glossOnIcon: false,
    icon: {
        57: 'resources/icons/icon.png',
        72: 'resources/icons/icon@72.png',
        114: 'resources/icons/icon@2x.png',
        144: 'resources/icons/icon@114.png'
    },

    models: ['Settings','Courses','Games','Holes','Shots'],
    stores: ['Settings','Courses','Games','Holes','Shots'],
    views: ['Main','Show','Edit','Settings','Add','PlayerScore','Games','Courses','CourseAdd'],
    controllers: ['Application'],

    launch: function() {
        // global variables

        this.holes_id='';
        this.courses_id='';
        this.games_id='';
 
        Ext.Viewport.add({
            xclass: 'GolfTracker.view.Main'
        });


    }

});