AOS.init();

const experiencecards = document.querySelector(".experience-cards");
const exp = [
  {
    title: "AI Solution Engineer - Manager",
    cardImage: "assets/images/experience-page/pwc.png",
    place: "PwC UK · Full-time · Hybrid",
    time: "(Sep 2026 - Present · London Area, United Kingdom)",
    desp: "<li>Leading AI solution engineering from discovery to production, turning complex client challenges into secure, scalable, and commercially viable capabilities.</li><li>Partner with clients, business leaders, and technical teams to uncover needs, prioritise high-value use cases, develop business cases, and shape delivery roadmaps.</li><li>Assess opportunities against expected value, technical feasibility, total cost, risk, data readiness, and organisational capability.</li>",
  },
  {
    title: "Ambassador - London",
    cardImage: "assets/images/experience-page/langchain.png",
    place: "LangChain Community",
    time: "(Nov 2025 - Present · London Area, United Kingdom)",
    desp: "<li>Represent the LangChain community by supporting developers, promoting open-source collaboration, and encouraging innovation in AI agent development.</li><li>Host hackathons and technical community events focused on real-world AI applications and agentic systems.</li><li>Share hands-on knowledge on LangChain, LangSmith, AI agents, MCP, memory systems, and production-ready orchestration.</li><li>Promote best practices for scalable and ethical AI, including observability, evaluation, and responsible deployment.</li>",
  },
  {
    title: "Senior AI/ML Engineer",
    cardImage: "assets/images/experience-page/awtg.png",
    place: "AWTG Ltd · Full-time · On-site",
    time: "(Jul 2025 - Aug 2026 · London Area, United Kingdom)",
    desp: "<li>Built agentic capabilities from business requirements and developed in-house platforms including KAI - <a href='https://platform.awtg.ai' target='_blank' rel='noopener'>platform.awtg.ai</a>.</li><li>Led AI engineering for a no-code agentic assistant platform covering knowledge-grounded conversations, RBAC, integrations, and conversation insights.</li><li>Worked across Agents, GraphRAG, CI/CD, and FastAPI to deliver production-grade AI systems.</li>",
  },
  {
    title: "Senior AI/ML Computational Science Engineer",
    cardImage: "assets/images/experience-page/accenture.png",
    place: "Accenture AI · Full-time · Hybrid",
    time: "(May 2020 - Sep 2024 · 4 yrs 7 mos)",
    desp: "<li><strong>Senior AI/ML Computational Science Engineer</strong> (May 2022 - Sep 2024, Pune) - built AI-driven BI products including Watchtower (anomaly and root-cause SaaS) and AI over BI.</li><li>Developed Watchtower for real-time visibility into business operations, anomaly detection, and faster data-driven decisions.</li><li>Contributed to AI over BI: automated insights, predictive analysis, and natural-language data exploration beyond static dashboards.</li><li><strong>AI Engineer II</strong> (Mar 2021 - May 2022, Bengaluru) - Data Engineering and ML operations, Technology Labs.</li><li><strong>Associate AI Engineer</strong> (May 2020 - Aug 2021) and <strong>Data Analyst</strong> (Mar 2020 - May 2020).</li>",
  },
  {
    title: "Reporting Analyst",
    cardImage: "assets/images/experience-page/exl.jpg",
    place: "Datasource Consulting, an EXL company",
    time: "(Aug 2019 - Mar 2020 · Greater Bengaluru Area)",
    desp: "<li>Delivered reporting and data-engineering support in a full-stack analytics environment, including end-to-end advanced analytics implementation.</li><li>Worked across data warehousing and data engineering to produce client-ready insights.</li>",
  },
];

const showCards2 = () => {
  let output = "";
  exp.forEach(
    ({ title, cardImage, place, time, desp }) =>
      (output += `        
    <div class="col gaap" data-aos="fade-up" data-aos-easing="linear" data-aos-delay="100" data-aos-duration="400"> 
      <div class="card card1">
        <img src="${cardImage}" class="featured-image"/>
        <article class="card-body">
          <header>
            <div class="title">
              <h3>${title}</h3>
            </div>
            <p class="meta">
              <span class="pre-heading">${place}</span><br>
              <span class="author">${time}</span>
            </p>
            <ol>
              ${desp}
            </ol>
          </header>
        </article>
      </div>
    </div>
      `)
  );
  experiencecards.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards2);

const volunteership = document.querySelector(".volunteership");
const volunteershipcards = [
  {
    title: "LangChain Ambassador - London",
    cardImage: "assets/images/experience-page/langchain.png",
    description:
      "Host hackathons and workshops, build community connections, and share AI/ML initiatives so practitioners can learn and collaborate. Oct 2025 – Present.",
  },
  {
    title: "STEM Ambassador",
    cardImage: "assets/images/experience-page/stem.png",
    description:
      "STEM Learning UK. Visit schools, lead workshops, and share my career journey to make STEM more accessible and inclusive. Jul 2026 – Present.",
  },
  {
    title: "Student Volunteer - Parichaya",
    cardImage: "assets/images/experience-page/parichaya.png",
    description:
      "Community outreach and team coordination supporting marginalised communities, especially women and girls. Jan 2023 – Jun 2024.",
  },
  {
    title: "Meditation Instructor",
    cardImage: "assets/images/experience-page/osho.png",
    description:
      "Facilitated mindfulness and meditation workshops at Osho Tathagat Meditation Center and Kashish Yoga (2021–2022).",
  },
];

const showCards = () => {
  let output = "";
  volunteershipcards.forEach(
    ({ title, cardImage, description }) =>
      (output += `        
      <div class="card volunteerCard" data-aos="fade-down" data-aos-easing="linear" data-aos-delay="100" data-aos-duration="600" style="height: 550px;width:400px">
      
      <img src="${cardImage}" height="250" width="65" class="card-img" style="border-radius:10px">
      <div class="content">
          <h2 class="volunteerTitle">${title}</h2><br>
          <p class="copy">${description}</p></div>
      
      </div>
      `)
  );
  volunteership.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards);

const hackathonsection = document.querySelector(".hackathon-section");
const mentor = [
  {
    title: "ElevenLabs × UK Government i.AI",
    subtitle: "Builder - FixFirst",
    image: "assets/images/experience-page/elevenlabs.png",
    desp: "Built FixFirst, a voice-first, graph-aware, multi-agent platform for social-housing repair requests. Stack: ElevenLabs, OpenAI, LangGraph, LangSmith, Neo4j, Qdrant, Redis, PostgreSQL, Next.js, and FastAPI.",
    href: "https://www.youtube.com/watch?v=8-3Y8ubYzCI",
  },
  {
    title: "Cognee Hackathon - DeadZone",
    subtitle: "1st Prize · Offline Multi-Agent System",
    image: "assets/images/experience-page/cognee.png",
    desp: "Won 1st prize for DeadZone, a fully offline multi-agent operational continuity system for underground facility teams. Local Gemma 4 via Ollama, Fastify, React/Expo, Redis Streams, and Cognee-inspired memory.",
    href: "https://www.linkedin.com/in/sudipkandel123/",
  },
  {
    title: "Veed.io Hackathon - VeedIT",
    subtitle: "Participant",
    image: "assets/images/project-page/kai.jpg",
    desp: "Built a video generator with auto-subtitles using ElevenLabs, Veed.io, Fal, and Sieve, plus a GraphRAG knowledge graph to relate images and produce live video with music.",
    href: "https://www.linkedin.com/in/sudipkandel123/",
  },
];

const showCards3 = () => {
  let output = "";
  mentor.forEach(
    ({ title, image, subtitle, desp, href }) =>
      (output += `  
      <div class="blog-slider__item swiper-slide">
        <div class="blog-slider__img">
            <img src="${image}" alt="${title}">
        </div>
        <div class="blog-slider__content">
          <div class="blog-slider__title">${title}</div>
          <span class="blog-slider__code">${subtitle}</span>
          <div class="blog-slider__text">${desp}</div>
          <a href="${href}" target="_blank" rel="noopener" class="blog-slider__button">Read More</a>   
        </div>
      </div>
      `)
  );
  hackathonsection.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards3);
