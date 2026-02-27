(function () {
  var plane = document.getElementById('flying-plane');

  plane.addEventListener('animationiteration', function () {
    var randomTop = Math.floor(Math.random() * 71) + 10;
    plane.style.top = randomTop + '%';
  });
})();
