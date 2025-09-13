// script.js - robust handlers for proposal page

document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js loaded — DOMContentLoaded");

  // Accept multiple possible ID styles (in case older files use different id)
  const yesBtn = document.querySelector("#yesBtn, #yes-btn, .yes-btn");
  const noBtn  = document.querySelector("#noBtn, #no-btn, .no-btn");
  const music  = document.getElementById("bg-music");

  // Try to start music (if present). If blocked, play after first click.
  if (music) {
    music.play().catch(() => {
      console.log("Autoplay blocked — music will start on first click");
      document.addEventListener("click", () => music.play(), { once: true });
    });
  }

  // Small confetti implementation (works without external libs)
  function confettiBurst(count = 80) {
    console.log("confettiBurst()");
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "confetti-piece";
      el.style.position = "fixed";
      el.style.left = (50 + (Math.random() - 0.5) * 40) + "vw"; // around center
      el.style.top  = (40 + (Math.random() - 0.5) * 20) + "vh";
      el.style.fontSize = (12 + Math.random() * 22) + "px";
      el.style.pointerEvents = "none";
      el.innerText = ["💖","✨","🎉","🌟"][Math.floor(Math.random()*4)];
      el.style.opacity = "1";
      el.style.transform = `translateY(0vh) rotate(${Math.random()*360}deg)`;
      el.style.transition = `transform ${1.6 + Math.random()}s ease-out, opacity 1.6s ease-out`;
      document.body.appendChild(el);

      // animate downward and fade
      requestAnimationFrame(() => {
        el.style.transform = `translateY(${40 + Math.random()*60}vh) rotate(${Math.random()*720}deg)`;
        el.style.opacity = "0";
      });

      setTimeout(() => el.remove(), 2600);
    }
  }

  // function to redirect safely
  function goToTogether() {
    const target = "together.html"; // MUST match exact filename (case-sensitive on some hosts)
    console.log("Redirecting to", target);
    window.location.href = target;
  }

  // YES button behavior
  if (yesBtn) {
    yesBtn.addEventListener("click", () => {
      console.log("YES button clicked");
      // Run confetti then redirect after a short delay
      confettiBurst(100);
      // If music exists, give it a tick so user hears it with celebration:
      if (music) {
        music.volume = 1;
      }
      setTimeout(goToTogether, 1500); // 1.5s delay for confetti
    });
  } else {
    console.warn("YES button not found. Make sure proposal.html has <button id='yesBtn'>");
  }

  // NO button playful escape
  if (noBtn) {
    noBtn.addEventListener("mouseover", () => {
      const w = window.innerWidth - noBtn.offsetWidth - 20;
      const h = window.innerHeight - noBtn.offsetHeight - 20;
      const x = Math.random() * w;
      const y = Math.random() * h;
      noBtn.style.position = "absolute";
      noBtn.style.left = `${x}px`;
      noBtn.style.top  = `${y}px`;
    });
  } else {
    console.warn("NO button not found.");
  }

}); // DOMContentLoaded end
