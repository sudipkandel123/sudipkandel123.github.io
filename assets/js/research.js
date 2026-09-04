const researchTable = document.querySelector(".main");

const research = [
  {
    title: "Election Sentimental Analysis",
    authors: "Sudip Kandel",
    conferences: "IJRASET · TecHorizon-19 National Award, New Horizon College of Engineering",
    researchYr: 2019,
    citebox: "popup1",
    image: "assets/images/research-page/election.jpg",
    citation: {
      vancouver:
        "Sudip Kandel. Election Sentimental Analysis using Swift. IJRASET. 5 April 2019. Available from: https://www.researchgate.net/publication/335815184_Election_Sentimental_Analysis_using_Swift",
    },
    abstract:
      "Handy iOS application for live sentiment analysis of X (formerly Twitter) feeds tagged to the 2019 election. Built with Swift, CoreML2, APIs, and SwiftUI. Features include public-reaction insights, a tutorial for new voters, election facts, and search. Awarded best project in TecHorizon-19, a national-level tech contest at New Horizon College of Engineering.",
    absbox: "absPopup1",
  },
];

AOS.init();
const fillData = () => {
  let output = "";
  research.forEach(
    ({
      image,
      title,
      authors,
      conferences,
      researchYr,
      citebox,
      citation,
      absbox,
      abstract,
    }) =>
      (output += `
            <tr data-aos="zoom-in-left"> 
                <td class="imgCol"><img src="${image}" class="rImg" alt="${title}"></td>
                <td class = "researchTitleName">
                    <div class="img-div">
                        <span class="imgResponsive">
                            <img src="${image}" class="imgRes" alt="${title}">
                        </span>
                    </div>
                    <a href="https://www.researchgate.net/publication/335815184_Election_Sentimental_Analysis_using_Swift" target="_blank" rel="noopener" class="paperTitle"> ${title} </a> 
                    <div class = "authors"> ${authors} </div> 
                    
                    <div class="rConferences"> ${conferences} 
                        <div class="researchY">${researchYr}</div>
                    </div>
                    
                    <div class="d-flex" style="margin-right:5%;">
                        <button class="button button-accent button-small text-right button-abstract " type="button" data-toggle="collapse" data-target="#${absbox}" aria-expanded="false" aria-controls="${absbox}">
                            ABSTRACT
                        </button>
                
                        <button class="button button-accent button-small text-right button-abstract " type="button" data-toggle="collapse" data-target="#${citebox}" aria-expanded="false" aria-controls="${citebox}">
                            CITE
                        </button>
                    </div>
                    <div id="${absbox}" class="collapse" aria-labelledby="headingTwo" data-parent=".collapse">
                        <div class="card-body">
                            ${abstract}    
                        </div>
                    </div>
                    <div id="${citebox}" class="collapse" aria-labelledby="headingTwo" data-parent=".collapse">
                        <div class="card-body">
                            ${citation.vancouver}    
                        </div>
                    </div>
                </td>
            </tr>`)
  );
  researchTable.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", fillData);
