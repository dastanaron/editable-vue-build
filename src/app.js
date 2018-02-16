Vue.config.debug = true;
Vue.config.devtools = true;

import VueBootstrapTable from './VueBootstrapTable.vue';
import Vue from 'vue';
import axios from 'axios';

var Columns = [];

axios.get('http://helpdesc.loc/api/equipments?token=sI9TiqLc2aQLgfe0Ji_kn9PPc7uNSF2l&page=2')
    .then(function (response) {
        console.log(response.data);

        for (var val in response.data) {
            Columns.push(response.data[val]);
        }

    })
    .catch(function (error) {
        console.log(error);
    });

var renderfunc = function ( colname, entry) {
    return '</div><span>'+JSON.stringify(entry)+'</span>';
};

var handleRow = function (event, entry) {
    //console.log("CLICK ROW: " + JSON.stringify(entry));
};

new Vue({
    el: '#app',
    components: {
        VueBootstrapTable,
    },
    data: {
        logging: [],
        showFilter: true,
        showPicker: true,
        paginated: true,
        multiColumnSortable: true,
        pageSize: {
            default: 20,
        },
        handleRowFunction: handleRow,
        ajax: {
            enabled: false,
            url: "http://helpdesc.loc/api/equipments?token=sI9TiqLc2aQLgfe0Ji_kn9PPc7uNSF2l",
            method: "GET",
            delegate: true,
            axiosConfig:{
                headers: {
                    //'Authorization': 'Bearer TESTTESTTESTTESTTEST'
                }
            }
        },
        columns: [
            {
                title: "ID",
                name: "id",
                visible: true,
                editable: false,
            },
            {
                title: "Имя",
                name: "name",
                visible: true,
                editable: true,
            },
            {
                title: "Тест",
                visible: true,
                renderfunction: renderfunc
            }
        ],
        values: Columns/*[
            {
                "id": 1,
                "name": "Петр",
            },
            {
                "id": 2,
                "name": "Мария",
            },

        ]*/
    },
    ready: function () {
    },
    methods: {
        addItem: function () {
            console.log('new item');
            console.log(this.values.length);
            let item = {
                "id": this.values.length + 1,
                "name": "name " + (this.values.length + 1)
            };
            console.log(item);
            this.values.push(item);
        },
        toggleFilter: function () {
            this.showFilter = !this.showFilter;
        },
        togglePicker: function () {
            this.showPicker = !this.showPicker;
        },
        togglePagination: function () {
            this.paginated = !this.paginated;
        }
    },
    events: {
        cellDataModifiedEvent: function( originalValue, newValue, columnTitle, entry) {
            /*this.logging.push("Original Value : " + originalValue +
                         " | New Value : " + newValue +
                         " | Column : " + columnTitle +
                         " | Complete Entry : " +  entry );*/
            console.log('Отправляем событие изменения ячейки: id='+entry.id+' value='+newValue);
        },
        ajaxLoadedEvent: function( data ) {
            console.log("ajaxLoadedEvent - data : " + data );
        },
        ajaxLoadingError: function( error ) {
            console.log("ajaxLoadingError - error : " + error );
        },
    },
});