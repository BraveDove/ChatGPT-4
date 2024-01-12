async function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  const responseContainer = document.getElementById('response');
  try {
      const response = await fetch('https://chat-gpt-4-alpha-five.vercel.app/api/openai', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ userInput })
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      responseContainer.innerText = data.answer;
  } catch (error) {
      responseContainer.innerText = 'Error: ' + error.message;
  }
}
