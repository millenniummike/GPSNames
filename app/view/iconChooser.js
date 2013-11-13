/*
 * File: app/view/iconChooser.js
 *
 * This file was generated by Sencha Architect version 2.2.3.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.iconChooser', {
    extend: 'Ext.dataview.List',

    config: {
        id: 'iconChooser',
        zIndex: 100,
        store: 'icons',
        itemTpl: [
            '<div>{name}</div>'
        ],
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                id: 'chooseIconTitle',
                title: 'CHOOSE ICON'
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                id: 'chooseIconFilter',
                items: [
                    {
                        xtype: 'container',
                        id: 'chooseIconContainer',
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'searchfield',
                                docked: 'left',
                                itemId: 'mysearchfield',
                                width: '80%',
                                label: 'Filter',
                                value: 'a'
                            },
                            {
                                xtype: 'button',
                                docked: 'right',
                                id: 'exitChooseIconBtn',
                                itemId: 'mybutton10',
                                margin: '4px',
                                iconCls: 'delete'
                            }
                        ]
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onMysearchfieldKeyup',
                event: 'keyup',
                delegate: '#mysearchfield'
            },
            {
                fn: 'onIconChooseInitialize',
                event: 'initialize'
            }
        ]
    },

    onMysearchfieldKeyup: function(textfield, e, eOpts) {
        var store=Ext.getStore('icons');
        store.filter('name', textfield.getValue());
    },

    onIconChooseInitialize: function(component, eOpts) {
        var store=Ext.getStore('icons');
        store.filter('name', 'a');
    }

});