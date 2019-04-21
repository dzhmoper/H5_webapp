/*
 * @Descripttion: H5 Loading
 * @version: 1.0
 * @Author: hm.tang
 * @LastEditors: hm.tang
 * @Date: 2019-04-19 14:05:53
 * @LastEditTime: 2019-04-20 23:47:50
 */

/**
 * @descripttion: 加载类
 * @param {Array} images 图片资源列表
 * @param {} firstPage 
 * @return: 
 */
var H5_Loading = function (images, firstPage) {
  var id = this.id;
  // 第一次进入loader方法
  if (this._images === undefined) {
    this._images = (images || []).length;
    // 记录加载完成的图片数量
    this._loaded = 0;

    window[id] = this;
    // 加载 images 里的所有图片
    for(let i = 0, len = images.length; i < len; i++) {
      var item = images[i];
      var img = new Image;
      // 图片加载完后执行回调
      img.onload = function() {
        window[id].loader(images, firstPage);
      };
      // 图片加载出错，继续加载下一个
      img.onerror = function() {
        window[id].loader(images, firstPage);
      };
      img.src = item;
    }
    // 初始计数
    $('#rate').text('0%');

    return this;

  } else {
    // 更新加载完成图片数量
    this._loaded += 1;
    // 更新计数
    $('#rate').text(((this._loaded / this._images * 100) >> 0) + '%');
    
    if (this._loaded < this._images) {
      // 图片还未加载完成
      return this;
    }
  }
  // 清除
  window[id] = null;
  // 初始化 fullpage 插件
  this.el.fullpage({
    parallax: true,
		parallaxOptions: {
			type: 'reveal',
			percentage: 62,
			property: 'translate'
		},
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