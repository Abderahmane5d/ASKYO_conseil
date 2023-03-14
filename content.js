console.log("Content script running!");
// setTimeout(addButton, 5000);
function addButton() {
  
  console.log("Content script running! addbutton");
    // Create a button element
    const button = document.createElement("button");
    button.innerText = "Generate Response";
    button.classList.add("ams");
    button.classList.add("bkH");
    chrome.runtime.sendMessage({
      type: "getHtml",
      newContent: "This is the new popup content."
    }, (response) => {console.log(response);});
    console.log((button.textContent));
    

    
    // Add the button to the DOM
    const toolbar = document.querySelector("div .amn");
    console.log(toolbar);
    if (toolbar) {
      toolbar.appendChild(button);
    }
    button.addEventListener("click", () =>{

      const ltr_text = document.getElementById(":2a");
      console.log("neg");
      console.log(ltr_text.textContent);
      const req = "I received this mail and want you to generate a response which is formal and professional: " + ltr_text.textContent;
      const req_body = {message: req};
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req_body)
      };

      fetch('https://askyo-api.onrender.com/api/get-response', options)
        .then(response =>{
          if (response.status!=200){
            console.log("an error has later, try later");
          }else{
            response.json()
              .then(data => {
                  console.log(data.message);
                  let to_inject = data.message;
                  // console.log(to_inject);
                  console.log("after the fetch");
                  
                  document.getElementById(':25').click();
                  
                  setTimeout( ()=>{
                    document.getElementById(":95").innerHTML=data.message;
                    const choice = document.createElement("img");
                    choice.src = "./assets/Logo_extension.png"
                    choice.alt=""
                    const bar = document.querySelector("div .aoD");
                    const sub = document.getElementById(":i5");
                    const emailOptions = [
                      " more formal"," moreinformal","funnier","apologetic","promotional"," forsympathy"," for congratulations"," for feedback"," includes a reminder","for personal update","for professional update","for appreciation","for apology"
                    ];

                    setInterval(function() {
                      const req = "I received this mail and want you to generate a response for it which is" + emailOptions[Math.floor(Math.random()*emailOptions.length)]+"  : " + ltr_text.textContent;
                      const req_body = {message: req};
                      const options = {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(req_body)
                      };

                      fetch('https://askyo-api.onrender.com/api/get-response', options)
                        .then(response =>{
                          if (response.status!=200){
                            console.log("an error has occurred , try later");
                          }else{
                            response.json()
                              .then(data => {
                                  console.log(data.message);
                                  document.getElementById(":95").innerHTML=data.message;
                                })
                            }
                          })
                        .catch(error => console.error(error));

                    }, 20000);

                   


                    
                  }, 500);
                  

                  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                      console.log("niiiiiiiiiiiiiiiiiiiiiiiiiiiiga");
                      // send the HTML of the page back to the popup
                      sendResponse(to_inject);
                  });
                })
          }
        })
        .catch(error => console.error(error));

        

        
      



      // const text_label = document.getElementsByClassName("respon");
      // text_label.innerHTML=ltr_text.textContent;
      // console.log(text_label);
      // chrome.runtime.sendMessage({
      //   type: "change_popup_content",
      //   newContent: "This is the new popup content."
      // });
    })
}  
  
  function generateResponse() {
    // Code to generate a response using ChatGPT API
    // ...
  }
  // addButton();
  // Wait for the DOM to load
  window.addEventListener("load", (event) => {
    console.log("DOM entièrement chargé et analysé");
  });
window.addEventListener("load", addButton);