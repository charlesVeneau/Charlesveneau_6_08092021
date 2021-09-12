var photographers;

fetch("../../assets/fishEyeData.json")
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (value) {
    photographers = value.photographers;
    console.log(photographers);
  })
  .catch(function (error) {
    console.log(error);
  });
