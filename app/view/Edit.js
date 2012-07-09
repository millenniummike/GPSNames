Ext.define('GPSName.view.Edit', {
    extend: 'Ext.Container',
    xtype: 'contact-edit',

    config: {
        title: 'Edit GPSName',
        layout: 'fit',

        items: [
            {
                
                xtype: 'formpanel',
                url: 'http://www.gpsname.com/index.php/sencha/update',

                items: [
                    {
                        xtype: 'fieldset',
                        defaults: {
                            labelWidth: '100%'
                        },
                        title: 'Information',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Id',
                                name: 'id',
                                hidden: true
                            },
                            {
                                xtype: 'textfield',
                                label: 'Title',
                                name: 'title',
                                id:'title'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Description',
                                name: 'description',
                                id:'description'
                            }
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
                        xtype: 'fieldset',
                        defaults: {
                            labelWidth: '100%'
                        },
                        title: 'Tag',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Tag Filter',
                                name: 'tagfilter',
                                id: 'tagfilter'
                            },
                            { xtype: 'tags',
                            id:'tags_edit',
                            name:'tags_edit',
                            height:50},
                     {
                                xtype: 'textfield',
                                label: 'Tagged',
                                name: 'tagged',
                                id: 'tagged'
                            },
                            
                            {          xtype: 'selectfield',
                                label: 'Category',
                                name: 'category',
                                options: [
                                    {text: 'Home',  value: 'Home'},
                                    {text: 'Work', value: 'Work'},
                                    {text: 'Public Place', value: 'Public Place'},
                                    {text: 'General', value: 'General'},

                                ]
                    },
                            
                                  {          xtype: 'selectfield',
                                label: 'Who can See?',
                                name: 'permissions',
                                options: [
                                    {text: 'Everyone',  value: '1'},
                                    {text: 'Other GPSName users', value: '2'},
                                    {text: 'Connected GPSName users', value: '3'},
                                    {text: 'Facebook Friends', value: '4'},
                                    {text: 'Facebook Friends & Connected GPSName Users', value: '5'},
                                    {text: 'No one', value: '6'},
                                ]
                    },

                        ]
                    },
                     {
                xtype: 'map',
                id: 'map_edit',
                height: 200,
                mapOptions: {
                    zoom: 18,
                    navigationControl: true,
                    zoomControl: true,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL
                    },
                    navigationControlOptions: 
                    {
                        style: google.maps.NavigationControlStyle.DEFAULT
                    }
                },
                useCurrentLocation: false
                
            },
                                    {
                            xtype: 'button',
                            text: 'Update',
                            ui: 'confirm',
                            handler: function() {
                                var formValues = this.up('formpanel').getValues();
                                var model = Ext.ModelMgr.create(formValues,'GPSName.model.Locations');      
                                var errors = model.validate(),message = "";
                                var errorMessage='';
                                       
                                 if(errors.isValid()){  
                                    this.up('formpanel').submit();
                                    Ext.Msg.alert('Updated!');
                                } else { 
                                     errors.each(function (err) {
                                      
                                        errorMessage += err.getMessage() + '<br/>';
                                        

                                        if (err.getMessage()=='Enter Tagged'){
                                            Ext.getCmp('tagged').setLabelCls('error');
                                            Ext.getCmp('tagfilter').setLabelCls('error');
                                            Ext.getCmp('tagged').focus()
                                        }
                                        if (err.getMessage()=='Enter Title'){
                                            Ext.getCmp('title').setLabelCls('error');
                                            Ext.getCmp('title').focus()
                                        }
                                        if (err.getMessage()=='Enter Description'){
                                            Ext.getCmp('description').setLabelCls('error');
                                            Ext.getCmp('description').focus()
                                        }

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
