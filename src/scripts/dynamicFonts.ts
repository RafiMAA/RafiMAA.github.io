/**
 * Dynamic Fonts Module
 * Manages variable font weight proximity animations, text scramble cipher,
 * kinetic title hover dynamics, and typography customizer preferences.
 */

const SCRAMBLE_CHARS = 'ABCDEF0123456789%#@&*!~?/<>';

export interface FontConfig {
  fontStyle: 'grotesk' | 'mono' | 'serif';
  dynamicsEnabled: boolean;
  tiltEnabled: boolean;
}

let activeConfig: FontConfig = {
  fontStyle: 'grotesk',
  dynamicsEnabled: true,
  tiltEnabled: true,
};

export function initDynamicFonts() {
  loadFontPreferences();
  initProximityVariableFonts();
  initTextScrambleElements();
  initKineticTitleHover();
  initTypographyControlDock();
}

/**
 * Text Scramble / Cipher animation engine
 */
export function scrambleText(element: HTMLElement, targetText: string, duration = 600) {
  let frame = 0;
  const totalFrames = Math.floor((duration / 1000) * 60);
  const originalChars = targetText.split('');

  const interval = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;

    const currentText = originalChars
      .map((char, idx) => {
        if (char === ' ' || char === '\n') return char;
        if (idx / originalChars.length < progress) return char;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      })
      .join('');

    element.textContent = currentText;

    if (frame >= totalFrames) {
      element.textContent = targetText;
      clearInterval(interval);
    }
  }, 1000 / 60);
}

/**
 * Variable Font Weight & Spacing modulate based on mouse proximity
 */
function initProximityVariableFonts() {
  const dynamicHeadings = document.querySelectorAll<HTMLElement>(
    'h1, h2, .about-statement, .tech-section-title, .contact-title'
  );

  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (!activeConfig.dynamicsEnabled) return;

    dynamicHeadings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      // Check if heading is in viewport
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const maxDistance = 450;

      if (distance < maxDistance) {
        const factor = 1 - distance / maxDistance; // 0 to 1
        const targetWght = Math.round(650 + factor * 220); // 650 to 870
        const letterSpacing = (-0.05 + factor * 0.035).toFixed(3); // -0.05em to -0.015em
        
        heading.style.setProperty('--font-wght', String(targetWght));
        heading.style.setProperty('--font-spacing', `${letterSpacing}em`);
        heading.classList.add('font-proximate');
      } else {
        heading.style.removeProperty('--font-wght');
        heading.style.removeProperty('--font-spacing');
        heading.classList.remove('font-proximate');
      }
    });
  });
}

/**
 * Kinetic Word Hover effect on interactive section titles
 */
function initKineticTitleHover() {
  const titles = document.querySelectorAll<HTMLElement>('.kinetic-title');

  titles.forEach((title) => {
    if (title.querySelector('br') || title.id === 'hero-title') return;
    const words = title.innerText.split(' ');
    title.innerHTML = words
      .map(
        (word) =>
          `<span class="kinetic-word">${word.split('').map((char) => `<span class="kinetic-char">${char}</span>`).join('')}</span>`
      )
      .join(' ');
  });
}

/**
 * Text scramble trigger for role switcher and designated elements
 */
function initTextScrambleElements() {
  const scrambleNodes = document.querySelectorAll<HTMLElement>('[data-scramble]');

  scrambleNodes.forEach((node) => {
    node.addEventListener('mouseenter', () => {
      const targetText = node.getAttribute('data-scramble-text') || node.textContent || '';
      scrambleText(node, targetText, 450);
    });
  });
}

/**
 * Typography & Aesthetics Dock Controls Handler
 */
function initTypographyControlDock() {
  const styleSelect = document.getElementById('font-style-btn');
  const dynamicsToggle = document.getElementById('font-dynamics-toggle');
  const tiltToggle = document.getElementById('photo-tilt-toggle');

  if (styleSelect) {
    styleSelect.addEventListener('click', () => {
      const styles: FontConfig['fontStyle'][] = ['grotesk', 'mono', 'serif'];
      const nextIndex = (styles.indexOf(activeConfig.fontStyle) + 1) % styles.length;
      activeConfig.fontStyle = styles[nextIndex];
      applyFontConfig();
    });
  }

  if (dynamicsToggle) {
    dynamicsToggle.addEventListener('click', () => {
      activeConfig.dynamicsEnabled = !activeConfig.dynamicsEnabled;
      applyFontConfig();
    });
  }

  if (tiltToggle) {
    tiltToggle.addEventListener('click', () => {
      activeConfig.tiltEnabled = !activeConfig.tiltEnabled;
      applyFontConfig();
    });
  }
}

function applyFontConfig() {
  document.body.setAttribute('data-font-style', activeConfig.fontStyle);
  document.body.setAttribute('data-font-dynamics', String(activeConfig.dynamicsEnabled));
  document.body.setAttribute('data-photo-tilt', String(activeConfig.tiltEnabled));

  const styleLabel = document.getElementById('font-style-label');
  if (styleLabel) {
    const labels = {
      grotesk: 'Grotesk Modern',
      mono: 'Tech Monospace',
      serif: 'Editorial Display',
    };
    styleLabel.textContent = labels[activeConfig.fontStyle];
  }

  const dynamicsToggle = document.getElementById('font-dynamics-toggle');
  if (dynamicsToggle) {
    dynamicsToggle.classList.toggle('active', activeConfig.dynamicsEnabled);
  }

  const tiltToggle = document.getElementById('photo-tilt-toggle');
  if (tiltToggle) {
    tiltToggle.classList.toggle('active', activeConfig.tiltEnabled);
  }

  try {
    localStorage.setItem('portfolio_font_config', JSON.stringify(activeConfig));
  } catch (e) {
    // Ignore storage quota errors
  }
}

function loadFontPreferences() {
  try {
    const saved = localStorage.getItem('portfolio_font_config');
    if (saved) {
      activeConfig = { ...activeConfig, ...JSON.parse(saved) };
    }
  } catch (e) {}
  applyFontConfig();
}
