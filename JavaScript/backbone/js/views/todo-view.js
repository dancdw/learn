var app = app || {};

(function($) {
    'use strict';

    // 控制任务列表，作用是数据加工并渲染到模板
    app.TodoView = Backbone.View.extend({

        tagName: 'li', // 将模板 html 代码放入标签中

        template: _.template($('#item-template').html()), // 编译模板

        // 为每个任务绑定事件
        events: {
            'click .toggle': 'toggleCompleted',
            'dblclick label': 'edit',
            'click .destroy': 'clear',
            'keypress .edit': 'updateOnEnter',
            'keydown .edit': 'revertOnEscape',
            'blur .edit': 'close'
        },

        // 初始化
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove); // view 内置方法清除页面 DOM，保证数据与 model 一致
            this.listenTo(this.model, 'visible', this.toggleVisible);
        },

        // 渲染 model 数据到 item-template 中，返回 this 引用
        render: function() {
            if (this.model.changed.id !== undefined) {
                return;
            }
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('completed', this.model.get('completed'));
            this.toggleVisible();
            this.$input = this.$('.edit');
            return this;
        },

        // 任务是否隐藏
        toggleVisible: function() {
            this.$el.toggleClass('hidden', this.isHidden());
        },

        isHidden: function() {
            return this.model.get('completed') ?
                app.TodoFilter === 'active' :
                app.TodoFilter === 'completed';
        },


        // 控制任务完成或未完成
        toggleCompleted: function() {
            this.model.toggle();
        },

        // 修改任务时的样式
        edit: function() {
            this.$el.addClass('editing');
            this.$input.focus();
        },

        // 关闭编辑模式，同步数据到 Model 和 view
        close: function() {
            var trimmedValue = this.$input.val().trim();
            if (!this.$el.hasClass('editing')) {
                return;
            }

            if (trimmedValue) {
                this.model.save({ title: trimmedValue });
            } else {
                this.clear();
            }

            this.$el.removeClass('editing');
        },

        // 按下回车，关闭编辑
        updateOnEnter: function(e) {
            if (e.which === ENTER_KEY) {
                this.close();
            }
        },

        // 按下 ESC ，数据还原
        revertOnEscape: function(e) {
            if (e.which === ESC_KEY) {
                this.$el.removeClass('editing');
                this.$input.val(this.model.get('title'));
            }
        },

        // 移除对应任务，以及对应的数据对象
        clear: function() {
            this.model.destroy();
        }
    });
})(jQuery);
