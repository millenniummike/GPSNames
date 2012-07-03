Ext.define('GolfTracker.controller.Application', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'mainview',
            editButton: '#editButton',
            holes: 'holes',
            games: 'games',
            showContact: 'contact-show',
            editContact: 'contact-edit',
            addContact: 'contact-add',
            showSettings: 'settings-show',
            saveButton: '#saveButton',
            addButton: '#addButton',
            addGameButton: '#addGameButton',
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
            addGameButton: {
                tap: 'onAddGameButton'
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
     // alert ("push="+item.xtype);
      
      this.hideAddButton(); 
      this.hideAddGameButton();

        if (item.xtype == "games") {
            this.showAddGameButton();
        }
    },

    onMainPop: function(view, item) {
        //alert ("pop="+item.xtype);
          
        this.hideAddButton(); 
        this.hideAddGameButton();
      
        if (item.xtype == "games"||item.xtype == "course-add-show") {   
        this.showAddButton();
        }
        if (item.xtype == "holes") {   
        this.showAddGameButton();
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
    
    onAddGameButton: function() {
        alert ("adding game! course_id="+this.courses_id);
        
         // create a new game using course id
                                var games = Ext.create('GolfTracker.model.Games', {name:'A test game',courses_id:this.courses_id});
                                games.save();
                                
                                //todo - get games id
                                
                                this.games_id=1;
                                
                                 // create a new game using course id
                                var holes;
                                
                                for (counter=1;counter<19;counter++){
                                holes = Ext.create('GolfTracker.model.Holes', {hole:counter,games_id:this.games_id});
                                holes.save();
                                }
                                

                                var coursesStore = Ext.getStore('Courses');
                                coursesStore.load();
                                var Store = Ext.getStore('Games');
                                Store.load();
                                var Store = Ext.getStore('Holes');
                                Store.load();
        
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
    
     onAddShot: function(lat,lon,club,image) {
           
           // create a new shot
           var shots = Ext.create('GolfTracker.model.Shots', {lat:lat,lon:lon,holes_id:this.holes_id,club:club,image:image});
           shots.save();
           
           alert ("add shot! lat="+lat+" hole_id="+this.holes_id+" Game="+this.games_id+" Course="+this.course_id);
          
    },

    onContactSave: function() {
        var record = this.getEditContact().saveRecord();
        this.getShowContact().updateRecord(record);
        
       // this.getMain().pop();
    },
    
    onAction: function(hole_id) {
       
       this.holes_id=hole_id;
        
      if (!this.showAction) {
            this.showAction = Ext.create('GolfTracker.view.Add');
        } 
        this.showAddButton();
        this.getMain().push(this.showAction);
        
        this.showAction.loadGPS();

   
    },
    
        onTrash: function() {
        
        var Store = Ext.getStore('Holes');
        Store.clearData();
        Store.sync();
        Store = Ext.getStore('Courses');
        Store.clearData();
        Store.sync();
        Store = Ext.getStore('Games');
        Store.clearData();
        Store.sync();
        Store = Ext.getStore('Shots');
        Store.clearData();
        Store.sync();
  

   
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
     onShowGames: function(course_id) {
         this.courses_id=''+course_id;

        if (!this.showGames) {
            this.showGames = Ext.create('GolfTracker.view.Games');
        }
        
        var store = Ext.getStore('Games');
        // clear all existing filters
        store.clearFilter();
        store.filter('courses_id', course_id);
        
        // get game_id
        
        
            
        this.getMain().push(this.showGames);
      
        
    },
         onShowHoles: function(game_id) {
             this.games_id=game_id;

        if (!this.showHoles) {
            this.showHoles = Ext.create('GolfTracker.view.Holes');
        }
        //alert ("get games for course id "+course_id)
        var store = Ext.getStore('Holes');
        // clear all existing filters
        store.clearFilter();
        store.filter('games_id', this.games_id);
        this.getMain().push(this.showHoles);
      
        
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
        addButton.show();
    },
    
    
    hideAddButton: function() {
        var addButton = this.getAddButton();
        addButton.hide();
    },
    
    showAddGameButton: function() {
        var addButton = this.getAddGameButton();
        addButton.show();
    },
    
    
    hideAddGameButton: function() {
        var addButton = this.getAddGameButton();
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


