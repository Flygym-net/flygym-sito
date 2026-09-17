const toggle = document.getElementById("fgMenuToggle");
    const menu = document.getElementById("fgMenu");

    const autoplayVideos = document.querySelectorAll(
      ".fg-course-hero-video[autoplay], .fg-home-hero-video[autoplay]"
    );

    autoplayVideos.forEach(function (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.loop = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.removeAttribute("controls");

      if (video.readyState === 0) {
        video.load();
      }

      function startVideo() {
        const playback = video.play();

        if (playback && typeof playback.catch === "function") {
          playback.catch(function () {
            // Alcuni browser mobili riprovano dopo la prima interazione.
          });
        }
      }

      startVideo();

      let automaticAttempts = 0;
      const automaticRetry = window.setInterval(function () {
        automaticAttempts += 1;
        startVideo();

        if (!video.paused || automaticAttempts >= 12) {
          window.clearInterval(automaticRetry);
        }
      }, 500);

      video.addEventListener("loadedmetadata", startVideo, { once: true });
      video.addEventListener("loadeddata", startVideo, { once: true });
      video.addEventListener("canplay", startVideo, { once: true });
      window.addEventListener("pageshow", startVideo);
      window.addEventListener("focus", startVideo);
      document.addEventListener("visibilitychange", function () {
        if (!document.hidden) {
          startVideo();
        }
      });

      const unlockEvents = ["touchstart", "touchend", "pointerdown", "click", "keydown", "scroll"];

      function unlockVideo() {
        startVideo();
      }

      function removeUnlockListeners() {
        unlockEvents.forEach(function (eventName) {
          document.removeEventListener(eventName, unlockVideo);
        });
      }

      unlockEvents.forEach(function (eventName) {
        document.addEventListener(eventName, unlockVideo, { passive: true });
      });

      video.addEventListener("playing", removeUnlockListeners, { once: true });
    });

    const athletesCount = document.getElementById("fg-athletes-count");
    const activeCoursesCount = document.getElementById("fg-active-courses-count");

    if (athletesCount && activeCoursesCount) {
      fetch("/api/statistiche-flygym", {
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Statistiche non disponibili");
          }

          return response.json();
        })
        .then(function (stats) {
          const athletes = Number(stats.atleti);
          const activeCourses = Number(stats.corsi_attivi);

          if (Number.isInteger(athletes) && athletes >= 0) {
            athletesCount.textContent = athletes.toLocaleString("it-IT");
          }

          if (Number.isInteger(activeCourses) && activeCourses >= 0) {
            activeCoursesCount.textContent = activeCourses.toLocaleString("it-IT");
          }
        })
        .catch(function () {
          // I valori presenti nell'HTML restano visibili se Zoho non risponde.
        });
    }

    toggle.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("fg-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "✕" : "☰";
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("fg-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
      });
    });

    function copyShareText(text) {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
      }

      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
      return Promise.resolve();
    }

    document.querySelectorAll(".fg-share-location").forEach(function (button) {
      button.addEventListener("click", async function () {
        const shareData = {
          title: button.dataset.shareTitle,
          text: button.dataset.shareText,
          url: button.dataset.shareUrl,
        };

        try {
          if (navigator.share) {
            await navigator.share(shareData);
            return;
          }

          await copyShareText(`${shareData.text}\n${shareData.url}`);
          const label = button.querySelector("span");
          const originalLabel = label.textContent;
          label.textContent = "Link copiato";
          button.classList.add("fg-share-success");

          window.setTimeout(function () {
            label.textContent = originalLabel;
            button.classList.remove("fg-share-success");
          }, 2200);
        } catch (error) {
          if (error.name !== "AbortError") {
            window.open(`https://wa.me/?text=${encodeURIComponent(`${shareData.text}\n${shareData.url}`)}`, "_blank", "noopener,noreferrer");
          }
        }
      });
    });

    const techniciansTrack = document.getElementById("fgTechniciansTrack");

    if (techniciansTrack) {
      document.querySelectorAll("[data-carousel-direction]").forEach(function (button) {
        button.addEventListener("click", function () {
          const direction = button.dataset.carouselDirection === "next" ? 1 : -1;
          techniciansTrack.scrollBy({
            left: techniciansTrack.clientWidth * 0.82 * direction,
            behavior: "smooth",
          });
        });
      });
    }

    document.querySelectorAll("[data-technician-dialog]").forEach(function (button) {
      button.addEventListener("click", function () {
        const dialog = document.getElementById(button.dataset.technicianDialog);

        if (dialog && typeof dialog.showModal === "function") {
          dialog.showModal();
          document.body.classList.add("fg-dialog-open");
        }
      });
    });

    document.querySelectorAll(".fg-technician-dialog").forEach(function (dialog) {
      const closeButton = dialog.querySelector(".fg-technician-close");

      closeButton.addEventListener("click", function () {
        dialog.close();
      });

      dialog.addEventListener("click", function (event) {
        if (event.target === dialog) {
          dialog.close();
        }
      });

      dialog.addEventListener("close", function () {
        document.body.classList.remove("fg-dialog-open");
      });
    });

    document.querySelectorAll("[data-schedule-dialog]").forEach(function (button) {
      button.addEventListener("click", function () {
        const dialog = document.getElementById(button.dataset.scheduleDialog);

        if (dialog && typeof dialog.showModal === "function") {
          dialog.showModal();
          document.body.classList.add("fg-dialog-open");
        }
      });
    });

    document.querySelectorAll(".fg-location-schedule-dialog").forEach(function (dialog) {
      const closeButton = dialog.querySelector(".fg-location-schedule-close");

      closeButton.addEventListener("click", function () {
        dialog.close();
      });

      dialog.addEventListener("click", function (event) {
        if (event.target === dialog) {
          dialog.close();
        }
      });

      dialog.addEventListener("close", function () {
        document.body.classList.remove("fg-dialog-open");
      });
    });

    document.querySelectorAll("[data-trial-dialog]").forEach(function (button) {
      button.addEventListener("click", function () {
        const dialog = document.getElementById(button.dataset.trialDialog);

        if (dialog && typeof dialog.showModal === "function") {
          dialog.showModal();
          document.body.classList.add("fg-dialog-open");
        }
      });
    });

    document.querySelectorAll(".fg-trial-dialog").forEach(function (dialog) {
      const closeButton = dialog.querySelector(".fg-trial-dialog-close");

      closeButton.addEventListener("click", function () {
        dialog.close();
      });

      dialog.addEventListener("click", function (event) {
        if (event.target === dialog) {
          dialog.close();
        }
      });

      dialog.addEventListener("close", function () {
        document.body.classList.remove("fg-dialog-open");
      });
    });

    document.querySelectorAll("[data-pole-dialog]").forEach(function (card) {
      card.addEventListener("click", function () {
        const dialog = document.getElementById(card.dataset.poleDialog);
        if (dialog && typeof dialog.showModal === "function") {
          dialog.showModal();
          document.body.classList.add("fg-dialog-open");
        }
      });
    });

    document.querySelectorAll(".fg-pole-course-dialog").forEach(function (dialog) {
      const closeButton = dialog.querySelector(".fg-pole-dialog-close");
      closeButton.addEventListener("click", function () { dialog.close(); });
      dialog.querySelectorAll("[data-close-pole-on-booking]").forEach(function (link) {
        link.addEventListener("click", function () { dialog.close(); });
      });
      dialog.addEventListener("click", function (event) {
        if (event.target === dialog) { dialog.close(); }
      });
      dialog.addEventListener("close", function () {
        if (!document.querySelector("dialog[open]")) { document.body.classList.remove("fg-dialog-open"); }
      });
    });

    const bookingLinks = document.querySelectorAll('a[href="prova-gratuita/index.html"]');

    if (bookingLinks.length) {
      const requestsDialog = document.createElement("dialog");
      requestsDialog.className = "fg-requests-dialog";
      requestsDialog.setAttribute("aria-label", "Modulo richieste Fly Gym");
      requestsDialog.innerHTML = '<div class="fg-requests-dialog-shell"><button class="fg-requests-dialog-close" type="button" aria-label="Chiudi il modulo">×</button><div class="fg-requests-dialog-content" data-flygym-requests><p class="fg-requests-loading">Caricamento modulo Fly Gym…</p></div></div>';
      document.body.appendChild(requestsDialog);

      const requestsCloseButton = requestsDialog.querySelector(".fg-requests-dialog-close");
      const requestsHost = requestsDialog.querySelector("[data-flygym-requests]");
      let requestsScriptLoaded = false;

      function loadRequestsForm() {
        if (requestsScriptLoaded) {
          return;
        }

        requestsScriptLoaded = true;
        const script = document.createElement("script");
        script.type = "module";
        script.src = "https://flygym-app.onrender.com/requests-embed.mjs";
        script.addEventListener("load", function () {
          const loadingMessage = requestsHost.querySelector(".fg-requests-loading");
          if (loadingMessage) {
            loadingMessage.remove();
          }
        });
        script.addEventListener("error", function () {
          requestsHost.innerHTML = '<p class="fg-requests-fallback">Il modulo non è disponibile in questo momento.<br><a href="https://flygym-app.onrender.com/richieste" target="_blank" rel="noopener">Apri il modulo Fly Gym</a></p>';
        });
        document.head.appendChild(script);
      }

      bookingLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          const parentDialog = link.closest("dialog[open]");

          if (parentDialog && parentDialog !== requestsDialog) {
            parentDialog.close();
          }

          if (typeof requestsDialog.showModal === "function") {
            requestsDialog.showModal();
            document.body.classList.add("fg-dialog-open");
            loadRequestsForm();
          }
        });
      });

      requestsCloseButton.addEventListener("click", function () {
        requestsDialog.close();
      });

      requestsDialog.addEventListener("click", function (event) {
        if (event.target === requestsDialog) {
          requestsDialog.close();
        }
      });

      requestsDialog.addEventListener("close", function () {
        if (!document.querySelector("dialog[open]")) {
          document.body.classList.remove("fg-dialog-open");
        }
      });
    }
