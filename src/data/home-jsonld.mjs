/**
 * Structured data for the homepage, lifted verbatim from the pre-Astro index.html.
 *
 * The FAQPage block is the one that earns its keep — it is what Google lifts into rich
 * results, which is most of the ranking value this page has.
 *
 * inLanguage on the WebSite block is set per render, since the Gujarati edition is a real
 * document now rather than the same document with its text swapped.
 */
import { DATE_PUBLISHED, DATE_MODIFIED } from './site-dates.mjs';

export function homeJsonLd(lang) {
  const blocks = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://gsrtc.shivrajsinh.in/#website",
    "url": "https://gsrtc.shivrajsinh.in/",
    "name": "GSRTC Bus Tracker",
    "alternateName": [
      "GSRTC Tracker",
      "ST Tracker",
      "gsrtc.shivrajsinh.in"
    ],
    "inLanguage": lang === 'gu' ? 'gu-IN' : 'en-IN',
    "datePublished": DATE_PUBLISHED,
    "dateModified": DATE_MODIFIED,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".lede", ".strip-card", "#about", "#faq details summary", "#faq details p"]
    },
    "publisher": {
      "@type": "Organization",
      "name": "GSRTC Bus Tracker",
      "url": "https://gsrtc.shivrajsinh.in/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://gsrtc.shivrajsinh.in/icons/icon-512.png"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://tracker.shivrajsinh.in/?plate={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "GSRTC Bus Tracker",
    "alternateName": [
      "GSRTC Tracker",
      "ST Tracker",
      "Gujarat ST Bus Tracker",
      "GSRTC બસ ટ્રેકર"
    ],
    "url": "https://tracker.shivrajsinh.in",
    "installUrl": "https://tracker.shivrajsinh.in",
    "applicationCategory": "TravelApplication",
    "operatingSystem": "Android, iOS, Windows, macOS — any modern browser",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "datePublished": DATE_PUBLISHED,
    "dateModified": DATE_MODIFIED,
    "inLanguage": [
      "en-IN",
      "gu-IN"
    ],
    "description": "Track any Gujarat ST (GSRTC) bus live on a map by its number plate. See where it is now, when it reaches your stop, timetables between any two stations, and alerts before it arrives.",
    "featureList": [
      "Live bus location by number plate",
      "AIS-140 GPS telematics integration refreshed every 20 seconds",
      "Stop-by-stop route with real arrival times and delay alerts",
      "Timetable search between any two of 19,026 stations",
      "Nearby bus stations radar on a map with distances",
      "Arrival alerts before the bus reaches your stop",
      "Crowd reports on how full each bus is",
      "Works offline once installed as a PWA",
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
      "url": "https://shivrajsinh.in",
      "jobTitle": "Transit Systems & Web Developer",
      "sameAs": [
        "https://shivrajsinh.in",
        "https://github.com/shivrajsinh"
      ]
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
          "text": "No. GSRTC Bus Tracker is an independent public utility built by Shivrajsinh Zala for Gujarat commuters. According to official transit records, GSRTC operates over 8,554 buses serving 19,026 stations; GSRTC Bus Tracker visualizes these public telematics positions in a fast, mobile-friendly map without requiring an account or app store download."
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
          "text": "Yes. GSRTC Bus Tracker is built as a Progressive Web App (PWA) compatible with iOS Safari and Android. On iPhone, tap Share > Add to Home Screen to run full-screen with offline caching and native arrival notification support."
        }
      },
      {
        "@type": "Question",
        "name": "Is GSRTC Bus Tracker free to use?",
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
      },
      {
        "@type": "Question",
        "name": "How do I check GSRTC bus timetables between two cities?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Open GSRTC Bus Tracker and tap the Route / Timetable option. Select your origin and destination stations from 19,026 Gujarat ST stops to view scheduled departure times, operating bus classes (Express, Gurjarnagri, Sleeper), and real-time departure countdowns."
        }
      },
      {
        "@type": "Question",
        "name": "What is the official GSRTC 24x7 passenger helpline number?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The official 24x7 toll-free customer helpline for GSRTC is 1800 233 6666 (or alternate 1800 233 5555) for all passenger queries, complaint redressal, and bus stand inquiries across Gujarat."
        }
      },
      {
        "@type": "Question",
        "name": "Can I track my GSRTC bus using my ticket PNR number?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. On GSRTC Bus Tracker, switch to the Ticket PNR tab and enter your 10-digit ticket PNR to view your scheduled departure time, assigned vehicle plate, and live map coordinates once the trip begins."
        }
      }
    ]
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
        "name": "Open GSRTC Bus Tracker",
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
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "GSRTC Primary Services Navigation",
    "itemListElement": [
      {
        "@type": "SiteNavigationElement",
        "position": 1,
        "name": "GSRTC Bus Timetable",
        "description": "Timetable and schedule search between any two stations across Gujarat",
        "url": "https://gsrtc.shivrajsinh.in/gsrtc-bus-timetable"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 2,
        "name": "GSRTC Bus Tracking by PNR",
        "description": "Track reserved GSRTC bus live using online ticket booking PNR",
        "url": "https://gsrtc.shivrajsinh.in/gsrtc-online-booking-pnr-tracking"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 3,
        "name": "GSRTC Bus Stand Enquiry Numbers",
        "description": "Directory of official depot enquiry phone numbers and central helpline",
        "url": "https://gsrtc.shivrajsinh.in/gsrtc-bus-stand-helpline-numbers"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "GSRTC E-Pass & Bus Pass Online",
        "description": "ESCPS online application portal and student pass concession status",
        "url": "https://gsrtc.shivrajsinh.in/gsrtc-bus-pass-online"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 5,
        "name": "GSRTC Electric Bus Routes",
        "description": "Zero-emission electric bus routes and departure schedules",
        "url": "https://gsrtc.shivrajsinh.in/gsrtc-electric-bus-timetable"
      }
    ]
  }
];
  return blocks.map((b) =>
    b['@type'] === 'WebSite' ? { ...b, inLanguage: lang === 'gu' ? 'gu-IN' : 'en-IN' } : b);
}
