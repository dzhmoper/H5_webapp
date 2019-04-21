/*
 * @Descripttion: 基本图文组件对象
 * @version: 1.0
 * @Author: hm.tang
 * @LastEditors: hm.tang
 * @Date: 2019-04-18 13:37:52
 * @LastEditTime: 2019-04-20 23:04:02
 */

/**
 * @descripttion: 基础组件
 * @param {string} name 组件名称
 * @param {object} options 配置
 * @return: H5 实例
 */
var H5ComponentBase = function(name, options) {
  // 组件 id
  var id = ('.h5_com_' + Math.random()).replace('.', '_');
  // 组件类型 class
  var klass = ' h5_com_' + options.type;
  // 当前组件 class
  var cls = ' h5_com_name_' + name;
  // 组件
  var component = $('<div class="h5_com '+ klass + cls + '" id="' + id + '"></div>');

  options.text && component.text(options.text);
  options.html && component.html(options.html);
  options.width && component.width(options.width / 2);
  options.height && component.height(options.height / 2);

  options.css && component.css(options.css);
  options.bg && component.css('backgroundImage', 'url(' + options.bg + ')');

  // 定位
  switch(options.align) {
    case 'center':
      var width = (options.width !== undefined) ? options.width : component.width();
      component.css({
        left: '50%',
        marginLeft: -(width / 4) + 'px'
      });
    break;
    case 'top':
      component.css({ top: 0 });
    break;
    case 'bottom':
      component.css({ bottom: 0 });
    break;
    case 'right':
      component.css({ right: 0 });
    break;
    case 'left':
      component.css({ left: 0 });
    break;
    default:
    break;
  }

  // 点击事件
  if (typeof options.onClick === 'function') {
    component.on('click', options.onClick);
  }

  // 组件载入时
  component.on('onLoad', function() {
    setTimeout(function() {
      component.addClass(cls + '_load').removeClass(cls + '_leave');
      options.animateIn && component.animate(options.animateIn);
    }, options.delay || 0);

    return false;
  });

  // 组件离开时
  component.on('onLeave', function() {
    setTimeout(function() {
      component.addClass(cls + '_leave').removeClass(cls + '_load');
      options.animateOut && component.animate(options.animateOut);
    }, options.delay || 0);

    return false;
  });

  return component;
};