AOS.init();

const projectcards = document.querySelector(".projectcards");

const projects = [
  {
    title: "KAI - No-Code Agentic AI Platform",
    cardImage: "assets/images/project-page/kai.jpg",
    description: "AI Engineering Lead for a production no-code platform that lets organisations create and govern AI assistants.",
    Previewlink: "https://platform.awtg.ai",
    Githublink: "https://platform.awtg.ai",
  },
  {
    title: "Higher-Education AI Platform",
    cardImage: "assets/images/project-page/highered.jpg",
    description: "AI-enabled learning platform covering course creation, tutoring, assessment support, and institutional governance.",
    Previewlink: "https://www.linkedin.com/in/sudipkandel123/",
    Githublink: "https://www.linkedin.com/in/sudipkandel123/",
  },
  {
    title: "FixFirst - Gov.UK Voice AI",
    cardImage: "assets/images/project-page/fixfirst.jpg",
    description: "Voice-first, graph-aware multi-agent platform for social-housing repairs, built at the ElevenLabs × i.AI hackathon.",
    Previewlink: "https://www.youtube.com/watch?v=8-3Y8ubYzCI",
    Githublink: "https://www.linkedin.com/in/sudipkandel123/",
  },
  {
    title: "DeadZone - Offline Multi-Agent Copilot",
    cardImage: "assets/images/project-page/deadzone.jpg",
    description: "1st prize Cognee track. Fully offline multi-agent operational continuity for underground facility teams.",
    Previewlink: "https://www.linkedin.com/in/sudipkandel123/",
    Githublink: "https://www.linkedin.com/in/sudipkandel123/",
  },
  {
    title: "Operations Copilot",
    cardImage: "assets/images/project-page/operations.jpg",
    description: "Enterprise agentic operations platform with LangGraph, MCP tools, Keycloak SSO, and human-in-the-loop approvals.",
    Previewlink: "https://www.linkedin.com/in/sudipkandel123/",
    Githublink: "https://www.linkedin.com/in/sudipkandel123/",
  },
  {
    title: "TN–NTN Network Optimisation",
    cardImage: "assets/images/project-page/network.jpg",
    description: "Applied AI research on predictive mobility management and network-transition decisions in complex comms environments.",
    Previewlink: "https://www.linkedin.com/in/sudipkandel123/",
    Githublink: "https://www.linkedin.com/in/sudipkandel123/",
  },
  {
    title: "Election Sentiment Analysis",
    cardImage: "assets/images/research-page/election.jpg",
    description: "iOS CoreML app analysing live X/Twitter election sentiment. TecHorizon-19 national award.",
    Previewlink: "https://www.researchgate.net/publication/335815184_Election_Sentimental_Analysis_using_Swift",
    Githublink: "https://www.researchgate.net/publication/335815184_Election_Sentimental_Analysis_using_Swift",
  },
  {
    title: "Telecom Churn Case Study",
    cardImage: "assets/images/project-page/operations.jpg",
    description: "End-to-end telecom churn analysis and modelling case study.",
    Previewlink: "https://github.com/sudipkandel123/telecom-churn-case-study",
    Githublink: "https://github.com/sudipkandel123/telecom-churn-case-study",
  },
];

const showCards = () => {
  let output = "";
  projects.forEach(({ title, cardImage, Previewlink, Githublink }) => {
    output += `       
        <div class="column skill-card card" style="margin: 15px"data-aos="zoom-in-up" data-aos-easing="linear" data-aos-delay="300" data-aos-duration="600" >
          <div class="wrapper" style="background: url(${cardImage}) center / cover no-repeat;">
            <div class="header">
            </div>
            <div class="data">
              <div class="content">
              <div class="title-div">
                <h1 class="title"><a href="${Previewlink}" target="_blank" rel="noopener">${title}</a></h1>
                </div>
            <ul class="menu-content"><br>
                  <li><a href="${Previewlink}" target="_blank" rel="noopener" class="social-icon"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 30 28" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-monitor"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></a></li>
                  <li><a href="${Githublink}" target="_blank" rel="noopener" class="social-icon"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 30 28" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>`;
  });
  projectcards.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards);

function myFunction() {
  var input, skillcard, card, title, index;
  input = document.getElementById("myInput").value;
  input = input.toUpperCase();
  skillcard = document.getElementsByClassName("skill-card");
  card = document.getElementsByClassName("card");
  title = document.getElementsByClassName("title");

  for (index = 0; index < title.length; index++) {
    if (title[index].innerHTML.toUpperCase().includes(input)) {
      skillcard[index].style.display = "";
      card[index].style.display = "";
    } else {
      skillcard[index].style.display = "none";
      card[index].style.display = "none";
    }
  }
}
