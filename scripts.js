document.addEventListener("DOMContentLoaded", () => {
  // Loader
  const loader = document.querySelector(".loader");
  if (loader) {
    window.addEventListener("load", () => {
      loader.style.display = "none";
    });
  }

  // Audio Toggle with better error handling
  const audioSwitch = document.getElementById("audio-switch");
  const audio = document.getElementById("stadium-anthem");

  if (audioSwitch && audio) {
    // Set initial state based on checkbox
    audio.muted = !audioSwitch.checked;

    audioSwitch.addEventListener("change", () => {
      try {
        audio.muted = !audioSwitch.checked;
        if (audioSwitch.checked && audio.paused) {
          // Many browsers block autoplay, so we need to handle this
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.error("Audio playback failed:", error);
              audioSwitch.checked = false;
            });
          }
        }
      } catch (error) {
        console.error("Audio control error:", error);
      }
    });
  }

  // Newsletter form with better UX
  const form = document.getElementById("newsletter-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
        // Here you would typically make an actual API call
        // await fetch('/subscribe', { method: 'POST', body: new FormData(form) });

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Show success message
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = "Subscribed!";

        setTimeout(() => {
          submitButton.textContent = originalText;
          form.reset();
        }, 2000);
      } catch (error) {
        console.error("Subscription failed:", error);
        alert("Subscription failed. Please try again later.");
      }
    });
  }
});