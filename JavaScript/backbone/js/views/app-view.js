var app = app || {};

(function($) {
    'use strict';

    // 作用是整体控制任务添加
    app.AppView = Backbone.View.extend({

        el: '.todoapp', // 绑定主要的 DOM 

        statsTemplate: _.template($('#stats-template').html()), // 底部统计数据模板

        // 绑定事件
        events: {
            'keypress .new-todo': 'createOnEnter',
            'click .clear-completed': 'clearCompleted',
            'click .toggle-all': 'toggleAllComplete'
        },

        // 初始化
        initialize: function() {
            this.allCheckbox = this.$('.toggle-all')[0];
            this.$input = this.$('.new-todo');
            this.$footer = this.$('.footer');
            this.$main = this.$('.main');
            this.$list = $('.todo-list');

            // 为 todos 绑定事件
            this.listenTo(app.todos, 'add', this.addOne);
            this.listenTo(app.todos, 'reset', this.addAll);
            this.listenTo(app.todos, 'change:completed', this.filterOne);
            this.listenTo(app.todos, 'filter', this.filterAll);
            this.listenTo(app.todos, 'all', _.debounce(this.render, 0));

            // 获取数据
            app.todos.fetch({ reset: true });
        },

        // 更改当前任务列表是否隐藏
        render: function() {
            var completed = app.todos.completed().length;
            var remaining = app.todos.remaining().length;

            if (app.todos.length) {
                this.$main.show();
                this.$footer.show();

                // 模板渲染
                this.$footer.html(this.statsTemplate({
                    completed: completed,
                    remaining: remaining
                }));

                // 添加选中样式
                this.$('.filters li a')
                    .removeClass('selected')
                    .filter('[href="#/' + (app.TodoFilter || '') + '"]')
                    .addClass('selected');
            } else {
                this.$main.hide();
                this.$footer.hide();
            }

            // 根据剩余未完成任务确定标记全部完成的 checkbox 的显示
            this.allCheckbox.checked = !remaining;
        },

        // 添加一个任务到指定的 DOM 上
        addOne: function(todo) {
            var view = new app.TodoView({ model: todo });
            this.$list.append(view.render().el);
        },

        // 将全部数据渲染到 view，页面加载时使用
        addAll: function() {
            this.$list.html('');
            app.todos.each(this.addOne, this);
        },

        // 过滤一个
        filterOne: function(todo) {
            todo.trigger('visible');
        },

        // 过滤全部
        filterAll: function() {
            app.todos.each(this.filterOne, this);
        },

        // 生成一个新的 model 的字典
        newAttributes: function() {
            return {
                title: this.$input.val().trim(),
                order: app.todos.nextOrder(),
                completed: false
            };
        },

        // 创建一个任务
        createOnEnter: function(e) {
            if (e.which === ENTER_KEY && this.$input.val().trim()) {
                app.todos.create(this.newAttributes()); // 创建新的 model，会动态触发 todos 的 add 事件
                this.$input.val('');
            }
        },

        // 清除所有已经完成的任务
        clearCompleted: function() {
        	  // 对过滤后的 todos 调用destroy 方法
            _.invoke(app.todos.completed(), 'destroy');
            return false;
        },

        // 点击标记全部完成按钮的处理函数
        toggleAllComplete: function() {
            var completed = this.allCheckbox.checked;

            app.todos.each(function(todo) {
                todo.save({
                    completed: completed
                });
            });
        }
    });
})(jQuery);
