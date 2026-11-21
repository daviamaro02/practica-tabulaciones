// js/app.js - Motor principal Neotel con Casos Aleatorios y Time Out
import { CATEGORIES_DATA } from './categories.js';
import { SCENARIOS } from './scenarios.js';

// ==========================================
// 1. ESTADO GLOBAL
// ==========================================
let activeScenarios = [];
let currentScenarioIndex = 0;
let timerInterval = null;
let timeLeft = 20;
let stats = { correct: 0, wrong: 0, timeout: 0 };

// ==========================================
// 2. REFERENCIAS AL DOM
// ==========================================
const scenarioTitle = document.getElementById('scenario-title');
const callAudio = document.getElementById('call-audio');
const btnStartCall = document.getElementById('btn-start-call');
const callStatus = document.getElementById('call-status');
const transcriptBody = document.getElementById('transcript-body');

// Ficha de datos Neotel
const leadId = document.getElementById('lead-id');
const leadDbTag = document.getElementById('lead-db-tag');
const leadDbHeader = document.getElementById('lead-db-header');
const leadPhoneHeader = document.getElementById('lead-phone-header');
const leadName = document.getElementById('lead-name');
const leadLastname = document.getElementById('lead-lastname');
const leadPhone = document.getElementById('lead-phone');
const leadPhone2 = document.getElementById('lead-phone2');
const leadDni = document.getElementById('lead-dni');
const leadEmail = document.getElementById('lead-email');
const leadProduct = document.getElementById('lead-product');
const leadAffiliate = document.getElementById('lead-affiliate');
const leadPublisher = document.getElementById('lead-publisher');
const leadCountry = document.getElementById('lead-country');

// Panel de tabulación
const tabulacionPanel = document.getElementById('tabulacion-panel');
const selectCategory = document.getElementById('select-category');
const selectSubcategory = document.getElementById('select-subcategory');
const selectAgendaPhone = document.getElementById('select-agenda-phone');
const callNotes = document.getElementById('call-notes');
const tabDate = document.getElementById('tab-date');
const timerBadge = document.getElementById('timer-badge');
let timerSeconds = document.getElementById('timer-seconds');
const btnAccept = document.getElementById('btn-accept');

// Modal de evaluación
const feedbackModal = document.getElementById('feedback-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalDetails = document.getElementById('modal-details');
const btnNextScenario = document.getElementById('btn-next-scenario');

// ==========================================
// 3. INICIALIZACIÓN Y BARAJADO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initCategoriesDropdown();
  setTodayDate();
  startNewSession();
  setupEventListeners();
});

// Algoritmo Fisher-Yates para barajar los casos aleatoriamente
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function startNewSession() {
  stats = { correct: 0, wrong: 0, timeout: 0 };
  currentScenarioIndex = 0;
  activeScenarios = shuffleArray(SCENARIOS);
  loadScenario(currentScenarioIndex);
}

function setTodayDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  if (tabDate) tabDate.value = `${day}/${month}/${year}`;
}

function initCategoriesDropdown() {
  selectCategory.innerHTML = '<option value="">Seleccione Categoría...</option>';
  Object.keys(CATEGORIES_DATA).forEach(key => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = CATEGORIES_DATA[key].label;
    selectCategory.appendChild(opt);
  });
}

// ==========================================
// 4. CARGAR CASO
// ==========================================
function loadScenario(index) {
  if (index >= activeScenarios.length) {
    showFinalSummary();
    return;
  }

  const scenario = activeScenarios[index];

  scenarioTitle.textContent = `${scenario.title} [Aleatorio: ${index + 1} de ${activeScenarios.length}]`;
  
  leadId.textContent = scenario.lead.id;
  leadDbTag.textContent = `Db: ${scenario.lead.db}`;
  leadDbHeader.textContent = `Db: ${scenario.lead.db}`;
  leadPhoneHeader.textContent = scenario.lead.phone;
  leadName.value = scenario.lead.name;
  leadLastname.value = scenario.lead.lastName || '';
  leadPhone.value = scenario.lead.phone;
  leadPhone2.value = scenario.lead.phone2 || '';
  leadDni.value = scenario.lead.dni || '';
  leadEmail.value = scenario.lead.email || '';
  leadProduct.value = scenario.lead.product;
  leadAffiliate.value = scenario.lead.affiliate || '';
  leadPublisher.value = scenario.lead.publisher || '';
  leadCountry.value = scenario.lead.country;

  selectAgendaPhone.innerHTML = `
    <option value="">-- Teléfono agenda --</option>
    <option value="${scenario.lead.phone}">${scenario.lead.phone}</option>
  `;

  transcriptBody.innerHTML = `<em>Presiona <strong>"📞 Iniciar Llamada"</strong> para reproducir el diálogo.</em>`;

  resetFormState();
}

function resetFormState() {
  clearInterval(timerInterval);
  timeLeft = 20;

  // Restaurar el badge amarillo con el span del contador
  timerBadge.classList.remove('danger');
  timerBadge.innerHTML = 'Segundos para categorización automática: <span id="timer-seconds">20</span>';
  timerSeconds = document.getElementById('timer-seconds');

  tabulacionPanel.classList.add('locked');
  selectCategory.disabled = true;
  selectCategory.value = '';
  selectSubcategory.disabled = true;
  selectSubcategory.innerHTML = '<option value="">Seleccione Subcategoría...</option>';
  selectAgendaPhone.disabled = true;
  selectAgendaPhone.value = '';
  selectAgendaPhone.classList.remove('agenda-highlight');
  callNotes.disabled = true;
  callNotes.value = '';
  btnAccept.disabled = true;

  btnStartCall.disabled = false;
  btnStartCall.textContent = '📞 Iniciar Llamada';
  callStatus.textContent = 'En espera para iniciar';
  callStatus.className = 'call-status-idle';
}

// ==========================================
// 5. CONTROL DE LLAMADA Y CRONÓMETRO
// ==========================================
function startCall() {
  btnStartCall.disabled = true;
  callStatus.textContent = '● En llamada (Escucha activa)...';
  callStatus.className = 'call-status-playing';

  const scenario = activeScenarios[currentScenarioIndex];

  if (scenario.transcript) {
    transcriptBody.innerHTML = scenario.transcript.map(line => `
      <div class="dialog-row">
        <span class="dialog-speaker">${line.speaker}:</span>
        <span class="dialog-text">${line.text}</span>
      </div>
    `).join('');
  }

  callAudio.src = scenario.audioSrc;
  callAudio.play().then(() => {
    callAudio.onended = endCallAndStartTimer;
  }).catch(() => {
    let duration = scenario.fallbackDuration || 6;
    callStatus.textContent = `● Audio en curso (${duration}s restantes)...`;
    
    const interval = setInterval(() => {
      duration--;
      if (duration > 0) {
        callStatus.textContent = `● Audio en curso (${duration}s restantes)...`;
      } else {
        clearInterval(interval);
        endCallAndStartTimer();
      }
    }, 1000);
  });
}

function endCallAndStartTimer() {
  callStatus.textContent = '✔ Llamada finalizada - Tabule la ficha';
  callStatus.className = 'call-status-ended';

  tabulacionPanel.classList.remove('locked');
  selectCategory.disabled = false;
  callNotes.disabled = false;
  btnAccept.disabled = false;

  timeLeft = 20;
  if (timerSeconds) timerSeconds.textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    if (timerSeconds) timerSeconds.textContent = timeLeft;

    if (timeLeft <= 5) {
      timerBadge.classList.add('danger');
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

// ==========================================
// 6. SELECTS DEPENDIENTES
// ==========================================
function handleCategoryChange() {
  const catKey = selectCategory.value;
  selectSubcategory.innerHTML = '<option value="">Seleccione Subcategoría...</option>';
  selectAgendaPhone.value = '';
  selectAgendaPhone.disabled = true;
  selectAgendaPhone.classList.remove('agenda-highlight');

  if (!catKey || !CATEGORIES_DATA[catKey]) {
    selectSubcategory.disabled = true;
    return;
  }

  CATEGORIES_DATA[catKey].subcategories.forEach(sub => {
    const opt = document.createElement('option');
    opt.value = sub.id;
    opt.textContent = sub.label;
    selectSubcategory.appendChild(opt);
  });

  selectSubcategory.disabled = false;
}

function handleSubcategoryChange() {
  const catKey = selectCategory.value;
  const subId = selectSubcategory.value;

  if (catKey === 'RELLAMAR') {
    const subObj = CATEGORIES_DATA[catKey].subcategories.find(s => s.id === subId);
    
    // Tanto LLAMAR como Contestador exigen el teléfono de agenda
    if (subObj && subObj.requiresAgendaPhone) {
      selectAgendaPhone.disabled = false;
      selectAgendaPhone.classList.add('agenda-highlight');
    } else {
      selectAgendaPhone.disabled = true;
      selectAgendaPhone.classList.remove('agenda-highlight');
      selectAgendaPhone.value = '';
    }
  } else {
    selectAgendaPhone.disabled = true;
    selectAgendaPhone.classList.remove('agenda-highlight');
    selectAgendaPhone.value = '';
  }
}

// ==========================================
// 7. EVALUACIÓN Y VALIDACIÓN
// ==========================================
function evaluateTabulacion() {
  clearInterval(timerInterval);
  const timeUsed = 20 - timeLeft;

  const scenario = activeScenarios[currentScenarioIndex];
  const userCat = selectCategory.value;
  const userSub = selectSubcategory.value;
  const userAgendaPhone = selectAgendaPhone.value;

  const isCatCorrect = userCat === scenario.expected.category;
  const isSubCorrect = userSub === scenario.expected.subcategory;
  
  let isAgendaCorrect = true;
  if (scenario.expected.agendaPhone) {
    isAgendaCorrect = userAgendaPhone === scenario.expected.agendaPhone;
  }

  const isSuccess = isCatCorrect && isSubCorrect && isAgendaCorrect;

  if (isSuccess) {
    stats.correct++;
    showModal({
      type: 'success',
      title: '¡Tabulación Correcta! 🎯',
      message: `Excelente. Tabulaste correctamente en ${timeUsed} segundos.`,
      details: `<strong>Justificación operativa:</strong> ${scenario.explanation}`
    });
  } else {
    stats.wrong++;
    
    let errores = [];
    if (!isCatCorrect) errores.push(`- Categoría seleccionada: <em>${userCat || 'Ninguna'}</em> (Esperada: <strong>${scenario.expected.category}</strong>)`);
    if (!isSubCorrect) errores.push(`- Subcategoría seleccionada: <em>${userSub || 'Ninguna'}</em>`);
    if (scenario.expected.agendaPhone && !isAgendaCorrect) {
      errores.push(`- ⚠️ <strong>Olvidaste seleccionar el Teléfono de Agenda</strong> en el desplegable derecho.`);
    }

    showModal({
      type: 'error',
      title: 'Tabulación Incorrecta ❌',
      message: 'La ficha no coincide con las reglas de la campaña.',
      details: `
        <p><strong>Observaciones:</strong></p>
        ${errores.join('<br>')}
        <br><br>
        <strong>Regla operativa:</strong> ${scenario.explanation}
      `
    });
  }
}

// ==========================================
// 8. ERROR CATEGORIZACIÓN X TIME OUT
// ==========================================
function handleTimeout() {
  stats.timeout++;
  const scenario = activeScenarios[currentScenarioIndex];

  // Bloquear panel y cambiar estado visual
  tabulacionPanel.classList.add('locked');
  btnAccept.disabled = true;

  callStatus.textContent = '❌ ERROR: CATEGORIZACIÓN X TIME OUT';
  callStatus.className = 'call-status-playing'; // En rojo y parpadeando

  timerBadge.classList.add('danger');
  timerBadge.innerHTML = '<strong>¡TIME OUT! Ficha perdida</strong>';

  showModal({
    type: 'timeout',
    title: 'ERROR: CATEGORIZACIÓN X TIME OUT ⏳',
    message: 'Se consumieron los 20 segundos para categorización automática.',
    details: `
      <p style="color: #c62828; font-weight: bold; margin-bottom: 8px;">
        ⚠️ Ficha quemada por exceder el tiempo reglamentario de tabulación en Neotel.
      </p>
      <strong>La tabulación obligatoria era:</strong><br>
      - Categoría: <strong>${scenario.expected.category}</strong><br>
      - Subcategoría: <strong>${scenario.expected.subcategory}</strong><br>
      ${scenario.expected.agendaPhone ? '- Teléfono de agenda: <strong>' + scenario.expected.agendaPhone + '</strong><br>' : ''}
      <br>
      <strong>Regla de campaña:</strong> ${scenario.explanation}
    `
  });
}

function showModal({ type, title, message, details }) {
  const modalContent = feedbackModal.querySelector('.modal-content');
  modalContent.className = `modal-content ${type}`;
  modalTitle.innerHTML = title;
  modalMessage.innerHTML = message;
  modalDetails.innerHTML = details;
  feedbackModal.classList.remove('hidden');
}

function showFinalSummary() {
  const total = activeScenarios.length;
  const accuracy = Math.round((stats.correct / total) * 100);

  showModal({
    type: accuracy >= 70 ? 'success' : 'error',
    title: '¡Entrenamiento Finalizado! 📊',
    message: `Has completado todos los escenarios de la sesión.`,
    details: `
      <strong>Resumen de tu desempeño:</strong><br>
      - Tabulaciones correctas: <strong>${stats.correct}</strong> de ${total}<br>
      - Errores de tabulación: <strong>${stats.wrong}</strong><br>
      - <strong>Errores categorización x Time Out: ${stats.timeout}</strong><br>
      - Precisión operativa: <strong>${accuracy}%</strong>
    `
  });

  btnNextScenario.textContent = 'Iniciar Nueva Ronda Aleatoria 🔄';
  btnNextScenario.onclick = () => {
    feedbackModal.classList.add('hidden');
    startNewSession();
  };
}

// ==========================================
// 9. EVENT LISTENERS
// ==========================================
function setupEventListeners() {
  btnStartCall.addEventListener('click', startCall);
  selectCategory.addEventListener('change', handleCategoryChange);
  selectSubcategory.addEventListener('change', handleSubcategoryChange);
  btnAccept.addEventListener('click', evaluateTabulacion);

  btnNextScenario.addEventListener('click', () => {
    feedbackModal.classList.add('hidden');
    currentScenarioIndex++;
    loadScenario(currentScenarioIndex);
  });
}