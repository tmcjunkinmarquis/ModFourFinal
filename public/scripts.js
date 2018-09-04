



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

const makeNewIdea = async (event)=>{
  event.preventDefault();
  console.log('howdy');
  
  const ideaInput = document.querySelector('#title');
  const ideaDescription = document.querySelector('#description');
  const title = ideaInput.value;
  const description = ideaDescription.value;
  const optionsObj = {
    method: 'POST',
    body: JSON.stringify({title, description}),
    headers: {'Content-Type':'application/json'}
  };
  await fetch('./api/v1/ideas', optionsObj);
  $('#title').val('');
  $('#description').val('');
};


const addIdeaHandler = document.querySelector('.button');
addIdeaHandler.addEventListener('click', makeNewIdea);

$(document).ready(function () {
  ideasToPage();
});
