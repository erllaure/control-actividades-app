(function () {
  const STORAGE_KEY = "control-actividades-v1";
  const weekdayLabels = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miercoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sabado",
    sunday: "Domingo",
  };

  const baseTemplate = {
    monday: [
      ["05:30", "06:00", "Levantarse + Zoe + orden"],
      ["06:00", "06:30", "Meditacion"],
      ["06:30", "07:00", "cambiarse"],
      ["07:00", "07:30", "Traslado"],
      ["08:00", "08:30", "Trabajo"],
      ["13:30", "14:00", "caminar 10 minutos"],
      ["14:00", "14:30", "Trabajo"],
      ["17:00", "17:30", "Traslado"],
      ["18:00", "18:30", "Gym"],
      ["20:00", "20:30", "Ingles"],
      ["21:30", "22:00", "Lectura"],
      ["22:00", "22:30", "Zoe + dormir"],
    ],
    tuesday: [
      ["05:30", "06:00", "Levantarse + Zoe + orden"],
      ["06:00", "06:30", "Meditacion"],
      ["06:30", "07:00", "cambiarse"],
      ["07:00", "07:30", "Traslado"],
      ["08:00", "08:30", "Trabajo"],
      ["13:30", "14:00", "caminar 10 minutos"],
      ["14:00", "14:30", "Trabajo"],
      ["17:00", "17:30", "Traslado"],
      ["18:00", "18:30", "Doctorado / cena"],
      ["20:00", "20:30", "Gym"],
      ["21:30", "22:00", "Lectura"],
      ["22:00", "22:30", "Zoe + dormir"],
    ],
    wednesday: [
      ["05:30", "06:00", "Levantarse + Zoe + orden"],
      ["06:00", "06:30", "Gym"],
      ["08:00", "08:30", "Meditacion"],
      ["08:30", "09:00", "Desayuno"],
      ["09:00", "09:30", "Trabajo"],
      ["18:00", "18:30", "caminar 10 minutos"],
      ["18:30", "19:00", "Ingles / cena"],
      ["20:00", "20:30", "Meal prep"],
      ["20:30", "21:00", "Libre"],
      ["21:00", "21:30", "Lectura"],
      ["22:00", "22:30", "Zoe + dormir"],
    ],
    thursday: [
      ["05:30", "06:00", "Levantarse + Zoe + orden"],
      ["06:00", "06:30", "Gym"],
      ["08:00", "08:30", "Meditacion"],
      ["08:30", "09:00", "Desayuno"],
      ["09:00", "09:30", "Trabajo"],
      ["18:00", "18:30", "caminar 10 minutos"],
      ["18:30", "19:00", "Doctorado / cena"],
      ["20:00", "20:30", "Libre"],
      ["21:00", "21:30", "Lectura"],
      ["22:00", "22:30", "Zoe + dormir"],
    ],
    friday: [
      ["05:30", "06:00", "Levantarse + Zoe + orden"],
      ["06:00", "06:30", "Gym"],
      ["08:00", "08:30", "Meditacion"],
      ["08:30", "09:00", "Desayuno"],
      ["09:00", "09:30", "Trabajo"],
      ["18:00", "18:30", "caminar 10 minutos"],
      ["18:30", "19:00", "Ingles / cena"],
      ["20:00", "20:30", "Meal prep"],
      ["20:30", "21:00", "Libre"],
      ["21:00", "21:30", "Lectura"],
      ["22:00", "22:30", "Zoe + dormir"],
    ],
    saturday: [
      ["07:00", "07:30", "Correr"],
      ["09:00", "09:30", "Compras"],
      ["11:00", "11:30", "Doctorado"],
      ["13:00", "13:30", "Almuerzo"],
      ["14:00", "14:30", "Doctorado"],
      ["15:30", "16:00", "caminar 10 minutos"],
      ["16:00", "16:30", "Python"],
      ["18:00", "18:30", "Cena/libre"],
      ["18:30", "19:00", "Planchado"],
      ["19:00", "19:30", "Meditacion"],
      ["19:30", "20:00", "Ingles"],
      ["21:00", "21:30", "Lectura"],
      ["22:00", "22:30", "Zoe + dormir"],
    ],
    sunday: [
      ["07:00", "07:30", "Correr"],
      ["09:00", "09:30", "Doctorado"],
      ["13:00", "13:30", "Almuerzo"],
      ["14:00", "14:30", "Doctorado"],
      ["15:30", "16:00", "caminar 10 minutos"],
      ["16:00", "16:30", "Python"],
      ["18:00", "18:30", "Cena/libre"],
      ["18:30", "19:00", "Meal prep"],
      ["20:00", "20:30", "Meditacion"],
      ["20:30", "21:00", "Libre"],
      ["21:00", "21:30", "Lectura"],
      ["22:00", "22:30", "Zoe + dormir"],
    ],
  };

  const state = loadState();

  const elements = {
    selectedDateInput: document.getElementById("selectedDateInput"),
    weekRangeLabel: document.getElementById("weekRangeLabel"),
    dailyTitle: document.getElementById("dailyTitle"),
    weeklySummary: document.getElementById("weeklySummary"),
    plannerBody: document.getElementById("plannerBody"),
    todayCompletion: document.getElementById("todayCompletion"),
    weekCompletion: document.getElementById("weekCompletion"),
    completedCount: document.getElementById("completedCount"),
    pendingCount: document.getElementById("pendingCount"),
    todayMeta: document.getElementById("todayMeta"),
    weekMeta: document.getElementById("weekMeta"),
    prevWeekBtn: document.getElementById("prevWeekBtn"),
    nextWeekBtn: document.getElementById("nextWeekBtn"),
    todayBtn: document.getElementById("todayBtn"),
    addRowBtn: document.getElementById("addRowBtn"),
    resetDayBtn: document.getElementById("resetDayBtn"),
    clearChecksBtn: document.getElementById("clearChecksBtn"),
    emptyStateTemplate: document.getElementById("emptyStateTemplate"),
  };

  bindEvents();
  ensurePlan(state.selectedDate);
  render();

  function bindEvents() {
    elements.selectedDateInput.addEventListener("change", function (event) {
      const nextDate = event.target.value || getTodayIso();
      state.selectedDate = nextDate;
      ensurePlan(nextDate);
      saveState();
      render();
    });

    elements.todayBtn.addEventListener("click", function () {
      state.selectedDate = getTodayIso();
      ensurePlan(state.selectedDate);
      saveState();
      render();
    });

    elements.prevWeekBtn.addEventListener("click", function () {
      state.selectedDate = shiftDate(state.selectedDate, -7);
      ensurePlan(state.selectedDate);
      saveState();
      render();
    });

    elements.nextWeekBtn.addEventListener("click", function () {
      state.selectedDate = shiftDate(state.selectedDate, 7);
      ensurePlan(state.selectedDate);
      saveState();
      render();
    });

    elements.addRowBtn.addEventListener("click", function () {
      const plan = getEditablePlan(state.selectedDate);
      const nuevaFila = createEmptyRow(getSuggestedStart(plan));
    
      plan.push(nuevaFila);
      sortPlan(plan);
      saveState();
      renderDailyPlan();
      renderStats();
    
      if (typeof guardarActividad === "function") {
        guardarActividad({
          actividad: nuevaFila.activity || "",
          horaInicio: nuevaFila.start,
          horaFin: nuevaFila.end,
          completado: nuevaFila.done,
          fecha: state.selectedDate,
          idLocal: nuevaFila.id
        });
      }
    });

    elements.resetDayBtn.addEventListener("click", function () {
      const dayKey = getDayKeyFromIso(state.selectedDate);
      state.plansByDate[state.selectedDate] = createTemplatePlan(dayKey);
      saveState();
      render();
    });

    elements.clearChecksBtn.addEventListener("click", function () {
      const plan = getEditablePlan(state.selectedDate);
      plan.forEach(function (row) {
        row.done = false;
      });
      saveState();
      render();
    });

    elements.weeklySummary.addEventListener("click", function (event) {
      const card = event.target.closest("[data-date]");
      if (!card) {
        return;
      }
      state.selectedDate = card.dataset.date;
      ensurePlan(state.selectedDate);
      saveState();
      render();
    });

    elements.plannerBody.addEventListener("input", function (event) {
      const rowElement = event.target.closest("tr[data-id]");
      if (!rowElement) {
        return;
      }
      const plan = getEditablePlan(state.selectedDate);
      const row = plan.find(function (entry) {
        return entry.id === rowElement.dataset.id;
      });
      if (!row) {
        return;
      }

      if (event.target.matches(".activity-input")) {
        row.activity = event.target.value;
      }

      saveState();
      renderStats();
      renderWeeklySummary();
    });

    elements.plannerBody.addEventListener("change", function (event) {
      const rowElement = event.target.closest("tr[data-id]");
      if (!rowElement) {
        return;
      }
      const plan = getEditablePlan(state.selectedDate);
      const row = plan.find(function (entry) {
        return entry.id === rowElement.dataset.id;
      });
      if (!row) {
        return;
      }

      if (event.target.matches(".start-input")) {
        row.start = sanitizeTime(event.target.value, row.start);
      }
      if (event.target.matches(".end-input")) {
        row.end = sanitizeTime(event.target.value, row.end);
      }
      if (event.target.matches(".check-input")) {
        row.done = Boolean(event.target.checked);
      }

      sortPlan(plan);
      saveState();
      render();
    });

    elements.plannerBody.addEventListener("click", function (event) {
      if (!event.target.matches(".delete-button")) {
        return;
      }
      const rowElement = event.target.closest("tr[data-id]");
      if (!rowElement) {
        return;
      }
      const plan = getEditablePlan(state.selectedDate);
      const nextPlan = plan.filter(function (entry) {
        return entry.id !== rowElement.dataset.id;
      });
      state.plansByDate[state.selectedDate] = nextPlan;
      saveState();
      render();
    });
  }

  function render() {
    elements.selectedDateInput.value = state.selectedDate;
    elements.dailyTitle.textContent = "Agenda de " + formatLongDate(state.selectedDate);
    elements.weekRangeLabel.textContent = formatWeekRange(state.selectedDate);
    renderWeeklySummary();
    renderDailyPlan();
    renderStats();
  }

  function renderWeeklySummary() {
    const days = getWeekDates(state.selectedDate);
    elements.weeklySummary.innerHTML = days
      .map(function (dateIso) {
        const stats = getStatsForPlan(getEffectivePlan(dateIso));
        const percentage = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;
        const activeClass = dateIso === state.selectedDate ? " active" : "";
        return (
          '<article class="day-card' +
          activeClass +
          '" data-date="' +
          dateIso +
          '">' +
          '<div class="day-card-head">' +
          "<div>" +
          "<h4>" +
          formatWeekday(dateIso) +
          "</h4>" +
          "<p>" +
          formatShortDate(dateIso) +
          "</p>" +
          "</div>" +
          "<strong>" +
          percentage +
          "%</strong>" +
          "</div>" +
          '<div class="progress-track"><div class="progress-bar" style="width:' +
          percentage +
          '%"></div></div>' +
          '<div class="day-card-meta">' +
          "<p>" +
          stats.completed +
          " / " +
          stats.total +
          " realizadas</p>" +
          "<p>" +
          Math.max(stats.total - stats.completed, 0) +
          " pendientes</p>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderDailyPlan() {
    const plan = getEditablePlan(state.selectedDate);
    sortPlan(plan);

    if (!plan.length) {
      elements.plannerBody.innerHTML = "";
      elements.plannerBody.appendChild(elements.emptyStateTemplate.content.cloneNode(true));
      return;
    }

    elements.plannerBody.innerHTML = plan
      .map(function (row) {
        const completedClass = row.done ? "completed" : "";
        return (
          '<tr class="' +
          completedClass +
          '" data-id="' +
          row.id +
          '">' +
          '<td><input class="start-input" type="time" value="' +
          escapeHtml(row.start) +
          '"></td>' +
          '<td><input class="end-input" type="time" value="' +
          escapeHtml(row.end) +
          '"></td>' +
          '<td><input class="activity-input" type="text" value="' +
          escapeHtml(row.activity) +
          '" placeholder="Escribe una actividad"></td>' +
          '<td><input class="check-input" type="checkbox" ' +
          (row.done ? "checked" : "") +
          "></td>" +
          '<td><button class="delete-button" type="button">Eliminar</button></td>' +
          "</tr>"
        );
      })
      .join("");
  }

  function renderStats() {
    const todayStats = getStatsForPlan(getEditablePlan(state.selectedDate));
    const weekDates = getWeekDates(state.selectedDate);
    const weekStats = weekDates.reduce(
      function (acc, dateIso) {
        const stats = getStatsForPlan(getEffectivePlan(dateIso));
        acc.completed += stats.completed;
        acc.total += stats.total;
        return acc;
      },
      { completed: 0, total: 0 }
    );

    const todayPercentage = todayStats.total ? Math.round((todayStats.completed / todayStats.total) * 100) : 0;
    const weekPercentage = weekStats.total ? Math.round((weekStats.completed / weekStats.total) * 100) : 0;

    elements.todayCompletion.textContent = todayPercentage + "%";
    elements.weekCompletion.textContent = weekPercentage + "%";
    elements.completedCount.textContent = String(todayStats.completed);
    elements.pendingCount.textContent = Math.max(todayStats.total - todayStats.completed, 0) + " pendientes";
    elements.todayMeta.textContent = todayStats.completed + " de " + todayStats.total + " actividades";
    elements.weekMeta.textContent = weekStats.completed + " de " + weekStats.total + " actividades";
  }

  function getStatsForPlan(plan) {
    const validRows = plan.filter(function (row) {
      return row.activity.trim() !== "";
    });
    const completed = validRows.filter(function (row) {
      return row.done;
    }).length;
    return {
      completed: completed,
      total: validRows.length,
    };
  }

  function getEditablePlan(dateIso) {
    ensurePlan(dateIso);
    return state.plansByDate[dateIso];
  }

  function getEffectivePlan(dateIso) {
    if (state.plansByDate[dateIso]) {
      return state.plansByDate[dateIso];
    }
    return createTemplatePlan(getDayKeyFromIso(dateIso));
  }

  function ensurePlan(dateIso) {
    if (!state.plansByDate[dateIso]) {
      state.plansByDate[dateIso] = createTemplatePlan(getDayKeyFromIso(dateIso));
    }
  }

  function createTemplatePlan(dayKey) {
    const rows = baseTemplate[dayKey] || [];
    return rows.map(function (entry) {
      return {
        id: createId(),
        start: entry[0],
        end: entry[1],
        activity: entry[2],
        done: false,
      };
    });
  }

  function createEmptyRow(start) {
    const end = addMinutes(start, 30);
    return {
      id: createId(),
      start: start,
      end: end,
      activity: "",
      done: false,
    };
  }

  function getSuggestedStart(plan) {
    if (!plan.length) {
      return "08:00";
    }
    const latest = plan
      .map(function (row) {
        return row.end || row.start || "08:00";
      })
      .sort()
      .slice(-1)[0];
    return latest;
  }

  function sortPlan(plan) {
    plan.sort(function (a, b) {
      return toMinutes(a.start) - toMinutes(b.start) || toMinutes(a.end) - toMinutes(b.end);
    });
  }

  function loadState() {
    const fallback = {
      selectedDate: getTodayIso(),
      plansByDate: {},
    };

    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!saved) {
        return fallback;
      }
      return {
        selectedDate: saved.selectedDate || fallback.selectedDate,
        plansByDate: normalizePlans(saved.plansByDate || {}),
      };
    } catch (error) {
      return fallback;
    }
  }

  function normalizePlans(plansByDate) {
    const normalized = {};
    Object.keys(plansByDate).forEach(function (dateIso) {
      normalized[dateIso] = (plansByDate[dateIso] || []).map(function (row) {
        return {
          id: row.id || createId(),
          start: sanitizeTime(row.start, "08:00"),
          end: sanitizeTime(row.end, addMinutes(sanitizeTime(row.start, "08:00"), 30)),
          activity: typeof row.activity === "string" ? row.activity : "",
          done: Boolean(row.done),
        };
      });
      sortPlan(normalized[dateIso]);
    });
    return normalized;
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function getTodayIso() {
    return new Date().toLocaleDateString("en-CA");
  }

  function shiftDate(dateIso, days) {
    const date = new Date(dateIso + "T12:00:00");
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString("en-CA");
  }

  function getWeekDates(dateIso) {
    const current = new Date(dateIso + "T12:00:00");
    const day = current.getDay();
    const offset = day === 0 ? -6 : 1 - day;
    current.setDate(current.getDate() + offset);

    return Array.from({ length: 7 }, function (_, index) {
      const next = new Date(current);
      next.setDate(current.getDate() + index);
      return next.toLocaleDateString("en-CA");
    });
  }

  function formatWeekRange(dateIso) {
    const days = getWeekDates(dateIso);
    return formatShortDate(days[0]) + " - " + formatShortDate(days[6]);
  }

  function formatLongDate(dateIso) {
    return new Date(dateIso + "T12:00:00").toLocaleDateString("es-PE", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function formatShortDate(dateIso) {
    return new Date(dateIso + "T12:00:00").toLocaleDateString("es-PE", {
      day: "numeric",
      month: "short",
    });
  }

  function formatWeekday(dateIso) {
    const dayKey = getDayKeyFromIso(dateIso);
    return weekdayLabels[dayKey];
  }

  function getDayKeyFromIso(dateIso) {
    const date = new Date(dateIso + "T12:00:00");
    const day = date.getDay();
    switch (day) {
      case 0:
        return "sunday";
      case 1:
        return "monday";
      case 2:
        return "tuesday";
      case 3:
        return "wednesday";
      case 4:
        return "thursday";
      case 5:
        return "friday";
      default:
        return "saturday";
    }
  }

  function sanitizeTime(value, fallback) {
    return /^\d{2}:\d{2}$/.test(value || "") ? value : fallback;
  }

  function toMinutes(time) {
    const parts = sanitizeTime(time, "00:00").split(":");
    return Number(parts[0]) * 60 + Number(parts[1]);
  }

  function addMinutes(time, minutes) {
    const total = (toMinutes(time) + minutes + 1440) % 1440;
    const hours = String(Math.floor(total / 60)).padStart(2, "0");
    const mins = String(total % 60).padStart(2, "0");
    return hours + ":" + mins;
  }

  function createId() {
    return "row-" + Math.random().toString(36).slice(2, 10);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
    guardarActividad({
  actividad: nuevaFila.activity || "",
  horaInicio: nuevaFila.start,
  horaFin: nuevaFila.end,
  completado: nuevaFila.done,
  fecha: state.selectedDate,
  idLocal: nuevaFila.id
});
  }
})();
