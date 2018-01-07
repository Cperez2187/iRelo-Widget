// Enclosed function to prevent clashing with other JS code on page.

(function() {
  const widgetDiv = document.getElementById('widget');
  const containerDiv = document.createElement('div');
  widgetDiv.setAttribute('style', 'max-width:1000px; margin:auto;');
  containerDiv.setAttribute('style', containerStyle());

  // Setup header
  const header = document.createElement('header');
  const h1 = document.createElement('h1');
  header.setAttribute('style', 'margin:auto;text-align:center;');
  h1.innerText = 'QUOTES';
  header.appendChild(h1);
  containerDiv.appendChild(header);
  
  // Setup 4 quotes
  const quote1 = createQuote('./images/logo.jpg', '$99.99');
  const quote2 = createQuote('./images/moving-02.png', '$84.99');
  const quote3 = createQuote('./images/moving-02.png', '$84.99');
  const quote4 = createQuote('./images/CarLogo.jpg', '$92.99');
  // Append quotes
  containerDiv.appendChild(quote1);
  containerDiv.appendChild(quote2);
  containerDiv.appendChild(quote3);
  containerDiv.appendChild(quote4);

  // Setup quote button
  const quoteBtn = createButton('GET QUOTE');
  containerDiv.appendChild(quoteBtn);

  // Click quote button
  quoteBtn.addEventListener('click', (event) => {

    // Remove all quotes
    containerDiv.removeChild(quote1);
    containerDiv.removeChild(quote2);
    containerDiv.removeChild(quote3);
    containerDiv.removeChild(quote4);
    
    // Remove quote button
    containerDiv.removeChild(quoteBtn);

    // Change to form view
    createFormView(containerDiv);

  });

  // Append to DOM
  widgetDiv.appendChild(containerDiv);

})();


// Create individual quote
function createQuote(logo, quotePrice) {
  const quoteDiv = document.createElement('div');
  quoteDiv.setAttribute('class', 'quotes');
  // Add quote styling
  quoteDiv.setAttribute('style', quoteStyle());
  // Setup body of quote
  quoteDiv.innerHTML = '<img src=' + logo + ' style=' + imgStyle() + '>' +
    '<div style=' + infoStyle() + '>' +
      '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo deleniti atque recusandae commodi.</p>' +
    '</div>' + 
    '<h2 style=' + priceStyle() + '>' + quotePrice + '</h2>'
  ;

  return quoteDiv;
}

// Create Form view 
function createFormView(containerDiv) {
  
  let header;
  // Change text in header h1 tag
  console.log(containerDiv.firstChild.nodeName);
  if (containerDiv.firstChild.nodeName === 'HEADER') {
    header = containerDiv.firstChild;
    header.firstChild.innerText = 'Get Quote';
  }
  
  // Setup form 
  const form = document.createElement('form');
  form.setAttribute('style', formStyle());
  form.innerHTML = '<input id="phone-number" type"text" placeholder="Phone Number" style=' + inputStyle() + '>' + 
    '<input id="email" type"email" placeholder="Email" style=' + inputStyle() + '>'
  ;
  containerDiv.appendChild(form);

  // Setup submit button
  const submitBtn = createButton('SUBMIT');
  containerDiv.appendChild(submitBtn);

  // Click submit button
  submitBtn.addEventListener('click', () => {
    // Get input values
    const phoneNumber = document.getElementById('phone-number').value;
    const email = document.getElementById('email').value;
    
    // Send email as default
    let verify = email;
    // If email is not provided, use number
    if (!email) {
      verify = phoneNumber;
    }

    // Make fetch POST request
    makeRequest(verify);

    // Remove form
    containerDiv.removeChild(form);
    // Remove submit button
    containerDiv.removeChild(submitBtn);
    // Change text in header h1 tag
    header.firstChild.innerText = 'Thank You. You Will Receive Quotes soon.';
    
  });
 
}  

// Create button
function createButton(text) {
  const quoteBtn = document.createElement('button');
  quoteBtn.setAttribute('style', buttonStyle());
  quoteBtn.innerText = text;

  return quoteBtn;
}


/**
|--------------------------------------------------
|                   STYLES
|--------------------------------------------------
*/  

function containerStyle() {
  return (
    'max-width:440px;' +
    'margin:auto;' +
    'padding:15px;' +
    'border:rgb(60, 101, 216) 5px outset;' +
    'box-shadow:0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.3);'
  );
}

function quoteStyle() {
  return (
    'display:inline-flex;' +
    'max-height:50px;' +
    'margin-bottom:15px;' +
    'box-shadow:0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.3);'
  );

}

function imgStyle() {
  return (
    'width:50px;'
  );
}

function infoStyle() {
  return (
    'font-size:12px;' +
    'margin:auto;' +
    'width:60%;'
  );
}

function priceStyle() {
  return (
    'margin:auto;' +
    'font-size:1.5em;' +
    'font-weight:bold;'
  );
}

function buttonStyle() {
  return (
    'margin:1rem auto;' +
    'display:flex;' +
    'height:36px;' +
    'line-height:36px;' +
    'border:none;' +
    'border-radius:2px;' +
    'padding:0 2rem;' +
    'font-size:1rem;' +
    'text-align:center;' +
    'background-color:rgb(60, 101, 216);' +
    'color:#fff;' +
    'outline:0;' +
    'box-shadow:0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.3);'
  );
}

function formStyle() {
  return (
    'display:flex;' +
    'flex-direction:column;'
  );
}

function inputStyle() {
  return (
    'width:80%;' +
    'height:1.5rem;' +
    'font-size:1rem;' +
    'margin:auto;' +
    'margin-bottom:20px'
  );
}

function makeRequest(data) {

  fetch('https://valet.irelo.com/api/widget/auto/coop-embed', {
    method: 'post',
    headers: {
      'Authorization': '4d69e62f60ab-cperez'
    },
    body: data
  }).then((response) => {
    if(response.ok) {
      return console.log('request successful');
    }
    throw new Error('Network response was not ok.');
  }).catch((error) => {
    console.log('Problem with fetch operation: ', error.message);
  });

}