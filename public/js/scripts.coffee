#Hover

navigationHover = ->
  $('header nav ul li').click ->
    $('nav ul li').addClass 'active'



#Call JS

$(document).ready ->
  navigationHover()