/**
 * BROADNET INTERNET SERVICES - GENTLE & FRIENDLY INTERACTION LOGIC
 * Powered by pure vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroGentleWaves();
  initHeroSpeedAnimation();
  initNavbar();
  initMobileDrawer();
  initPlanInteractions();
  initPinAvailabilityChecker();
  initCameraCatalogue();
  initCameraCallbackModal();
  initDedicatedCameraForm();
  initContactInquiryForm();
  initFaqAccordion();
  initAboutExpand();
});

/* ==========================================================================
   1. GENTLE NETWORK & WIRELESS WAVES ANIMATION (Echoing the Broadnet Logo)
   Very gentle, calm, slow movement with brand purple (#500EBA) & red (#EF1313)
   ========================================================================== */
function initHeroGentleWaves() {
  const canvas = document.getElementById('heroNetworkCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 28;
  const maxDistance = 150;

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class GentleNode {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.22;
      this.vy = (Math.random() - 0.5) * 0.22;
      this.radius = Math.random() * 2.2 + 1.2;
      this.isRed = Math.random() > 0.8;
      this.color = this.isRed ? 'rgba(239, 19, 19, 0.6)' : 'rgba(169, 124, 248, 0.5)';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new GentleNode());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = (1 - dist / maxDistance) * 0.25;
          ctx.strokeStyle = `rgba(169, 124, 248, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   1b. HERO SPEED DASHBOARD ANIMATION
   Simulates a live speed test with counting numbers and ring fill
   ========================================================================== */
function initHeroSpeedAnimation() {
  const speedNum = document.getElementById('heroSpeedNum');
  const downSpeed = document.getElementById('heroDownSpeed');
  const upSpeed = document.getElementById('heroUpSpeed');
  const ping = document.getElementById('heroPing');
  const jitter = document.getElementById('heroJitter');
  const ring = document.getElementById('heroSpeedRing');

  if (!speedNum || !ring) return;

  const circumference = 2 * Math.PI * 68; // r=68
  ring.style.strokeDasharray = circumference;
  ring.style.strokeDashoffset = circumference;

  const targetSpeed = 197;
  const targetDown = 197;
  const targetUp = 195;
  const targetPing = 3;
  const targetJitter = 1;

  function animateValue(el, start, end, duration, suffix) {
    const startTime = performance.now();
    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.round(start + (end - start) * eased);
      el.textContent = current + (suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function runSpeedTest() {
    // Reset
    speedNum.textContent = '0';
    downSpeed.textContent = '0';
    upSpeed.textContent = '0';
    ping.textContent = '--';
    jitter.textContent = '--';
    ring.style.strokeDashoffset = circumference;

    // Phase 1: Ring fills + speed number counts up (0–2s)
    setTimeout(() => {
      const fillPercent = targetSpeed / 200; // 200 Mbps max
      const offset = circumference - (circumference * fillPercent);
      ring.style.strokeDashoffset = offset;
      animateValue(speedNum, 0, targetSpeed, 2000);
    }, 300);

    // Phase 2: Download speed (0.8s delay)
    setTimeout(() => {
      animateValue(downSpeed, 0, targetDown, 1200);
    }, 800);

    // Phase 3: Upload speed (1.4s delay)
    setTimeout(() => {
      animateValue(upSpeed, 0, targetUp, 1000);
    }, 1400);

    // Phase 4: Ping & Jitter (2s delay)
    setTimeout(() => {
      animateValue(ping, 20, targetPing, 600);
      animateValue(jitter, 8, targetJitter, 500);
    }, 2000);
  }

  // Use IntersectionObserver to trigger animation when hero is visible
  const heroSection = document.getElementById('home');
  let hasRun = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasRun) {
        hasRun = true;
        setTimeout(runSpeedTest, 600);

        // Loop every 8s
        setInterval(() => {
          runSpeedTest();
        }, 8000);
      }
    });
  }, { threshold: 0.3 });

  if (heroSection) observer.observe(heroSection);
}

/* ==========================================================================
   2. NAVBAR & ACTIVE LINK TRACKING
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
  const sections = document.querySelectorAll('section[id]');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  // Multi-page active link highlighting
  [...navLinks, ...mobileLinks].forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  function onScroll() {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (sections.length > 0 && (currentPath === 'index.html' || currentPath === '')) {
      let currentId = '';
      const scrollPos = window.scrollY + 160;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          }
        }
      });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   3. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const hamburger = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.mobile-nav-links a');

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   4. PLAN SELECTION & PLAN COMPARISON INTERACTION
   ========================================================================== */
function initPlanInteractions() {
  const compareBtn = document.getElementById('comparePlansBtn');
  const compareTable = document.getElementById('comparePlansTable');

  if (compareBtn && compareTable) {
    compareBtn.addEventListener('click', () => {
      const isExpanded = compareTable.classList.toggle('expanded');
      compareBtn.textContent = isExpanded ? 'Hide Plan Comparison ▲' : 'Compare All Plan Features ▼';
    });
  }

  const planButtons = document.querySelectorAll('.btn-plan-select');
  planButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planName = btn.getAttribute('data-plan') || 'Broadband Plan';
      const checkerSection = document.getElementById('availability') || document.getElementById('coverageChecker');
      if (checkerSection) {
        checkerSection.scrollIntoView({ behavior: 'smooth' });
        const pinInput = document.getElementById('pinInput');
        if (pinInput) {
          pinInput.focus();
          pinInput.setAttribute('placeholder', `Checking PIN for ${planName} (e.g. 600054)...`);
        }
      }
    });
  });
}

/* ==========================================================================
   5. SERVICE AVAILABILITY CHECKER - INSTANT PIN CODE / AREA DATABASE
   Zero contact info required: Matches against editable list of serviceable areas
   ========================================================================== */

/**
 * EDITABLE SERVICEABLE LOCATIONS & PIN CODES
 * Official service area: Avadi, Chennai and neighboring regions
 */
const serviceableLocations = [
  { pincode: '600054', area: 'Fire Station Road / Avadi Main Town', city: 'Chennai' },
  { pincode: '600071', area: 'Kamaraj Nagar / Avadi IAF', city: 'Chennai' },
  { pincode: '600053', area: 'Ambattur / Ambattur OT', city: 'Chennai' },
  { pincode: '600077', area: 'Thiruverkadu / Ayappakkam', city: 'Chennai' },
  { pincode: '600062', area: 'Pattabiram / Mitnamallee', city: 'Chennai' },
  { pincode: '600055', area: 'CRPF Camp / Avadi', city: 'Chennai' },
  { pincode: '600058', area: 'Ambattur Industrial Estate', city: 'Chennai' },
  { pincode: '600072', area: 'Pattabiram Military Siding', city: 'Chennai' },
  { pincode: '600095', area: 'Maduravoyal', city: 'Chennai' },
  { pincode: '600107', area: 'Koyambedu / Chennai West', city: 'Chennai' }
];

function initPinAvailabilityChecker() {
  const form = document.getElementById('pinCheckerForm');
  const input = document.getElementById('pinInput');
  const resultBox = document.getElementById('pinResultBox');
  const sampleBtns = document.querySelectorAll('.pin-sample-btn');

  if (!form || !input || !resultBox) return;

  function checkAvailability(query) {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      resultBox.className = 'pin-result-box error';
      resultBox.innerHTML = `
        <div class="pin-result-header">
          <span>⚠️ Please enter a PIN code or Area name</span>
        </div>
        <p style="font-size: 0.92rem;">Enter your 6-digit postal code (e.g., 600054 or 600071) or area name to verify coverage.</p>
      `;
      return;
    }

    // Match by PIN or Area name
    const match = serviceableLocations.find(item => 
      item.pincode === cleanQuery || 
      item.area.toLowerCase().includes(cleanQuery) || 
      item.city.toLowerCase().includes(cleanQuery) ||
      cleanQuery.includes(item.pincode) ||
      cleanQuery.includes('avadi') ||
      cleanQuery.includes('chennai')
    );

    if (match) {
      resultBox.className = 'pin-result-box available';
      resultBox.innerHTML = `
        <div class="pin-result-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#065F46" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>Broadnet Fiber is AVAILABLE in your area!</span>
        </div>
        <p style="font-size: 0.95rem; line-height: 1.5; margin-bottom: 6px;">
          Great news! <strong>${match.area}</strong> (PIN: <strong>${match.pincode}</strong>, ${match.city}) is covered by Broadnet High-Speed Fiber Network.
        </p>
        <p style="font-size: 0.88rem; color: #065F46;">
          Fast on-site installation is ready for your building or residence.
        </p>
        <div class="pin-result-actions">
          <a href="#plans" class="btn btn-sm btn-primary-purple" style="background-color: #500EBA;">
            View Available Plans →
          </a>
          <a href="https://wa.me/919884344075?text=${encodeURIComponent(`Hello Broadnet, I checked my PIN ${match.pincode} (${match.area}) and service is available. How can I get connected?`)}" 
             target="_blank" rel="noopener noreferrer" 
             class="btn btn-sm" style="background-color: #25D366; color: #FFFFFF;">
            Get Installed via WhatsApp
          </a>
        </div>
      `;
    } else {
      resultBox.className = 'pin-result-box unavailable';
      resultBox.innerHTML = `
        <div class="pin-result-header">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9A3412" stroke-width="2.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>Service Not Yet Live in "${escapeHtml(query)}"</span>
        </div>
        <p style="font-size: 0.92rem; line-height: 1.5; margin-bottom: 6px;">
          Broadnet is expanding its fiber network across Chennai. While we haven't wired your exact street yet, we prioritize sectors with active customer requests.
        </p>
        <div class="pin-result-actions">
          <a href="https://wa.me/919884344075?text=${encodeURIComponent(`Hello Broadnet, I am interested in fiber internet at PIN/Area: ${query}. Please let me know when it becomes available.`)}" 
             target="_blank" rel="noopener noreferrer" 
             class="btn btn-sm btn-primary-red">
            Request Coverage on WhatsApp →
          </a>
        </div>
      `;
    }
  }

  function escapeHtml(string) {
    return String(string).replace(/[&<>"']/g, function (s) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[s];
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkAvailability(input.value);
  });

  sampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pin = btn.getAttribute('data-pin');
      if (pin) {
        input.value = pin;
        checkAvailability(pin);
      }
    });
  });
}

/* ==========================================================================
   6. CAMERA CATALOGUE & DETAIL MODAL
   ========================================================================== */
const cameraProducts = [
  {
    id: 'cam-01',
    category: 'dome',
    categoryLabel: 'Dome Cameras',
    name: 'Broadnet Vision HD Dome',
    model: 'BN-DOM-HD100',
    description: 'Compact ceiling-mounted dome camera with wide-angle coverage and infrared night vision for living rooms and office interiors.',
    specs: [
      'Resolution: 1080p Full HD',
      'Night Vision: Up to 20m IR',
      'Lens: 2.8mm Wide Angle (105°)'
    ],
    fullSpecs: {
      'Resolution': '1920 × 1080 (Full HD @ 30fps)',
      'Night Vision': 'Smart IR LEDs up to 20 meters',
      'Lens': '2.8mm Fixed Lens, 105° Field of View',
      'Connectivity': 'RJ45 PoE / 12V DC',
      'Storage Compatibility': 'MicroSD up to 256GB / NVR Network Storage',
      'Warranty': '1 Year On-site Broadnet Warranty',
      'Mounting': 'Ceiling & Wall Mount Indoor Housing'
    }
  },
  {
    id: 'cam-02',
    category: 'bullet',
    categoryLabel: 'Bullet Cameras',
    name: 'Broadnet Guard Pro Bullet',
    model: 'BN-BLT-4K200',
    description: 'Rugged weatherproof outdoor bullet camera designed for perimeter security, driveways, and main gate monitoring.',
    specs: [
      'Weatherproof: IP67 Rated',
      'IR Range: 30m Smart IR',
      'Resolution: 4MP Ultra Clear'
    ],
    fullSpecs: {
      'Resolution': '2560 × 1440 (4MP Quad HD)',
      'Night Vision': 'Dual IR + White Spotlight Night Vision (30m)',
      'Housing': 'Heavy-duty IP67 Weatherproof Metal Body',
      'Lens': '3.6mm High Precision Optical Lens',
      'Connectivity': 'PoE Gigabit / Broadnet Fiber Ready',
      'Storage Compatibility': 'NVR / Cloud / On-board MicroSD',
      'Warranty': '1 Year Comprehensive Broadnet Warranty'
    }
  },
  {
    id: 'cam-03',
    category: 'ptz',
    categoryLabel: 'PTZ Cameras',
    name: 'Broadnet Omni 360° PTZ',
    model: 'BN-PTZ-360PRO',
    description: 'Motorized pan-tilt-zoom camera with intelligent human tracking and 360-degree panoramic coverage from a single mount point.',
    specs: [
      'Rotation: 360° Pan / 90° Tilt',
      'Zoom: 4x Optical Zoom',
      'Tracking: AI Human Auto-Track'
    ],
    fullSpecs: {
      'Resolution': '2K (2560 × 1440)',
      'Motorized Movement': '355° Pan, 90° Tilt with Auto-Patrol presets',
      'Tracking': 'Smart Motion & Human Silhouette Detection',
      'Night Vision': 'Color Night Vision with Built-in Floodlights',
      'Connectivity': 'Dual-Band Wi-Fi & Ethernet LAN',
      'Storage Compatibility': 'NVR, MicroSD up to 512GB',
      'Warranty': '1 Year Broadnet Warranty & Free Calibration'
    }
  },
  {
    id: 'cam-04',
    category: 'wifi',
    categoryLabel: 'Wi-Fi Cameras',
    name: 'Broadnet Smart Home Wi-Fi',
    model: 'BN-WIFI-SMART01',
    description: 'Plug-and-play wireless indoor camera featuring two-way audio talkback, baby cry detection, and instant phone alerts.',
    specs: [
      'Wireless Setup: Wi-Fi Quick Pair',
      'Audio: 2-Way Clear Intercom',
      'App: iOS & Android Live View'
    ],
    fullSpecs: {
      'Resolution': '1080p FHD with HDR',
      'Audio': 'Built-in Mic & Speaker for Two-Way Calling',
      'Sensor': 'Passive Infrared (PIR) Motion Detection',
      'Connectivity': '2.4 GHz High-Gain Wi-Fi',
      'Storage Compatibility': 'Local SD Card & Broadnet Secure Cloud',
      'Warranty': '1 Year Replacement Warranty',
      'Power': '5V Micro-USB / USB-C Adapter Included'
    }
  },
  {
    id: 'cam-05',
    category: 'ip',
    categoryLabel: 'IP Cameras',
    name: 'Broadnet Enterprise PoE IP Camera',
    model: 'BN-IP-NET500',
    description: 'Commercial-grade network camera optimized for low-bandwidth streaming across Broadnet FTTH lines with H.265+ compression.',
    specs: [
      'Power: Power over Ethernet (PoE)',
      'Sensor: Sony Starlight Sensor',
      'Encoding: H.265+ Low Bandwidth'
    ],
    fullSpecs: {
      'Resolution': '5 Megapixel Ultra HD (2880 × 1620)',
      'Sensor': '1/2.7" Sony Starvis Low-Light Sensor',
      'Night Vision': 'Color at Night down to 0.005 Lux',
      'Network Protocols': 'ONVIF Profile S/G/T, RTSP, HTTPS',
      'Connectivity': 'Cat6 PoE (802.3af)',
      'Storage Compatibility': 'Enterprise NVR, NAS, MicroSD',
      'Warranty': '2 Years Broadnet Corporate Warranty'
    }
  },
  {
    id: 'cam-06',
    category: 'outdoor',
    categoryLabel: 'Outdoor Cameras',
    name: 'Broadnet Heavy Outdoor Pro',
    model: 'BN-OUT-PRO800',
    description: 'Industrial-grade surveillance camera with built-in siren, active deterrent flashing light, and extreme weather resilience.',
    specs: [
      'Durability: IK10 Vandal / IP67 Weather',
      'Active Deterrence: Siren & Strobe',
      'Night Vision: 40m Long Range IR'
    ],
    fullSpecs: {
      'Resolution': '4K Ultra HD (3840 × 2160)',
      'Active Deterrent': '110dB Siren & Blue/Red Flashing Warning Light',
      'Night Vision': 'Extreme Long-Range 40m Array IR LEDs',
      'Housing': 'IK10 Impact Resistant Metal Alloy',
      'Connectivity': 'PoE RJ45 + Audio I/O',
      'Storage Compatibility': 'NVR, Central Surveillance Server',
      'Warranty': '2 Years Broadnet Commercial Warranty'
    }
  },
  {
    id: 'cam-07',
    category: 'indoor',
    categoryLabel: 'Indoor Cameras',
    name: 'Broadnet Mini Cube Indoor',
    model: 'BN-IND-MINI02',
    description: 'Discreet and stylish mini security camera with magnetic base, wide angle view, and physical privacy shutter.',
    specs: [
      'Design: Ultra-Compact Magnetic Base',
      'Privacy: One-Touch Sleep Mode',
      'Alerts: Real-time Phone Notifications'
    ],
    fullSpecs: {
      'Resolution': '1080p Crystal Clear HD',
      'Field of View': '130° Ultra-Wide Diagonal',
      'Mounting': 'Magnetic Base & Adhesive Plate Included',
      'Privacy Feature': 'Software & Physical Lens Shield',
      'Connectivity': 'Wi-Fi 802.11 b/g/n',
      'Storage Compatibility': 'MicroSD up to 128GB',
      'Warranty': '1 Year Broadnet Warranty'
    }
  },
  {
    id: 'cam-08',
    category: 'nvr',
    categoryLabel: 'NVR & Storage',
    name: 'Broadnet 4K Ultra NVR Hub',
    model: 'BN-NVR-8CH-4K',
    description: '8-Channel 4K Network Video Recorder with PoE ports for plug-and-play installation, HDMI 4K output, and multi-screen live view.',
    specs: [
      'Capacity: 8 Channels Simultaneous 4K',
      'PoE Ports: 8 Independent PoE Interfaces',
      'Output: HDMI 4K + VGA Display'
    ],
    fullSpecs: {
      'Input Channels': '8 IP Camera Channels up to 8MP (4K)',
      'Hard Drive Bays': '1 × SATA Port up to 10TB HDD (Surveillance Grade)',
      'PoE Support': '8 × Independent 100Mbps PoE Ports',
      'Video Output': '1 × HDMI (up to 4K), 1 × VGA (1080p)',
      'Mobile App': 'Free Multi-user Remote Viewing (iOS / Android / PC)',
      'Warranty': '2 Years Broadnet Hardware Warranty & Free Setup'
    }
  }
];

function getCameraSvgIcon() {
  return `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
      <circle cx="12" cy="13" r="3.5"/>
    </svg>
  `;
}

function initCameraCatalogue() {
  const grid = document.getElementById('cameraGrid');
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const modal = document.getElementById('cameraModal');
  const modalClose = document.getElementById('modalCloseBtn');
  const modalContent = document.getElementById('modalDynamicContent');

  if (!grid) return;

  function renderProducts(filter = 'all') {
    grid.innerHTML = '';
    const filtered = filter === 'all' 
      ? cameraProducts 
      : cameraProducts.filter(p => p.category === filter);

    filtered.forEach(product => {
      const card = document.createElement('div');
      card.className = 'camera-card';
      card.innerHTML = `
        <div class="camera-card-img-placeholder">
          <span class="camera-category-pill">${product.categoryLabel}</span>
          ${getCameraSvgIcon()}
          <span style="font-size: 0.72rem; font-weight: 700; color: var(--brand-purple); letter-spacing: 0.05em; text-transform: uppercase; margin-top: 8px;">Broadnet Vision</span>
        </div>
        <div class="camera-card-body">
          <div style="font-size: 0.75rem; font-weight: 800; color: var(--brand-purple); margin-bottom: 2px;">
            ${product.model}
          </div>
          <h3 class="camera-product-name">${product.name}</h3>
          <p class="camera-product-desc">${product.description}</p>
          <div class="camera-specs-list">
            ${product.specs.map(s => `
              <div class="camera-spec-item">
                <span class="camera-spec-bullet"></span>
                <span>${s}</span>
              </div>
            `).join('')}
          </div>
          <div class="camera-price-tag">
            Price: Contact for Quote
          </div>
          <div class="camera-card-actions">
            <button class="btn btn-secondary btn-sm view-camera-details-btn" data-id="${product.id}">
              Details
            </button>
            <button class="btn btn-primary-red btn-sm request-callback-trigger-btn" data-id="${product.id}" data-model="${product.model}" data-name="${product.name}">
              ENQUIRE
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    attachCardListeners();
  }

  function attachCardListeners() {
    document.querySelectorAll('.view-camera-details-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openProductModal(id);
      });
    });

    // Enquire button triggers the camera callback modal
    document.querySelectorAll('.request-callback-trigger-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const prodName = btn.getAttribute('data-name') || 'Broadnet Security Camera';
        const prodModel = btn.getAttribute('data-model') || '';
        openCallbackModal(prodName, prodModel);
      });
    });
  }

  function openProductModal(productId) {
    const product = cameraProducts.find(p => p.id === productId);
    if (!product || !modal || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-content-grid">
        <div class="modal-image-preview">
          ${getCameraSvgIcon()}
          <div style="font-size: 0.82rem; font-weight: 700; color: var(--brand-purple); margin-top: 10px;">Broadnet Surveillance</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">${product.model}</div>
        </div>
        <div class="modal-details-col">
          <span class="eyebrow">${product.categoryLabel}</span>
          <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--text-title); margin-bottom: 4px;">
            ${product.name}
          </h2>
          <div style="font-size: 0.88rem; font-weight: 700; color: var(--text-muted); margin-bottom: 12px;">
            Model: <span style="font-weight: 700; color: var(--brand-purple);">${product.model}</span>
          </div>
          <p style="font-size: 0.92rem; color: var(--text-body); line-height: 1.5; margin-bottom: 14px;">
            ${product.description}
          </p>
          
          <table class="modal-specs-table">
            <tbody>
              ${Object.entries(product.fullSpecs).map(([label, val]) => `
                <tr>
                  <td>${label}</td>
                  <td><span style="font-weight: 600; color: var(--text-title);">${val}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div style="font-size: 0.95rem; font-weight: 800; color: var(--text-title); margin-bottom: 14px;">
            Price: Contact for Custom Quote &amp; Survey
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <button id="modalCallbackBtn" class="btn btn-primary-red btn-block">
              REQUEST A CALLBACK FOR THIS CAMERA
            </button>
            <a href="https://wa.me/919884344075?text=${encodeURIComponent(`Hello Broadnet, I am interested in ${product.name} (${product.model}). Please share quotation and installation details.`)}" 
               target="_blank" rel="noopener noreferrer" 
               class="btn btn-secondary btn-block" style="display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              Inquire via WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const modalCallbackBtn = document.getElementById('modalCallbackBtn');
    if (modalCallbackBtn) {
      modalCallbackBtn.addEventListener('click', () => {
        closeModal();
        openCallbackModal(product.name, product.model);
      });
    }
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderProducts(cat);
    });
  });

  renderProducts('all');
}

/* ==========================================================================
   7. CAMERA CALLBACK & INQUIRY SYSTEM (PHONE NUMBER REQUIRED)
   ========================================================================== */
function initCameraCallbackModal() {
  const modal = document.getElementById('cameraCallbackModal');
  const closeBtn = document.getElementById('callbackCloseBtn');
  const form = document.getElementById('cameraCallbackForm');
  const statusBox = document.getElementById('callbackStatusBox');
  const productBadge = document.getElementById('callbackProductBadge');
  const productHidden = document.getElementById('callbackSelectedProduct');

  // Trigger from Camera Banner
  const bannerCallbackBtn = document.getElementById('bannerCallbackBtn');
  if (bannerCallbackBtn) {
    bannerCallbackBtn.addEventListener('click', () => {
      openCallbackModal('Security Cameras & Surveillance', 'General Consultation');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeCallbackModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCallbackModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeCallbackModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('cbName').value.trim();
      const phone = document.getElementById('cbPhone').value.trim();
      const premise = document.getElementById('cbPremise').value;
      const time = document.getElementById('cbTime').value;
      const notes = document.getElementById('cbNotes').value.trim();
      const product = productHidden ? productHidden.value : 'Security Solution';

      if (!name || !phone) {
        alert('Please provide your Name and Phone Number so our team can call you back.');
        return;
      }

      // Display friendly confirmation
      if (statusBox) {
        statusBox.innerHTML = `
          <strong>Thank you, ${name}! Callback Request Confirmed.</strong><br>
          <span style="font-size: 0.88rem; color: #065F46; font-weight: normal; margin-top: 4px; display: inline-block;">
            Our security specialist will call you at <strong>${phone}</strong> during <strong>${time}</strong> regarding <strong>${product}</strong>.
          </span>
          <div style="margin-top: 12px;">
            <a href="https://wa.me/919884344075?text=${encodeURIComponent(`Hello Broadnet, I requested a callback for ${product}. My name: ${name}, Phone: ${phone}, Time: ${time}.`)}" 
               target="_blank" rel="noopener noreferrer" 
               class="btn btn-sm btn-primary-purple" style="background-color: #25D366; font-size: 0.82rem; padding: 6px 14px;">
               Fast-Track on WhatsApp →
            </a>
          </div>
        `;
        statusBox.classList.add('active');
      }

      form.reset();
    });
  }
}

function openCallbackModal(productName, productModel) {
  const modal = document.getElementById('cameraCallbackModal');
  const productBadge = document.getElementById('callbackProductBadge');
  const productHidden = document.getElementById('callbackSelectedProduct');
  const statusBox = document.getElementById('callbackStatusBox');

  if (productBadge) {
    productBadge.textContent = productModel ? `Inquiring for: ${productName} (${productModel})` : `Inquiring for: ${productName}`;
  }
  if (productHidden) {
    productHidden.value = productModel ? `${productName} [${productModel}]` : productName;
  }
  if (statusBox) {
    statusBox.classList.remove('active');
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const nameInput = document.getElementById('cbName');
    if (nameInput) setTimeout(() => nameInput.focus(), 150);
  }
}

function closeCallbackModal() {
  const modal = document.getElementById('cameraCallbackModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   8. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const panel = item.querySelector('.faq-answer-panel');

    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherPanel = otherItem.querySelector('.faq-answer-panel');
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   9. ABOUT BROADNET EXPAND INTERACTION
   ========================================================================== */
function initAboutExpand() {
  const expandBtn = document.getElementById('aboutExpandBtn');
  const expandPanel = document.getElementById('aboutExpandPanel');

  if (expandBtn && expandPanel) {
    expandBtn.addEventListener('click', () => {
      const isExpanded = expandPanel.classList.toggle('expanded');
      expandBtn.textContent = isExpanded ? 'Show Less ↑' : 'Learn More About Broadnet →';
    });
  }
}

/* ==========================================================================
   10. DEDICATED CAMERA INQUIRY FORM (On cameras.html)
   Separate form asking for Name, Phone Number, Location, Camera Count, etc.
   ========================================================================== */
function initDedicatedCameraForm() {
  const form = document.getElementById('dedicatedCameraForm');
  const statusBox = document.getElementById('dedicatedStatusBox');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('dName')?.value.trim();
    const phone = document.getElementById('dPhone')?.value.trim();
    const premise = document.getElementById('dPremise')?.value;
    const count = document.getElementById('dCount')?.value;
    const time = document.getElementById('dTime')?.value;
    const notes = document.getElementById('dNotes')?.value.trim();

    if (!name || !phone) {
      alert('Please provide your Name and Phone Number so our CCTV specialist can call you.');
      return;
    }

    if (statusBox) {
      statusBox.innerHTML = `
        <strong>Thank you, ${name}! Your Camera Inquiry Has Been Received.</strong><br>
        <span style="font-size: 0.88rem; color: #065F46; font-weight: normal; margin-top: 4px; display: inline-block;">
          Our certified CCTV specialist will call you at <strong>${phone}</strong> during <strong>${time}</strong> to discuss camera options for your <strong>${premise}</strong> (${count}).
        </span>
        <div style="margin-top: 12px;">
          <a href="https://wa.me/919884344075?text=${encodeURIComponent(`Hello Broadnet, I submitted a camera inquiry. Name: ${name}, Phone: ${phone}, Premise: ${premise} (${count}), Time: ${time}.`)}" 
             target="_blank" rel="noopener noreferrer" 
             class="btn btn-sm" style="background-color: #25D366; color: #FFFFFF; font-size: 0.82rem; padding: 6px 14px;">
             Fast-Track on WhatsApp →
          </a>
        </div>
      `;
      statusBox.classList.add('active');
      statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    form.reset();
  });
}

/* ==========================================================================
   11. GENERAL CONTACT & INQUIRY FORM (On contact.html)
   Handles messages, inquiries, and callback requests with instant feedback
   ========================================================================== */
function initContactInquiryForm() {
  const form = document.getElementById('contactInquiryForm');
  const statusBox = document.getElementById('contactStatusBox');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName')?.value.trim();
    const phone = document.getElementById('contactPhone')?.value.trim();
    const service = document.getElementById('contactService')?.value;
    const time = document.getElementById('contactPreferredTime')?.value;
    const msg = document.getElementById('contactMessage')?.value.trim();

    if (!name || !phone) {
      alert('Please provide your Name and Phone Number.');
      return;
    }

    if (statusBox) {
      statusBox.innerHTML = `
        <strong>Thank you, ${name}! Your inquiry has been received.</strong><br>
        <span style="font-size: 0.88rem; color: #065F46; font-weight: normal; margin-top: 4px; display: inline-block;">
          Our operations team at Avadi will contact you at <strong>${phone}</strong> (${time}) regarding <strong>${service}</strong>.
        </span>
        <div style="margin-top: 12px;">
          <a href="https://wa.me/919884344075?text=${encodeURIComponent(`Hello Broadnet, I submitted an inquiry on the website. Name: ${name}, Phone: ${phone}, Service: ${service}, Time: ${time}${msg ? `, Notes: ${msg}` : ''}`)}" 
             target="_blank" rel="noopener noreferrer" 
             class="btn btn-sm" style="background-color: #25D366; color: #FFFFFF; font-size: 0.82rem; padding: 6px 14px; display: inline-flex; align-items: center; gap: 6px;">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
             Message on WhatsApp Now →
          </a>
        </div>
      `;
      statusBox.classList.add('active');
      statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    form.reset();
  });
}

