Ext.define('GPSName.view.Show', {
    extend: 'Ext.List',
    xtype: 'location-show',
    config: {


        baseCls: 'x-show-location',
        layout: 'vbox',
        title:'',
     

        items: [
			{
				xtype: 'component',
				id: 'content',
                           
                tpl: [
                    '<div style="font-size:100%;padding: 5px;">{description}</div>'
                ].join('')
				
			
			},
            {
                xtype: 'map',
                height: 200,
                 mapOptions: {
                    zoom: 18,
                    navigationControl: true,
                    zoomControl: true,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL
                    }
                 }
            },

            {
                xtype: 'formpanel',
		height:200,
                scrollable: 'false',
                items: [

                    {
                        xtype: 'emailfield',
                        label: 'Email',
                        labelWidth: '100%',
                        placeHolder: 'email@example.com'
                    },
					{
                        xtype: 'button',
			ui: 'confirm',
                        text: 'Send',
                        handler: function() {
                            alert ("Sending email!");
                        }
                    }
                ]
            }
        ]
    },

    updateRecord: function(newRecord) {
        if (newRecord) {
            this.down('#content').setData(newRecord.data);

            this.down('map').setMapCenter({
                latitude: newRecord.data.lat,
                longitude: newRecord.data.lon
            });
            
            var image =  newRecord.data.image;

            var myLatLng = new google.maps.LatLng(newRecord.data.lat,newRecord.data.lon);
            var map = this.down('map').getMap();
  
          var marker = new google.maps.Marker({
              position: myLatLng,
              icon: image,
              map: map
          });

            marker.setMap(map);
                }
            }
});
