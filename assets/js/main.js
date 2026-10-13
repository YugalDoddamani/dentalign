/* Dentalign Goa — tiny progressive-enhancement script (no dependencies) */
(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEls = document.querySelectorAll("[data-year]");
  var thisYear = new Date().getFullYear();
  for (var i = 0; i < yearEls.length; i++) yearEls[i].textContent = thisYear;

  /* ---------- Sticky header shadow ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- "Open now" indicator (Mon–Sat 09:30–20:00 IST) ---------- */
  // NOTE: confirm exact hours with the clinic; update OPEN below if they change.
  var OPEN = { days: [1, 2, 3, 4, 5, 6], from: 9.5, to: 20 };
  function istNow() {
    var now = new Date();
    // Convert to IST (UTC+5:30) regardless of visitor timezone
    return new Date(now.getTime() + (now.getTimezoneOffset() + 330) * 60000);
  }
  var pills = document.querySelectorAll("[data-open-pill]");
  if (pills.length) {
    var t = istNow();
    var h = t.getHours() + t.getMinutes() / 60;
    var isOpen = OPEN.days.indexOf(t.getDay()) > -1 && h >= OPEN.from && h < OPEN.to;
    for (var j = 0; j < pills.length; j++) {
      pills[j].classList.add(isOpen ? "open" : "closed");
      pills[j].innerHTML = '<span class="dot" aria-hidden="true"></span>' +
        (isOpen ? "Open now · closes 8 PM" : "Closed now · opens 9:30 AM, Mon–Sat");
    }
  }

  /* ---------- Appointment form → WhatsApp (works with zero backend) ---------- */
  var form = document.getElementById("bookForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (document.getElementById("fName").value || "").trim();
      var phone = (document.getElementById("fPhone").value || "").trim();
      var service = document.getElementById("fService").value || "";
      var pref = document.getElementById("fTime").value || "";
      var notes = (document.getElementById("fNotes").value || "").trim();
      if (!name || !phone) return; // required attrs handle messaging
      var lines = [
        "Hi Dentalign, I would like to book a dental appointment.",
        "",
        "Name: " + name,
        "Phone: " + phone,
        service ? "Service: " + service : null,
        pref ? "Preferred time: " + pref : null,
        notes ? "Notes: " + notes : null
      ].filter(Boolean);
      var ok = document.getElementById("formOk");
      if (ok) {
        ok.style.display = "block";
        ok.textContent = "Thanks " + name.split(" ")[0] + "! Opening WhatsApp to confirm your slot — we usually reply within 2 working hours.";
      }
      window.open("https://wa.me/919322972363?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
    });
  }

  /* ---------- Gentle reveal-on-scroll ---------- */
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
 
  /* ---------- Restrained hero parallax (homepage only) ---------- */
  var parallaxImage = document.querySelector("[data-parallax]");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (parallaxImage && !reduceMotion) {
    var hero = parallaxImage.closest(".hero");
    var framePending = false;
    function updateParallax() {
      if (!hero) return;
      var rect = hero.getBoundingClientRect();
      var offset = Math.max(-36, Math.min(36, -rect.top * 0.075));
      parallaxImage.style.setProperty("--hero-parallax-y", offset.toFixed(1) + "px");
      framePending = false;
    }
    function requestParallax() {
      if (!framePending) {
        framePending = true;
        window.requestAnimationFrame(updateParallax);
      }
    }
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax, { passive: true });
    updateParallax();
  }
})();