"use strict";

const fs = require("fs");
const path = require("path");

const LINKEDIN_RECS =
  "https://www.linkedin.com/in/sudipkandel123/details/recommendations/";
const ACCENTS = [
  "#8b5cf6",
  "#3b82f6",
  "#10b981",
  "#ec4899",
  "#f59e0b",
  "#14b8a6",
  "#f43f5e",
  "#6366f1",
];

const FILTER = {
  AWTG: "awtg",
  ACCENTURE: "accenture",
  EXL: "exl",
};

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function initials(name) {
  const parts = name.replace(/,/g, " ").split(" ").filter(Boolean);
  const first = parts[0] ? parts[0].charAt(0) : "";
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
}

function rec(entry, index) {
  return {
    id: slugify(entry.name),
    name: entry.name,
    role: entry.role,
    relationship: entry.relationship,
    company: entry.company,
    date: entry.date,
    linkedinUrl: entry.linkedinUrl || LINKEDIN_RECS,
    avatarInitials: initials(entry.name),
    accent: ACCENTS[index % ACCENTS.length],
    featured: Boolean(entry.featured),
    filters: entry.filters,
    featuredQuote: entry.featuredQuote,
    message: entry.message,
  };
}

const source = [
  {
    name: "Suganthini Arunachalam",
    role: "Senior QA Engineer",
    relationship: "Worked with Sudip on the same team",
    company: "AWTG",
    date: "August 2026",
    linkedinUrl: "https://www.linkedin.com/in/suganthini-arunachalam-6b147b167/",
    featured: true,
    filters: [FILTER.AWTG],
    featuredQuote:
      "He combined strong ML/model development skills with a genuinely collaborative approach to quality - bringing QA in early.",
    message:
      "I worked with Sudip for several months as a QA engineer while he served as an AI engineer on our team. He combined strong ML/model development skills with a genuinely collaborative approach to quality bringing QA in early, thinking through edge cases with us, and staying open to feedback rather than treating testing as an afterthought. He was reliable, easy to work with, and someone I'd gladly work with again.",
  },
  {
    name: "Volha Nestserava",
    role: "Colleague · Aruva project",
    relationship: "Worked with Sudip on the same team",
    company: "AWTG",
    date: "August 2026",
    linkedinUrl: "https://www.linkedin.com/in/volha-nestserava/",
    featured: true,
    filters: [FILTER.AWTG],
    featuredQuote:
      "I particularly appreciated his ability to explain complex technical topics clearly, discuss different approaches, and always focus on finding the best solution.",
    message:
      "I had the pleasure of working with Sudip at AWTG, where we worked together on the Aruva project. Sudip is a highly knowledgeable and dedicated AI/ML engineer who brings strong technical expertise as well as a thoughtful and collaborative approach to his work. I particularly appreciated his ability to explain complex technical topics clearly, discuss different approaches, and always focus on finding the best solution. He was always open to collaboration, supportive of the team, and willing to share his knowledge. Working with Sudip was a great experience, and I would be happy to recommend him to any team looking for a strong AI/ML professional. I wish Sudip all the best in his next chapter and hope our paths cross again!",
  },
  {
    name: "Desmond Nwanugo",
    role: "Technology Project and Delivery Leader",
    relationship: "Was senior to Sudip but did not manage Sudip directly",
    company: "AWTG",
    date: "June 2026",
    filters: [FILTER.AWTG],
    featuredQuote:
      "Sudip brings valuable insight to all things AI and ML. His contributions helped improve our AI knowledge across the organisation.",
    message:
      "Sudip brings valuable insight to all things AI and ML. His contributions helped improve our AI knowledge across the organisation. He’s proactive and loves to get involved with the team to support in both knowledge and expertise. He’s also good vibes and fun to have around which makes working with him easier. Highly recommend.",
  },
  {
    name: "Vikas Gurung",
    role: "Head of Technology and Data at Trafalgar House Pensions Administration",
    relationship: "Managed Sudip directly",
    company: "AWTG",
    date: "June 2026",
    featured: true,
    filters: [FILTER.AWTG],
    featuredQuote:
      "He combines strong technical knowledge with excellent communication and presentation skills, making him equally effective with technical and non-technical stakeholders.",
    message:
      "I had the pleasure of working with Sudip while I was Director of Software Engineering at AWTG. Sudip is a highly skilled and hardworking technology professional with a particular strength in the AI space. He combines strong technical knowledge with excellent communication and presentation skills, making him equally effective when working with both technical and non-technical stakeholders. One of the things I valued most about Sudip was his willingness to embrace change. During our Agile transformation, when many team members were resistant to new ways of working, Sudip was fully supportive and played an important role in helping the team adapt. He was always open-minded, positive and focused on finding solutions. He is also passionate about continuous learning and keeps himself up to date with the latest technology trends. He regularly attends and organises technical events, which not only broadens his own knowledge but also helps build strong professional networks within the industry. Sudip was always willing to help others, mentor junior developers and share his expertise. I personally learned a great deal from him, particularly in AI-related technologies. Whenever I had questions, he was always happy to explain concepts, demonstrate solutions and share his knowledge enthusiastically. Any organisation would be fortunate to have Sudip on their team. He brings technical excellence, a collaborative mindset and a genuine passion for technology, making him a valuable asset wherever he works.",
  },
  {
    name: "Igors Lapinskis",
    role: "Software Architect / System Design Engineer",
    relationship: "Worked with Sudip on the same team",
    company: "AWTG",
    date: "May 2026",
    featured: true,
    filters: [FILTER.AWTG],
    featuredQuote:
      "He has a rare combination: a deep, current understanding of GenAI and agentic AI, paired with a relentless focus on outcomes.",
    message:
      "I've worked with Sudip on a couple of AI projects, and I'm genuinely inspired by both his technical depth and the way he thinks. He has a rare combination: a deep, current understanding of GenAI and agentic AI, paired with a relentless focus on outcomes. He cares less about elegant theory and more about what actually delivers value, and that mindset shows in everything he ships. If you get a chance to work with Sudip, take it! Strongest possible recommendation!",
  },
  {
    name: "Oleg Koltun",
    role: "AI Fullstack Developer",
    relationship: "Was senior to Sudip but did not manage Sudip directly",
    company: "AWTG",
    date: "May 2026",
    filters: [FILTER.AWTG],
    featuredQuote:
      "He brings a strong combination of technical expertise and business understanding - from AI use-case discovery and strategic planning to technical implementation.",
    message:
      "I would like to kindly recommend Sudip, whom I have closely worked with on two different AI agent projects, including a customer service AI agent and an adaptive education Agentic AI platform that helps students learn according to their individual learning patterns. Throughout our collaboration, Sudip has consistently been proactive, enthusiastic about emerging AI agentic trends, and highly committed to delivering impactful solutions. He brings a strong combination of technical expertise and business understanding - from AI use-case discovery and strategic planning to technical implementation and execution. What stands out most is his ability to bridge business needs with innovative AI solutions while maintaining a collaborative and forward-thinking mindset. Working with him across Aruva, KAI, and other AI initiatives has been a genuinely valuable experience. I would highly recommend Sudip to anyone looking for a knowledgeable, driven, and dependable AI professional.",
  },
  {
    name: "Yury Kutsko",
    role: "AI Software QA Engineer at AWTG",
    relationship: "Worked with Sudip on the same team",
    company: "AWTG",
    date: "May 2026",
    filters: [FILTER.AWTG],
    featuredQuote:
      "His ML expertise plays a key role in the foundation the whole platform is built on - and the reliability is a direct result of his engineering work.",
    message:
      "We’ve been working together on the KAI platform for quite a while now, and you truly deserve the recognition. Your ML expertise plays a key role in some of the most important parts of the product: the RAG pipeline (Pinecone + LangGraph), the multi-LLM aggregator architecture, the Celery-based training workers, and the data quality pipeline that keeps hallucinations under control. These aren’t just standalone features - they’re really the foundation the whole platform is built on. And the fact that everything runs as reliably as it does is a direct result of your engineering work.",
  },
  {
    name: "Aniket Pande",
    role: "Technology Consulting Manager at EY GDS | Palantir Foundry Architect",
    relationship: "Managed Sudip directly",
    company: "AWTG",
    date: "May 2026",
    filters: [FILTER.AWTG],
    featuredQuote:
      "Sudip is a standout AI/ML Engineer who consistently turns complex data challenges into scalable solutions.",
    message:
      "Sudip is a standout AI/ML Engineer who consistently turns complex data challenges into scalable solutions. While reporting to me, he demonstrated deep technical intuition and a relentless drive to ship high-performing models. He is a sharp problem-solver and would be a significant asset to any engineering team.",
  },
  {
    name: "Erkan Berk",
    role: "Software Development Manager",
    relationship: "Managed Sudip directly",
    company: "AWTG",
    date: "February 2026",
    filters: [FILTER.AWTG],
    featuredQuote:
      "He’s an energetic, highly motivated AI/ML developer who takes real initiative, takes ownership, communicates well, and reliably delivers.",
    message:
      "As Sudip's Manager, I can confidently say he’s an energetic, highly motivated AI/ML developer who takes real initiative. He’s consistently positive, always smiling, and brings great momentum to the team. Sudip takes ownership, communicates well, and reliably delivers. I’d strongly recommend him.",
  },
  {
    name: "Mohanapriya Jagannathan",
    role: "AI Data platforms",
    relationship: "Managed Sudip directly",
    company: "AWTG",
    date: "November 2025",
    filters: [FILTER.AWTG],
    featuredQuote:
      "He consistently demonstrated a strong willingness to upskill and adapt, and he always ensured that timelines were met with diligence.",
    message:
      "I had the pleasure of managing Mr.Sudip Kandel during our work on an AI-based anomaly detection project. He consistently demonstrated a strong willingness to upskill and adapt to new technologies aligned with project needs. His ability to work independently and follow through on deliverables was commendable, and he always ensured that timelines were met with diligence. Sudip would be a great asset to any team looking for a dependable and growth-oriented professional.",
  },
  {
    name: "Peter Najm",
    role: "AI Product Manager at AWTG",
    relationship: "Managed Sudip directly",
    company: "AWTG",
    date: "September 2025",
    filters: [FILTER.AWTG],
    featuredQuote:
      "His dedication and enthusiasm always raises the bar for those around him. He faces every challenge with optimism.",
    message:
      "Sudip is an exceptionally hardworking and multitalented AI/ML engineer. His dedication and enthusiasm always raises the bar for those around him. Above all, he faces every challenge with optimism, his positive energy, combined with his genuine smile has the ability to inspire and uplift the entire team and fellow colleagues. On the technical front, Sudip has deep expertise in AI and ML, with a particular focus on LLM and RAG. His ability to design, and implement advanced AI solutions revealed to me his technical brilliance and his innovative thinking.",
  },
  {
    name: "Razia Sultana",
    role: "HRIS implementations",
    relationship: "Worked with Sudip but they were at different companies",
    company: "Consulting",
    date: "August 2025",
    filters: [],
    featuredQuote:
      "He provided valuable advice on integrations and impressed the client with his deep knowledge, experience, dedication, and unwavering support.",
    message:
      "Sudip is a talented and intelligent AI consultant-friendly, consultative, and highly professional. I would strongly recommend him. He provided valuable advice on integrations and impressed the client with his deep knowledge, experience, dedication, and unwavering support. His ability to communicate complex ideas clearly and offer tailored solutions made a significant impact.",
  },
  {
    name: "Umesh Gopalappa",
    role: "Data Engineering Manager at Accenture",
    relationship: "Managed Sudip directly",
    company: "Accenture",
    date: "April 2025",
    filters: [FILTER.ACCENTURE],
    featuredQuote:
      "His expertise in AI/ML, particularly in GenAI - working with LLMs using RAG and fine-tuning - was impressive.",
    message:
      "Sudip Kandel was my reportee for a year during a vertical realignment at Accenture, and he quickly became an essential part of our team. His ability to adapt to new challenges and learn rapidly made him a valuable contributor from the start. His expertise in AI/ML, particularly in GenAI-working with LLMs using RAG and fine-tuning-was impressive. Additionally, his strong grasp of machine learning techniques, such as clustering algorithms for anomaly detection and root cause analysis, played a crucial role in delivering impactful solutions. Beyond his technical skills, Sudip’s strong communication and collaboration abilities made him an excellent team player. His approachability and problem-solving mindset added to his effectiveness in both individual and team-based projects. I highly recommend Sudip for any AI/ML-related role-his combination of technical expertise and soft skills would be a great asset to any team.",
  },
  {
    name: "Khusboo Agarwal",
    role: "Data Engineering, Azure ML, Databricks, Gen AI",
    relationship: "Worked with Sudip on the same team",
    company: "Accenture",
    date: "March 2025",
    filters: [FILTER.ACCENTURE],
    featuredQuote:
      "What stood out was how quickly he picked up new skills - even when he was new to DevOps and Azure Machine Learning.",
    message:
      "Working with Sudip Kandel was a great experience. We worked together on a time series forecasting project where we tested multiple models and improved the accuracy significantly. Our new approach reduced the MAPE by 6-7% across most test datasets, which was a huge improvement over the existing model. Sudip was deeply involved in building and deploying the model. What stood out to me was how quickly he picked up new skills. Even though he was new to DevOps and Azure Machine Learning, he learned fast and successfully deployed the model with versioning in the Azure environment. His ability to adapt and solve problems made a big difference in the project’s success. It was a pleasure collaborating with him, and I truly appreciated his dedication and technical skills. I highly recommend Sudip-he would be a great addition to any team working on AI and machine learning.",
  },
  {
    name: "Monica Gupta",
    role: "Managing Director at Accenture - AI and DATA",
    relationship: "Managed Sudip directly",
    company: "Accenture",
    date: "March 2025",
    filters: [FILTER.ACCENTURE],
    featuredQuote:
      "His openness to continuous learning and problem-solving made him a valuable asset. He grasped complex concepts swiftly and implemented them effectively.",
    message:
      "I had the privilege of being Sudip Kandel’s direct reporting manager and working closely with him on multiple projects. Throughout our time together, Sudip consistently demonstrated a strong ability to learn quickly, adapt to new challenges, and proactively seek opportunities for growth. His openness to continuous learning and problem-solving made him a valuable asset to our team. Whether working on AI-based applications or internal accelerators, he showcased exceptional technical acumen and a results-driven approach. His ability to grasp complex concepts swiftly and implement them effectively was truly commendable. Sudip’s contributions were instrumental in delivering impactful solutions, and his passion for AI/ML-especially in the GenAI space-was evident in every project he took on. I highly recommend him for any AI/ML-related role, as he brings both technical expertise and a strong work ethic that adds great value to any team.",
  },
  {
    name: "Suresh Gudiputi",
    role: "Project Manager - Data Management | Solution Architect",
    relationship: "Managed Sudip directly",
    company: "Accenture",
    date: "March 2025",
    filters: [FILTER.ACCENTURE],
    featuredQuote:
      "I was consistently impressed by his exceptional technical skills, focused mindset, and analytical skills.",
    message:
      "I had the pleasure of collaborating with Sudip on POC work and followed by a project, and I was consistently impressed by his exceptional technical skills, focused mindset, and analytical skills. One aspect that impressed me the thirst he has for gaining knowledge in Python then. I want to highlight his true dedication to work under pressure, proactive mindset for new challenges, surpassing goals with determination and contributed effectively to achieve shared objectives.",
  },
  {
    name: "Anjana Balagopalan",
    role: "Responsible AI Associate Manager",
    relationship: "Worked with Sudip but on different teams",
    company: "Accenture",
    date: "March 2025",
    filters: [FILTER.ACCENTURE],
    featuredQuote:
      "What truly set him apart was his approachability and ability to collaborate seamlessly with the team.",
    message:
      "I had the opportunity to work closely with Sudip Kandel on a project that utilized multiple tools to deliver high-impact solutions. As part of the analytics and data team, Sudip played a crucial role in understanding business requirements and quickly familiarizing himself with domain-specific data. The work focused on root cause analysis and anomaly/exception detection to extract meaningful insights from data, ultimately empowering leadership to make more informed and strategic decisions. By leveraging pre-mediated decision science, critical insights and exceptions were provided to executives, helping improve profitability. Sudip’s expertise in machine learning was instrumental in the success of this project. Beyond technical skills, what truly set him apart was his approachability and ability to collaborate seamlessly with the team. A problem-solving mindset, combined with strong interpersonal skills, made him a pleasure to work with. Highly recommend Sudip for any AI/ML-related role-his combination of technical acumen and teamwork would be a valuable asset to any organization.",
  },
  {
    name: "Akshay Arora",
    role: "AI Product | Data and New Products",
    relationship: "Was senior to Sudip but did not manage Sudip directly",
    company: "Accenture",
    date: "March 2025",
    filters: [FILTER.ACCENTURE],
    featuredQuote:
      "His ability to quickly grasp and implement new technologies stood out. His focus on client insights and a solution-driven approach made a significant impact.",
    message:
      "I had the pleasure of working with Sudip Kandel on multiple projects at Accenture, ranging from internal accelerators to AI-based applications. He was an integral part of our team, demonstrating exceptional technical expertise and a strong commitment to continuous learning. During his tenure as an AI Engineer at Accenture, I closely collaborated with him on various initiatives, where his ability to quickly grasp and implement new technologies stood out. His focus on client insights and solution-driven approach made a significant impact on our projects. Sudip’s active involvement in multiple AI/ML projects, especially in the GenAI space, reflects his deep passion for innovation and problem-solving. I highly recommend him for any AI/ML-related roles, as he brings not only technical excellence but also a proactive mindset that drives meaningful results.",
  },
  {
    name: "Mahitha Anumukonda",
    role: "AI ML Associate Manager",
    relationship: "Worked with Sudip on the same team",
    company: "Accenture",
    date: "March 2025",
    filters: [FILTER.ACCENTURE],
    featuredQuote:
      "He communicates complex technical concepts with clarity, ensuring that both technical and non-technical stakeholders can grasp the solutions being developed.",
    message:
      "I am pleased to write this recommendation for Sudip who has been an integral part of our team as an AI Engineer over the past 2 years. During this time, Sudip has consistently demonstrated a combination of technical expertise, problem-solving abilities, and a passion for developing innovative AI solutions. With 2-3 years of experience in the field, Sudip has quickly developed a strong proficiency in machine learning, deep learning, and natural language processing, LLM building, RAG Frameworks. He had worked on a range of projects, from developing AI models to deploying machine learning algorithms in production environments. Sudip has a deep understanding of Python, Machine learning, deep learning, NLP and other core AI frameworks, which has enabled them to tackle complex problems with creativity and precision. What sets Sudip apart is his ability to not only write efficient, scalable code but also to collaborate effectively within a multidisciplinary team. He communicates complex technical concepts with clarity, ensuring that both technical and non-technical stakeholders can easily grasp the solutions being developed. Sudip also approaches every project with a proactive mindset, always seeking opportunities for optimization and improvement. Beyond technical skills, Sudip is a dedicated and dependable professional who consistently meets deadlines and contributes to a positive work environment. He is always eager to learn new technologies and stay updated with the latest trends in AI, demonstrating a clear commitment to personal and professional growth.",
  },
  {
    name: "Pravinkumar Subramanian",
    role: "Manager - I&F Decision Science Practitioner",
    relationship: "Managed Sudip directly",
    company: "Accenture",
    date: "February 2025",
    filters: [FILTER.ACCENTURE],
    featuredQuote:
      "He has a knack for balancing performance, accuracy, and user experience - an essential skill in AI product development.",
    message:
      "I had the opportunity to work with Sudip Kandel, and I am continually impressed by his expertise in AI, machine learning, and data science. His deep understanding of model optimization and data-driven decision-making makes him an invaluable asset to any AI-driven project. Sudip’s work in OpenAI, particularly in prompt engineering, showcases his ability to fine-tune AI models for real-world applications. His contributions to building a smart chat application demonstrated not only his technical proficiency but also his ability to design intelligent, context-aware conversational agents. He has a knack for balancing performance, accuracy, and user experience-an essential skill in AI product development. Beyond his technical strengths, Sudip is a collaborative and forward-thinking professional who thrives in solving complex challenges. His passion for innovation and problem-solving is truly inspiring. I highly recommend Sudip to anyone looking for a skilled AI/ML expert who can turn ideas into impactful solutions.",
  },
  {
    name: "Ishwarya Sriraman",
    role: "Data Science Assistant Manager | Payments | Risk | Fraud Detection",
    relationship: "Was senior to Sudip but did not manage Sudip directly",
    company: "Accenture",
    date: "February 2025",
    filters: [FILTER.ACCENTURE],
    featuredQuote:
      "His ability to break down complex problems, derive insights from data, and build scalable Machine Learning models is truly impressive.",
    message:
      "I had the pleasure of working with Sudip, and I can confidently say they are one of the most talented Data Scientists I’ve come across. His ability to break down complex problems, derive insights from data, and build scalable Machine Learning models is truly impressive. Beyond technical expertise, Sudip is a great team player, always willing to collaborate cross-functionally to ensure business objectives are met. His passion for AI and continuous learning makes him a valuable asset to any data-driven organization.",
  },
  {
    name: "Lochan Kaushik",
    role: "Customer Experience and Quality Professional",
    relationship: "Was Sudip’s client",
    company: "Freelance",
    date: "February 2025",
    filters: [],
    featuredQuote:
      "His expertise and innovative approach significantly accelerated the development process, making a huge impact on our project.",
    message:
      "I approached Sudip Kandel as a freelance AI developer to help build my AI-based smart personalized application, which processes user data to deliver tailored experiences. His expertise and innovative approach significantly accelerated the development process, making a huge impact on our project. Sudip is highly knowledgeable in AI technologies and has a commendable ability to translate complex concepts into effective, real-world solutions. His technical proficiency, combined with his structured approach to delivering results, made the collaboration seamless and productive. It has been a pleasure working with him, and I highly recommend Sudip to anyone looking for a skilled AI expert who can bring their vision to life with precision and impact.",
  },
  {
    name: "Shiva kumar Peruri",
    role: "Assistant Vice President",
    relationship: "Managed Sudip directly",
    company: "EXL",
    date: "February 2025",
    filters: [FILTER.EXL],
    featuredQuote:
      "What truly set him apart was his client-centric approach. He always prioritized outcomes and strove to create tangible value.",
    message:
      "I had the pleasure of mentoring Sudip when he first started at EXL Services as a fresher after graduating from university. From the very beginning, he showed a strong eagerness to learn and explore new technologies. As his trainer in data and technology, I witnessed firsthand his dedication and ability to grasp complex concepts quickly. During his time at EXL, Sudip learned a wide range of technologies, including SQL and Databricks for data management, Talend and Informatica for ETL, as well as Tableau and Power BI for reporting. Additionally, he developed a solid foundation in various machine learning techniques. My primary role was to facilitate ETL-based training, and Sudip stood out as a remarkable, quick learner-highly focused and committed to delivering meaningful impact. What truly set him apart was his client-centric approach. He always prioritized outcomes and strived to create tangible value through his work. Given his strong technical expertise and problem-solving mindset, I strongly recommend Sudip for any AI/ML-related role in your organization.",
  },
  {
    name: "Tejaswini S R",
    role: "Data Engineer at Accenture AI",
    relationship: "Worked with Sudip on the same team",
    company: "Accenture",
    date: "February 2025",
    filters: [FILTER.ACCENTURE],
    featuredQuote:
      "He has a knack for simplifying complex challenges and applying innovative techniques to achieve the best outcomes.",
    message:
      "I had the privilege of working with Sudip Kandel on various projects, and it was an incredibly valuable experience. His expertise in AI and machine learning, especially in handling time series data, played a key role in generating impactful insights. Sudip’s strong analytical mindset, along with his problem-solving abilities, made a noticeable impact on our work. He has a knack for simplifying complex challenges and applying innovative techniques to achieve the best outcomes. His curiosity and drive to explore new methodologies continuously led to valuable improvements. I highly recommend him for any AI/ML role, as his technical expertise, commitment, and teamwork make him an invaluable asset to any organization.",
  },
  {
    name: "Rabindra Neupane",
    role: "Principal Consultant at RABEENS Technologies",
    relationship: "Was senior to Sudip but did not manage Sudip directly",
    company: "Consulting",
    date: "February 2025",
    filters: [],
    featuredQuote:
      "His proactive approach to learning and applying new technologies ensured seamless integration and enhanced system performance.",
    message:
      "I had the privilege of working with Sudip Kandel on a GenAI-driven RAG-based product, where his technical expertise and adaptability were key to the project's success. Sudip demonstrated an impressive ability to quickly grasp complex concepts in AI, particularly in areas like similarity search, text-to-speech, speech-to-text models, and vector databases. His proactive approach to learning and applying new technologies ensured seamless integration and enhanced system performance. I highly recommend Sudip for any AI or machine learning role, as his skills and proactive mindset make him a valuable asset to any team.",
  },
  {
    name: "Tamilselvi Uthandi",
    role: "Data Engineer",
    relationship: "Was senior to Sudip but did not manage Sudip directly",
    company: "EXL",
    date: "February 2025",
    filters: [FILTER.EXL],
    featuredQuote:
      "The very next day, he presented a fully constructed data model diagram with intricate table structures.",
    message:
      "I was pleased to work with Sudip on an insurance project for a customer in the UK. As a senior team member, I closely collaborated with him and was truly impressed by his ability to grasp complex requirements quickly and deliver solutions independently. One standout moment was when I discussed the project structure and requirements with him-the very next day, he presented a fully constructed data model diagram with intricate table structures. This showcased his exceptional learning agility, analytical thinking, and problem-solving skills. I highly recommend Sudip for any data-driven, analytical, or technical roles. He would be a valuable addition to any organization!",
  },
  {
    name: "Pravin Pathak",
    role: "Data Engineer | Databricks Certified",
    relationship: "Was senior to Sudip but did not manage Sudip directly",
    company: "Consulting",
    date: "February 2025",
    filters: [],
    featuredQuote:
      "He not only understood the technical challenges but also approached them with a problem-solving mindset.",
    message:
      "I had the opportunity to work with Sudip on a AI project here in London, where I needed his expertise in developing a streamlined conversational AI. The project was an AI-powered academic assistant for one of my clients, and while we had successfully gathered data from multiple sources using ETL, we needed help in making it AI-ready. That’s when I reached out to Sudip, and I’m really glad I did. He not only understood the technical challenges but also approached them with a problem-solving mindset. His work in fine-tuning the AI and optimizing the model made a significant difference, and thanks to his contributions, the project was a great success. Sudip is someone I’d highly recommend for any AI/ML-related role. His expertise, professionalism, and ability to deliver impactful solutions truly set him apart.",
  },
  {
    name: "Vatsal Bhandari",
    role: "AI Operations at Mercor",
    relationship: "Worked with Sudip on the same team",
    company: "Imperial College London",
    date: "February 2025",
    filters: [],
    featuredQuote:
      "What sets Sudip apart is his remarkable ability to translate strategic directions into tangible outcomes.",
    message:
      "I had the pleasure of working with Sudip, who was our lead developer, during the AI Ventures Hackathon at Imperial College London. I was genuinely impressed by his enthusiasm, technical expertise, and strategic mindset. From the very start, Sudip brought an infectious energy to the team, always eager to dive into complex challenges with a positive attitude. What sets Sudip apart is his remarkable ability to translate strategic directions into tangible outcomes. He quickly grasped the broader vision of our project and seamlessly aligned his technical skills to realise that vision. Whether developing innovative solutions, optimising process flows, or contributing fresh ideas during brainstorming sessions, his contributions were impactful and inspiring. His technical proficiency, combined with his strong problem-solving skills, significantly contributed to the success of our project. Sudip not only produced high-quality work under tight deadlines but also fostered a collaborative atmosphere that promoted creative thinking within the team. I wholeheartedly recommend Sudip for any role that requires technical excellence, strategic thinking, and a proactive attitude. His proactive nature ensures that tasks are not just completed but also improved upon, making him a tremendous asset to any team.",
  },
  {
    name: "Harshitha Deshpande",
    role: "Senior Software Design Engineer",
    relationship: "Worked with Sudip on the same team",
    company: "Accenture",
    date: "February 2025",
    filters: [FILTER.ACCENTURE],
    featuredQuote:
      "He excels at breaking down complex concepts, fostering collaboration, and driving impactful solutions.",
    message:
      "I had the pleasure of working with Sudip on multiple projects, where his expertise in AI and ML consistently delivered outstanding results. His deep technical knowledge, innovative thinking, and problem-solving skills made complex challenges easier to navigate. Beyond his intelligence, Sudip is highly approachable and a great team player. He excels at breaking down complex concepts, fostering collaboration, and driving impactful solutions. His ability to adapt, mentor, and contribute proactively made working with him a truly enriching experience. I highly recommend Sudip to any team looking for a skilled AI/ML professional. He would be a valuable asset to any organization.",
  },
  {
    name: "Mohd Emad",
    role: "Agentic and Gen AI Solutioning | Associate Manager at Accenture AI",
    relationship: "Was senior to Sudip but did not manage Sudip directly",
    company: "Accenture",
    date: "November 2024",
    filters: [FILTER.ACCENTURE],
    featuredQuote:
      "Sudip was instrumental in bringing this project to fruition with his innovative ideas and outstanding technical expertise.",
    message:
      "I had the opportunity to collaborate with Sudip on a project involving the implementation of a text-to-SQL chatbot. This chatbot utilized comprehensive marketing data across the client's three main domains: marketing, sales, and retail. Sudip was instrumental in bringing this project to fruition with his innovative ideas and outstanding technical expertise. The solution received recognition from the client and significantly enhanced client value. It was also positively received by the leadership. Sudip's contributions make him a valuable asset to any team he joins.",
  },
  {
    name: "Vinay Y",
    role: "Full Stack Developer",
    relationship: "Worked with Sudip on the same team",
    company: "EXL",
    date: "October 2024",
    filters: [FILTER.EXL],
    featuredQuote:
      "His ability to implement and fine-tune models for business needs was impressive, and he effectively communicated complex concepts to both technical and non-technical teams.",
    message:
      "In my experience working with Sudip at EXL, he consistently demonstrated strong expertise in Machine Learning and AI. His ability to implement and fine-tune models for business needs was impressive, and he effectively communicated complex concepts to both technical and non-technical teams. Sudip's problem-solving skills and collaboration made him a valuable team member, and I highly recommend him for any role in AI/ML",
  },
  {
    name: "Arunima Sarkar",
    role: "Data Science Manager at Accenture",
    relationship: "Managed Sudip directly",
    company: "Accenture",
    date: "July 2024",
    filters: [FILTER.ACCENTURE],
    featuredQuote:
      "He has the ability to understand complex business problems, dedication to solve it with his technical expertise and deliver quality work on time.",
    message:
      "I have worked with Sudip for a critical project over a very tight schedule. He has the ability to understand complex business problems, dedication to solve it with his technical expertise and deliver quality work on time. He is genuinely recommended for any data science related project in future.",
  },
  {
    name: "Nishant Sharma",
    role: "AI Consultant | Building GenAI and Analytics Solutions",
    relationship: "Managed Sudip directly",
    company: "Accenture",
    date: "July 2024",
    filters: [FILTER.ACCENTURE],
    featuredQuote:
      "He personifies what a full stack data scientist looks like - from development to deployment, failing fast, and landing holistic solutions.",
    message:
      "I have worked with Sudip on 3-4 high visibility projects and Sudip has been an excellent addition to the team. He is a problem solver and can think of innovative solutions to any problem in hand. I have seen him take up the whole ML lifecycle from development to deployment. He personifies what a full stack data scientist looks like. Over the last 1 year, he has picked up GenAI frameworks really well and have delivered quick client POC which then helped us scale it to enterprise application. He has played a significant role in developing one of the GenAI asset in Accenture which is a hit. I also want to highlight his approach to failing fast and try multiple methodologies which gives us a edge to always come up with the holistic solutions in the end. I would love to work with Sudip whenever i get a chance and he will be the perfect choice for anyone looking at building their data science practice.",
  },
  {
    name: "Sanjana Singh",
    role: "Senior Software Engineer | Building next-gen Agentic AI",
    relationship: "Worked with Sudip but on different teams",
    company: "Accenture",
    date: "July 2024",
    filters: [FILTER.ACCENTURE],
    featuredQuote:
      "He quickly adapts to new technologies, leads with insight, and is approachable.",
    message:
      "Working with Sudip Kandel at Accenture has been a great experience. He quickly adapts to new technologies, leads with insight, and is approachable. His strong technical skills and leadership skills were commendable. I highly recommend him for any AI or data science roles.",
  },
  {
    name: "Rushali Raina",
    role: "Data Analyst | Business Intelligence and Product Analytics",
    relationship: "Worked with Sudip but on different teams",
    company: "Accenture",
    date: "July 2024",
    filters: [FILTER.ACCENTURE],
    featuredQuote:
      "Sudip consistently demonstrated quick adaptability to changing client requests and needs.",
    message:
      "I had the pleasure of working with Sudip Kandel on several data science and NLP-based client projects, particularly in the retail sector where we implemented time series forecasting and natural language summarization techniques. Sudip consistently demonstrated quick adaptability to changing client requests and needs. Beyond his technical expertise, Sudip exhibited strong leadership qualities and a robust approach to problem-solving. His critical thinking and problem-solving abilities were impressive, and his excellent communication skills made him a valuable asset to our team. Sudip's commitment to delivering high-quality work and his ability to navigate complex challenges are truly commendable. I highly recommend him for any data science or AI-driven projects.",
  },
  {
    name: "Ambreesh Pothuraju",
    role: "Senior BI Developer",
    relationship: "Worked with Sudip on the same team",
    company: "Accenture",
    date: "July 2024",
    filters: [FILTER.ACCENTURE],
    featuredQuote:
      "He played a key role in a data analytic project, with strong experience in data modeling, Python, and machine learning.",
    message:
      "I recommend sudip he played a key role in data analytic project. He has good experience in data modeling, python programming and machine learning. I strongly recommend sudip for data analytic projects. Hope this will help you in on going project. All the best for your future.",
  },
  {
    name: "Prathippa Devi",
    role: "Data Engineer | Azure, Spark, Python and SQL",
    relationship: "Was senior to Sudip but did not manage Sudip directly",
    company: "EXL",
    date: "July 2024",
    filters: [FILTER.EXL],
    featuredQuote:
      "Despite being with the company for only a few months, Sudip's dedication, enthusiasm, and ability to deliver tasks swiftly were outstanding.",
    message:
      "I had the privilege of managing Sudip during a project for a UK-based healthcare client at EXL Services. Despite being with the company for only a few months, Sudip's dedication, enthusiasm, and ability to deliver tasks swiftly and efficiently were nothing short of outstanding. From the outset, Sudip showcased a remarkable ability to grasp complex concepts and technologies with ease. His proficiency in rapidly learning new technologies, such as PySpark and advanced data science techniques, was particularly impressive. Sudip seamlessly adapted to changes and leveraged his skills to bring valuable insights and significant impact to our client's project. Sudip's innovative approach and keen analytical skills played a crucial role in the project's success. He was able to identify key areas for improvement and implemented solutions that enhanced the overall performance and efficiency of the project. His contributions were highly valued by both the team and the client. In addition to his technical expertise, Sudip demonstrated exceptional collaboration and leadership qualities. He worked seamlessly with team members, contributing to a positive and productive work environment. His ability to communicate effectively and maintain professionalism, even under pressure, was commendable. Sudip's outstanding performance and commitment to excellence make him an invaluable asset to any team. I am confident that he will continue to excel in his future endeavors and wish him all the best as he progresses in his career.",
  },
  {
    name: "G Ankitha Shetty",
    role: "Manager - HSBC",
    relationship: "Worked with Sudip on the same team",
    company: "EXL",
    date: "July 2024",
    filters: [FILTER.EXL],
    featuredQuote:
      "Despite being a fresher, Sudip took on the challenge with enthusiasm and dedication, and his contributions created significant value for the client.",
    message:
      "I had the pleasure of working with Sudip during his tenure at EXL Services, and I am thoroughly impressed by his contributions and achievements. As a quick learner with a keen interest in technology, Sudip quickly excelled and delivered outstanding results. His ability to learn and adapt to new technologies was remarkable. Despite being a fresher, Sudip took on the challenge with enthusiasm and dedication. He successfully collaborated with the team and demonstrated great leadership qualities. His professionalism and commitment were instrumental in securing and delivering a critical client project. Sudip's contributions created significant value for one of our clients. His innovative approach and technical expertise ensured the project's success, leaving a lasting positive impact. I highly recommend Sudip for any future endeavors. His combination of technical skills, leadership qualities, and professionalism makes him an invaluable asset to any team.",
  },
];

const recommendations = source.map(rec);

const fileContents =
  '"use strict";\n\n' +
  "const RECOMMENDATION_FILTER = {\n" +
  '  ALL: "all",\n' +
  '  AWTG: "awtg",\n' +
  '  ACCENTURE: "accenture",\n' +
  '  EXL: "exl",\n' +
  "};\n\n" +
  "const RECOMMENDATION_FILTERS = [\n" +
  "  { id: RECOMMENDATION_FILTER.ALL, label: \"All\" },\n" +
  "  { id: RECOMMENDATION_FILTER.AWTG, label: \"AWTG\" },\n" +
  "  { id: RECOMMENDATION_FILTER.ACCENTURE, label: \"Accenture\" },\n" +
  "  { id: RECOMMENDATION_FILTER.EXL, label: \"EXL\" },\n" +
  "];\n\n" +
  "const RECOMMENDATIONS = " +
  JSON.stringify(recommendations, null, 2) +
  ";\n\n" +
  "const RECOMMENDATION_THEMES = [\n" +
  "  {\n" +
  '    id: "quality",\n' +
  '    title: "Quality from day one",\n' +
  '    summary: "Brings QA in early, thinks through edge cases, and treats testing as part of delivery - not an afterthought.",\n' +
  '    source: "Suganthini Arunachalam",\n' +
  '    accent: "#ec4899",\n' +
  "  },\n" +
  "  {\n" +
  '    id: "clarity",\n' +
  '    title: "Technical clarity",\n' +
  '    summary: "Explains complex AI/ML topics clearly and compares approaches until the team lands on the best solution.",\n' +
  '    source: "Volha Nestserava",\n' +
  '    accent: "#3b82f6",\n' +
  "  },\n" +
  "  {\n" +
  '    id: "outcomes",\n' +
  '    title: "Outcomes over theory",\n' +
  '    summary: "Pairs a current grasp of GenAI and agentic AI with a relentless focus on what actually delivers value.",\n' +
  '    source: "Igors Lapinskis",\n' +
  '    accent: "#10b981",\n' +
  "  },\n" +
  "  {\n" +
  '    id: "collaboration",\n' +
  '    title: "Open collaboration",\n' +
  '    summary: "Mentors others, communicates across technical and non-technical stakeholders, and helps teams adapt.",\n' +
  '    source: "Vikas Gurung",\n' +
  '    accent: "#8b5cf6",\n' +
  "  },\n" +
  "];\n";

const outPath = path.join(__dirname, "..", "assets/js/recommendations-data.js");
fs.writeFileSync(outPath, fileContents);
console.log("wrote " + recommendations.length + " recommendations to " + outPath);
