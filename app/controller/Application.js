Ext.define('GPSName.controller.Application', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'mainview',
            editButton: '#editButton',
            contacts: 'contacts',
            tags: 'tags',
            showLocation: 'location-show',
            editContact: 'contact-edit',
            addContact: 'contact-add',
            showSettings: 'settings-show',
            updateButton: '#updateButton',
            addButton: '#addButton',
            actionButton: '#actionButton',
            homeButton: '#homeButton',
            settingsButton: '#settingsButton',
            friendsButton: '#friendsButton',
            searchbox: '#searchbox',
            tagfilter: '#tagfilter'
        },

        control: {
            main: {
                push: 'onMainPush',
                pop: 'onMainPop'
            },
            editButton: {
                tap: 'onContactEdit'
            },
            contacts: {
                itemtap: 'onContactSelect'
            },
            updateButton: {
                tap: 'onLocationUpdate'
            },
            addButton: {
                tap: 'onLocationAddSave'
            },
             addContact: {
                change: 'onAddContactChange'
            },
            editContact: {
                change: 'onContactChange'
            },
             actionButton: {
                tap: 'onAction'
            },
             homeButton: {
                tap: 'onHome'
            },
            settingsButton: {
                tap: 'onSettings'
            },
            friendsButton: {
                tap: 'onFriends'
            },
            searchbox: {
                keyup: 'onSearchKeyup',
                clearicontap: 'onSearchKeyup'
            },
             tagfilter: {
                keyup: 'ontagfilterKeyup',
                clearicontap: 'ontagfilterKeyup'
            }
   
        }
    },

onSearchKeyup: function(field, e) {
    
     var store = Ext.getStore('Locations');
        // clear all existing filters
        store.clearFilter();
        store.filter('title', field.getValue()); 
        
        var settingsStore = Ext.getStore('Settings');
        var item = settingsStore.getAt(0);
        if (item.data.username){
            gpsname_user=item.data.username;
        }
        
        store.getProxy().setExtraParam('gpsname', gpsname_user);   
        store.load();

},
ontagfilterKeyup: function(field, e) {
Ext.getStore('Tags').load({
params:{filter: field.getValue()}
});
              


},

    onMainPush: function(view, item) {
        //alert("push "+item.xtype);
        if (item.xtype == "location-show") {
            this.getContacts().deselectAll();

            this.showEditButton();
        } else {
            this.hideEditButton();
        }
    },

    onMainPop: function(view, item) {
        //alert ("pop "+item.xtype);
        
        this.hideAddButton();
        
        
        if (item.xtype == "location-edit"||item.xtype == "contact-edit") {
            this.showEditButton();
        } else {
            this.hideEditButton();
            Ext.getCmp('toptoolbar').setTitle('');
        }
    },

    onContactSelect: function(list, index, node, record) {
        var editButton = this.getEditButton();

        if (!this.showContact) {
            this.showContact = Ext.create('GPSName.view.Show');
        }
        // Bind the record onto the show contact view
        this.showContact.setRecord(record);

        // Push the show contact view into the navigation view
        this.getMain().push(this.showContact);
        
        Ext.getCmp('toptoolbar').setTitle(''+record.data.title);
    },

    onContactEdit: function() {
        if (!this.editContact) {
            this.editContact = Ext.create('GPSName.view.Edit');
        }

        // Bind the record onto the edit contact view
        var record=this.getShowLocation().getRecord();
        
        this.editContact.setRecord(record);
      
        var map = Ext.getCmp('map_edit').getMap();
        var myLatLng = new google.maps.LatLng(record.data.lat,record.data.lon);
        map.setCenter(myLatLng, 18);
        var image =  record.data.image;
          var marker = new google.maps.Marker({
              position: myLatLng,
              icon: image,
              map: map
          });

            marker.setMap(map);

        this.getMain().push(this.editContact);
    },
    onAddContactChange: function() {
        this.showAddButton();
    },

    onContactChange: function() {
        this.showUpdateButton();
    },

    onLocationAddSave: function() {

            var formValues = Ext.getCmp('addform').getValues();
            var model = Ext.ModelMgr.create(formValues,'GPSName.model.Locations');      
            var errors = model.validate(),message = "";
            var errorMessage='';
                if(errors.isValid()){ 
                    
                    Ext.Ajax.request({
                        url: 'http://www.onebiglink.com/gpsname.com/index.php/feed/add_gpsname',
                        method: 'post',
                        params: {lat:formValues.lat,lon:formValues.lon,string:formValues.title,description:formValues.description,permissions:formValues.permissions,category:formValues.category,descriptiontags:formValues.tagged},
                        failure : function(response){
                        data = Ext.decode(response.responseText);

                        },
                        success: function(response, opts) {
                        data = Ext.decode(response.responseText);
                        if (data.errorMessage != null)
                        {
                        }
                        }
                    });

                Ext.Msg.alert('Updated!','');
            } else { 
                    errors.each(function (err) {

                    errorMessage += err.getMessage() + '<br/>';

                    /*
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
                    */

                }); // each()
                Ext.Msg.alert('Form is invalid!', errorMessage);
            }   

    },

    onLocationUpdate: function() {
        
            var formValues = Ext.getCmp('editform').getValues();
            var model = Ext.ModelMgr.create(formValues,'GPSName.model.Locations');      
            var errors = model.validate(),message = "";
            var errorMessage='';
                if(errors.isValid()){ 
                    
                    Ext.Ajax.request({
                        url: 'http://www.onebiglink.com/gpsname.com/index.php/feed/update_gpsname',
                        method: 'post',
                        params: {id:formValues.id,lat:formValues.lat,lon:formValues.lon,string:formValues.title,description:formValues.description,permissions:formValues.permissions,category:formValues.category,descriptiontags:formValues.tagged},
                        failure : function(response){
                        data = Ext.decode(response.responseText);

                        },
                        success: function(response, opts) {
                        data = Ext.decode(response.responseText);
                        if (data.errorMessage != null)
                        {
                        }
                        }
                    });

                Ext.Msg.alert('Updated!','');
                this.hideUpdateButton();
            } else { 
                    errors.each(function (err) {

                    errorMessage += err.getMessage() + '<br/>';

                    /*
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
                    */

                }); // each()
                Ext.Msg.alert('Form is invalid!', errorMessage);
            }   
                    
        
    },
    
    onAction: function() {
        
      if (!this.showAction) {
            this.showAction = Ext.create('GPSName.view.Add');
        }
        this.getMain().push(this.showAction);
        
        this.showAction.loadGPS();
   
    },
        
    onHome: function() {
        
      if (this.showAction) {      
        // Push the show contact view into the navigation view
        this.getMain().pop();
        }
        
    },

 onSettings: function() {

        if (!this.showSettings) {
            this.showSettings = Ext.create('GPSName.view.Settings');
        }
        
        this.showSettings.setRecord(this.getShowSettings().getRecord());
        
        this.getMain().push(this.showSettings);
        
        var settingsStore = Ext.getStore('Settings');
        var item = settingsStore.getAt(0);
        if (item){
            this.showSettings.loadName(item.get('username'),item.get('password'));
        }
      
        
    },
     onFriends: function() {
        if (!this.showFriends) {
            this.showFriends = Ext.create('GPSName.view.Friends');
        } 
        this.getMain().push(this.showFriends);     
        
    },
    Login: function(email,password) {
    
Ext.Ajax.request({
    url: 'http://www.onebiglink.com/gpsname.com/index.php/login/api_login',
    method: 'post',
    params: {email: email, password : password},
    failure : function(response){
        data = Ext.decode(response.responseText);
        Ext.Msg.alert('Login Error', data.message, Ext.emptyFn);
    },
    success: function(response, opts) {
    data = Ext.decode(response.responseText);
    
    if (data.result !='OK')
    {
        Ext.Msg.alert('Login Error', data.message, Ext.emptyFn);
    } 
    else 
    {
        Ext.Msg.alert('Login OK');
        var locationsStore = Ext.getStore('Locations');
        locationsStore.load();
    }
    }
    });
        
    },
    showEditButton: function() {
        var editButton = this.getEditButton();

        if (!editButton.isHidden()) {
            return;
        }

        this.hideUpdateButton();

        editButton.show();
    },

    hideEditButton: function() {
        var editButton = this.getEditButton();

        if (editButton.isHidden()) {
            return;
        }

        editButton.hide();
    },

    showUpdateButton: function() {
        var updateButton = this.getUpdateButton();

        if (!updateButton.isHidden()) {
            return;
        }

        updateButton.show();
    },
    
       showAddButton: function() {
        var addButton = this.getAddButton();

        if (!addButton.isHidden()) {
            return;
        }

        addButton.show();
    },
    
    
    hideAddButton: function() {
        var addButton = this.getAddButton();

        if (addButton.isHidden()) {
            return;
        }

        addButton.hide();
    },
    
    

    hideUpdateButton: function() {
        var updateButton = this.getUpdateButton();

        if (updateButton.isHidden()) {
            return;
        }

        updateButton.hide();
    }
});


