Ext.define('GPSName.controller.Application', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'mainview',
            editButton: '#editButton',
            contacts: 'contacts',
            tags: 'tags',
            showContact: 'contact-show',
            editContact: 'contact-edit',
            addContact: 'contact-add',
            showSettings: 'settings-show',
            saveButton: '#saveButton',
            addButton: '#addButton',
            actionButton: '#actionButton',
            homeButton: '#homeButton',
            settingsButton: '#settingsButton',
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
            saveButton: {
                tap: 'onContactSave'
            },
            addButton: {
                tap: 'onContactAddSave'
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
Ext.getStore('Contacts').load({
params:{gpsname: field.getValue()}
});


},
ontagfilterKeyup: function(field, e) {
Ext.getStore('Tags').load({
params:{filter: field.getValue()}
});
              


},

    onMainPush: function(view, item) {
        var editButton = this.getEditButton();

        if (item.xtype == "contact-show") {
            this.getContacts().deselectAll();

            this.showEditButton();
        } else {
            this.hideEditButton();
        }
    },

    onMainPop: function(view, item) {
        this.hideAddButton();
        
        if (item.xtype == "contact-edit") {
            this.showEditButton();
        } else {
            this.hideEditButton();
        }
    },

    onContactSelect: function(list, index, node, record) {
        var editButton = this.getEditButton();

        if (!this.showContact) {
            this.showContact = Ext.create('GPSName.view.gpsname.Show');
        }

        // Bind the record onto the show contact view
        this.showContact.setRecord(record);

        // Push the show contact view into the navigation view
        this.getMain().push(this.showContact);
    },

    onContactEdit: function() {
        if (!this.editContact) {
            this.editContact = Ext.create('GPSName.view.gpsname.Edit');
        }

        // Bind the record onto the edit contact view
        this.editContact.setRecord(this.getShowContact().getRecord());

        this.getMain().push(this.editContact);
    },
    onAddContactChange: function() {
        this.showAddButton();
    },

    onContactChange: function() {
        this.showSaveButton();
    },

    onContactAddSave: function() {
        
       var record = this.getAddContact().saveRecord();
       this.getAddContact().updateRecord(record);

    },

    onContactSave: function() {
        var record = this.getEditContact().saveRecord();
        this.getShowContact().updateRecord(record);
        
       // this.getMain().pop();
    },
    
    onAction: function() {
        
      if (!this.showAction) {
            this.showAction = Ext.create('GPSName.view.gpsname.Add');
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
            this.showSettings = Ext.create('GPSName.view.gpsname.Settings');
        }
        
        this.showSettings.setRecord(this.getShowSettings().getRecord());
        
        this.getMain().push(this.showSettings);
        
        var settingsStore = Ext.getStore('Settings');
        var item = settingsStore.getAt(0);
        
        this.showSettings.loadName(item.get('username'),item.get('password'));
      
        
    },
    showEditButton: function() {
        var editButton = this.getEditButton();

        if (!editButton.isHidden()) {
            return;
        }

        this.hideSaveButton();

        editButton.show();
    },

    hideEditButton: function() {
        var editButton = this.getEditButton();

        if (editButton.isHidden()) {
            return;
        }

        editButton.hide();
    },

    showSaveButton: function() {
        var saveButton = this.getSaveButton();

        if (!saveButton.isHidden()) {
            return;
        }

        saveButton.show();
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
    
    

    hideSaveButton: function() {
        var saveButton = this.getSaveButton();

        if (saveButton.isHidden()) {
            return;
        }

        saveButton.hide();
    }
});


