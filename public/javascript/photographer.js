//retrieve the id of the photagrapher that is stored in the URL params
const urlId = new URLSearchParams(window.location.search).get("id");
//Create a variable to store the photographer's information
var photographer;

fetch("../../assets/fishEyeData.json")
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (value) {
    photographer = value.photographers.filter(function (photographer) {
      return photographer.id == urlId;
    })[0];
    //put the photographer name in the head title
    document.title += ` | ${photographer.name}`;

    createHeader(photographer);
    console.log(photographer);
  })
  .catch(function (error) {
    console.log(error);
  });

function createHeader(photographer) {}
