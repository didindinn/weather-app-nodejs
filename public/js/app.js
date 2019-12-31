const messageTwo = document.getElementById("message-2");
const loader = document.getElementById("loaderWrapper");

const searchLocation = event => {
  event.preventDefault();

  const address = document.getElementById("inputLocation").value;

  loader.style.display = "flex";
  messageTwo.textContent = "";

  fetch(`/weather?location=${address}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
        loader.style.display = "none";
        return;
      }

      loader.style.display = "none";
      messageTwo.textContent = data.forecast;
    });
  });
};
