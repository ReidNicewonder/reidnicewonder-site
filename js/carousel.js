document.querySelectorAll('.carousel').forEach(function (c) {
  var t = c.querySelector('.car-track');
  function step(d) { t.scrollBy({ left: d * t.clientWidth * 0.8, behavior: 'smooth' }); }
  c.querySelector('.car-prev').addEventListener('click', function () { step(-1); });
  c.querySelector('.car-next').addEventListener('click', function () { step(1); });
  t.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
  });
});
