async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const responseContainer = document.getElementById('response');

    // URL API для создания завершения чата
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                model: "gpt-4", // Укажите используемую модель, если требуется
                messages: [{ // Структура сообщений для API /chat/completions может отличаться
                    'role': 'user', // 'user' для пользователя или 'assistant' для помощника
                    'content': userInput
                }],
                max_tokens: 150
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        responseContainer.innerText = data.choices[0].message.content.trim(); // Обращение к свойству ответа может отличаться
    } catch (error) {
        console.error('Ошибка при запросе к API: ', error);
        responseContainer.innerText = 'Ошибка при получении ответа.';
    }
}
