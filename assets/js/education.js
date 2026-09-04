AOS.init();

const moocs = document.querySelector(".moocs");
const moocscards = [
  {
    title: "Introduction to Responsible AI",
    cardImage: "assets/images/education-page/google.png",
    moocLink: "https://www.linkedin.com/in/sudipkandel123/",
  },
  {
    title: "Gemini Enterprise Application",
    cardImage: "assets/images/education-page/google.png",
    moocLink: "https://www.linkedin.com/in/sudipkandel123/",
  },
  {
    title: "Hugging Face AI Agents",
    cardImage: "assets/images/education-page/huggingface.png",
    moocLink: "https://huggingface.co/datasets/agents-course/certificates/resolve/main/certificates/namesudip/2025-02-13.png",
  },
  {
    title: "Multi AI Agent Systems with crewAI",
    cardImage: "assets/images/education-page/deeplearningai.png",
    moocLink: "https://learn.deeplearning.ai/accomplishments/7019231f-4470-4ba8-ae06-199e15b5569c",
  },
  {
    title: "AI Agents in LangGraph",
    cardImage: "assets/images/education-page/deeplearningai.png",
    moocLink: "https://learn.deeplearning.ai/accomplishments/10713b3e-5f20-4a6e-9877-0aad19a4bb4e",
  },
  {
    title: "Databricks Generative AI",
    cardImage: "assets/images/education-page/databricks.png",
    moocLink: "https://credentials.databricks.com/661f7eb1-4272-4fe9-9ed8-871f157666fa",
  },
  {
    title: "Azure Databricks Platform Architect",
    cardImage: "assets/images/education-page/databricks.png",
    moocLink: "https://credentials.databricks.com/48053743-c9cd-4d39-ab23-dcc6e4119bdb",
  },
  {
    title: "Databricks Fundamentals",
    cardImage: "assets/images/education-page/databricks.png",
    moocLink: "https://credentials.databricks.com/c3e39f3a-b7ec-4bf0-af9f-9e9bb01b4d03",
  },
  {
    title: "Executive PG Programme - AI/ML (IIITB)",
    cardImage: "assets/images/education-page/iiitb.png",
    moocLink: "https://www.credential.net/ab27d6df-a01a-4a12-8688-0a6177081786",
  },
  {
    title: "DeepLearning.AI Course",
    cardImage: "assets/images/education-page/deeplearningai.png",
    moocLink: "https://learn.deeplearning.ai/accomplishments/1178941c-a3aa-4cb0-99b4-d64637162ec6",
  },
];

const experience = [
  {
    img: "assets/images/education-page/hf-agents.png",
  },
  {
    img: "assets/images/education-page/google.png",
  },
  {
    img: "assets/images/education-page/databricks.png",
  },
  {
    img: "assets/images/education-page/ljmu.png",
  },
  {
    img: "assets/images/education-page/greenwich.png",
  },
];

let currentItem = 0;

const img = document.getElementById("image");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

window.addEventListener("DOMContentLoaded", function () {
  showExperience();
});

function showExperience() {
  setInterval(function () {
    if (currentItem === experience.length) {
      currentItem = 0;
    }
    const item = experience[currentItem];
    if (img) {
      img.src = item.img;
    }
    currentItem++;
  }, 3000);
}

const showCards = () => {
  let output = "";
  moocscards.forEach(
    ({ title, cardImage, moocLink }) =>
      (output += `        
        <div class="col-6 col-md-3 col-sm-4 column" data-aos="fade-up" data-aos-easing="linear" data-aos-delay="600" >  
            <div class="card mb-3 mx-auto">
               <div class="content">
                  <div class="content-overlay"></div>
                    <img src=${cardImage} class="card-img-top content-image">     
                  <div class="content-details fadeIn-bottom">
                    <a href="${moocLink}" target="_blank"><i class="fa fa-info-circle fa-2x" aria-hidden="true" style="color: white;"></i></a>                                   
                  </div>
                </div>
                <div class="card-body">
                    <h6 class="mt-0 py-2 text-center font-weight-bold mooc-title" style="font-size:12px;">${title}</h6>
                </div>
            </div>
        </div>        
      `)
  );
  if (moocs) {
    moocs.innerHTML = output;
  }
};
document.addEventListener("DOMContentLoaded", showCards);

const bagdes = document.querySelector(".badges");
const badgesection = [
  {
    title: "Introduction to Responsible AI",
    image: "assets/images/education-page/google.png",
    description: "Google · Issued Jul 2026",
  },
  {
    title: "Gemini Enterprise Application",
    image: "assets/images/education-page/google.png",
    description: "Google · Issued Jun 2026",
  },
  {
    title: "Hugging Face AI Agents",
    image: "assets/images/education-page/huggingface.png",
    description: "Issued Feb 2025",
  },
];

const showCards1 = () => {
  if (!bagdes) {
    return;
  }
  let output = "";
  badgesection.forEach(
    ({ title, image, description }) =>
      (output += `       
      <div class="col-lg-4 col-md-6 p-2" data-aos="fade-up" data-aos-easing="linear" data-aos-delay="600"> 
        <img class="img-fluid d-block mb-3 mx-auto hvr-grow" src="${image}" alt="Card image cap" width="200">
          <div class="text-center font-weight-bolder" style="font-size: 1.3em;">${title}</div>
          <div class="text-center text-muted font-weight-bolder p-2">${description}</div>
      </div>`)
  );
  bagdes.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards1);

$(function () {
  window.sr = ScrollReveal();

  if ($(window).width() < 768) {
    if ($(".timeline-content").hasClass("js--fadeInLeft")) {
      $(".timeline-content")
        .removeClass("js--fadeInLeft")
        .addClass("js--fadeInRight");
    }

    sr.reveal(".js--fadeInRight", {
      origin: "right",
      distance: "300px",
      easing: "ease-in-out",
      duration: 800,
    });
  } else {
    sr.reveal(".js--fadeInLeft", {
      origin: "left",
      distance: "300px",
      easing: "ease-in-out",
      duration: 800,
    });

    sr.reveal(".js--fadeInRight", {
      origin: "right",
      distance: "300px",
      easing: "ease-in-out",
      duration: 800,
    });
  }

  sr.reveal(".js--fadeInLeft", {
    origin: "left",
    distance: "300px",
    easing: "ease-in-out",
    duration: 800,
  });

  sr.reveal(".js--fadeInRight", {
    origin: "right",
    distance: "300px",
    easing: "ease-in-out",
    duration: 800,
  });
});
