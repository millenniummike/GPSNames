Ext.define('GPSName.view.gpsname.Add', {
    extend: 'Ext.Container',
    xtype: 'contact-add',

    config: {
        title: 'Add GPSName',
        layout: 'fit',

        items: [
            {
                
                xtype: 'formpanel',
                url: 'http://www.gpsname.com/index.php/sencha/add',

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
                                label: 'Title',
                                name: 'title',
                                defaults: {
                                    required: true,
                                    labelAlign: 'left',
                                    labelWidth: '40%'
                                }
                            },
                            {
                                xtype: 'textareafield',
                                label: 'Description',
                                name: 'description',
                                maxRows: 2
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
                                name: 'lat',
                                id: 'lat'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Lon',
                                name: 'lon',
                                id: 'lon'
                            }
                        ]
                    },
                     {
                        xtype: 'fieldset',
                        layout: 'vbox',

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
                              name: 'tags',
                              id: 'tags',
                              height:'50'
                       },
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
                id:'map_add',
                height: 200,
                useCurrentLocation: true
                
            },
                        {
                            xtype: 'button',
                            text: 'Add',
                            ui: 'confirm',
                            handler: function() {
                                var formValues = this.up('formpanel').getValues();
                                var model = Ext.ModelMgr.create(formValues,'GPSName.model.Contact');      
                                var errors = model.validate(),message = "";
                                var errorMessage;
                                       
                                 if(errors.isValid()){  
                                    this.up('formpanel').submit();
                                    errorMessage='';
                                    Ext.Msg.alert('Added!');
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
        
    },

    onKeyUp: function() {
        this.fireEvent('change', this);
    },
    
    loadGPS: function () {
        
        var geo = Ext.create('Ext.util.Geolocation', {
    autoUpdate: false,
    listeners: {
        locationupdate: function(geo) {
            Ext.getCmp('lat').setValue('' + geo.getLatitude());
            Ext.getCmp('lon').setValue('' + geo.getLongitude());
            
            var myLatLng = new google.maps.LatLng(''+geo.getLatitude(),''+geo.getLongitude());
            var map = Ext.getCmp('map_add').getMap();
            var marker = new google.maps.Marker({
              position: myLatLng,
              map: map
          });

            marker.setMap(map);
            
        },
        locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
            if(bTimeout){
                alert('Timeout occurred.');
            } else {
                alert('Error occurred.');
            }
        }
    }
});
geo.updateLocation();
    }
});