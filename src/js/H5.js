/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: hm.tang
 * @LastEditors: hm.tang
 * @Date: 2019-04-18 13:37:51
 * @LastEditTime: 2019-04-20 17:14:13
 */

/**
 * @descripttion: H5类，管理整个 app 的页面和组件
 * @return {H5} H5 实例
 */
var H5 = function () {
  this.id = ('h5_' + Math.random()).replace('.', '_');
  this.el = $('<div class="h5" id="' + this.id + '"></div>').hide();
  this.page = [];

  $('body').append(this.el);

  /**
   * @descripttion: fullpage 初始化
   * @param {page} firstPage 第一页 
   * @return: 
   */
  this.loader = function (firstPage) {
    // 初始化 fullpage 插件
    this.el.fullpage({
      onLeave: function (index, nextIndex, direction) {
        $(this).find('.h5_com').trigger('onLeave');
      },
      afterLoad: function (anchorLink, index) {
        $(this).find('.h5_com').trigger('onLoad');
      }
    });

    // 立即执行当前页的onLoad
    this.page[0].find('.h5_com').trigger('onLoad');
    this.el.show();

    // 跳转到设置的初始页
    if (firstPage) {
      $.fn.fullpage.moveTo(firstPage);
    }

  };

  this.loader = typeof H5_Loading === 'function' ? H5_Loading : this.loader;

  return this;
};

/**
 * @descripttion: 添加页面
 * @param {string} name 页面名称
 * @param {string} text 页面标题
 * @return: H5实例
 */
H5.prototype.addPage = function (name, text) {
  var page = $('<div class="h5_page section"></div>');

  // 添加页面类
  if (name !== undefined) {
    page.addClass('h5_page_' + name);
  }

  // 添加页面标题，也可以用作页码显示
  if (text !== undefined) {
    page.text(text);
  }

  this.el.append(page);
  this.page.push(page);
  // 每次执行 addPage 后，将同步执行 whenAddPage
  // 可以将每个页面都共用的组件，放在 whenAddPage 中 addComponent
  if (typeof this.whenAddPage === 'function') {
    this.whenAddPage();
  }

  return this;
};

/**
 * @descripttion: 添加组件
 * @param {string} name 组件名称
 * @param {object} options 配置参数
 * @return: H5实例
 */
H5.prototype.addComponent = function (name, options) {
  // 默认设置
  var defaultOptions = {
    type: 'base'
  };

  // 合并设置
  var opts = $.extend({}, defaultOptions, options || {});

  // 当前要生成的组件
  var component;
  // 当前生成组件的页面
  var page = this.page.slice(-1)[0];

  // 生成相应组件
  switch (opts.type) {
    case 'base':
      component = new H5ComponentBase(name, opts);
      break;
    default:
      break;
  }

  // 添加到当前页面
  page.append(component);

  return this;
};