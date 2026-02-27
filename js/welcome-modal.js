(function () {
  var modal = document.getElementById('welcome-modal');
  var closeBtn = document.getElementById('close-modal');

  closeBtn.addEventListener('click', function () {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.classList.add('hidden');
    }
  });
})();
