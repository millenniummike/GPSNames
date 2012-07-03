Ext.define('GolfTracker.view.CourseAdd', { 
    extend: 'Ext.Container',
    xtype: 'course-add-show',

    config: {
        title: 'Add Course',
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
