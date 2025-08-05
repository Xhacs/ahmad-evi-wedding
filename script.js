window.onload = () => {
  const target = new Date("2025-09-29T08:00:00").getTime();
const ids = ["hari","jam","menit","detik"];
function dobounce(el) {
  el.classList.add("pop");
  setTimeout(() => el.classList.remove("pop"), 300);
}
setInterval(() => {
  const now = Date.now();
  const d = Math.floor((target - now) / (1000 * 60 * 60 * 24));
  const h = Math.floor(((target - now) / (1000 * 60 * 60)) % 24);
  const m = Math.floor(((target - now) / (1000 * 60)) % 60);
  const s = Math.floor(((target - now) / 1000) % 60);
  [d,h,m,s].forEach((val,i) => {
    const el = document.getElementById(ids[i]);
    el.textContent = val >= 0 ? val : 0;
    dobounce(el);
  });
  if (target - now < 0) {
    document.getElementById("countdown").innerHTML = "<p>Acara Telah Dimulai!</p>";
  }
}, 1000);

  const musik = document.getElementById('musik');
  musik.volume = 0.5;

  const form = document.getElementById('rsvp-form');
  const ucapanList = document.getElementById('ucapan-list');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const kehadiran = document.getElementById('kehadiran').value;
    const ucapan = document.getElementById('ucapan').value;

    const p = document.createElement('p');
    p.innerHTML = `<strong>${nama}:</strong> (${kehadiran}) ${ucapan}`;
    ucapanList.appendChild(p);

    form.reset();
  });
};
