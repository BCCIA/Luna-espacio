// -------------------- SEGURIDAD: PIN --------------------
const PIN_CORRECTO = "5703";

function accesoPermitido() {
  // Para desarrollo/pruebas, puedes comentar la línea de abajo para no meter el PIN siempre
  return localStorage.getItem("pinAccesoAutorizado") === "true";
  // return true; // MODO DESARROLLO: Descomenta esto para saltar el PIN mientras pruebas
}

function solicitarPin() {
  setTimeout(() => {
      const pinIngresado = prompt("Por favor, introduce el PIN de acceso:");
      if (pinIngresado === PIN_CORRECTO) {
        localStorage.setItem("pinAccesoAutorizado", "true");
        location.reload();
      } else {
        alert("PIN incorrecto.");
        document.body.innerHTML = "<div style='display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#fff;'><h1 style='font-family:sans-serif;'>Acceso denegado</h1></div>";
        throw new Error("PIN incorrecto.");
      }
  }, 100);
}

if (!accesoPermitido()) {
  solicitarPin();
  throw new Error("Esperando autenticación...");
}

// -------------------- SEGURIDAD BÁSICA --------------------
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.onkeydown = (e) => {
  if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || (e.ctrlKey && e.keyCode === 85)) return false;
};

// -------------------- CHAT D-ID (AVATAR) --------------------
class DIDChat {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.chatUrl = "https://studio.d-id.com/agents/share?id=v2_agt_vIbZQ7X9&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNVEU0T0RjNU1UQTRNamMxTlRBNU9EYzJNakU2VjNWc1prRTVjMEpwUkhSaGVubERWSGN0ZERGaA==";
    this.iframe = null;
    this.init();
  }

  init() {
    if (this.container) this.createIframe();
  }

  createIframe() {
    const wrapper = document.createElement("div");
    wrapper.className = "iframe-wrapper";
    this.iframe = document.createElement("iframe");
    this.iframe.className = "did-chat-iframe fade-in";
    this.iframe.src = this.chatUrl;
    this.iframe.allow = "autoplay *; encrypted-media *; fullscreen *;";
    this.iframe.title = "Avatar Interface";
    wrapper.appendChild(this.iframe);
    this.container.appendChild(wrapper);
  }
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  new DIDChat("chat-container");
  
  // Animaciones GSAP
  gsap.to(".first", 1, { delay: 0.2, top: "-100%", ease: Expo.easeInOut });
  gsap.to(".second", 1, { delay: 0.4, top: "-100%", ease: Expo.easeInOut });
  gsap.to(".third", 1, { delay: 0.6, top: "-100%", ease: Expo.easeInOut });
  gsap.from(".home-information", { opacity: 0, duration: 1.5, delay: 1, y: 30 });
  gsap.from(".anime-text", { opacity: 0, duration: 1.5, delay: 1.2, y: 30, stagger: 0.2 });
  gsap.from("#chat-container", { opacity: 0, duration: 1.5, delay: 1.5, y: 50, ease: "power3.out" });

  const refreshBtn = document.getElementById("refresh-btn");
  if (refreshBtn) refreshBtn.addEventListener("click", () => location.reload());

  let inactivityTimeout;
  function resetInactivityTimer() {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => location.reload(), 5 * 60 * 1000);
  }
  ['click', 'touchstart', 'mousemove'].forEach(evt => document.addEventListener(evt, resetInactivityTimer, { passive: true }));
  resetInactivityTimer();
});


/* ==================================================================
   🔥 LÓGICA: INTERFAZ MINIMALISTA Y REPRODUCTOR DROPBOX 🔥
   ================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('interaction-overlay');
    const btnShowAvatar = document.getElementById('btn-show-avatar');
    const btnPlayVideo = document.getElementById('btn-play-video'); // Este es el botón que ahora dice "Foto"
    const videoElement = document.getElementById('playback-video');

    if (!overlay || !btnShowAvatar || !btnPlayVideo || !videoElement) return;

    // ✅ TU ENLACE DE DROPBOX CORREGIDO (raw=1) ✅
    const VIDEO_URL = "https://www.dropbox.com/scl/fi/bsd9ksydqvtuq2iwxmef8/foto-luna.mp4?rlkey=dqdqthp3g9teg5jd36oo5irnt&st=ajetasrp&raw=1";
    
    // Asignamos el enlace al reproductor
    videoElement.src = VIDEO_URL;

    // Función para volver a mostrar el menú cuando termina el video
    function showOverlay() {
        videoElement.pause();
        videoElement.currentTime = 0;
        videoElement.classList.add('video-hidden');
        overlay.classList.remove('overlay-hidden');
    }

    // EVENTO: Detectar el final del video
    videoElement.addEventListener('ended', showOverlay);

    // BOTÓN 1: Conversar
    btnShowAvatar.addEventListener('click', () => {
        overlay.classList.add('overlay-hidden');
    });

    // BOTÓN 2: Foto (Reproducir Video)
    btnPlayVideo.addEventListener('click', () => {
        overlay.classList.add('overlay-hidden');
        videoElement.classList.remove('video-hidden');
        
        // Intentar reproducir automáticamente
        setTimeout(() => {
            // Importante: Algunos navegadores requieren que el video esté silenciado (muted) para el autoplay
            // si el usuario no ha interactuado mucho. Si falla, prueba descomentando la línea de abajo.
            // videoElement.muted = true; 
            
            videoElement.play().catch(e => {
                console.warn("Autoplay bloqueado por el navegador:", e);
                // Si el autoplay falla, podrías mostrar un botón de play manual temporalmente,
                // pero normalmente, al haber hecho clic en el botón "Foto", el navegador lo permite.
            });
        }, 300);
    });
});