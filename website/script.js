var btn = document.getElementById('convert_btn');
var text_to_convert = "";
        btn.addEventListener('click', alertMe);
        
        

        function alertMe(){
            text_to_convert=document.getElementById('og_text').value
            //console.log(document.getElementById('og_text').value)
            generateAction();
            //console.log(generateAction());
        }
/*const getKey = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['openai-key'], (result) => {
        if (result['openai-key']) {
          const decodedKey = atob(result['openai-key']);
          resolve(decodedKey);
        }
      });
    });
  };*/

  /*const sendMessage = (content) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0].id;
  
      chrome.tabs.sendMessage(
        activeTab,
        { message: 'inject', content },
        (response) => {
          if (response.status === 'failed') {
            console.log('injection failed.');
          }
        }
      );
    });
  };*/

/*const generate = async (prompt) => {

    //console.log(prompt)
  // Get your API key from storage
  const key = "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";
  const url = 'https://api.openai.com/v1/completions';
	
  // Call completions endpoint
  const completionResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 1250,
      temperature: 0.7,
    }),
  });*/

  const generate = async (prompt) => {
    // Get your API key from storage
    //const key = await getKey();
    const key = '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';
    const url = 'https://api.openai.com/v1/completions';
    
    // Call completions endpoint
    const completionResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 1250,
        temperature: 0.7,
      }),
    });
    
    // Select the top choice and send back
    const completion = await completionResponse.json();
    return completion.choices.pop();
    //return completion.choices[0].text;
  }

/*const generateCompletionAction = async (info) => {
	try {
    const { selectionText } = info;
    const basePromptPrefix =
      `
      convert the text below to a gender neutral format
  
      text:
      `;

		// Add this to call GPT-3
    const baseCompletion = await generate(`${basePromptPrefix}${selectionText}`);
    return baseCompletion.text;
    //sendMessage(baseCompletion.text);
    // Let's see what we get!
    //var text_ele = document.getElementsByTagName('p');
    //text_ele.innerHTML=baseCompletion.text;	
    //$("p").text(baseCompletion.text)
    

  } catch (error) {
    console.log(error);
  }
};*/

const generateAction = async() =>{
	try {
    const selectionText = text_to_convert;
    //console.log(selectionText)
    const basePromptPrefix =
      `
      convert the text below to a gender neutral format
  
      text:`;

		// Add this to call GPT-3
    const baseCompletion = await generate(`${basePromptPrefix}${selectionText}`);
    //console.log(baseCompletion.text);
    let changed_text=baseCompletion.text.trim();
    document.getElementById('changed_text').innerHTML = changed_text;
    return baseCompletion.text;
    //sendMessage(baseCompletion.text);
    // Let's see what we get!
    //var text_ele = document.getElementsByTagName('p');
    //text_ele.innerHTML=baseCompletion.text;	
    //$("p").text(baseCompletion.text)
    

  } catch (error) {
    console.log(error);
  }
};

// Add this in scripts/contextMenuServiceWorker.js
/*chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'context-run',
      title: 'Generate text',
      contexts: ['selection'],
    });
  });
  
  // Add listener
  chrome.contextMenus.onClicked.addListener(generateCompletionAction);
  chrome.commands.onCommand.addListener(function(command) {
    if (command === 'toggle-extension') {
      // Trigger your extension here
      generateCompletionAction();
    }
  });*/