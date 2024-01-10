async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const responseContainer = document.getElementById('response');
  
     
    const proxyUrl = 'https://chat-gpt-4-alpha-five.vercel.app';
  
    try {
      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "gpt-4-1106-preview",
          messages: [{ 
            'role': 'user',
            'content': userInput
          }],
          max_tokens: 150
        })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      responseContainer.innerText = data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Ошибка при запросе к API: ', error);
      responseContainer.innerText = 'Ошибка при получении ответа.';
    }
  }
  