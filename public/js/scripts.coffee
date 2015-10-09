#Hover

navigationHover = ->
  $('header nav ul li').click ->
    $('.dropdown').toggleClass 'active'



#Call JS

$(document).ready ->
  navigationHover()