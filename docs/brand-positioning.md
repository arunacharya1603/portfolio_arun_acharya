# Portfolio positioning

Approved direction: **Arun Acharya | Software & Product Engineer**.

Primary description: “I turn ideas into useful digital products, combining thoughtful design with practical engineering across websites, applications, and custom software.”

Image tagline: **Software Engineering · Product Development**.

`lib/site.ts` owns the shared title, role, descriptions, service identity, and social image reference. Homepage copy, profile metadata, author bios, Person/WebSite/ProfessionalService structured data, the web manifest, and `/llms.txt` use that identity. Specialist service pages retain their relevant technical topics, and historical project roles retain their documented contributions.

## Social preview

- Asset: `public/og-software-product-engineer-v3.jpg`
- Dimensions: 1200 × 630 pixels; JPEG.
- Method: built-in image generation edited the existing `public/og-image-light-v2.jpg`; Sharp resized and compressed the result for delivery.
- The versioned filename lets subsequent preview fetches request the updated image. Previously cached or sent previews are controlled by the sharing platform.

Final image-generation prompt:

> Use case: text-localization. Edit the supplied portfolio social-preview image, preserving its polished blue/lavender glass artwork, logo, white background, name, and overall composition. Output a landscape Open Graph card with the same 1200:630 aspect ratio. Preserve the exact large name 'Arun Acharya' and exact URL 'arunacharya1603.in'. Replace the small upper label 'INDEPENDENT DEVELOPER' with 'SOFTWARE & PRODUCT ENGINEER', clean widely spaced uppercase type, fitted on one line without overlapping the illustration. Replace the old lower tagline 'Frontend • UI/UX • Next.js' with the exact text 'Software Engineering · Product Development'. Arrange that tagline as two balanced readable lines beneath the name if necessary, with the middle dot at the end of the first line; leave comfortable space above the URL pill. Maintain high legibility at WhatsApp preview size, clean crisp typography, and strong contrast. Keep the existing illustration and logo unchanged. Do not add any technologies, new slogans, extra badges, watermarks or fabricated claims.
