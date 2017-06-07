/*global Backbone */
var app = app || {};

(function() {
    'use strict';
    var Todos = Backbone.Collection.extend({
        model: app.Todo, // 模型
        
        localStorage: new Backbone.LocalStorage('todos-backbone'), // 本地缓存

        // 获取所有完成的任务数组
        completed: function() {
            return this.where({ completed: true });
        },

        // 获取所有未完成的任务数组
        remaining: function() {
            return this.where({ completed: false });
        },

        // 获取下一个排序序号
        nextOrder: function() {
            return this.length ? this.last().get('order') + 1 : 1;
        },

        // 排序规则
        comparator: 'order'
    });

    app.todos = new Todos();
})();
