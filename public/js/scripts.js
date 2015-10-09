(function() {
  var navigationHover;

  navigationHover = function() {
    return $('header nav ul li').click(function() {
      return $('.dropdown').toggleClass('active');
    });
  };

  $(document).ready(function() {
    return navigationHover();
  });

}).call(this);
