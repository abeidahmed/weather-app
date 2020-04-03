const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      const { error, location, forecast } = data;
      if (error) {
        return (messageOne.textContent = error);
      }
      messageOne.textContent = location;
      messageTwo.textContent = forecast;
    });
  });
});
