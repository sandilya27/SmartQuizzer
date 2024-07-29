export const twoFactorTemp = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
        }
        .code {
            display: inline-block;
            padding: 10px 20px;
            font-size: 24px;
            color: #fff;
            background-color: #4CAF50;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            letter-spacing: 5px;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777777;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="[Your Logo URL]" alt="SmartQuizzer Logo">
        </div>
        <div class="content">
            <p>Hi QuizWhiz,</p>
            <p>To complete your login, please use the following 6-digit verification code:</p>
            <div class="code">{{code}}</div>
            <p>This code will expire in 10 minutes. If you didn't request this code, please disregard this email.</p>
            <p>If you have any questions or need further assistance, feel free to reach out to our support team at <a href="mailto:support@smartquizzer.com">support@smartquizzer.com</a>.</p>
            <p>Best regards,</p>
            <p>The SmartQuizzer Team</p>
        </div>
        <div class="footer">
            <p>© 2024 SmartQuizzer. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`