/*
 * @Descripttion: 使用场景
 * @version: 1.0
 * @Author: hm.tang
 * @LastEditors: hm.tang
 * @Date: 2019-04-19 13:48:53
 * @LastEditTime: 2019-04-20 23:07:49
 */

$(function () {
  var h5 = new H5();

  h5.whenAddPage = function () {
    this.addComponent('public_component', {
      text: '返回顶部'
    });
  };

  h5
    .addPage('cover')
    .addComponent('bg', {
      css: {
        width: '100%',
        height: '100%',
        backgroundSize: 'cover'
      },
      bg: './imgs/face_bg.png'
    })
    .addComponent('enter', {
      text: '进入',
      align: 'center',
      css: {
        bottom: '40%',
        opacity: 0,
        top: '50%'
      },
      animateIn: { opacity: 1, top: '60%' },
      animateOut: { opacity: 0, top: '50%' },
      onClick: function () {
        $.fn.fullpage.moveTo(2);
      }
    })
    .addPage('first')
  h5
    .loader([
      'imgs/face_bg.png',
      'imgs/description_bg.gif',
      'imgs/page_bg.png',
      'imgs/p1_people.png',
    ]);
});