(function() {
  var navigationHover;

  navigationHover = function() {
    return $('header nav ul li').click(function() {
      return $('nav ul li').addClass('active');
    });
  };

  $(document).ready(function() {
    return navigationHover();
  });

}).call(this);
