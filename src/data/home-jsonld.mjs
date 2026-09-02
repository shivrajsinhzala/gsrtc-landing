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
          "text": "No. ST Tracker is an independent tool built for Gujarat ST commuters. It shows the same live bus positions the operator publishes, in a form that is quicker to read at a bus stop. It is not affiliated with GSRTC."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate is the live location?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Positions come from the GPS unit on the bus itself, refreshed every few seconds while the bus is on a trip. Arrival estimates are worked out from that position against the timetable, and the app stays silent rather than showing a number it cannot support."
        }
      },
      {
        "@type": "Question",
        "name": "Why can I not find my bus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The operator only reports a position while a bus is actually running a trip. A bus parked at the depot, or one that finished its run, will not appear until it sets off again."
        }
      },
      {
        "@type": "Question",
        "name": "Does it work on iPhone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Open it in Safari, tap Share, then Add to Home Screen. It then runs full screen like an installed app. Arrival notifications on iPhone need it installed to the home screen first."
        }
      },
      {
        "@type": "Question",
        "name": "Is it free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, and there are no adverts, no subscription and no account. It is run as a public utility for Gujarat commuters."
        }
      },
      {
        "@type": "Question",
        "name": "Is it available in Gujarati?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The whole app and this page are available in Gujarati, including station and route names where the operator provides them."
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
