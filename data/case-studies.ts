export type ProjectCaseStudy = {
  category: string;
  headline: string;
  summary: string;
  topics: string[];
  goals: string[];
  constraints: string;
  evaluation: string;
  architecture: { title: string; body: string }[];
  flow?: { title: string; steps: { title: string; detail: string }[]; caption: string };
  decisions: { title: string; choice: string; tradeoff: string }[];
  challenges: { title: string; problem: string; solution: string }[];
  outcomes: string[];
  reflection: string;
  nextSteps: string[];
  faqs: { question: string; answer: string }[];
  preview: { alt: string; caption: string };
  evidence: string;
};

export const caseStudies: Record<string, ProjectCaseStudy> = {
  transcendence: {
    category: "Immersive product frontend",
    headline: "Transcendence: a connected product experience",
    summary: "I built public pages, product presentations, and dashboard interfaces that bring Transcendence's immersive brand into a usable web experience.",
    topics: ["Transcendence frontend case study", "Next.js immersive website", "GSAP and Lenis scrolling", "responsive product presentation"],
    goals: [
      "Give Unit hardware, Experiences, and TRS software distinct entry points within one recognizable brand.",
      "Connect expressive public pages with practical navigation, demo inquiries, and dashboard interfaces.",
      "Keep media, transitions, and loading feedback coherent across routes and screen sizes.",
    ],
    constraints: "The frontend had to communicate several connected offerings without treating every page as the same landing page. Large visual assets and scroll-driven sequences also introduced loading and motion constraints. My responsibility was the web interface; the holographic hardware and underlying platform technology were separate product layers.",
    evaluation: "The review criteria are observable interface behavior: distinct product routes, readable content, responsive presentation, sensible loading feedback, and a reduced-motion path. A reproducible before-and-after performance benchmark is not available for this case study.",
    architecture: [
      { title: "Routes compose product-specific sections", body: "Next.js routes render dedicated landing, Unit, Experiences, TRS, and work-page components. TypeScript and shared styling keep common controls consistent, while individual sections retain the composition needed for their product story. This is a component-based frontend rather than one oversized page reused with different headings." },
      { title: "A shared clock coordinates scrolling", body: "The public scrolling component drives Lenis from the GSAP ticker with automatic RAF disabled. It removes that ticker callback when the effect ends and refreshes scroll measurements after navigation. Product motion hooks handle their own section references, transforms, and reduced-motion behavior. This keeps the scrolling infrastructure separate from each visual sequence." },
      { title: "Loading and inquiry states are explicit", body: "The landing loader distinguishes boot, loading, exit, and ready phases and applies only to the initial landing entry. The demo form keeps field errors, submission state, and success feedback separate; it trims input, validates required fields, sends a typed API payload, and displays a submission error if the request fails." },
    ],
    flow: {
      title: "The demo-inquiry frontend flow",
      steps: [
        { title: "Form input", detail: "Name, contact, organization, industry, requirement" },
        { title: "Validation", detail: "Required fields, trimmed values, requirement length" },
        { title: "API request", detail: "Typed booking payload with a submitting state" },
        { title: "Feedback", detail: "Success/reset or a visible submission error" },
      ],
      caption: "Based on the implemented booking-form hook. This describes the frontend request boundary, not the downstream CRM or hardware system.",
    },
    decisions: [
      { title: "Shared motion infrastructure, separate scenes", choice: "The implementation shares scrolling and route transitions while keeping product motion in dedicated hooks. That structure accommodates different sequences without duplicating the entire navigation and scrolling setup.", tradeoff: "Scroll-triggered scenes still require cleanup and fresh measurements after route or layout changes; sharing a ticker does not remove that responsibility." },
      { title: "Treat reduced motion as another presentation", choice: "The Unit motion hook exposes the content and clears transforms when reduced motion is requested. Information remains available even when a scroll sequence is skipped.", tradeoff: "The static presentation needs its own composition review. A cinematic sequence cannot be the only way to understand a product." },
    ],
    challenges: [
      { title: "Keeping hardware, experiences, and software understandable", problem: "The brand spans three offerings, each with different information and visual needs. A single undifferentiated page would blur those distinctions.", solution: "I worked on dedicated product presentations and experience pages connected by common navigation and visual patterns. That separates the explanation of each offering while preserving continuity across the website." },
      { title: "Making loading feel intentional without obscuring content", problem: "A media-heavy introduction and dashboard views need different loading behavior. A loader that runs on every navigation would interrupt exploration.", solution: "The current loader gate is limited to the initial landing entry, with explicit phase transitions and route checks. Dashboard loading and skeleton components address a different context. The loader includes a deliberate minimum duration, so it is not presented as evidence of faster delivery." },
    ],
    outcomes: ["Published public website with distinct Unit, Experiences, TRS, and work presentations.", "Reusable frontend and motion patterns across public pages and dashboard interfaces.", "An implemented inquiry interface with validation, request feedback, and a success state."],
    reflection: "The main engineering lesson is to give motion a defined lifecycle. Route changes, loading, reduced motion, and section measurement all affect whether an animated interface remains usable. The visual treatment works best when those responsibilities are explicit in the component structure.",
    nextSteps: ["Measure initial loading and interaction performance on representative mobile hardware, including the loader's deliberate delay.", "Extend repeatable navigation and reduced-motion checks across every product sequence."],
    faqs: [
      { question: "Did you build the holographic technology?", answer: "My contribution is frontend engineering: public pages, product presentation, dashboards, motion, and loading states. This case study does not attribute the holographic hardware or underlying platform technology to me." },
      { question: "How are GSAP and Lenis connected?", answer: "The public scrolling component advances Lenis from GSAP's ticker and removes the callback during cleanup. Individual product hooks own the scroll-triggered scene behavior." },
    ],
    preview: { alt: "Transcendence homepage with an illuminated stage, product introduction, and demo inquiry link", caption: "The public landing presentation introduces the immersive brand before visitors explore its hardware, experiences, and software." },
    evidence: "Public website, local Next.js source, and the documented frontend contribution. Source observations describe the reviewed implementation; they do not establish ownership of every subsystem or measured business impact.",
  },
  proofcohort: {
    category: "Education and training platform",
    headline: "Proof Cohort: making project-based learning clear",
    summary: "I developed public program pages, learning resources, pricing presentation, and certificate information for Proof Cohort's project-based learning platform.",
    topics: ["Proof Cohort development", "ProofCohort Next.js Supabase", "public program catalog", "certificate verification interface"],
    goals: ["Explain what a learner will build before asking them to apply.", "Connect programs with resources, assessment information, and optional certificate purchases.", "Keep program availability and pricing explanations consistent with the application."],
    constraints: "The public experience sits beside student, mentor, and administrative workflows. Public visitors need useful program information without access to private learner records. Fees and program availability can change, so duplicated marketing values would be difficult to maintain. My documented contribution is the public product presentation and supporting resources.",
    evaluation: "Useful checks include whether published programs can be explored anonymously, whether missing data produces an honest unavailable state, and whether pricing and verification explanations agree with the application's shared configuration. Learner counts, completion rates, and placement results are not supplied as outcomes.",
    architecture: [
      { title: "Public catalog with a restricted data boundary", body: "The Next.js catalog calls a server-side program loader that reads selected fields from active Supabase records. It uses the public key and the existing row-level security policy rather than service credentials. The loader returns both programs and an availability flag, which lets the page distinguish an empty catalog from a failed request." },
      { title: "Resource content and pricing share a foundation", body: "Program pages, career resources, and certificate guides use the same public-page structure. Pricing presentation imports fee values from the learning configuration instead of embedding a separate set of amounts. This keeps the information architecture coherent as programs and optional purchases evolve." },
      { title: "Verification is a specific public lookup", body: "The verification route validates the credential identifier before calling a Supabase verification function. It renders a limited credential result, rejects missing records, and distinguishes service errors from invalid identifiers. The reviewed route also excludes non-live payment records. This describes the verification interface, not authorship of the whole assessment system." },
    ],
    flow: { title: "From published records to program discovery", steps: [
      { title: "Public program route", detail: "Visitor browses without a workspace login" },
      { title: "Server-side loader", detail: "Reads active programs and selected public fields" },
      { title: "Supabase response", detail: "Program data or an availability failure" },
      { title: "Catalog presentation", detail: "Program cards, empty state, or unavailable message" },
    ], caption: "The catalog's implemented read path. Private submissions, payments, and student records are outside this diagram." },
    decisions: [
      { title: "Model availability separately from an empty result", choice: "The catalog returns an availability flag alongside its data. The interface can explain a temporary failure instead of telling visitors that no programs exist.", tradeoff: "Every consumer must preserve that distinction. Replacing both states with an empty array would lose useful information." },
      { title: "Read current programs rather than publish sample inventory", choice: "The loader uses active records and avoids a persistent fetch cache; the catalog route is dynamic. Published offerings remain tied to the actual application data.", tradeoff: "Freshness depends on the data service being reachable. The page therefore needs a useful failure state and links to stable supporting content." },
      { title: "Keep optional fees in shared configuration", choice: "The public fee table imports values used by the learning product. The presentation can explain eligibility and optional purchases without maintaining a second price list.", tradeoff: "A shared amount alone is insufficient: the surrounding eligibility and refund explanations must also stay consistent." },
    ],
    challenges: [
      { title: "Explaining assessed work rather than selling a badge", problem: "A program listing needs to show what students do, what evidence they submit, and what a credential represents. A certificate-only message leaves that learning path unclear.", solution: "I developed program presentation, project resources, and certificate-related guides around practical work. The public catalog connects descriptions and skills to a fuller program page rather than relying on a certificate thumbnail." },
      { title: "Keeping discovery useful during data failures", problem: "Program data is dynamic, but supporting information should remain useful when the catalog cannot be loaded.", solution: "The catalog presents a specific unavailable message and retains routes to FAQs, fees, and guides. This is a visible recovery path, not a claim that the data service never fails." },
    ],
    outcomes: ["Public program and resource pages within the existing learning platform.", "Shared pricing presentation and certificate guides that explain the product's purchase and assessment model.", "A catalog implementation with distinct empty and unavailable states."],
    reflection: "Education-product clarity depends on separating participation, assessed work, and purchased credentials. The same separation helps the engineering: public discovery, private learning records, and verification each need a clear data boundary.",
    nextSteps: ["Add repeatable checks that program, fee, and credential explanations remain consistent after configuration changes.", "Evaluate the program-to-application journey with consented usage data before claiming conversion improvements."],
    faqs: [
      { question: "What did you contribute to Proof Cohort?", answer: "My work includes public pages, program presentation, project resources, brand artwork, pricing behavior, and certificate-related guides within the wider platform." },
      { question: "Why does the catalog have two different empty states?", answer: "An empty published catalog and a temporary Supabase failure mean different things. The loader returns availability separately so the page can explain the right situation." },
    ],
    preview: { alt: "Proof Cohort landing page introducing project-based learning beside a student dashboard preview", caption: "The landing presentation connects the learning proposition with a preview of the student experience. The wider platform extends beyond my public-page scope." },
    evidence: "Local public-page, catalog, fee, and verification source; the published product; and the existing contribution record. Historical prices are omitted because the current product configuration has changed.",
  },
  "chainreach-ai": {
    category: "Campaign and dashboard frontend",
    headline: "ChainReach.ai: connected campaign workflows",
    summary: "I built role-specific dashboards, campaign and negotiation interfaces, and AI-assisted creation screens connected to ChainReach.ai's backend APIs.",
    topics: ["ChainReach.ai frontend case study", "Next.js campaign dashboard", "API integration", "AI assistant request states", "negotiation chat interface"],
    goals: ["Give brands, creators, and administrators clear routes through their own campaign tasks.", "Connect campaign creation, acceptance, negotiation, and assistant interactions to backend APIs.", "Reuse frontend patterns while keeping role-specific actions understandable."],
    constraints: "The frontend depends on account roles, backend responses, and asynchronous operations. A campaign draft, a PDF upload, and a negotiation message are different actions with different pending and error states. The public marketing site cannot demonstrate every authenticated workflow, and my contribution does not imply ownership of escrow contracts or all backend services.",
    evaluation: "The implementation can be assessed through its request boundaries, role-specific routes, loading and error states, message handling, and component structure. Private production accounts were not exercised for this case study, and no throughput, payout, or adoption metrics are asserted.",
    architecture: [
      { title: "Role-specific routes and shared UI", body: "Next.js separates brand, creator, and administrator interfaces into distinct route areas. Shared components support repeated controls and presentation, while hooks organize feature-specific state. TypeScript describes campaign data and assistant responses at the frontend boundary." },
      { title: "An explicit API layer", body: "The API-base helper distinguishes a configured backend origin, a development backend, and same-origin production requests. The campaign assistant hook uses authenticated requests, validates PDF input, handles upload response shapes, and translates service or quota errors into interface messages. Draft generation has a bounded request timeout rather than an indefinite loading state." },
      { title: "Conversation state has a lifecycle", body: "The negotiation hook loads conversation history when the interface opens, tracks loading and sending separately, and subscribes to incoming messages over a WebSocket. Incoming message IDs are checked before appending to state. The socket is closed during effect cleanup. Cryptographic helpers are present in the source, but this case study makes no independent security-audit claim." },
    ],
    flow: { title: "Campaign-assistant request boundary", steps: [
      { title: "Campaign interface", detail: "Prompt or optional validated PDF input" },
      { title: "Feature hook", detail: "Upload, draft, loading, and error state" },
      { title: "Authenticated API", detail: "Backend response with timeout and quota handling" },
      { title: "Editable draft", detail: "Map returned data into the campaign form" },
    ], caption: "Frontend responsibilities shown in the campaign-assistant hook. Model execution, escrow, and payment settlement are outside this flow." },
    decisions: [
      { title: "Keep operation state specific", choice: "PDF upload, assistant responses, and draft generation have separate state in the feature hook. The interface can explain which action is pending or failed without treating the whole page as one request.", tradeoff: "More state transitions require deliberate resets. Closing or restarting a flow must not carry an old file, error, or quota message into a new campaign." },
      { title: "Separate request construction from page composition", choice: "API configuration and authenticated requests are shared, while campaign mapping remains feature-specific. This gives product screens a consistent connection boundary without forcing all responses into the same shape.", tradeoff: "Backend contract changes still require mapping and error-handling updates; a common fetch helper is not a substitute for validating returned data." },
    ],
    challenges: [
      { title: "Making asynchronous failures actionable", problem: "An AI-assisted campaign flow can fail while uploading a file, generating a draft, or checking entitlement. A generic spinner gives the user little indication of what to do next.", solution: "The reviewed hook validates the input, tracks the active operation, catches request failures, and uses feature-aware error messages. This makes the integration visible in the UI rather than treating the backend as an always-successful dependency." },
      { title: "Combining history with live messages", problem: "A chat view receives an initial history and later events. Appending every event without an identity check can show the same message more than once.", solution: "The negotiation hook checks message IDs before appending and closes its socket on cleanup. This is a concrete implementation safeguard; no undocumented production incident or failed debugging attempt is invented around it." },
    ],
    outcomes: ["Frontend workflows for brands, creators, and administrators.", "Campaign creation, acceptance, negotiation, and assistant interfaces connected to APIs.", "Explicit loading, error, quota, and conversation-state handling in the reviewed frontend."],
    reflection: "The important boundary in this project is between the user's next action and the backend operation supporting it. Keeping that boundary explicit makes complex dashboards easier to maintain and makes failures more understandable to the person using them.",
    nextSteps: ["Expand automated coverage of timeout, quota, reconnect, and role-change scenarios using controlled API fixtures.", "Document request and response contracts alongside the frontend mapping code to make backend changes easier to review."],
    faqs: [
      { question: "Did you implement the entire payment or AI system?", answer: "This case study covers the frontend and API integration. It does not claim ownership of escrow contracts, payment settlement, model training, or every backend service." },
      { question: "How does the chat avoid duplicate messages?", answer: "Before adding an incoming message to React state, the negotiation hook checks whether its ID is already present. Socket cleanup is tied to the hook's lifecycle." },
    ],
    preview: { alt: "ChainReach.ai public campaign-platform website with brand and creator product presentation", caption: "The public website introduces the campaign product. Authenticated dashboards depend on account access and are not represented by this screenshot." },
    evidence: "Local frontend routes, API helpers, campaign and negotiation hooks, the public website, and the documented frontend role. Account-level workflows and cryptographic guarantees were not independently validated.",
  },
  "pivotal-physiocare": {
    category: "Healthcare business website",
    headline: "Pivotal Physiocare: a clear path to home care",
    summary: "I built a responsive website that connects physiotherapy services, practitioner information, and local coverage with home-visit inquiries.",
    topics: ["Pivotal Physiocare website", "Next.js physiotherapy website", "local service discovery", "home visit inquiry interface"],
    goals: ["Help visitors identify the relevant service and see whether home visits cover their area.", "Present practitioner information and practice-supplied photography in a clear hierarchy.", "Keep inquiry and direct-contact actions easy to find on mobile."],
    constraints: "The website presents a healthcare practice, so clarity matters more than an elaborate product narrative. Families may arrive with an immediate practical question about care or location. Practice ratings, patient stories, qualifications, and treatment claims belong to the client and are not outcomes of my software work.",
    evaluation: "The verifiable deliverable is the public website and its service-to-inquiry structure. A complete booking transaction, clinical results, and a measured uplift in inquiries are not established by the available evidence. Success is described as delivered interface capability rather than a conversion percentage.",
    architecture: [
      { title: "Information organized around care decisions", body: "The public presentation groups care and services, expert information, areas served, resources, and contact. That structure gives visitors several useful entry points: a service need, a practitioner, or a location. It also avoids making the homepage carry every detail about the practice." },
      { title: "A documented Next.js frontend", body: "The existing project record identifies a component-based Next.js implementation with responsive layouts and local-search work. The delivered pages combine text, practitioner imagery, galleries, and inquiry actions. The source repository was not available for this review, so database, CMS, form-storage, and backend architecture are intentionally unspecified." },
    ],
    decisions: [
      { title: "Let the service structure lead the journey", choice: "I organized the site around care choices, experts, coverage, and contact so the visual presentation supports practical decisions. A visitor can move toward a home-visit inquiry from relevant information rather than only from the end of the page.", tradeoff: "Service and location information must be maintained as the practice changes. Attractive photography cannot compensate for outdated availability." },
      { title: "Pair visual evidence with direct contact", choice: "The design brings practice-supplied photographs and practitioner context together with clear inquiry and call actions. This makes the business presentation useful even for visitors who prefer to speak with the practice.", tradeoff: "A direct-contact path depends on the practice's response process. The website alone cannot guarantee appointments, response times, or care outcomes." },
    ],
    challenges: [
      { title: "Balancing reassurance with practical information", problem: "An image-led healthcare site can become vague if visitors cannot quickly find the service, practitioner, or area that matters to them.", solution: "I built the page hierarchy around those concrete questions and connected the sections to home-visit inquiries. The practice's stories provide context while the service and contact structure remains the main route through the site." },
      { title: "Keeping the mobile journey readable", problem: "Long service descriptions, galleries, and practitioner information compete for space on a small screen.", solution: "The frontend work emphasizes responsive section layout and clear contact entry points. Further device-specific performance findings would require the original source and a repeatable test setup; none are invented here." },
    ],
    outcomes: ["A publicly accessible website presenting home physiotherapy in Noida and Greater Noida.", "Connected care, practitioner, location, gallery, and inquiry sections.", "A responsive business-site deliverable with direct contact paths."],
    reflection: "For a local service website, a useful information hierarchy is part of the product. The engineering should help someone identify a service and take the next step with confidence, while keeping clinical statements attributable to the practice.",
    nextSteps: ["Review inquiry accessibility and validation against the source implementation when it is available.", "Measure real mobile loading and the service-to-contact journey before prioritizing conversion or performance changes."],
    faqs: [
      { question: "Is this a medical application or a practice website?", answer: "This case study covers the practice's public website: service presentation, practitioner information, local coverage, and inquiry entry points. It does not claim a medical diagnosis or treatment system." },
    ],
    preview: { alt: "Pivotal Physiocare homepage introducing physiotherapy at home and a home-visit inquiry action", caption: "The homepage makes the care offering and next contact step visible together. Clinical content and photography are supplied by the practice." },
    evidence: "Published website, existing project records, and the retained product screenshot. The source repository, inquiry-processing implementation, and independent business metrics were unavailable for this review.",
  },
  "heyclo-clo-ai": {
    category: "Animated product landing page",
    headline: "HeyClo: product storytelling with controlled motion",
    summary: "I developed HeyClo's responsive landing experience, combining product sections, animation, and scrolling behavior in a Next.js frontend.",
    topics: ["HeyClo CLO AI landing page", "Next.js Framer Motion", "Lenis native mobile scrolling", "responsive animated website"],
    goals: ["Communicate the relationship-assistant product through a coherent sequence of sections.", "Make animation and scrolling support the content across desktop and mobile.", "Keep loading and interaction behavior manageable as the page grows."],
    constraints: "A motion-heavy landing page behaves differently with a mouse wheel, touch input, and reduced-motion preferences. It also contains visual sections that do not all need to arrive in the initial bundle. My contribution is the public website, not the relationship AI or the mobile application's underlying intelligence.",
    evaluation: "The reviewed code provides concrete checks: native scrolling on touch/mobile and reduced-motion devices, cleanup of the desktop animation loop, and dynamically imported lower sections. Historical Lighthouse checks informed the work, but no reproducible score or speed improvement is claimed here.",
    architecture: [
      { title: "Next.js page composition with Framer Motion", body: "The current landing application uses Next.js and React, with Framer Motion for interface animation. The route renders the homepage and its metadata, while the homepage composes product sections. This corrects the earlier ambiguous reference to Framer: the reviewed implementation uses the animation library, not evidence of the Framer website builder." },
      { title: "Native input takes priority on smaller devices", body: "The scrolling component checks viewport width, coarse-pointer or touch input, and reduced-motion preference. Those cases use a native-scrolling path. Desktop devices can use Lenis, with a requestAnimationFrame loop that is canceled and a Lenis instance that is destroyed during cleanup. Initialization failure also falls back to native behavior." },
      { title: "Section loading stays modular", body: "The homepage dynamically imports sections including How It Works, Contextual Bridge, FAQ/contact, and the footer. This creates separate loading boundaries within the page's composition. It is a source-level optimization, not proof of a particular network saving or Lighthouse result." },
    ],
    flow: { title: "Choosing the scrolling behavior", steps: [
      { title: "Read preferences", detail: "Viewport, pointer type, reduced motion" },
      { title: "Select a path", detail: "Native for mobile/touch/reduced motion; Lenis for desktop" },
      { title: "Run interaction", detail: "Native helper or desktop RAF-driven scrolling" },
      { title: "Clean up", detail: "Remove helpers, cancel RAF, destroy Lenis when used" },
    ], caption: "The decision path in the current scrolling component. The reduced-motion path avoids creating Lenis; it is not a claim that every animation in the product has been audited." },
    decisions: [
      { title: "Do not force one scrolling model onto every device", choice: "The implementation uses native scrolling for mobile and touch contexts while retaining Lenis for desktop presentation. This separates the visual pacing requirement from the device's primary input behavior.", tradeoff: "Two paths need testing. The page must remain coherent when the desktop smoothing is absent and when the viewport changes." },
      { title: "Load secondary sections through module boundaries", choice: "Lower homepage sections use dynamic imports rather than all living inside one eager component module. The page remains composed from understandable product sections.", tradeoff: "Splitting a module does not by itself prove a faster page. Loading order, image cost, and network behavior still need measurement." },
    ],
    challenges: [
      { title: "Keeping animated storytelling usable on touch devices", problem: "Desktop pacing can feel restrictive when someone expects direct touch scrolling on a smaller screen.", solution: "The scrolling implementation selects a native mobile path, while my frontend work refines the responsive sections and their interaction behavior. The intended result is a product story that remains readable without depending on desktop scroll smoothing." },
      { title: "Managing animation lifecycle rather than leaving a permanent loop", problem: "A smooth-scrolling animation loop can outlive the component that created it if cleanup is omitted.", solution: "The reviewed component cancels its animation frame, destroys Lenis, and removes shared helper references when it unmounts. This is visible lifecycle management, without inventing a historical memory-leak incident." },
    ],
    outcomes: ["A published product landing experience with responsive sections and interaction work.", "An explicit native-scrolling path alongside desktop Lenis behavior.", "Modular section composition and documented loading-quality refinements."],
    reflection: "Motion is easiest to maintain when it is treated as an enhancement with clear entry, fallback, and cleanup behavior. That also keeps a landing page's message independent of the animation used to present it.",
    nextSteps: ["Check every section against reduced-motion preferences, not just the scrolling wrapper.", "Capture repeatable mobile loading measurements and test input changes during viewport resizing."],
    faqs: [
      { question: "Was this built with Framer or Framer Motion?", answer: "The current local landing application is Next.js and React using Framer Motion as an animation library, with Lenis for desktop scrolling. The case study reflects that inspected stack." },
      { question: "What happens on a touch device?", answer: "The scrolling component selects native behavior for mobile viewports or touch/coarse-pointer devices instead of initializing Lenis." },
    ],
    preview: { alt: "HeyClo landing-page preview presenting the relationship-assistant product", caption: "A retained preview of the public product presentation. The live landing page may include later visual and content revisions." },
    evidence: "Current local Next.js landing source, public website, and the recorded landing-page contribution. No relationship-model development, audited accessibility certification, or numerical Lighthouse improvement is claimed.",
  },
  "sound-of-meme": {
    category: "Music application frontend",
    headline: "Sound Of Meme: music discovery and playback in React",
    summary: "I developed React interfaces for song generation, playback, playlists, and discovery, with Redux Toolkit state and Axios API integration.",
    topics: ["Sound Of Meme React frontend", "Redux Toolkit playlists", "Axios music API integration", "debounced song search"],
    goals: ["Connect song discovery, playlist management, and playback through consistent frontend state.", "Make search and filtering responsive without tying every keystroke to a new request.", "Organize reusable screens and loading boundaries as the music product grows."],
    constraints: "Music interfaces coordinate several kinds of state: the query a listener is typing, the results returned by an API, playlist changes, and the selected song. My recorded scope covers this frontend integration and the generation interface, not the underlying music-generation models. The original source and a current deployment could not be independently inspected for this review.",
    evaluation: "The account is grounded in the supplied implementation history and retained product assets. It documents React, Redux Toolkit, Axios, playlists, debounced search, filtering, and loading work. Exact debounce timing, cancellation semantics, cache policies, and production performance measurements are not available and are not inferred.",
    architecture: [
      { title: "Shared state for connected music screens", body: "React components and reusable hooks form the frontend foundation. Redux Toolkit supports the playlist and song-management state described in the project record, so changes can be reflected across connected interfaces. This establishes the use of shared state without claiming an undocumented slice layout or persistence mechanism." },
      { title: "API-backed discovery and updates", body: "Axios connects the interface to song and playlist APIs. The discovery work includes debounced search, filtering, data fetching, and state updates. Debouncing reduces how frequently typed changes trigger work; it does not, by itself, establish cancellation or protection from responses arriving out of order." },
      { title: "Selective loading and reusable presentation", body: "The documented performance work uses lazy loading, route-level code splitting, shared components, and rendering refinement. Metadata and structured blog content support the public content surface. These are identifiable frontend techniques, but the historical bundle-size estimate lacks retained build artifacts and is therefore not published as a measured result." },
    ],
    decisions: [
      { title: "Use shared state where music workflows meet", choice: "The documented implementation uses Redux Toolkit for song and playlist state alongside React components and hooks. This supports connected screens without requiring every screen to own a separate copy of the same music data.", tradeoff: "Shared state needs clear update rules. Without the original reducers and request code, it would be misleading to claim a particular normalization strategy or cache-invalidation guarantee." },
      { title: "Debounce discovery requests", choice: "Search input is debounced before discovery work is triggered, with filtering as part of the browsing interface. This is a practical way to avoid treating every intermediate keystroke as a completed query.", tradeoff: "Debouncing introduces a short wait and is separate from response ordering. Request cancellation and latest-query checks would need to be confirmed in the source." },
      { title: "Separate loading by route and feature", choice: "Lazy loading and route splitting were part of the frontend optimization work. Shared components and hooks helped keep the player and generation interfaces maintainable as features accumulated.", tradeoff: "More chunks can introduce additional loading boundaries. Their value should be evaluated with a repeatable build and device profile rather than a single headline bundle number." },
    ],
    challenges: [
      { title: "Keeping discovery and management coherent", problem: "Search results, song selection, and playlist changes belong to the same listening experience, but arrive through different interactions and API responses.", solution: "I worked on the React interfaces, Redux Toolkit state, and Axios requests that connect those actions. The emphasis was consistent state updates and reusable UI behavior across discovery, playback, and playlist management." },
      { title: "Controlling the cost of a growing frontend", problem: "Player controls, generation screens, and content pages can make an application expensive to load if everything is delivered together.", solution: "I used selective loading, route splitting, and component reuse as part of the optimization work. The case study describes those techniques without converting an unverified historical estimate into a performance guarantee." },
    ],
    outcomes: ["Documented frontend delivery across the music player, song-generation interface, and reusable React components.", "Playlist and song-management work using Redux Toolkit and Axios.", "Song discovery with debounced search and filtering, plus frontend loading and metadata work."],
    reflection: "The central engineering lesson is that input state, remote results, and the listening experience need clear ownership. A search optimization is only one part of that system; the interface also has to explain loading and keep subsequent updates coherent.",
    nextSteps: ["Review stale-result handling and cache invalidation when search queries or playlists change.", "Verify rapid-query changes, API failures, and playlist updates with repeatable interaction tests, then measure loading against a fixed build and device profile."],
    faqs: [
      { question: "Did you build the AI music model?", answer: "My work covered the frontend and API-connected product experience. Model training and music-generation infrastructure are not part of the contribution claimed here." },
      { question: "Was RTK Query used for caching?", answer: "Redux Toolkit and data-fetching work are documented, but the specific caching implementation is not verified. This case study does not assume RTK Query, a particular cache lifetime, or request cancellation." },
    ],
    preview: { alt: "Sound Of Meme product screenshot showing its music application interface", caption: "Retained project imagery from the music product. The case study documents frontend work; a current public deployment is not linked without verification." },
    evidence: "Owner-supplied implementation details, the existing experience record, and the retained screenshot. Source code, a current deployment, and reproducible performance artifacts are not available in this review.",
  },
  "samriddhi-interiors": {
    category: "Interiors business website",
    headline: "Samriddhi Interiors: from project imagery to inquiry",
    summary: "I built an interiors business website that organizes services, project photography, studio information, and consultation entry points into a responsive experience.",
    topics: ["Samriddhi Interiors website case study", "Next.js interiors portfolio", "responsive business website", "consultation inquiry interface"],
    goals: ["Make a broad interiors and construction offering easy to explore.", "Give project photography a clear context alongside service and studio information.", "Connect portfolio browsing with consultation and direct-contact options."],
    constraints: "The site had to work as both a visual portfolio and a practical business website. Large photographs need space, while services and contact information must remain easy to scan. The photographed interiors, testimonials, client logos, and business history are client material, not evidence of my own interior-design work or software-generated revenue.",
    evaluation: "The deliverable can be reviewed through the published service structure, project presentation, responsive sections, and contact entry points. No inquiry-volume, conversion-rate, or revenue improvement is asserted. The form's storage and delivery implementation would require source-level verification.",
    architecture: [
      { title: "A component-based business-site foundation", body: "The existing project record identifies Next.js, TypeScript, and Framer Motion. The website is organized around a hero, studio story, services, portfolio, process, testimonials, and contact. This provides a repeatable structure for the content while preserving the image-led character of the business." },
      { title: "Service information and images work together", body: "The service structure covers planning, construction, renovation, kitchens, furniture, finishes, and related work. Project imagery sits within that broader explanation rather than acting as an isolated image wall. Visitors can move from a visual example to a service category or a consultation action." },
      { title: "Several contact paths, one business destination", body: "The public interface includes a consultation form and direct phone, email, and WhatsApp options. These are distinct entry points into the client's inquiry process. A visible form does not establish a CRM integration, durable lead storage, automated follow-up, or a successful end-to-end delivery test." },
    ],
    decisions: [
      { title: "Structure a broad offering before adding decoration", choice: "I organized the service categories and page sequence so visitors can understand the business before reaching the contact section. Photography supports that hierarchy instead of replacing the explanation of what the studio does.", tradeoff: "Service descriptions and portfolio material need editorial maintenance. Adding more categories should not turn the homepage into an unstructured brochure." },
      { title: "Use contact options that fit the service business", choice: "The interface connects visual browsing to consultation, phone, email, and WhatsApp paths. That gives visitors a way to continue the conversation in a channel suited to an interiors project.", tradeoff: "The website can make contact easier, but response quality and sales outcomes remain part of the client's operating process." },
    ],
    challenges: [
      { title: "Keeping a visual portfolio useful", problem: "A large photo can communicate style, but it does not explain which services are available or what a visitor should do next.", solution: "I connected project presentation with the studio story, service categories, process, and consultation actions. This creates context around the photographs without attributing the client's interiors work to my development contribution." },
      { title: "Preserving hierarchy on smaller screens", problem: "Wide imagery, multiple service categories, and several contact choices can compete for attention when the layout collapses to one column.", solution: "The frontend work includes responsive layouts and a consistent section sequence. The existing assets support the same story at different sizes; deeper image-delivery or form claims are reserved for a source review." },
    ],
    outcomes: ["A published freelance website for the interiors and construction business.", "Structured service, studio, project, process, and contact presentation.", "Consultation and direct-contact entry points integrated into the public experience."],
    reflection: "For a visual business website, engineering and content structure are closely connected. Reusable sections help maintain the site, but each section still needs a clear role in explaining the work or helping someone make an inquiry.",
    nextSteps: ["Review source-level image sizes, loading priorities, and responsive delivery using the final asset library.", "Verify form validation, delivery failures, and confirmation states before documenting a complete lead-processing workflow."],
    faqs: [
      { question: "Are the interiors projects your own design work?", answer: "No. My contribution is the website. Interior projects, client relationships, testimonials, and business history belong to Samriddhi Interiors." },
      { question: "What makes this more than a gallery page?", answer: "The site connects project photography with service categories, studio context, process information, and consultation entry points, giving visitors practical next steps as they browse." },
    ],
    preview: { alt: "Samriddhi Interiors homepage with architectural photography and an interiors consultation introduction", caption: "The client website uses architectural imagery to introduce the business, followed by services, project examples, and consultation options." },
    evidence: "Published website, retained screenshot, and documented Next.js/TypeScript/Framer Motion contribution. The source repository and measured lead or business outcomes were unavailable for this review.",
  },
  nursephysiowala: {
    category: "Healthcare marketplace frontend",
    headline: "NursePhysioWala: service discovery and care requests",
    summary: "I worked on a Next.js marketplace frontend for nursing and physiotherapy, with Firebase account and data foundations and clear service-request entry points.",
    topics: ["NursePhysioWala frontend", "Next.js Firebase healthcare marketplace", "Firestore application architecture", "nursing physiotherapy booking interface"],
    goals: ["Separate nursing and physiotherapy discovery so visitors can find the relevant service.", "Connect service and location information with appointment-request entry points.", "Establish a frontend foundation for accounts and application data using Firebase."],
    constraints: "A marketplace connects people requesting care with independent professionals, but a public website does not prove that every operational step is complete. The inspected evidence supports service discovery and the documented Next.js/Firebase foundation. Private allocation, payment, and administrative workflows require a separate source and account review.",
    evaluation: "The current review covers public service and location presentation, request entry points, and the owner's documented authentication/data work. It does not establish completed appointments, provider scale, clinical effectiveness, payment reliability, or the behavior of private dashboards.",
    architecture: [
      { title: "Public routes explain the available care", body: "The Next.js App Router frontend organizes nursing, physiotherapy, service-area information, and contact/request entry points. Public visitors can start with a service rather than first having to understand the marketplace's account structure. This is the visible product layer supported by the current website." },
      { title: "Firebase provides the documented application foundation", body: "The supplied implementation account identifies Firebase Authentication for accounts and Firestore for application data. These are concrete technology choices within the frontend/application architecture. Collection schemas, security rules, session enforcement, and deployed access policies were not available for inspection and are not described as verified implementations." },
      { title: "Keep request presentation distinct from fulfillment", body: "A service request begins with a visitor identifying care needs and providing relevant scheduling information. Fulfillment then depends on operational systems and professional availability. This case study focuses on the interface and application foundation instead of inferring an automated assignment engine from the presence of a booking button." },
    ],
    decisions: [
      { title: "Organize entry points by service and location", choice: "I structured the public frontend around nursing and physiotherapy, with location and contact information close to the request path. This keeps the initial interaction tied to the visitor's practical task.", tradeoff: "Public availability information must match actual service coverage. The UI should not promise fulfillment merely because a request can be submitted." },
      { title: "Use a managed account and data foundation", choice: "The documented implementation uses Firebase Authentication and Firestore with Next.js. That gives the application a defined account service and data layer rather than leaving those responsibilities entirely in page components.", tradeoff: "Managed services still require correct access rules and validation. Their presence is not evidence that every role or private workflow is secured or complete." },
    ],
    challenges: [
      { title: "Making a marketplace understandable before login", problem: "Someone seeking home care needs to understand the service and area first. Leading with administrative complexity would make that simple task harder.", solution: "I worked on responsive service and location pages that connect care information to booking and contact actions. The public website can explain the initial journey while account-specific capabilities remain a separate application concern." },
    ],
    outcomes: ["A public website presenting nursing and physiotherapy services and request entry points.", "Documented frontend/application work with Next.js App Router, Firebase Authentication, and Firestore.", "Responsive service and location presentation connected to contact actions."],
    reflection: "A marketplace frontend needs clear boundaries between expressing a request, managing account data, and fulfilling the service. Naming those boundaries makes the architecture easier to discuss and keeps a portfolio account accurate about what the interface demonstrates.",
    nextSteps: ["Review the original source, Firestore rules, and private role flows before documenting end-to-end booking or assignment behavior.", "Add controlled checks for request validation, duplicate submissions, and unavailable service areas once the full workflow is accessible."],
    faqs: [
      { question: "Does this case study demonstrate completed healthcare operations?", answer: "It documents the public frontend and the supplied Firebase application foundation. Appointment volume, care outcomes, payment processing, and private allocation behavior are not independently established here." },
      { question: "Which Firebase services are part of the documented work?", answer: "Firebase Authentication and Firestore are identified in the implementation account. Their detailed rules and data model need the original repository for a deeper technical explanation." },
    ],
    preview: { alt: "NursePhysioWala public website presenting home nursing and physiotherapy service discovery", caption: "The public interface introduces services and request entry points. It is not evidence of completed appointments or marketplace scale." },
    evidence: "Owner-supplied Next.js/Firebase details, the conservative experience entry, retained screenshot, and public website. Original source and authenticated operational workflows were unavailable for this review.",
  },
  "rey9-living": {
    category: "Interactive interiors website demo",
    headline: "Rey9 Living: turning product browsing into planning",
    summary: "I developed an interiors website demo with collection browsing, material previews, project filters, and a client-side cost estimator.",
    topics: ["Rey9 Living website demo", "React cost estimator", "Next.js interiors interface", "local state material selector"],
    goals: ["Let visitors explore collections and finishes without navigating through a long static catalog.", "Translate space, layout, and finish choices into an understandable estimate preview.", "Demonstrate a path from visual browsing to a project conversation."],
    constraints: "This is a website demo, not evidence of commissioned interior installations or commercial adoption. Pricing values and multipliers are local configuration, not live supplier quotes. The estimator has no verified server-side pricing or saved-quote workflow. The product content demonstrates presentation and interaction design.",
    evaluation: "The local implementation provides checkable interactions: collection and material selection, category filtering, a project-detail modal, and a multi-step estimator. The useful outcome is a functioning frontend prototype. No sales, installation counts, or customer testimonials are attributed to this development work.",
    architecture: [
      { title: "A composed Next.js page", body: "The App Router page assembles independent sections for collections, a comparison slider, estimation, portfolio, materials, process, and consultation. TypeScript data modules hold products, materials, and projects. React state handles the selected values inside interactive sections, with Framer Motion used for transitions." },
      { title: "A local calculation with explicit inputs", body: "The estimator stores the current step, space, layout, and finish in component state. It looks up a base price, multiplies it by layout and finish factors, and derives a displayed range. INR formatting uses Intl.NumberFormat. The calculation is deterministic browser logic; no AI or remote quoting service is involved." },
      { title: "Small interactions use local state", body: "The portfolio filters a local project array by category and stores the selected project for its modal. The material section stores a selected material and updates its gradient-based preview. These choices keep the demo responsive without inventing an application backend." },
    ],
    flow: { title: "The estimator's implemented calculation", steps: [
      { title: "Select inputs", detail: "Space type, layout, and finish" },
      { title: "Look up factors", detail: "Local base price and multipliers" },
      { title: "Calculate a range", detail: "Derived values formatted in INR" },
      { title: "Continue the inquiry", detail: "WhatsApp link from the result screen" },
    ], caption: "A client-side demo flow. Displayed amounts are illustrative configuration, not validated supplier pricing or saved quotes." },
    decisions: [
      { title: "Use local state for isolated selection tools", choice: "The estimator, material preview, and gallery filter each keep their own React state. These interactions do not need a shared application store to demonstrate the browsing experience.", tradeoff: "Selections are not established as persistent across visits. Saving or sharing a project configuration would require a separate persistence design." },
      { title: "Keep pricing logic visible and deterministic", choice: "The estimator derives its range from local factors instead of presenting an unexplained service response. This makes the prototype's behavior straightforward to inspect and adjust.", tradeoff: "The formula cannot establish real installation costs. A production quote would need validated pricing, scope definitions, and an operational handoff." },
    ],
    challenges: [
      { title: "Connecting exploration to a concrete next step", problem: "A collection gallery can show attractive options without helping a visitor express what they actually want.", solution: "I developed a planning sequence that narrows the space, layout, and finish, then presents an estimate preview and an inquiry action. The interface demonstrates the interaction even though commercial quoting remains outside the verified scope." },
      { title: "Keeping several interactive sections understandable", problem: "Filters, material choices, and an estimator have different state needs. Combining them into one large state object would obscure each section's responsibility.", solution: "The implementation keeps these selections in their section components and imports reusable content from data modules. This makes the current demo easier to follow while leaving room for a deliberate shared configuration model later." },
    ],
    outcomes: ["An implemented Next.js/TypeScript interiors website demo.", "Local-state collection, material, filter, and modal interactions.", "A deterministic estimator with a visible result and inquiry handoff."],
    reflection: "An interactive prototype becomes more credible when its calculations and limits are explicit. The estimator shows how a visitor can make choices; it should not imply a validated pricing operation just because the output is formatted as currency.",
    nextSteps: ["Validate pricing inputs and business rules before adapting the estimator for real quotes.", "Strengthen keyboard focus, modal behavior, and reduced-motion coverage across all interactive sections."],
    faqs: [
      { question: "Does the estimator call a pricing API?", answer: "No pricing API is present in the reviewed estimator. It uses local base prices and layout/finish multipliers to calculate an illustrative range in the browser." },
      { question: "Are material previews photographs of the selected finish?", answer: "The reviewed material selector changes a gradient-based preview from local material data. It demonstrates selection and presentation rather than a physically accurate material renderer." },
    ],
    preview: { alt: "Rey9 Living interiors demo with dark product presentation and modular kitchen imagery", caption: "The website demo introduces modular interiors before its collection, material-selection, and planning interfaces." },
    evidence: "Local Next.js source, data modules, README, and retained screenshots. Demo status is preserved; business claims within the demonstration are not treated as verified client results.",
  },
  "ai-case-calculator": {
    category: "Legal technology interface demo",
    headline: "AI Case Calculator: making a report understandable",
    summary: "I developed the public-facing legal-tech interface, including the product introduction and an example report that organizes estimates and supporting context.",
    topics: ["AI Case Calculator frontend demo", "legal report interface", "Next.js Redux Toolkit Axios", "sample case valuation presentation"],
    goals: ["Explain the proposed case-analysis journey before asking someone to enter the application.", "Make a dense report structure readable through clear grouping and hierarchy.", "Separate demonstration figures from validated predictions or legal outcomes."],
    constraints: "The retained screenshot represents an earlier sample-report presentation. The current local application contains newer account, conversation, and server modules, which are not automatically attributed to my original interface contribution. A compelling report layout cannot establish the validity of its numbers or the quality of an underlying model.",
    evaluation: "The supported deliverable is the frontend presentation and demonstration of the report format. No calibrated P10, P50, or P90 model, validated comparable-case retrieval, or successful legal outcome is established. Current application source is useful technical context, but it is not proof that the archived interface and live deployment are the same version.",
    architecture: [
      { title: "Public presentation and application entry", body: "The public route introduces the product and provides entry into an account-based experience. The retained report preview groups a settlement range, probability, duration, and precedent context into separate readable areas. These values are sample content used to show information hierarchy, not measured results." },
      { title: "A newer Next.js frontend foundation", body: "The inspected local application uses Next.js and React. Redux Toolkit configures an authentication reducer, and Axios provides a shared API client with a relative /api base URL. A request interceptor attaches an available bearer token. This describes source that exists without expanding the claimed contribution to every newer account or backend feature." },
      { title: "An error boundary at the request layer", body: "The shared API client normalizes validation, HTTP, network, and setup failures into rejected error objects containing a message and status. It handles both string and array validation details. This is a useful frontend integration boundary, though callers still need to decide how to present and recover from each failure." },
    ],
    decisions: [
      { title: "Group report concepts instead of presenting one score", choice: "The interface gives range, likelihood, duration, and supporting context separate visual roles. Readers can understand what each area represents without treating a single prominent number as the entire analysis.", tradeoff: "Clear presentation can still create false confidence if sample values look authoritative. The case study therefore labels the report as a demonstration." },
      { title: "Centralize request formatting in the current source", choice: "The newer local application uses a common Axios client for headers, token attachment, timeout, and error normalization. That keeps repeated request concerns out of individual screens.", tradeoff: "A common client does not establish correct authorization or model validity. Those require separate server-side and domain-specific evaluation." },
    ],
    challenges: [
      { title: "Making a complex output readable without overstating precision", problem: "A report can contain several estimates and supporting details. Strong visual emphasis risks making a sample value look like a proven prediction.", solution: "My interface work organizes the report into distinct information groups. This case study keeps the sample status explicit and separates the presentation achievement from any claim about legal accuracy." },
    ],
    outcomes: ["A public-facing product introduction and example report presentation.", "A readable interface structure for grouped estimates and supporting context.", "A documented demo with an explicit boundary around sample figures and unverified model claims."],
    reflection: "The key design lesson is that uncertainty belongs in the product explanation, not just in a footer. A technical portfolio should also distinguish what a screen demonstrates from what a model or backend has actually been validated to do.",
    nextSteps: ["Confirm ownership and deployment versions before extending the case study to newer authenticated or conversational features.", "If valuation functionality is developed further, document source provenance, uncertainty, evaluation methodology, and domain review before presenting estimates as validated."],
    faqs: [
      { question: "Are the report's figures real case valuations?", answer: "The retained report uses sample figures to demonstrate the interface. They are not validated legal estimates, advice, or evidence of a successful case outcome." },
      { question: "Does this demonstrate a working P10/P50/P90 retrieval model?", answer: "No. The available evidence does not establish a calibrated percentile model or a verified comparable-case retrieval pipeline, so those capabilities are not claimed as delivered work." },
    ],
    preview: { alt: "Archived AI Case Calculator interface with a sample settlement range and supporting report cards", caption: "Archived interface demo. The displayed valuation and probability figures are illustrative; they are not validated case outcomes. The current application may differ." },
    evidence: "Archived product screenshot, documented interface contribution, public demo, and a newer local Next.js/Redux Toolkit/Axios application. Backend/model authorship and version parity remain unverified.",
  },
};
