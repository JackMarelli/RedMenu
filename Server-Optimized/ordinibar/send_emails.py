import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

smtp_server = "smtp.gmail.com"
sender_email = ""
password = ""
port = 465  # For SSL

def send_new_user_email(receiver_email, username):
    message = MIMEMultipart("alternative")
    message["Subject"] = "Registrazione RedMenu"
    message["From"] = sender_email
    message["To"] = receiver_email

    # Create the plain-text and HTML version of your message

    html = """\
    <html>
    <body>
        <div class = "container">
            <div class="title">Red Menu</div>
            <div class = "content">
                Ciao """ + username + """,<br>
                RedMenu &copy; d&agrave; il benvenuto.<br>
                RedMenu è un'applicazione per ordinare prodotti al bar in modo semplice e veloce.
            </div>
        </div>
    </body>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
        .container{
            border-radius: 15px;
            margin: auto;
            width: 80%;
            border:solid rgb(207, 206, 206) 1px;
            height: 100%;
        }

        .title{
            border-radius: 15px;
            background-color: ff4136;
            width: 100%;
            padding-top: 10px;
            padding-bottom: 10px;
            text-align: center;
            color: white;
            font-family: "Poppins";
            font-size: 30px;
        }

        .content{
            font-family: "Poppins";
            font-size: 16px;
            text-align: center;
        }

    </style>
</html>
    """

    # Turn these into plain/html MIMEText objects
    part2 = MIMEText(html, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part2)

    # Create secure connection with server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(
            sender_email, receiver_email, message.as_string()
        )