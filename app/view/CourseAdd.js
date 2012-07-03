Ext.define('GolfTracker.view.CourseAdd', { 
    extend: 'Ext.Container',
    xtype: 'course-add-show',

    config: {
        title: 'Add Course',
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
                        title: 'Course Details',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Name',
                                name:  'name',
                                id: 'name'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Description',
                                name:  'description',
                                id: 'description'
                            }
                        ]
                    },

                                    {
                            xtype: 'button',
                            text: 'Add',
                            ui: 'confirm',
                            handler: function() { 
                                
                                    // create a new course
                                var formValues = Ext.getCmp('formpanel').getValues();
                                var courses = Ext.create('GolfTracker.model.Courses', formValues);
                                courses.save();
   
                                
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
     
    },

    saveRecord: function() {

    },

    onKeyUp: function() {
       
    }
});
