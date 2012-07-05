Ext.define('GPSName.view.Add', {
    extend: 'Ext.Container',
    xtype: 'contact-add',

    config: {
        title: 'Add GPSName',
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
                        title: 'Information',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Title',
                                name: 'titleinput'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Description',
                                name: 'description'
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
                useCurrentLocation: true,
                             mapOptions: {
                    zoom: 18,
                    mapTypeId: google.maps.MapTypeId.SATELLITE,
                    navigationControl: true,
                    zoomControl: true,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL
                    },
                    navigationControlOptions: 
                    {
                        style: google.maps.NavigationControlStyle.DEFAULT
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
        
         var socket = io.connect('http://195.234.11.44:8081');


        var geo = Ext.create('Ext.util.Geolocation', {
    autoUpdate: true,
    listeners: {
        locationupdate: function(geo) {
            Ext.getCmp('lat').setValue('' + geo.getLatitude());
            Ext.getCmp('lon').setValue('' + geo.getLongitude());
            
            socket.emit('updatecharacter',{user:'tester',lat:geo.getLatitude(),lon:geo.getLongitude()});

            
            /*
            var myLatLng = new google.maps.LatLng(''+geo.getLatitude(),''+geo.getLongitude());
            var map = Ext.getCmp('map_add').getMap();
            var marker = new google.maps.Marker({
              position: myLatLng,
              map: map
          });

            marker.setMap(map);
            */
            
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