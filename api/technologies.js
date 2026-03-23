const TECHNOLOGIES = [
  // ─── CRM ───────────────────────────────────────────────────────────────────
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'crm',
    patterns: {
      scripts: ['lightning.force.com', 'salesforce.com/lightning', 'force.com/'],
      meta: [],
      headers: ['x-sfdc-', 'x-salesforce'],
      cookies: ['__cq', 'sid', 'sfdc-stream'],
      html: ['Visualforce', 'sfdcPage', 'SFDCSessionVars', 'pardot']
    }
  },
  {
    id: 'hubspot-crm',
    name: 'HubSpot CRM',
    category: 'crm',
    patterns: {
      scripts: ['js.hs-scripts.com', 'js.hsforms.net'],
      meta: [{ name: 'generator', content: 'HubSpot' }],
      headers: ['x-hs-hub-id'],
      cookies: ['__hstc', 'hubspotutk', '__hssc', '__hssrc'],
      html: ['hs-script-loader', 'hbspt.forms.create', 'HubSpot']
    }
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    category: 'crm',
    patterns: {
      scripts: ['pipedrive.com', 'leadbooster'],
      meta: [],
      headers: [],
      cookies: ['pd-'],
      html: ['LeadBooster', 'pipedrive', 'pd-chat']
    }
  },
  {
    id: 'zoho-crm',
    name: 'Zoho CRM',
    category: 'crm',
    patterns: {
      scripts: ['zoho.com', 'salesiq.zoho.com', 'static.zohocdn.com'],
      meta: [],
      headers: [],
      cookies: ['zalert_', 'zld_'],
      html: ['SalesIQ', '$zoho', 'zoho.salesiq']
    }
  },

  // ─── MARKETING AUTOMATION ──────────────────────────────────────────────────
  {
    id: 'hubspot-marketing',
    name: 'HubSpot Marketing',
    category: 'marketing_automation',
    patterns: {
      scripts: ['js.hs-scripts.com', 'js.hsforms.net', 'js.hs-banner.com', 'js.hs-analytics.net'],
      meta: [{ name: 'generator', content: 'HubSpot' }],
      headers: ['x-hs-hub-id'],
      cookies: ['__hstc', 'hubspotutk', '__hssc'],
      html: ['hs-script-loader', 'hbspt.forms.create', 'HubSpot-Form']
    }
  },
  {
    id: 'marketo',
    name: 'Marketo',
    category: 'marketing_automation',
    patterns: {
      scripts: ['munchkin.js', 'mkto', 'app-ab.marketo.com', 'marketo.com'],
      meta: [],
      headers: [],
      cookies: ['_mkto_trk'],
      html: ['Munchkin', 'MktoForms2', 'marketo']
    }
  },
  {
    id: 'pardot',
    name: 'Pardot',
    category: 'marketing_automation',
    patterns: {
      scripts: ['pardot.com', 'pi.pardot.com'],
      meta: [],
      headers: [],
      cookies: ['visitor_id', 'lpv'],
      html: ['piAId', 'piCId', 'pardot']
    }
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    category: 'marketing_automation',
    patterns: {
      scripts: ['chimpstatic.com', 'mc-validate.js', 'list-manage.com'],
      meta: [],
      headers: [],
      cookies: ['_ga_mailchimp'],
      html: ['mc-embedded-subscribe', 'mailchimp', 'mc4wp']
    }
  },
  {
    id: 'activecampaign',
    name: 'ActiveCampaign',
    category: 'marketing_automation',
    patterns: {
      scripts: ['activecampaign.com', 'trackcmp.net'],
      meta: [],
      headers: [],
      cookies: ['_actc'],
      html: ['vgo(', 'actchat', 'ActiveCampaign']
    }
  },
  {
    id: 'klaviyo',
    name: 'Klaviyo',
    category: 'marketing_automation',
    patterns: {
      scripts: ['static.klaviyo.com', 'klaviyo.com'],
      meta: [],
      headers: [],
      cookies: ['__kla_id'],
      html: ['klaviyo', '_klOnsite', 'KlaviyoSubscribe']
    }
  },
  {
    id: 'brevo',
    name: 'Brevo (Sendinblue)',
    category: 'marketing_automation',
    patterns: {
      scripts: ['sibautomation.com', 'sendinblue.com', 'brevo.com'],
      meta: [],
      headers: [],
      cookies: ['sib-'],
      html: ['sib-conversations', 'sendinblue', 'brevo']
    }
  },

  // ─── ANALYTICS ─────────────────────────────────────────────────────────────
  {
    id: 'google-analytics-4',
    name: 'Google Analytics 4',
    category: 'analytics',
    patterns: {
      scripts: ['googletagmanager.com/gtag', 'gtag/js', 'analytics.js'],
      meta: [],
      headers: [],
      cookies: ['_ga', '_ga_'],
      html: ["gtag('config', 'G-", "G-", 'googletagmanager']
    }
  },
  {
    id: 'google-universal-analytics',
    name: 'Universal Analytics (Legacy)',
    category: 'analytics',
    patterns: {
      scripts: ['google-analytics.com/analytics.js', 'google-analytics.com/ga.js'],
      meta: [],
      headers: [],
      cookies: ['__utma', '__utmb', '__utmz'],
      html: ["ga('create', 'UA-", "_gaq.push", 'UA-']
    }
  },
  {
    id: 'google-tag-manager',
    name: 'Google Tag Manager',
    category: 'analytics',
    patterns: {
      scripts: ['googletagmanager.com/gtm.js'],
      meta: [],
      headers: [],
      cookies: [],
      html: ["GTM-", 'googletagmanager.com/ns.html', 'dataLayer']
    }
  },
  {
    id: 'mixpanel',
    name: 'Mixpanel',
    category: 'analytics',
    patterns: {
      scripts: ['cdn.mxpnl.com', 'cdn.mixpanel.com'],
      meta: [],
      headers: [],
      cookies: ['mp_'],
      html: ['mixpanel.init', 'mixpanel.track', 'mixpanel']
    }
  },
  {
    id: 'amplitude',
    name: 'Amplitude',
    category: 'analytics',
    patterns: {
      scripts: ['cdn.amplitude.com', 'amplitude.com/libs'],
      meta: [],
      headers: [],
      cookies: ['amplitude_id'],
      html: ['amplitude.getInstance', 'amplitude.init']
    }
  },
  {
    id: 'heap',
    name: 'Heap',
    category: 'analytics',
    patterns: {
      scripts: ['heap-api.com', 'heapanalytics.com'],
      meta: [],
      headers: [],
      cookies: ['_hp2'],
      html: ['heap.load', 'window.heap']
    }
  },
  {
    id: 'hotjar',
    name: 'Hotjar',
    category: 'analytics',
    patterns: {
      scripts: ['static.hotjar.com', 'vars.hotjar.com'],
      meta: [],
      headers: [],
      cookies: ['_hjid', '_hjSession', '_hjTLDTest'],
      html: ['hjSiteSettings', 'hotjar', '_hjSettings']
    }
  },
  {
    id: 'fullstory',
    name: 'FullStory',
    category: 'analytics',
    patterns: {
      scripts: ['fullstory.com/s/fs.js', 'fullstory.com'],
      meta: [],
      headers: [],
      cookies: ['_fs_uid'],
      html: ['FullStory', 'window._fs_', 'fs.com/s/fs.js']
    }
  },
  {
    id: 'clarity',
    name: 'Microsoft Clarity',
    category: 'analytics',
    patterns: {
      scripts: ['clarity.ms'],
      meta: [],
      headers: [],
      cookies: ['_clsk', '_clck', 'CLID'],
      html: ['clarity(', 'clarity.ms']
    }
  },
  {
    id: 'plausible',
    name: 'Plausible Analytics',
    category: 'analytics',
    patterns: {
      scripts: ['plausible.io/js'],
      meta: [],
      headers: [],
      cookies: [],
      html: ['plausible', 'data-domain']
    }
  },
  {
    id: 'posthog',
    name: 'PostHog',
    category: 'analytics',
    patterns: {
      scripts: ['posthog.com', 'us.i.posthog.com'],
      meta: [],
      headers: [],
      cookies: ['ph_', 'posthog'],
      html: ['posthog.init', 'posthog.capture']
    }
  },

  // ─── ADVERTISING ───────────────────────────────────────────────────────────
  {
    id: 'google-ads',
    name: 'Google Ads',
    category: 'advertising',
    patterns: {
      scripts: ['googleads.g.doubleclick.net', 'googlesyndication.com', 'pagead2.googlesyndication.com'],
      meta: [],
      headers: [],
      cookies: ['__gads', '__gpi'],
      html: ['AW-', 'gtag_report_conversion', 'google_conversion']
    }
  },
  {
    id: 'meta-pixel',
    name: 'Meta Pixel',
    category: 'advertising',
    patterns: {
      scripts: ['connect.facebook.net/en_US/fbevents.js', 'connect.facebook.net'],
      meta: [],
      headers: [],
      cookies: ['_fbp', '_fbc'],
      html: ['fbq(', 'fbevents', 'FacebookPixel']
    }
  },
  {
    id: 'linkedin-insight',
    name: 'LinkedIn Insight Tag',
    category: 'advertising',
    patterns: {
      scripts: ['snap.licdn.com', 'platform.linkedin.com'],
      meta: [],
      headers: [],
      cookies: ['_li_', 'li_sugr', 'li_gc'],
      html: ['_linkedin_partner_id', 'linkedin insight']
    }
  },
  {
    id: 'tiktok-pixel',
    name: 'TikTok Pixel',
    category: 'advertising',
    patterns: {
      scripts: ['analytics.tiktok.com'],
      meta: [],
      headers: [],
      cookies: ['_ttp'],
      html: ['ttq.load', 'TiktokAnalyticsObject', 'tiktok pixel']
    }
  },
  {
    id: 'twitter-pixel',
    name: 'X (Twitter) Pixel',
    category: 'advertising',
    patterns: {
      scripts: ['static.ads-twitter.com'],
      meta: [],
      headers: [],
      cookies: ['_twitter_sess'],
      html: ['twq(', 'twitter-remarketing', 'twitter pixel']
    }
  },
  {
    id: 'pinterest-tag',
    name: 'Pinterest Tag',
    category: 'advertising',
    patterns: {
      scripts: ['s.pinimg.com'],
      meta: [],
      headers: [],
      cookies: ['_pinterest_', '_pin_unauth'],
      html: ['pintrk(', 'pinterest tag', 'pintrk']
    }
  },

  // ─── CHAT & SUPPORT ────────────────────────────────────────────────────────
  {
    id: 'intercom',
    name: 'Intercom',
    category: 'chat_support',
    patterns: {
      scripts: ['widget.intercom.io', 'js.intercomcdn.com'],
      meta: [],
      headers: [],
      cookies: ['intercom-'],
      html: ['intercomSettings', 'Intercom(', 'intercom']
    }
  },
  {
    id: 'drift',
    name: 'Drift',
    category: 'chat_support',
    patterns: {
      scripts: ['js.driftt.com', 'drift.com'],
      meta: [],
      headers: [],
      cookies: ['drift_'],
      html: ['drift.load', 'drift.identify', 'driftt']
    }
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    category: 'chat_support',
    patterns: {
      scripts: ['static.zdassets.com', 'ekr.zdassets.com'],
      meta: [],
      headers: ['x-zendesk'],
      cookies: ['_zendesk_'],
      html: ['ze-snippet', 'zE(', 'zopim', 'zendesk']
    }
  },
  {
    id: 'freshchat',
    name: 'Freshdesk / Freshchat',
    category: 'chat_support',
    patterns: {
      scripts: ['wchat.freshchat.com', 'snippets.freshchat.com'],
      meta: [],
      headers: [],
      cookies: ['fc_'],
      html: ['Freshchat', 'fcWidget', 'freshchat']
    }
  },
  {
    id: 'crisp',
    name: 'Crisp',
    category: 'chat_support',
    patterns: {
      scripts: ['client.crisp.chat'],
      meta: [],
      headers: [],
      cookies: ['crisp-client'],
      html: ['CRISP_WEBSITE_ID', '$crisp', 'crisp.chat']
    }
  },
  {
    id: 'livechat',
    name: 'LiveChat',
    category: 'chat_support',
    patterns: {
      scripts: ['cdn.livechatinc.com'],
      meta: [],
      headers: [],
      cookies: ['__lc'],
      html: ['LiveChat', '__lc.license', 'livechatinc']
    }
  },
  {
    id: 'tidio',
    name: 'Tidio',
    category: 'chat_support',
    patterns: {
      scripts: ['code.tidio.co'],
      meta: [],
      headers: [],
      cookies: ['tidio_state'],
      html: ['tidioChatApi', 'tidio_state', 'tidio']
    }
  },

  // ─── CDP ───────────────────────────────────────────────────────────────────
  {
    id: 'segment',
    name: 'Segment',
    category: 'cdp',
    patterns: {
      scripts: ['cdn.segment.com', 'cdn.segment.io'],
      meta: [],
      headers: [],
      cookies: ['ajs_user_id', 'ajs_anonymous_id'],
      html: ['analytics.js', 'analytics.load', 'analytics.page']
    }
  },
  {
    id: 'rudderstack',
    name: 'RudderStack',
    category: 'cdp',
    patterns: {
      scripts: ['cdn.rudderlabs.com', 'rudderstack.com'],
      meta: [],
      headers: [],
      cookies: ['rl_user_id', 'rl_anonymous_id'],
      html: ['rudderanalytics', 'RudderStack']
    }
  },
  {
    id: 'mparticle',
    name: 'mParticle',
    category: 'cdp',
    patterns: {
      scripts: ['jssdkcdns.mparticle.com'],
      meta: [],
      headers: [],
      cookies: ['mprtcl-'],
      html: ['mParticle.init', 'window.mParticle']
    }
  },

  // ─── CMS ───────────────────────────────────────────────────────────────────
  {
    id: 'wordpress',
    name: 'WordPress',
    category: 'cms',
    patterns: {
      scripts: ['wp-content', 'wp-includes', 'wp-embed.min.js'],
      meta: [{ name: 'generator', content: 'WordPress' }],
      headers: ['x-powered-by: WordPress'],
      cookies: ['wordpress_', 'wp-settings-'],
      html: ['wp-content', 'wp-includes', 'wp-json', '/wp/v2']
    }
  },
  {
    id: 'webflow',
    name: 'Webflow',
    category: 'cms',
    patterns: {
      scripts: ['assets.website-files.com', 'uploads-ssl.webflow.com', 'webflow.com'],
      meta: [{ name: 'generator', content: 'Webflow' }],
      headers: ['x-powered-by: Webflow'],
      cookies: [],
      html: ['Webflow.push', 'data-wf-', 'webflow']
    }
  },
  {
    id: 'shopify',
    name: 'Shopify',
    category: 'cms',
    patterns: {
      scripts: ['cdn.shopify.com', 'shopifycloud.com'],
      meta: [],
      headers: ['x-shopid', 'x-shardid'],
      cookies: ['_shopify_'],
      html: ['Shopify.', 'shopify', 'cdn.shopify.com']
    }
  },
  {
    id: 'squarespace',
    name: 'Squarespace',
    category: 'cms',
    patterns: {
      scripts: ['static1.squarespace.com', 'squarespace.com'],
      meta: [{ name: 'generator', content: 'Squarespace' }],
      headers: [],
      cookies: ['SS_MID', 'SqSpVisit'],
      html: ['squarespace', 'Squarespace']
    }
  },
  {
    id: 'wix',
    name: 'Wix',
    category: 'cms',
    patterns: {
      scripts: ['static.wixstatic.com', 'wix-code-sdk'],
      meta: [{ name: 'generator', content: 'Wix' }],
      headers: ['x-wix-'],
      cookies: ['_wix_'],
      html: ['wix-code-sdk', 'wixsite.com', 'WixStores']
    }
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'cms',
    patterns: {
      scripts: ['_next/static', '__next'],
      meta: [],
      headers: ['x-powered-by: Next.js'],
      cookies: ['__next'],
      html: ['__NEXT_DATA__', '_next/static', '__nextjs']
    }
  },
  {
    id: 'contentful',
    name: 'Contentful',
    category: 'cms',
    patterns: {
      scripts: ['contentful.com'],
      meta: [],
      headers: [],
      cookies: [],
      html: ['contentful', 'ctfl-', 'createClient']
    }
  },

  // ─── SALES ENGAGEMENT / ABM ────────────────────────────────────────────────
  {
    id: 'apollo',
    name: 'Apollo.io',
    category: 'sales_engagement',
    patterns: {
      scripts: ['apollocdn.com', 'apollo.io'],
      meta: [],
      headers: [],
      cookies: [],
      html: ['apollocdn', 'apollo.io', 'Apollo']
    }
  },
  {
    id: 'zoominfo',
    name: 'ZoomInfo',
    category: 'sales_engagement',
    patterns: {
      scripts: ['ws.zoominfo.com'],
      meta: [],
      headers: [],
      cookies: [],
      html: ['ws.zoominfo.com', 'ZoomInfo', 'zoominfo']
    }
  },
  {
    id: 'outreach',
    name: 'Outreach',
    category: 'sales_engagement',
    patterns: {
      scripts: ['outreach.io'],
      meta: [],
      headers: [],
      cookies: [],
      html: ['outreach.io', 'Outreach']
    }
  },
  {
    id: '6sense',
    name: '6sense',
    category: 'abm',
    patterns: {
      scripts: ['6sc.co', '6sense.com'],
      meta: [],
      headers: [],
      cookies: [],
      html: ['6sc.co', '6sense', '_6sense']
    }
  },
  {
    id: 'demandbase',
    name: 'Demandbase',
    category: 'abm',
    patterns: {
      scripts: ['tag.demandbase.com'],
      meta: [],
      headers: [],
      cookies: ['_demandbase_'],
      html: ['demandbase', 'tag.demandbase.com']
    }
  },
  {
    id: 'clearbit',
    name: 'Clearbit',
    category: 'data_enrichment',
    patterns: {
      scripts: ['tag.clearbitscripts.com', 'x.clearbitjs.com'],
      meta: [],
      headers: [],
      cookies: [],
      html: ['clearbit', 'Clearbit']
    }
  },

  // ─── PAYMENTS ──────────────────────────────────────────────────────────────
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'payments',
    patterns: {
      scripts: ['js.stripe.com'],
      meta: [],
      headers: [],
      cookies: ['__stripe_', '__stripe_mid'],
      html: ['Stripe(', 'stripe.js', 'js.stripe.com']
    }
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'payments',
    patterns: {
      scripts: ['paypal.com/sdk', 'paypalobjects.com'],
      meta: [],
      headers: [],
      cookies: ['cookie_check', 'PYPF'],
      html: ['paypal.Buttons', 'paypal.com/sdk', 'PayPal']
    }
  },

  // ─── MONITORING / INFRA ───────────────────────────────────────────────────
  {
    id: 'sentry',
    name: 'Sentry',
    category: 'monitoring',
    patterns: {
      scripts: ['browser.sentry-cdn.com', 'sentry.io'],
      meta: [],
      headers: [],
      cookies: [],
      html: ['Sentry.init', 'sentry.io', 'Sentry']
    }
  },
  {
    id: 'launchdarkly',
    name: 'LaunchDarkly',
    category: 'feature_flags',
    patterns: {
      scripts: ['launchdarkly.com'],
      meta: [],
      headers: [],
      cookies: [],
      html: ['LaunchDarkly', 'LDClient', 'launchdarkly']
    }
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    category: 'infrastructure',
    patterns: {
      scripts: ['cloudflareinsights.com', 'challenges.cloudflare.com'],
      meta: [],
      headers: ['cf-ray', 'cf-cache-status', 'server: cloudflare'],
      cookies: ['__cf_bm', '__cflb', 'cf_clearance'],
      html: ['cloudflare', 'cf-ray']
    }
  }
];

module.exports = { TECHNOLOGIES };
