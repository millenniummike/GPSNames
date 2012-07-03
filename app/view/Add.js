Ext.define('GolfTracker.view.Add', {
    extend: 'Ext.Container',
    xtype: 'contact-add',

    config: {
        title: 'Add Shot',
        layout: 'fit',

        items: [
            {
                
                xtype: 'formpanel',
                id: 'formpanel',

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
                                cycle: true,
                                listeners: {
                                spin: function (spinner, value, dir) {
                                   var application= GolfTracker.app.getController('Application');
                                 application.onContactAddChangeHole();
                                } // spin
                            } // listeners
                               
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
                            
                            {
                                xtype: 'textfield',
                                label: 'Shot',
                                name: 'shot',
                                id: 'shot',
                                value: '1'
                            },
                            {
                                xtype: 'hiddenfield',
                                label: 'Lat',
                                name: 'lat',
                                id: 'lat'
                            },
                            {
                                xtype: 'hiddenfield',
                                label: 'Lon',
                                name: 'lon',
                                id: 'lon'
                            }
                        ]
                    },


                     {
                xtype: 'map',
                id:'map_add',
                height: 200,
                useCurrentLocation: true,
                mapOptions: {
                    zoom: 18,
                    mapTypeId: google.maps.MapTypeId.SATELLITE
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
                 
    
                               // var formValues = this.up('formpanel').getValues();
                                var formValues = Ext.getCmp('formpanel').getValues();
                                var user = Ext.create('GolfTracker.model.Contact', formValues);
                              
                                var errors = user.validate(),message = "";
                                var errorMessage;
                                       
                                 if(errors.isValid()){  
                                    //this.up('formpanel').submit();
                                    errorMessage='';
                                  
                                    //Ext.Msg.alert('Shot Added!');
                                    
                                    // alert ("processed!");
                                  
                          
                                  
                                  
                                    Ext.getCmp('shot').setValue(parseInt(Ext.getCmp('shot').getValue()) + 1);
                                    var club=Ext.getCmp('club').getValue();
                                    var myLatLng = new google.maps.LatLng(Ext.getCmp('lat').getValue(),Ext.getCmp('lon').getValue());
                                    var image;

                                    if (club=='Driver') {image='http://www.gpsname.com/images/golf/1.png';}
                                    if (club=='5 Wood') {image='http://www.gpsname.com/images/golf/2.png';}
                                    if (club=='3 Wood') {image='http://www.gpsname.com/images/golf/3.png';}
                                    if (club=='Hybrid') {image='http://www.gpsname.com/images/golf/4.png';}
                                    if (club=='9 Iron') {image='http://www.gpsname.com/images/golf/5.png';}
                                    if (club=='8 Iron') {image='http://www.gpsname.com/images/golf/6.png';}
                                    if (club=='7 Iron') {image='http://www.gpsname.com/images/golf/7.png';}
                                    if (club=='6 Iron') {image='http://www.gpsname.com/images/golf/5.png';}
                                    if (club=='5 Iron') {image='http://www.gpsname.com/images/golf/5.png';}
                                    if (club=='4 Iron') {image='http://www.gpsname.com/images/golf/5.png';}
                                    if (club=='Pitching Wedge') {image='http://www.gpsname.com/images/golf/11.png';}
                                    if (club=='Putter') {image='http://www.gpsname.com/images/golf/12.png';}
                                    
                                    var map = Ext.getCmp('map_add').getMap();
                                    var marker = new google.maps.Marker({
                                    position: myLatLng,
                                    icon: image,
                                    map: map
                                });

                                    marker.setMap(map);
                                    user.set('image', image);    
                                    user.save();
                                    
                                    var contactsStore = Ext.getStore('Contacts');
                                    contactsStore.load();
            
                                } else {                                   
                                     errors.each(function (err) {
    
                                        errorMessage += err.getMessage() + '<br/>';
                                    }); // each()
                                    Ext.Msg.alert('Form is invalid!', errorMessage);
                                }
                                
                                  
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