(function() {
  const TOOLS = [
    {
      id: 'geo',
      name: 'GEO',
      title: 'Generative Engine Optimization (GEO)',
      hook: 'Optimize your business to appear inside AI tools like ChatGPT, Claude, and Gemini.',
      benefits: [
        'AI-optimized website structure and content for organic inbound leads.',
        'Comparison pages and schema markup to rank in AI answers.',
        'Drive qualified traffic without ads.'
      ],
      iconName: 'zap',
      ctaText: 'Explore Architecture',
      category: 'Visibility',
      accentColor: '#06b6d4'
    },
    {
      id: 'apollo',
      name: 'Apollo',
      title: 'Apollo Lead Intelligence',
      hook: 'Find highly specific customer profiles using filters like role, industry, company size, and funding.',
      benefits: [
        'Build precise, qualified lead lists fast.',
        'Targeted outreach at scale.',
        'Verified contact data accuracy.'
      ],
      iconName: 'search',
      ctaText: 'View Engine',
      category: 'Prospecting',
      accentColor: '#f59e0b'
    },
    {
      id: 'clay',
      name: 'Clay',
      title: 'Clay Data Personalization',
      hook: 'Enrich your lead list with verified emails, social profiles, and real-time activity signals.',
      benefits: [
        'Personalized outreach data in one click.',
        'Verified contacts + signals.',
        'Complex data waterfall orchestration.'
      ],
      iconName: 'layers',
      ctaText: 'Explore Workflows',
      category: 'Enrichment',
      accentColor: '#a855f7'
    },
    {
      id: 'brevo',
      name: 'Brevo',
      title: 'Brevo Lead Nurturing',
      hook: 'Set up automated sequences to follow up, nurture prospects, and score leads.',
      benefits: [
        'Automated follow-ups until ready.',
        'Lead scoring + engagement tracking.',
        'Omni-channel engagement tracking.'
      ],
      iconName: 'mail',
      ctaText: 'Explore Sequences',
      category: 'Engagement',
      accentColor: '#f43f5e'
    },
    {
      id: 'calendly',
      name: 'Calendly',
      title: 'Calendly Scheduling',
      hook: 'Eliminate back-and-forth. Prospects instantly book a meeting slot when intent is highest.',
      benefits: [
        'Fast bookings, higher conversions.',
        'Automated lead distribution.',
        'Seamless CRM integration.'
      ],
      iconName: 'calendar',
      ctaText: 'Setup Scheduler',
      category: 'Orchestration',
      accentColor: '#3b82f6'
    },
    {
      id: 'gamma',
      name: 'Gamma',
      title: 'Gamma Proposals',
      hook: 'Generate clean, visually appealing proposals or pitch decks rapidly from notes.',
      benefits: [
        'AI-generated layouts and visuals.',
        'Interactive slide decks.',
        'Real-time slide analytics.'
      ],
      iconName: 'file-text',
      ctaText: 'Generate Deck',
      category: 'Closing',
      accentColor: '#ec4899'
    },
    {
      id: 'airtable',
      name: 'Airtable',
      title: 'Airtable Deal Flow',
      hook: 'Track stages, values, and next actions to prevent deals from being lost.',
      benefits: [
        'Visual pipeline visibility.',
        'Custom views for stages.',
        'Bi-sync data orchestration.'
      ],
      iconName: 'kanban',
      ctaText: 'Manage Pipeline',
      category: 'Operations',
      accentColor: '#2563eb'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      title: 'Stripe Global Commerce',
      hook: 'Accept global payments with cards, subscriptions, and automated billing.',
      benefits: [
        'Frictionless global collections.',
        'Predictive churn analysis.',
        'Automated invoicing.'
      ],
      iconName: 'credit-card',
      ctaText: 'Scale Revenue',
      category: 'Revenue',
      accentColor: '#10b981'
    },
    {
      id: 'notion',
      name: 'Notion',
      title: 'Notion Delivery Tracking',
      hook: 'Turn project chaos into clarity. Centralize documents, tasks, and feedback.',
      benefits: [
        'Real-time project sync.',
        'Collaborative dashboards.',
        'Client update hub.'
      ],
      iconName: 'clipboard',
      ctaText: 'View Workspaces',
      category: 'Operations',
      accentColor: '#ffffff'
    },
    {
      id: 'tally',
      name: 'Tally',
      title: 'Tally Feedback Hub',
      hook: 'Collect reviews and insights using tools like Tally or Typeform.',
      benefits: [
        'Capture testimonials + improvements.',
        'Sentiment analysis.',
        'Automated review capture.'
      ],
      iconName: 'message-square',
      ctaText: 'Capture Feedback',
      category: 'Retention',
      accentColor: '#f97316'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      title: 'HubSpot LTV Expansion',
      hook: 'Automate renewals, upsells, and cross-sells to lower churn.',
      benefits: [
        'Automated expansion workflows.',
        'Predictive renewal score.',
        'Success orchestration.'
      ],
      iconName: 'trending-up',
      ctaText: 'Boost Retention',
      category: 'Retention',
      accentColor: '#ff5c35'
    },
    {
      id: 'analytics',
      name: 'Analytics Dashboard',
      title: 'Full-Funnel Analytics',
      hook: 'Track leads, conversions, revenue, CAC, and LTV in one place.',
      benefits: [
        'Full-funnel metrics.',
        'CAC, LTV, churn insights.',
        'Live ROI tracking.'
      ],
      iconName: 'bar-chart-3',
      ctaText: 'View Dashboard',
      category: 'Insights',
      accentColor: '#10b981'
    },
    {
      id: 'automation',
      name: 'The Hub',
      title: 'The Beyond Pixel Hub',
      hook: 'Businesses break because apps don’t talk. We connect the entire ecosystem.',
      benefits: [
        'Bi-directional sync between stages.',
        'Real-time ROI dashboard.',
        'Zero-latency data orchestration.'
      ],
      iconName: 'cpu',
      ctaText: 'Connect Business',
      category: 'Unified Ecosystem',
      accentColor: '#a855f7'
    }
  ];

  function getVisualHtml(tool) {
    const animations = {
      geo: `
        <div class="viz-geo-vortex"></div>
        <div class="viz-geo-data-node" style="animation-delay: 0s;"></div>
        <div class="viz-geo-data-node" style="animation-delay: 2s;"></div>
        <div class="viz-geo-data-node" style="animation-delay: 4s;"></div>
      `,
      apollo: `
        <div class="viz-apollo-scanner"></div>
        <div class="viz-apollo-target" style="top: 20%; left: 30%; animation-delay: 0.5s;"></div>
        <div class="viz-apollo-target" style="top: 60%; left: 70%; animation-delay: 1.2s;"></div>
        <div class="viz-apollo-target" style="top: 40%; left: 50%; animation-delay: 0.2s;"></div>
      `,
      clay: `
        <div class="viz-clay-particle" style="left: 20%; animation-delay: 0s;"></div>
        <div class="viz-clay-particle" style="left: 40%; animation-delay: 0.5s;"></div>
        <div class="viz-clay-particle" style="left: 60%; animation-delay: 1s;"></div>
        <div class="viz-clay-particle" style="left: 80%; animation-delay: 1.5s;"></div>
        <div class="viz-clay-particle" style="left: 30%; animation-delay: 0.8s; width: 4px; height: 4px;"></div>
        <div class="viz-clay-particle" style="left: 70%; animation-delay: 2.2s; width: 4px; height: 4px;"></div>
      `,
      brevo: `
        <div class="viz-brevo-pulse"></div>
        <div class="viz-brevo-pulse" style="animation-delay: 1.5s;"></div>
      `,
      calendly: `
        <div class="viz-calendly-orbit">
          <div class="viz-calendly-planet"></div>
        </div>
        <div class="viz-calendly-orbit" style="width: 140px; height: 140px; animation-duration: 5s;">
          <div class="viz-calendly-planet" style="width: 8px; height: 8px; box-shadow: 0 0 10px #3b82f6;"></div>
        </div>
      `,
      gamma: `
        <div class="viz-gamma-focus"></div>
        <div class="viz-gamma-lens"></div>
      `,
      airtable: `
        <div class="viz-airtable-stack">
          <div class="viz-airtable-block" style="animation-delay: 0s;"></div>
          <div class="viz-airtable-block" style="animation-delay: 0.5s;"></div>
          <div class="viz-airtable-block" style="animation-delay: 1s;"></div>
        </div>
      `,
      stripe: `
        <div class="viz-stripe-flow" style="left: 20%; animation-delay: 0s;"></div>
        <div class="viz-stripe-flow" style="left: 40%; animation-delay: 0.4s;"></div>
        <div class="viz-stripe-flow" style="left: 60%; animation-delay: 0.8s;"></div>
        <div class="viz-stripe-flow" style="left: 80%; animation-delay: 1.2s;"></div>
      `,
      notion: `
        <div class="viz-notion-line" style="top: 20%; animation-delay: 0s;"></div>
        <div class="viz-notion-line" style="top: 40%; animation-delay: 1s;"></div>
        <div class="viz-notion-line" style="top: 60%; animation-delay: 2s;"></div>
        <div class="viz-notion-line" style="top: 80%; animation-delay: 0.5s;"></div>
      `,
      tally: `
        <div class="viz-tally-ripple"></div>
        <div class="viz-tally-ripple" style="animation-delay: 1s;"></div>
        <div class="viz-tally-ripple" style="animation-delay: 2s; width: 200px; height: 200px;"></div>
      `,
      hubspot: `
        <div class="viz-hubspot-wrap">
          <div class="viz-hubspot-core"></div>
          <div class="viz-hubspot-ring">
            <div class="viz-hubspot-node"></div>
          </div>
          <div class="viz-hubspot-ring inner">
            <div class="viz-hubspot-node"></div>
          </div>
        </div>
      `,
      analytics: `
        <div class="viz-analytics-rain" style="left: 20%; animation-delay: 0s;"></div>
        <div class="viz-analytics-rain" style="left: 40%; animation-delay: 0.5s;"></div>
        <div class="viz-analytics-rain" style="left: 60%; animation-delay: 1s;"></div>
        <div class="viz-analytics-rain" style="left: 80%; animation-delay: 1.5s;"></div>
        <div class="viz-analytics-rain" style="left: 30%; animation-delay: 0.8s; opacity: 0.3;"></div>
        <div class="viz-analytics-rain" style="left: 70%; animation-delay: 2.2s; opacity: 0.3;"></div>
      `,
      automation: `
        <div class="viz-hub-nexus"></div>
        <div class="viz-geo-data-node" style="background: #a855f7; box-shadow: 0 0 15px #a855f7; animation-duration: 4s;"></div>
      `
    };

    const iconMap = {
      geo: 'zap', apollo: 'target', clay: 'wand-2', brevo: 'mail',
      calendly: 'calendar', gamma: 'presentation', airtable: 'workflow',
      stripe: 'credit-card', notion: 'clipboard', tally: 'message-square',
      hubspot: 'trending-up', analytics: 'bar-chart-2', automation: 'cpu'
    };

    return `
      <div class="visual-container">
        <div class="viz-holo-grid"></div>
        ${animations[tool.id] || ''}
        <i data-lucide="${iconMap[tool.id] || 'box'}" class="viz-icon-glow" style="color: ${tool.accentColor};"></i>
      </div>
      <div class="live-badge" ${tool.id === 'automation' ? 'style="background: #a855f7;"' : ''}>
        ${tool.id === 'automation' ? 'NEXUS CORE ONLINE' : (tool.statusBadge || 'SYSTEM LIVE')}
      </div>
    `;
  }

  function createCard(tool, index) {
    const stageNum = (index + 1).toString().padStart(2, '0');
    const isHub = tool.id === 'automation';
    
    return `
      <div class="product-card-horizontal reveal fade-up ${isHub ? 'featured-hub-card' : ''}" data-stage="${stageNum}">
        <div class="card-content-side">
          <span class="category-tag">
            <i data-lucide="${tool.iconName}" style="width: 12px; margin-right: 5px;"></i> ${tool.category}
          </span>
          <h2 class="product-name">${tool.name}</h2>
          <p class="product-hook">"${tool.hook}"</p>
          <ul class="benefit-list-horizontal">
            ${tool.benefits.map(b => `<li>${b}</li>`).join('')}
          </ul>
          <button class="btn-card-action" ${isHub ? 'style="background: #a855f7;"' : ''}>
            ${tool.ctaText} <i data-lucide="arrow-right"></i>
          </button>
        </div>
        <div class="card-visual-side">
          ${getVisualHtml(tool)}
        </div>
      </div>
    `;
  }

  function renderProducts() {
    const container = document.querySelector('.products-list');
    if (!container) return;

    const pObserverOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const pObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          pObserver.unobserve(entry.target);
        }
      });
    }, pObserverOptions);

    console.log('Beyond Pixel: Initializing Upgraded Product Ecosystem...');
    container.innerHTML = TOOLS.map((tool, index) => createCard(tool, index)).join('');
    
    const cards = container.querySelectorAll('.reveal');
    cards.forEach(card => pObserver.observe(card));

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderProducts);
  } else {
    renderProducts();
  }
})();
