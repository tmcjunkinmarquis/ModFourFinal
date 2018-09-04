const getAllIdeas = async ()=>{
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
    <button class="delete">Delete</button>
  </div>
  `);
};

const ideasToPage = async ()=>{
  const allIdeas = await getAllIdeas();
  displayIdeas(allIdeas);
};

const makeNewIdea = async (event)=>{
  event.preventDefault();
  const ideaInput = document.querySelector('#title');
  const ideaDescription = document.querySelector('#description');
  const title = ideaInput.value;
  const description = ideaDescription.value;
  const optionsObj = {
    method: 'POST',
    body: JSON.stringify({title, description}),
    headers: {'Content-Type':'application/json'}
  };
  const idea = await fetch('./api/v1/ideas', optionsObj);
  const response = await idea.json();
  $('#title').val('');
  $('#description').val('');
  packageSingleIdea(response);
};

const addIdeaHandler = document.querySelector('.button');
addIdeaHandler.addEventListener('click', makeNewIdea);

$(document).ready(function () {
  ideasToPage();
});
