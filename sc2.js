// let button = document.getElementById("btn1");

// button.addEventListener("click", (event) => {
//   event.preventDefault();
//   value();
// });

// const value = async () => {
//   let symptom1 = document.getElementById("s1").value;
//   let symptom2 = document.getElementById("s2").value;
//   let symptom3 = document.getElementById("s3").value;
//   let age = document.getElementById("age").value;
//   let gender = document.querySelector('input[name="gender"]:checked');

//   if (age < 0 || age > 100 || symptom1.length === 0 || symptom2.length === 0 || symptom3.length === 0 || age.length === 0) {
//     value2();
//     return;
//   }

//   try {
//     // Replace 'YOUR_CHATGPT_API_ENDPOINT' with the actual ChatGPT API endpoint
//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer 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', // Replace with your actual API key
//       },
//       body: JSON.stringify({
//         prompt: `Symptoms: ${symptom1}, ${symptom2}, ${symptom3}\nAge: ${age}\nGender: ${gender ? gender.value : "Not specified"}`,
//         // Additional parameters as required by the ChatGPT API
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       displayOutput(data.choices[0]?.text || 'No response from ChatGPT');
//     } else {
//       console.error('ChatGPT API request failed');
//       displayOutput('An error occurred. Please try again.');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     displayOutput('An error occurred. Please try again.');
//   }
// };

// const displayOutput = (result) => {
//   const outputElement = document.querySelector(".output p");
//   if (outputElement) {
//     outputElement.innerHTML = result;
//     document.querySelector(".output").style = "border: 2px solid black;";
//   }
// };

// let button2 = document.getElementById("btn2");

// button2.addEventListener("click", (event) => {
//   event.preventDefault();
//   value2();
// });

// const value2 = () => {
//   document.getElementById("s1").value = "";
//   document.getElementById("s2").value = "";
//   document.getElementById("s3").value = "";
//   document.getElementById("age").value = "";
//   displayOutput('This is an approximate analysis; It is advisable to consult a Medical Professional');
// };

  // change


  const API_KEY = '';
  const submitButton = document.querySelector('#submit');
  const outPutElement = document.querySelector('#output');
  const inputElement1 = document.querySelector('#symptom1');
  const inputElement2 = document.querySelector('#symptom2');
  const inputElement3 = document.querySelector('#symptom3');
  const historyElement = document.querySelector('.history');
  const buttonElement = document.querySelector('#btn2');
  
  function changeInput(value) {
      inputElement1.value = '';
      inputElement2.value = '';
      inputElement3.value = '';
  }
  
  async function getMessage(event) {
      event.preventDefault(); // Prevent the default form submission behavior
  
      const symptoms = `${inputElement1.value} ${inputElement2.value} ${inputElement3.value}`;
  
      // Prompt for expected causes in 20-30 words
      const prompt = `Given symptoms: ${symptoms}. Provide expected causes in 10-20 words.`;
  
      const options = {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [
                  { role: "system", content: "You are a helpful assistant providing information about health issues." },
                  { role: "user", content: symptoms },
                  { role: "assistant", content: prompt }
              ],
              max_tokens: 100
          })
      };
  
      try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', options);
          const data = await response.json();
          console.log(data);
  
          // Display only 20-30 words
          const truncatedAnswer = data.choices[0].message.content.split(' ').slice(0, 50).join(' ');
          outPutElement.textContent = truncatedAnswer + '...';
  
          if (data.choices[0].message.content) {
              const pElement = document.createElement('p');
              pElement.textContent = symptoms;
              pElement.addEventListener('click', () => changeInput(pElement.textContent));
              historyElement.append(pElement);
          }
  
      } catch (error) {
          console.error(error);
      }
  }
  
  function clearInput() {
      inputElement1.value = '';
      inputElement2.value = '';
      inputElement3.value = '';
  }
  
  submitButton.addEventListener('click', getMessage);
  buttonElement.addEventListener('click', clearInput);
  