import type { SeoBlogPost } from "@/data/seo-content";

export const projectGuides: SeoBlogPost[] = [
  {
    slug: "physiotherapy-website-booking-brief",
    title: "Physiotherapy Website Design: A Brief for Better Booking Enquiries",
    description: "Plan service pages, practitioner proof, coverage and booking requests for a physiotherapy website, using Pivotal Physiocare as a concrete project example.",
    datePublished: "2026-10-05", dateModified: "2026-10-05", readingTime: "4 min read",
    category: "Healthcare Websites", keywords: ["physiotherapy website design", "physiotherapy booking website", "healthcare website developer"],
    audience: "Practice owners commissioning a home-visit or clinic website.",
    summary: "Start with the decision a patient or family needs to make: do you provide the right service, cover their location, and offer a clear next step? A service website with a reliable enquiry flow can be the right first build. Real-time scheduling and practitioner allocation need a separate application scope.",
    sections: [
      { heading: "Define the pages around a patient journey", body: [
        "Pivotal Physiocare’s case study documents a home physiotherapy website serving Greater Noida and Noida. My work connected care information, practitioner profiles, treatment imagery, recovery stories and home-visit actions. That is the project context for this brief; it is not evidence of a measured increase in leads.",
        "Write the journey before choosing a template: a visitor finds a service, checks the care team and service area, understands the next step, then requests a visit. Scope a homepage, substantive service pages, practitioner information, coverage details and a contact page. Every service page should make its booking path easy to find.",
      ] },
      { heading: "Separate appointment requests from confirmed bookings", body: [
        "A request form can collect a name, contact method, locality and preferred time. Its confirmation should explain that the practice will follow up; it should not promise an appointment that nobody has accepted. Avoid asking for detailed medical histories in a general enquiry form.",
        "Live slot selection adds availability, rescheduling, notifications and handling simultaneous bookings to the scope. Practitioner assignment, payments and patient accounts turn a public website into a product. NursePhysioWala is an example in my portfolio of broader patient, practitioner and administrator workflows.",
      ] },
      { heading: "Prepare the proof and coverage information", body: [
        "Supply approved practitioner biographies, services actually offered, accurate contact details, service boundaries and images or testimonials you have permission to publish. Have the practice review clinical descriptions and claims. A developer should not invent credentials, treatment outcomes or patient stories.",
        "Create a location page only when it answers specific questions about real coverage: neighborhoods served, home visits versus a clinic address, availability or how requests are handled there. Replacing a city name across otherwise identical pages gives visitors little help.",
      ] },
      { heading: "Put acceptance checks in the brief", body: [
        "Ask for a demonstration of the full mobile journey: service discovery, practitioner details, an accessible form, submission failure and a clear success message. Confirm who receives each request and how they follow up. Check phone links and an alternative contact method when the form fails.",
        "At handover, identify who updates care-team details and service areas, and who owns the domain, hosting and form destination. Measure enquiries that become consultations separately from page views. Use the cost planner to compare a business website with a web-app scope before requesting a proposal.",
      ] },
    ],
    faqs: [
      { question: "Does a physiotherapy website need patient accounts?", answer: "Only if the workflow requires them. A public website can start with appointment requests; patient records, scheduling and practitioner dashboards need separate scoping." },
      { question: "Can you guarantee more bookings?", answer: "No. A website can clarify services and contact paths. Demand, reputation, traffic quality, availability and follow-up also affect bookings." },
    ],
    relatedServiceSlugs: ["small-business-websites", "web-apps-saas"], relatedWorkSlugs: ["pivotal-physiocare", "nursephysiowala"],
  },
  {
    slug: "saas-dashboard-development-scope",
    title: "SaaS Dashboard Development: What to Scope Before Hiring a React Developer",
    description: "A practical dashboard brief covering roles, permissions, workflow states, API readiness and acceptance checks, informed by ChainReach.ai frontend work.",
    datePublished: "2026-10-05", dateModified: "2026-10-05", readingTime: "4 min read",
    category: "SaaS Planning", keywords: ["SaaS dashboard development", "React dashboard developer", "dashboard development scope"],
    audience: "Founders and product teams commissioning a dashboard or MVP frontend.",
    summary: "Scope a dashboard around the work each user must complete. Name roles, permissions, API dependencies and failure states before counting screens. A five-screen product with approvals and incomplete APIs can involve more work than a larger read-only interface.",
    sections: [
      { heading: "Start with a role and action inventory", body: [
        "ChainReach.ai’s case study documents my frontend work across brand, creator and administrator flows, including campaign and negotiation experiences. Those roles illustrate why one dashboard mockup is not enough to describe a product.",
        "For each role, write down what it can view, create, edit and approve. A brand user might create a campaign, a creator respond to an opportunity, and an administrator review activity. Mark these as proposed requirements until the team confirms them. Separate first-release actions from later work.",
      ] },
      { heading: "Define states for one complete workflow", body: [
        "Choose one valuable journey such as creating a campaign and receiving a response. Specify its initial, draft, submitted and completed states, plus who can move between them. Include an empty screen, loading, permission denied, failed save and successful save acknowledgement.",
        "Ask what happens when a record disappears while it is open, a session expires, or an API request times out. These decisions affect interface and backend work. Hiding a button in the frontend is not a substitute for enforcing permissions on the server.",
      ] },
      { heading: "Identify dependencies before agreeing a price", body: [
        "Provide the design file, sample responses for important APIs, access to a safe test environment and a list of integrations. Identify whether the backend exists, who maintains it and what still needs to be built. Use sample data without real customer information in the development brief.",
        "Agree which screens need mobile layouts, filtering, pagination, uploads, notifications or live updates. Say who supplies copy and approves milestones. Quote frontend implementation separately from a full-stack build when the API and data layer are outside the developer’s scope.",
      ] },
      { heading: "Approve workflows with observable checks", body: [
        "A useful acceptance check names a role, action and expected result: an authorized user submits a valid draft, sees confirmation, and finds the saved item after refreshing. A rejected request should show a clear error and retain unsaved input. Test those paths with more than one role.",
        "Review the first complete workflow before commissioning every secondary screen. Include deployment, handover and ongoing maintenance responsibilities in the proposal. The planner compares frontend and web-app packages; the final estimate depends on confirmed workflows and dependencies, not just screen count.",
      ] },
    ],
    faqs: [
      { question: "Can frontend work start before APIs are ready?", answer: "Yes, with agreed sample responses and explicit assumptions. Include integration and verification against the real API before launch." },
      { question: "Is a dashboard part of a business website package?", answer: "Authenticated workflows, permissions and editable data normally require a separate frontend or web-app scope." },
    ],
    relatedServiceSlugs: ["frontend-development", "web-apps-saas", "product-mvp-development"], relatedWorkSlugs: ["chainreach-ai", "nursephysiowala"],
  },
  {
    slug: "react-nextjs-performance-audit-brief",
    title: "React and Next.js Performance Audit: What to Ask for Before a Rebuild",
    description: "A buyer’s checklist for measuring a slow frontend, prioritizing improvements and reviewing evidence, with context from the Sound Of Meme project.",
    datePublished: "2026-10-05", dateModified: "2026-10-05", readingTime: "4 min read",
    category: "Frontend Performance", keywords: ["Next.js performance audit", "React performance optimization", "slow website audit"],
    audience: "Founders with an existing React or Next.js website that feels slow.",
    summary: "Commission a baseline and prioritized fix list before a full rebuild. Ask which routes and actions are slow, what evidence supports the diagnosis, and how the same experience will be measured after changes. Bundle size, a lab score and real user performance describe different things.",
    sections: [
      { heading: "Describe where users experience the delay", body: [
        "Provide representative URLs and actions: opening a service page, filtering a dashboard, starting playback or submitting a form. Record device and network conditions where the issue appears. A heavy landing image and a slow dashboard interaction need different investigations.",
        "Distinguish lab tests from field data. Google’s Core Web Vitals describe loading, interaction responsiveness and layout stability through LCP, INP and CLS. A repeatable lab test helps diagnose problems; real-user measurements describe actual visitors. If field data is unavailable, label the gap instead of claiming a pass.",
      ] },
      { heading: "Use project results as context", body: [
        "My Sound Of Meme case study reports a production bundle reduction from approximately 8 MB to 2 MB using lazy loading, route-level code splitting, shared components and rendering optimization. This was React product work, not a published Next.js benchmark or a promise that another site will achieve the same reduction.",
        "Agree exactly what is measured: build output, route JavaScript, compressed transfer size or a user-facing metric. Compare like for like. A smaller bundle can help, but does not by itself establish faster server responses, improved conversion or higher rankings.",
      ] },
      { heading: "Request a fix list with tradeoffs", body: [
        "Each proposed change should address an observed issue. Possible findings include oversized images, JavaScript shipped to routes that do not need it, expensive rendering, third-party scripts or slow data fetching. Separate quick changes from architecture work and explain what might regress.",
        "Lazy loading helps when code is not needed immediately, but deferring a critical interaction can move the wait to the moment of use. Agree which features can load later and check their loading and error states. A rewrite should follow evidence that the current structure prevents the necessary improvement.",
      ] },
      { heading: "Agree the before-and-after evidence", body: [
        "Use the same routes, conditions and actions in the final comparison. Keep the original measurements and record what changed. Check that forms, navigation and key application workflows still function after optimization.",
        "Provide the repository access plan, hosting setup and business journey you care about. The performance package in the planner is a starting point; final scope follows the findings. Neither a perfect lab score nor a specific search position should be an assumption in a performance proposal.",
      ] },
    ],
    faqs: [
      { question: "Does a faster website automatically rank first?", answer: "No. Performance improves the experience, but visibility also depends on relevance, useful content and other factors. Agree on work and evidence, not a ranking position." },
      { question: "Do I need to rebuild React in Next.js?", answer: "Not automatically. Measure the routes and workflows that matter. The recommendation should explain why targeted fixes suffice or why an architectural change is needed." },
    ],
    relatedServiceSlugs: ["performance-optimization", "frontend-revamp"], relatedWorkSlugs: ["sound-of-meme", "heyclo-clo-ai"],
    references: [{ title: "Google: Web Vitals and field versus lab measurement", url: "https://web.dev/articles/vitals" }, { title: "Next.js: Lazy loading", url: "https://nextjs.org/docs/app/guides/lazy-loading" }],
  },
];
