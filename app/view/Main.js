Ext.define('GolfTracker.view.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'mainview',

    requires: [
         'GolfTracker.view.Courses',
    ],

    config: {
        autoDestroy: false,
        navigationBar: {
            ui: 'light',
            id: 'navBar',
            items: [
 
                {
                    xtype: 'button',
                    id: 'editButton',
                    text: 'Edit',
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                },
                {
                    xtype: 'button',
                    id: 'saveButton',
                    text: 'Save',
                    ui: 'sencha',
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                },
                {
                    xtype: 'button',
                    id: 'addButton',
                    text: 'Add',
                    ui: 'sencha',
                    align: 'right',
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                }
            ]
        },

        items: [
                            {xtype: 'toolbar',
                        docked: 'top',
                        
                        items: [
                            { 
                            xtype : "container", html : "<div><img style='width:75px;float:left;' src='http://gpsname.com/images/gpslogo_white.png'/></div>"},
                           
                            
                        ]
                    },
                    
                      

			{ xtype: 'courses' },
			{ xtype: 'toolbar',
                    docked: 'bottom',
                    html: null,
                    // Center all items horizontally and vertically
                    layout: {
                        pack: 'center',
                        align: 'center'
                    },

                    // Make the toolbar scrollable
                    scrollable: {
                        direction: 'horizontal',
                        indicators: false
                    },

                    // Add some default configurations to all items added to this toolbar
                    defaults: {
                        // iconMask is used when you need an pictos icon in a button
                        iconMask: true,
                        ui: 'plain'
                    },

                    // Add a bunch of buttons into the toolbar
                    items: [
                        { height:'48px',iconAlign:'top',text:'Courses',iconMask: true, iconCls: 'home', id:'homeButton' },
                        { height:'48px',iconAlign:'top',text:'Add Shot',iconMask: true, iconCls: 'add', id:'actionButton' },
                        { height:'48px',iconAlign:'top',text:'Score Card',iconMask: true, iconCls: 'list', id:'scoreButton' },
                        { height:'48px',iconAlign:'top',text:'Clear',iconMask: true, iconCls: 'trash', id:'trashButton' }
           
                    ]
                }			
        ]
    }
});
