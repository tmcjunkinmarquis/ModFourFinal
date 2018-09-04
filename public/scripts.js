

const addIdeaHandler = document.querySelector('.button');

const getAllIdeas = async ()=>{
  
  //fetch ideas from ideas table in bucketlist db
  let ideas = await fetch('./api/v1/ideas')
  console.log(await ideas.json());
  return ideas;
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
  getAllIdeas();
});
