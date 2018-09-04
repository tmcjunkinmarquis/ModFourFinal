

const addIdeaHandler = document.querySelector('.button');

const getAllIdeas = (event)=>{
  event.preventDefault()
  

  //fetch ideas from ideas table in bucketlist db
  let ideas = fetch('./api/v1/ideas', ()=>{
    
  });
  
};

const makeNewIdea = (event)=>{
  event.preventDefault();

  const ideaInput = document.querySelector('#title');

  const ideaDescription = document.querySelector('#description');

  const title = ideaInput.value;
  const description = ideaDescription.value;
  
  //post title and description to ideas table in bucketlist db
};



addIdeaHandler.addEventListener('click', makeNewIdea);

$(document).ready(function () {
  getAllIdeas();
});
