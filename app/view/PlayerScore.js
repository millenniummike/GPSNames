Ext.define('GolfTracker.view.PlayerScore', { 
    extend: 'Ext.Container',
    xtype: 'settings-show',

    config: {
        title: 'Players Scores',
        layout: 'fit',

        items: [
            {
                
                xtype: 'formpanel',
                items: [
                    {
                        xtype: 'fieldset',
                        defaults: {
                            labelWidth: '100%'
                        },
                        title: 'Other Scores',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Player1',
                                name:  'player1',
                                id: 'player1'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Player2',
                                name:  'player2',
                                id: 'player2'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Player3',
                                name:  'player3',
                                id: 'player3'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Player4',
                                name:  'player4',
                                id: 'player4'
                            },
                        ]
                    },

                                    {
                            xtype: 'button',
                            text: 'Update',
                            ui: 'confirm',
                            handler: function() { 
                            }
                        }
                ]
            }
        ],

        listeners: {
            delegate: 'textfield',
            keyup: 'onKeyUp'
        },

        record: null
    },

    updateRecord: function(newRecord) {
     
    },

    saveRecord: function() {

    },

    onKeyUp: function() {
       
    }
});
