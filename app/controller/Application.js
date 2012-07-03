Ext.define('GolfTracker.controller.Application', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'mainview',
            editButton: '#editButton',
            holes: 'holes',
            showContact: 'contact-show',
            editContact: 'contact-edit',
            addContact: 'contact-add',
            showSettings: 'settings-show',
            saveButton: '#saveButton',
            addButton: '#addButton',
            actionButton: '#actionButton',
            trashButton: '#trashButton',
            homeButton: '#homeButton',
            settingsButton: '#settingsButton',
            searchbox: '#searchbox'
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
                tap: 'onCourseAddSave'
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
            trashButton: {
                tap: 'onTrash'
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
            }
   
        }
    },

onSearchKeyup: function(field, e) {
Ext.getStore('Contacts').load({
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
        //alert (item.xtype);
        if (item.xtype == "settings-show") {
        this.showAddButton();
        }
        if (item.xtype == "contact-add") {
        this.hideAddButton();
        }
        
        if (item.xtype == "contact-edit") {
            this.showEditButton();
        } else {
            this.hideEditButton();
        }
    },

    onContactSelect: function(list, index, node, record) {
        var editButton = this.getEditButton();

        if (!this.showContact) {
            this.showContact = Ext.create('GolfTracker.view.Show');
        }

        // Bind the record onto the show contact view
        this.showContact.setRecord(record);

        // Push the show contact view into the navigation view
        this.getMain().push(this.showContact);
    },

    onContactEdit: function() {
        if (!this.editContact) {
            this.editContact = Ext.create('GolfTracker.view.Edit');
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

    onCourseAddSave: function() {

         if (!this.showSettings) {
            this.showSettings = Ext.create('GolfTracker.view.CourseAdd');
        }
        this.getMain().push(this.showSettings);
        this.hideAddButton();
        
      // this.getAddContact().saveRecord();
    },
    
    onContactAddChangeHole: function() {
                
        if (!this.showSettings) {
            this.showSettings = Ext.create('GolfTracker.view.PlayerScore');
        }
        this.getMain().push(this.showSettings);
        this.hideAddButton();
        
        // create a new course
        var courses = Ext.create('GolfTracker.model.Courses', {id:1,name:'Miami Goofy Course'});
        courses.save();
        
        // add a new hole using above course id
        var holes=courses.holes();
        holes.add({
            hole: 'Hole 5',
            par:'5',
            distance:'500 Yards'
        });
        holes.sync();
        // todo get last hole id
        

        // add a new shot using hole id
        var hole_id=1;
        var holes2 = Ext.ModelManager.getModel('GolfTracker.model.Holes');
        holes2.load(hole_id, {
            success: function(hole) {
                var shots=hole.shots();
                shots.add({
                lat: '5',
                lon: '3'
                });
             shots.sync();
            }
        });
        

        
    },

    onContactSave: function() {
        var record = this.getEditContact().saveRecord();
        this.getShowContact().updateRecord(record);
        
       // this.getMain().pop();
    },
    
    onAction: function() {
        
      if (!this.showAction) {
            this.showAction = Ext.create('GolfTracker.view.Add');
        }
        this.showAddButton();
        this.getMain().push(this.showAction);
        
        this.showAction.loadGPS();

   
    },
    
        onTrash: function() {
        
        var contactsStore = Ext.getStore('Contacts');
        contactsStore.clearData();
        contactsStore.sync();
        var holesStore = Ext.getStore('Holes');
        holesStore.clearData();
        holesStore.sync();

   
    },
        
    onHome: function() {
        
      if (this.showAction) {      
        // Push the show contact view into the navigation view
        this.getMain().pop();
        }
        
    },

 onSettings: function() {

        if (!this.showSettings) {
            this.showSettings = Ext.create('GolfTracker.view.Settings');
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


