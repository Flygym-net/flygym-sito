const toggle = document.getElementById("fgMenuToggle");
    const menu = document.getElementById("fgMenu");

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
      const zohoDialog = document.createElement("dialog");
      zohoDialog.className = "fg-zoho-dialog";
      zohoDialog.setAttribute("aria-label", "Modulo per prenotare una prova gratuita");
      zohoDialog.innerHTML = '<div class="fg-zoho-dialog-shell"><button class="fg-zoho-dialog-close" type="button" aria-label="Chiudi il modulo">×</button><iframe src="prova-gratuita/index.html" title="Prenota una prova gratuita Fly Gym" loading="lazy"></iframe></div>';
      document.body.appendChild(zohoDialog);

      const zohoCloseButton = zohoDialog.querySelector(".fg-zoho-dialog-close");

      bookingLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
          event.preventDefault();

          if (typeof zohoDialog.showModal === "function") {
            zohoDialog.showModal();
            document.body.classList.add("fg-dialog-open");
          }
        });
      });

      zohoCloseButton.addEventListener("click", function () {
        zohoDialog.close();
      });

      zohoDialog.addEventListener("click", function (event) {
        if (event.target === zohoDialog) {
          zohoDialog.close();
        }
      });

      zohoDialog.addEventListener("close", function () {
        if (!document.querySelector("dialog[open]")) {
          document.body.classList.remove("fg-dialog-open");
        }
      });
    }
