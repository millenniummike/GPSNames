Ext.define('GPSName.view.Settings', {
    extend: 'Ext.Container',
    xtype: 'settings-show',

    config: {
        title: 'Account Settings',
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
                        title: 'Authentication',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Username',
                                name:  'username',
                                id: 'username'
                            },
                            {
                                xtype: 'passwordfield',
                                label: 'Password',
                                name: 'password',
                                id: 'password'
                            }
                        ]
                    },
                                    {
                            xtype: 'button',
                            text: 'Update',
                            ui: 'confirm',
                            handler: function() {
                                
                                var settingsStore = Ext.getStore('Settings');
                                settingsStore.removeAll();
                                
                                var form = this.up('formpanel').getValues();

                                settingsStore.add(form);
                                settingsStore.sync(); 

                                var item = settingsStore.getAt(0);
 
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
        this.down('formpanel').setRecord(newRecord);
    },

    saveRecord: function() {
        var formPanel = this.down('formpanel'),
            record = formPanel.getRecord();

        formPanel.updateRecord(record);

        return record;
    },

    onKeyUp: function() {
        this.fireEvent('change', this);
    },
    loadName: function(username,password){
        Ext.getCmp('username').setValue('' +username);
        Ext.getCmp('password').setValue('' +password);
    }
});
