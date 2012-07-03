Ext.define('GolfTracker.view.Show', {
    extend: 'Ext.List',
    xtype: 'contact-show',
    config: {


        baseCls: 'x-show-contact',
        layout: 'vbox',
        title:'',
     

        items: [
			{
				xtype: 'component',
				id: 'content',
                                height:100,
                tpl: [
                    '<div style="font-size:150%;padding: 5px;">Hole {hole}</div><div style="font-size:100%;padding: 5px;">Shot {shot}</div><div style="padding-left:5px;font-size:80%;color:grey;">{club}</div'
                ].join('')
				
			
			},
            {
                xtype: 'map',
                height: 400,
                 mapOptions: {
                    zoom: 18,
                    mapTypeId: google.maps.MapTypeId.SATELLITE
                }
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
