(() => {
  const content = window.personalityTestContent;
  if (!content) return;

  const storageKey = `personality-field-notes-${content.locale}-v1`;
  const functionPrompts = content.functionPrompts;
  const enneagramPrompts = content.enneagramPrompts;
  const questions = [];

  Object.entries(functionPrompts).forEach(([code, [name, prompts]]) => {
    prompts.forEach((prompt) => questions.push({ kind: 'function', key: code, name, prompt }));
  });
  Object.entries(enneagramPrompts).forEach(([type, prompts]) => {
    prompts.forEach((prompt) => questions.push({ kind: 'enneagram', key: Number(type), prompt }));
  });

  const pageSize = 10;
  const pageCount = Math.ceil(questions.length / pageSize);
  const elements = {
    intro: document.getElementById('intro'),
    quiz: document.getElementById('quiz'),
    results: document.getElementById('results'),
    questionList: document.getElementById('question-list'),
    pageError: document.getElementById('page-error'),
    savedLabel: document.getElementById('saved-label')
  };
  let answers = Array(questions.length).fill(null);
  let order = questions.map((_, index) => index);
  let page = 0;

  function shuffle(items) {
    for (let index = items.length - 1; index > 0; index--) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
    }
    return items;
  }

  function save(finished = false) {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ answers, order, page, started: true, finished }));
      elements.savedLabel.textContent = content.ui.saved;
    } catch {
      elements.savedLabel.textContent = content.ui.savedTemporary;
    }
  }

  function updateProgress() {
    const answered = answers.filter((answer) => answer !== null).length;
    document.getElementById('progress-count').textContent = content.ui.progress(answered, questions.length);
    document.getElementById('progress-percent').textContent = `${answered}%`;
    document.getElementById('progress-fill').style.width = `${answered}%`;
    document.getElementById('progress-bar').setAttribute('aria-valuenow', String(answered));
  }

  function renderPage() {
    const start = page * pageSize;
    const ids = order.slice(start, start + pageSize);
    elements.questionList.innerHTML = ids.map((id, offset) => {
      const question = questions[id];
      const number = start + offset + 1;
      const choices = [1, 2, 3, 4, 5].map((value) => `<label class="answer-option" aria-label="${value} ${content.ui.outOfFive}"><input type="radio" name="answer-${id}" value="${value}"${answers[id] === value ? ' checked' : ''}><span>${value}</span></label>`).join('');
      return `<fieldset class="question-row"><legend class="question-text"><span class="question-number">${String(number).padStart(2, '0')}</span>${question.prompt}</legend><div class="answer-scale" role="radiogroup" aria-label="${content.ui.questionAria(number)}">${choices}</div></fieldset>`;
    }).join('');

    elements.questionList.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.addEventListener('change', (event) => {
        const id = Number(event.target.name.slice('answer-'.length));
        answers[id] = Number(event.target.value);
        elements.pageError.hidden = true;
        updateProgress();
        save();
      });
    });
    document.getElementById('page-label').textContent = String(page + 1).padStart(2, '0');
    document.getElementById('page-counter').textContent = content.ui.page(page + 1, pageCount);
    document.getElementById('back-button').disabled = page === 0;
    document.getElementById('back-button').textContent = `← ${content.ui.back}`;
    document.getElementById('next-button').innerHTML = page === pageCount - 1 ? `${content.ui.seeResults} <span aria-hidden="true">→</span>` : `${content.ui.continue} <span aria-hidden="true">→</span>`;
    elements.pageError.textContent = content.ui.required;
    elements.pageError.hidden = true;
    updateProgress();
  }

  function calculateResults() {
    const functionTotals = Object.fromEntries(Object.keys(functionPrompts).map((key) => [key, 0]));
    const functionCounts = Object.fromEntries(Object.keys(functionPrompts).map((key) => [key, 0]));
    const enneagramScores = Object.fromEntries(Array.from({ length: 9 }, (_, index) => [index + 1, 0]));
    questions.forEach((question, index) => {
      const response = answers[index];
      if (question.kind === 'function') {
        functionTotals[question.key] += response;
        functionCounts[question.key] += 1;
      } else {
        enneagramScores[question.key] += response;
      }
    });
    const functionScores = Object.fromEntries(Object.keys(functionTotals).map((key) => [key, functionTotals[key] / functionCounts[key]]));
    const weights = [1, 0.8, 0.55, 0.35];
    const typeScores = Object.fromEntries(Object.entries(content.typeStacks).map(([type, stack]) => {
      const weighted = stack.reduce((total, code, index) => total + functionScores[code] * weights[index], 0);
      return [type, weighted / weights.reduce((sum, weight) => sum + weight, 0)];
    }));
    const rankedTypes = Object.entries(typeScores).sort((a, b) => b[1] - a[1]);
    const rankedEnneagram = Object.entries(enneagramScores).sort((a, b) => b[1] - a[1]);
    const core = Number(rankedEnneagram[0][0]);
    const leftWing = core === 1 ? 9 : core - 1;
    const rightWing = core === 9 ? 1 : core + 1;
    const wing = enneagramScores[leftWing] >= enneagramScores[rightWing] ? leftWing : rightWing;
    const coreCenter = Object.entries(content.centers).find(([, members]) => members.includes(core))[0];
    const otherCenters = Object.entries(content.centers)
      .filter(([center]) => center !== coreCenter)
      .map(([, members]) => members.slice().sort((a, b) => enneagramScores[b] - enneagramScores[a])[0])
      .sort((a, b) => enneagramScores[b] - enneagramScores[a]);
    return { functionScores, rankedTypes, rankedEnneagram, core, wing, tritype: [core, ...otherCenters] };
  }

  function renderResults() {
    const { functionScores, rankedTypes, rankedEnneagram, core, wing, tritype } = calculateResults();
    document.getElementById('mbti-type').textContent = rankedTypes[0][0];
    document.getElementById('type-scores').innerHTML = rankedTypes.slice(0, 3).map(([type, score]) => {
      const percentage = Math.round(score / 5 * 100);
      return `<div class="score-row"><span>${type}</span><div class="score-track"><span style="width:${percentage}%"></span></div><strong>${percentage}%</strong></div>`;
    }).join('');
    document.getElementById('enneagram-type').textContent = content.ui.typeWing(core, wing);
    document.getElementById('enneagram-copy').textContent = `${content.typeDescriptions[core]} ${content.ui.wingExplanation}`;
    document.getElementById('wing-scores').innerHTML = [core, wing].map((type) => {
      const score = Number(rankedEnneagram.find(([scoredType]) => Number(scoredType) === type)[1]);
      return `<div class="score-row"><span>${content.ui.typeLabel(type)}</span><div class="score-track"><span style="width:${Math.round(score / 40 * 100)}%"></span></div><strong>${score}/40</strong></div>`;
    }).join('');
    document.getElementById('function-scores').innerHTML = Object.entries(functionScores).sort((a, b) => b[1] - a[1]).map(([code, score]) => {
      const percentage = Math.round((score - 1) / 4 * 100);
      return `<div class="score-row"><span class="function-label">${code} · ${functionPrompts[code][0]}</span><div class="score-track"><span style="width:${percentage}%"></span></div><strong>${score.toFixed(1)}/5</strong></div>`;
    }).join('');
    document.getElementById('tritype-type').textContent = tritype.join('-');
    document.getElementById('tritype-copy').textContent = content.ui.tritypeDescription;
    document.getElementById('enneagram-scores').innerHTML = rankedEnneagram.map(([type, score]) => `<div class="score-row"><span>${content.ui.typeLabel(type)}</span><div class="score-track"><span style="width:${Math.round(score / 40 * 100)}%"></span></div><strong>${score}/40</strong></div>`).join('');
    elements.intro.hidden = true;
    elements.quiz.hidden = true;
    elements.results.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showQuiz() {
    elements.intro.hidden = true;
    elements.results.hidden = true;
    elements.quiz.hidden = false;
    renderPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function restoreProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (!saved || !Array.isArray(saved.answers) || saved.answers.length !== questions.length || !Array.isArray(saved.order) || saved.order.length !== questions.length) return;
      if (new Set(saved.order).size !== questions.length || saved.order.some((id) => !Number.isInteger(id) || id < 0 || id >= questions.length)) return;
      answers = saved.answers.map((answer) => Number.isInteger(answer) && answer >= 1 && answer <= 5 ? answer : null);
      order = saved.order;
      page = Math.max(0, Math.min(pageCount - 1, Number(saved.page) || 0));
      if (saved.finished && answers.every((answer) => answer !== null)) renderResults();
      else if (saved.started) showQuiz();
    } catch {
      localStorage.removeItem(storageKey);
    }
  }

  document.getElementById('start-button').addEventListener('click', () => {
    answers = Array(questions.length).fill(null);
    order = shuffle(questions.map((_, index) => index));
    page = 0;
    save();
    showQuiz();
  });
  document.getElementById('back-button').addEventListener('click', () => {
    if (page > 0) {
      page -= 1;
      save();
      renderPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  document.getElementById('next-button').addEventListener('click', () => {
    const pageIds = order.slice(page * pageSize, (page + 1) * pageSize);
    const missingId = pageIds.find((id) => answers[id] === null);
    if (missingId !== undefined) {
      elements.pageError.hidden = false;
      elements.questionList.querySelector(`input[name="answer-${missingId}"]`)?.focus();
      return;
    }
    if (page < pageCount - 1) {
      page += 1;
      save();
      renderPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      save(true);
      renderResults();
    }
  });
  document.getElementById('restart-button').addEventListener('click', () => {
    localStorage.removeItem(storageKey);
    answers = Array(questions.length).fill(null);
    order = questions.map((_, index) => index);
    page = 0;
    elements.results.hidden = true;
    elements.quiz.hidden = true;
    elements.intro.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.getElementById('print-button').addEventListener('click', () => window.print());
  restoreProgress();
})();