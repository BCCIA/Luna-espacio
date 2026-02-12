// -------------------- SEGURIDAD: CONSTANTES Y FUNCIONES --------------------
const PIN_CORRECTO = "5703";
const STORAGE_KEY_AUTH = "pinAccesoAutorizado";

// Verifica si el usuario ya tiene permiso guardado
function accesoPermitido() {
  return localStorage.getItem(STORAGE_KEY_AUTH) === "true";
}

// Función para quitar la capa de bloqueo visualmente
function desbloquearVisualmente() {
    const lockOverlay = document.getElementById("lock-overlay");
    if (lockOverlay) {
        lockOverlay.classList.add("unlocked");
        console.log("Sesión desbloqueada.");
    }
}

// Función principal para solicitar el PIN
function solicitarPin() {
  // Usamos un pequeño timeout para que el prompt no bloquee el renderizado inicial
  setTimeout(() => {
      const pinIngresado = prompt("🔐 Por favor, introduce el PIN de acceso:");

      if (pinIngresado === null) return; // Usuario canceló el prompt

      if (pinIngresado === PIN_CORRECTO) {
        // PIN Correcto: Guardamos autorización y desbloqueamos
        localStorage.setItem(STORAGE_KEY_AUTH, "true");
        desbloquearVisualmente();
      } else {
        // PIN Incorrecto
        alert("⛔ PIN incorrecto. Intenta de nuevo.");
        // Opcional: Si quieres ser muy estricto, puedes recargar la página aquí
        // location.reload();
      }
  }, 100);
}

// -------------------- SEGURIDAD BÁSICA (Anti-Click Derecho) --------------------
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.onkeydown = (e) => {
  // Bloqueo de F12, Ctrl+Shift+I, etc.
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

// ==================================================================
// 🔥 INICIALIZACIÓN Y LÓGICA PRINCIPAL 🔥
// ==================================================================
document.addEventListener("DOMContentLoaded", () => {

  // 1. Referencias a elementos clave
  const lockOverlay = document.getElementById("lock-overlay");
  const lockBtn = document.getElementById("lock-btn");
  const refreshBtn = document.getElementById("refresh-btn");

  // 2. Lógica de Seguridad Inicial
  if (accesoPermitido()) {
      // Si ya tiene permiso, desbloqueamos inmediatamente
      desbloquearVisualmente();
  } else {
      // Si NO tiene permiso, la capa de bloqueo está activa.
      // Añadimos el evento para pedir PIN al hacer clic en ella.
      if (lockOverlay) {
          lockOverlay.addEventListener("click", solicitarPin);
      }
  }

  // 3. Botón de Bloquear Sesión
  if (lockBtn) {
      lockBtn.addEventListener("click", () => {
          if (confirm("¿Deseas bloquear la sesión actual?")) {
              localStorage.removeItem(STORAGE_KEY_AUTH); // Revocar permiso
              location.reload(); // Recargar para volver al estado bloqueado
          }
      });
  }

  // 4. Botón de Limpiar Caché y Recargar
  if (refreshBtn) {
      refreshBtn.addEventListener("click", () => {
          // Limpiamos la autorización específicamente
          localStorage.removeItem(STORAGE_KEY_AUTH);
          // Opcional: localStorage.clear(); // Si quisieras borrar TODO el almacenamiento local
          location.reload(true); // true fuerza una recarga desde el servidor ignorando caché
      });
  }


  // 5. Inicializar el resto de la aplicación (Avatar, Animaciones, etc.)
  new DIDChat("chat-container");

  gsap.to(".first", 1, { delay: 0.2, top: "-100%", ease: Expo.easeInOut });
  gsap.to(".second", 1, { delay: 0.4, top: "-100%", ease: Expo.easeInOut });
  gsap.to(".third", 1, { delay: 0.6, top: "-100%", ease: Expo.easeInOut });
  gsap.from(".home-information", { opacity: 0, duration: 1.5, delay: 1, y: 30 });
  gsap.from(".anime-text", { opacity: 0, duration: 1.5, delay: 1.2, y: 30, stagger: 0.2 });
  gsap.from("#chat-container", { opacity: 0, duration: 1.5, delay: 1.5, y: 50, ease: "power3.out" });
  // Animación de entrada para los nuevos botones de control
  gsap.from(".control-buttons", { opacity: 0, duration: 1, delay: 2, x: 50, ease: "power3.out" });

  // Auto-refresco por inactividad (5 minutos)
  let inactivityTimeout;
  function resetInactivityTimer() {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => location.reload(), 5 * 60 * 1000);
  }
  // Solo escuchamos actividad si está desbloqueado para no sobrecargar
  if (accesoPermitido()) {
     ['click', 'touchstart', 'mousemove', 'keydown'].forEach(evt => document.addEventListener(evt, resetInactivityTimer, { passive: true }));
     resetInactivityTimer();
  }
});


/* ==================================================================
   LÓGICA DE LA INTERFAZ MINIMALISTA (Menú y Video)
   ================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('interaction-overlay');
    const btnShowAvatar = document.getElementById('btn-show-avatar');
    const btnPlayVideo = document.getElementById('btn-play-video');
    const videoElement = document.getElementById('playback-video');

    if (!overlay || !btnShowAvatar || !btnPlayVideo || !videoElement) return;

    // Enlace de Dropbox
    const VIDEO_URL = "https://www.dropbox.com/scl/fi/bsd9ksydqvtuq2iwxmef8/foto-luna.mp4?rlkey=dqdqthp3g9teg5jd36oo5irnt&st=ajetasrp&raw=1";
    videoElement.src = VIDEO_URL;

    function showOverlay() {
        videoElement.pause();
        videoElement.currentTime = 0;
        videoElement.classList.add('video-hidden');
        overlay.classList.remove('overlay-hidden');
    }

    videoElement.addEventListener('ended', showOverlay);

    btnShowAvatar.addEventListener('click', () => {
        overlay.classList.add('overlay-hidden');
    });

    btnPlayVideo.addEventListener('click', () => {
        overlay.classList.add('overlay-hidden');
        videoElement.classList.remove('video-hidden');
        setTimeout(() => {
            videoElement.play().catch(e => console.warn("Autoplay bloqueado:", e));
        }, 300);
    });
});
