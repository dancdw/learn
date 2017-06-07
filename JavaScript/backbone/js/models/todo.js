/*global Backbone */
var app = app || {};

(function() {
    'use strict';

    app.Todo = Backbone.Model.extend({
        // 设置默认值
        defaults: {
            title: '',
            completed: false
        },
        
        // 设置任务完成状态
        toggle: function() {
            this.save({
                completed: !this.get('completed')
            });
        }
    });
})();