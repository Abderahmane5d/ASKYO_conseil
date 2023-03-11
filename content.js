console.log("Content script running!");
setTimeout(addButton, 5000);
function addButton() {
  
  console.log("Content script running! addbutton");
    // Create a button element
    const button = document.createElement("button");
    button.innerText = "Generate Response";
    button.classList.add("ams");
    button.classList.add("bkH");
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

      fetch('http://localhost:8000/api/get-response', options)
        .then(response =>{
          if (response.status!=200){
            console.log("an error has ocuired, try later");
          }else{
            response.json()
              .then(data => {
                  console.log(data.message);
                  let to_inject = data.message;
                  // console.log(to_inject);
                  console.log("after the fetch");
                  document.getElementById(':25').click();
                  // chrome.runtime.sendMessage({
                  //   type: "change_popup_content",
                  //   newContent: to_inject
                  // });
                  setTimeout( ()=>{
                    document.getElementById(":95").innerHTML=data.message;
                    const choice = document.createElement("img");
                    choice.src = "./assets/Logo_extension.png"
                    choice.alt=""
                    // choice.type= "number";
                    const bar = document.getElementsByClassName("btC");
                    // const our_td = document.createElement("td");
                    const sub = document.getElementById(":6d");
                    const emailOptions = [
                      "formal",
                      "informal",
                      "funny",
                      "apologetic",
                      "promotional",
                      "sympathy",
                      "congratulations",
                      "holiday greeting","invitation","feedback","reminder","sales pitch","personal update","professional update","announcement","appreciation","apology","welcome","farewell"
                    ];

                    setInterval(function() {
                      
                    }, intervalTime);

                    if (sub){
                      bar.appendChild(sub);
                    }


                    
                  }, 1000);
                  

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
  
  document.addEventListener("DOMContentLoaded", addButton);