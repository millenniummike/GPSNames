Ext.define('GolfTracker.view.Edit', {
    extend: 'Ext.Container',
    xtype: 'contact-edit',

    config: {
        title: 'Edit GPSName',
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
                        title: 'Details',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Id',
                                name: 'id',
                                hidden: true
                            },
                                      {
                                xtype: 'textfield',
                                label: 'Course Name',
                                name: 'coursename',
                                id: 'coursename',
                                value: ''
                            },
                              {
                                  
                                xtype: 'spinnerfield',
                                label: 'Hole',
                                name: 'hole',
                                id: 'hole',
                                minValue: 1,
                                maxValue: 18,
                                increment: 1,
                                cycle: true
                            },
                                 {
                                xtype: 'spinnerfield',
                                label: 'Par',
                                name: 'par',
                                id: 'par',
                                minValue: 3,
                                maxValue: 5,
                                increment: 1,
                                cycle: true
                            },
                            
        {          xtype: 'selectfield',
                                label: 'Club Used',
                                name: 'club',
                                id: 'club',
                                options: [
                                    {text: 'Driver',  value: 'Driver'},
                                    {text: '5 Wood', value: '5 Wood'},
                                    {text: '3 Wood', value: '3 Wood'},
                                    {text: 'Hybrid', value: 'Hybrid'},
                                    {text: '9 Iron', value: '9 Iron'},
                                    {text: '8 Iron', value: '8 Iron'},
                                    {text: '7 Iron', value: '7 Iron'},
                                    {text: '6 Iron', value: '6 Iron'},
                                    {text: '5 Iron', value: '5 Iron'},
                                    {text: '4 Iron', value: '4 Iron'},
                                    {text: 'Pitching Wedge', value: 'Pitching Wedge'},
                                    {text: 'Putter', value: 'Putter'},
                                    
                                    
                                ]
                    },
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        defaults: {
                            labelWidth: '100%'
                        },
                        title: 'Location',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Lat',
                                name: 'lat'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Lon',
                                name: 'lon'
                            }
                        ]
                    },
                     {
                xtype: 'map',
                id: 'map_edit',
                 mapOptions: {
                    zoom: 18,
                    mapTypeId: google.maps.MapTypeId.SATELLITE
                },
                height: 200,
                useCurrentLocation: true
                
            },
                                    {
                            xtype: 'button',
                            text: 'Update',
                            ui: 'confirm',
                            handler: function() {
                                var formValues = this.up('formpanel').getValues();
                                var model = Ext.ModelMgr.create(formValues,'GolfTracker.model.Contact');      
                                var errors = model.validate(),message = "";
                                var errorMessage;
                                       
                                 if(errors.isValid()){  
                                    this.up('formpanel').submit();
                                    errorMessage='';
                                    Ext.Msg.alert('Updated!');
                                } else {                                   
                                     errors.each(function (err) {
    
                                        errorMessage += err.getMessage() + '<br/>';
                                    }); // each()
                                    Ext.Msg.alert('Form is invalid!', errorMessage);
                                }                                                             
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
    }
});
