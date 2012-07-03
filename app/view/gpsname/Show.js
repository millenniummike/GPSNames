Ext.define('GPSName.view.gpsname.Show', {
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
                    '<div style="font-size:150%;padding: 5px;">{title}</div><div style="font-size:100%;padding: 5px;">{description}</div'
                ].join('')
				
			
			},
            {
                xtype: 'map',
                height: 200
            },
            	{

                    xtype: 'fieldset',
                        defaults: {
                            labelWidth: '100%'
                        },
                        title: 'Navigate Using',
                        items: [
              
			{
                xtype: 'segmentedbutton',
                items: [
                    {
                        xtype: 'button',
						ui: 'action',
                        text: 'Google'
                    },
                    {
                        xtype: 'button',
						ui: 'action',
                        text: 'Nokia'
                    },
                    {
                        xtype: 'button',
						ui: 'action',
                        text: 'Waze'
                    },
                    {
                        xtype: 'button',
						ui: 'action',
                        text: 'Layar'
                    }
                ]
            },
                ]
            },

            {
                xtype: 'formpanel',
		height:200,
                scrollable: 'false',
                items: [

                    {
                        xtype: 'emailfield',
                        label: 'Email',
                        placeHolder: 'email@example.com'
                    },
					{
                        xtype: 'button',
			ui: 'confirm',
                        text: 'Send'
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
