//retrieve the id of the photagrapher that is stored in the URL params
const urlId = new URLSearchParams(window.location.search).get("id");
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
    });
    console.log(photographer);
  })
  .catch(function (error) {
    console.log(error);
  });
