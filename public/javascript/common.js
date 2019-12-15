$(function () {
  /**
   * 回到顶部
   */
  $("#back-to-top-page").bind('click', function () {
    $('body,html').animate({scrollTop: 0}, 500)
  }).fadeOut(0)

  var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  $(window).scroll(function () {
    var osTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (osTop >= clientHeight) {
      $("#back-to-top-page").fadeIn(400);

    } else {
      $("#back-to-top-page").fadeOut(400);
    }
  })
})
