/**
 * Structured data for the homepage, lifted verbatim from the pre-Astro index.html.
 *
 * The FAQPage block is the one that earns its keep — it is what Google lifts into rich
 * results, which is most of the ranking value this page has.
 *
 * inLanguage on the WebSite block is set per render, since the Gujarati edition is a real
 * document now rather than the same document with its text swapped.
 */
export function homeJsonLd(lang) {
  const blocks = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ST Tracker",
    "alternateName": [
      "GSRTC Live Tracker",
      "Gujarat ST Bus Tracker",
      "GSRTC બસ ટ્રેકર"
    ],
    "url": "https://tracker.shivrajsinh.in",
    "installUrl": "https://tracker.shivrajsinh.in",
    "applicationCategory": "TravelApplication",
    "operatingSystem": "Android, iOS, Windows, macOS — any modern browser",
    "inLanguage": [
      "en-IN",
      "gu-IN"
    ],
    "description": "Track any Gujarat ST (GSRTC) bus live on a map by its number plate. See where it is now, when it reaches your stop, timetables between any two stations, and alerts before it arrives.",
    "featureList": [
      "Live bus location by number plate",
      "Stop-by-stop route with real arrival times",
      "Timetable search between any two of 19,026 stations",
      "Nearby bus stations on a map",
      "Arrival alerts before the bus reaches your stop",
      "Crowd reports on how full each bus is",
      "Works offline once installed",
      "English and Gujarati"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "isAccessibleForFree": true,
    "author": {
      "@type": "Person",
      "name": "Shivrajsinh Zala",
      "url": "https://shivrajsinh.in"
    },
    "areaServed": {
      "@type": "State",
      "name": "Gujarat",
      "containedInPlace": {
        "@type": "Country",
        "name": "India"
      }
    },
    "about": {
      "@type": "Organization",
      "name": "Gujarat State Road Transport Corporation (GSRTC)",
      "url": "https://gsrtc.in"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is this the official GSRTC app?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. ST Tracker is an independent public utility built by Shivrajsinh Zala for Gujarat commuters. According to official transit records, GSRTC operates over 8,554 buses serving 19,026 stations; ST Tracker visualizes these public telematics positions in a fast, mobile-friendly map without requiring an account or app store download."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate is the live location?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Highly accurate. Real-time positions are transmitted by on-board GPS telematics units fitted to each GSRTC bus, refreshed roughly every 20 seconds during active trips. Roadside positional accuracy is typically within 10 to 25 metres. Estimated arrival times (ETA) are computed dynamically against scheduled route timetables."
        }
      },
      {
        "@type": "Question",
        "name": "Why can I not find my bus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A bus only broadcasts telemetry when actively running an assigned schedule. According to transit dispatch rules, buses parked at depots, between scheduled shifts, or that have completed their runs will not appear until the next trip commences. Verify your registration plate format (e.g. GJ-18-ZT-1028) or search by departure station."
        }
      },
      {
        "@type": "Question",
        "name": "Does it work on iPhone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. ST Tracker is built as a Progressive Web App (PWA) compatible with iOS Safari and Android. On iPhone, tap Share > Add to Home Screen to run full-screen with offline caching and native arrival notification support."
        }
      },
      {
        "@type": "Question",
        "name": "Is ST Tracker free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, 100% free. There are zero subscription charges, zero platform fees, and no account or login required. It is maintained as a public service utility for Gujarat commuters."
        }
      },
      {
        "@type": "Question",
        "name": "Is it available in Gujarati?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Both the web utility and landing portal are fully localized in Gujarati (ગુજરાતી) at /gu, covering timetables, route descriptions, and station names for all 19,026 supported locations."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://gsrtc.shivrajsinh.in",
    "name": "ST Tracker",
    "inLanguage": "en-IN",
    "publisher": {
      "@type": "Organization",
      "name": "ST Tracker",
      "url": "https://gsrtc.shivrajsinh.in"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to track a GSRTC bus live on a map",
    "description": "Track any Gujarat ST (GSRTC) bus live on a map by its number plate, free and without an account.",
    "totalTime": "PT1M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": "0"
    },
    "step": [
      {
        "@type": "HowToStep",
        "name": "Open ST Tracker",
        "text": "Go to tracker.shivrajsinh.in in any browser — no app install or account needed.",
        "url": "https://tracker.shivrajsinh.in"
      },
      {
        "@type": "HowToStep",
        "name": "Enter the bus number plate",
        "text": "Type the plate written on the bus, e.g. GJ-18-ZT-1028. If you do not know the plate, search by route between two stations instead."
      },
      {
        "@type": "HowToStep",
        "name": "View its live GPS position",
        "text": "The bus appears on the map with its current speed, the stop it just passed, the stop it is heading to, and how far it is from you."
      }
    ]
  }
];
  return blocks.map((b) =>
    b['@type'] === 'WebSite' ? { ...b, inLanguage: lang === 'gu' ? 'gu-IN' : 'en-IN' } : b);
}
