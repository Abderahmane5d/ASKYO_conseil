 chrome.runtime.sendMessage({ type: 'getHtml' }, (response) => {
    // update the popup HTML with the response from the content script
    console.log(response);
    document.getElementById('response').innerHTML = response;
  });


function getResp(){

  const req = "I received this mail and want you to generate a response for me and i want the response to be formal and professional" + ltr_text.textContent;
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
            const to_inject = data.message;

            console.log("after the fetch");
        })
      }
    })
    .catch(error => console.error(error));
    document.getElementById('response').innerHTML = to_inject;
}