

const addIdeaHandler = document.querySelector('.button');

const getAllIdeas = async ()=>{
  
  //fetch ideas from ideas table in bucketlist db
  let ideas = await fetch('./api/v1/ideas');
  return await ideas.json();
};

const displayIdeas = (allIdeas)=>{
  allIdeas.forEach((idea)=>{
    packageSingleIdea(idea);
  }); 
};

const packageSingleIdea = (idea) => {
  $('.ideas-container').append(`
  <div class="indiv-idea" id=${idea.id}>
    <h2>${idea.title}</h2>
    <p>${idea.description}</p>
  
  </div>
  `);
};


const ideasToPage = async ()=>{
  const allIdeas = await getAllIdeas();
  displayIdeas(allIdeas);
};

const makeNewIdea = ()=>{
  

  const ideaInput = document.querySelector('#title');

  const ideaDescription = document.querySelector('#description');

  const title = ideaInput.value;
  const description = ideaDescription.value;
  
  //post title and description to ideas table in bucketlist db
};



addIdeaHandler.addEventListener('click', makeNewIdea);

$(document).ready(function () {
  ideasToPage();
});
