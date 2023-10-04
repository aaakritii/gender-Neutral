// Function to get + decode API key
// const getKey = () => {
//     return new Promise((resolve, reject) => {
//       chrome.storage.local.get([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], (result) => {
//         if (result[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]) {
//           const decodedKey = atob(result[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]);
//           resolve(decodedKey);
//         }
//       });
//     });
//   };

const sendMessage = (content) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
  
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
  };

const generate = async (prompt) => {
  // Get your API key from storage
  // const key = await getKey();
  const url = 'https://api.openai.com/v1/completions';
	
  // Call completions endpoint
  const completionResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer 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`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.5,
    }),
  });
	
  // Select the top choice and send back
  const completion = await completionResponse.json();
  return completion.choices.pop();
}

const generateCompletionAction = async (info) => {
	try {
    const { selectionText } = info;
    const basePromptPrefix =
      `
      convert the text below to a gender neutral format
  
      text:
      `;

		// Add this to call GPT-3
    const baseCompletion = await generate(`${basePromptPrefix}${selectionText}`);
    sendMessage(baseCompletion.text);
    // Let's see what we get!
    //var text_ele = document.getElementsByTagName('p');
    //text_ele.innerHTML=baseCompletion.text;	
    //$("p").text(baseCompletion.text)
    

  } catch (error) {
    console.log(error);
  }
};

// Add this in scripts/contextMenuServiceWorker.js
chrome.runtime.onInstalled.addListener(() => {
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
  });