from django.core.mail import get_connection, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import threading

def get_custom_email_connection():
    from .models import EmailConfiguration
    config = EmailConfiguration.objects.first()
    if not config or not config.smtp_user or not config.smtp_password:
        return None
    return get_connection(
        host=config.smtp_host,
        port=config.smtp_port,
        username=config.smtp_user,
        password=config.smtp_password,
        use_tls=config.use_tls,
    )

def send_qodix_email_async(subject, template_name, context, recipient_list):
    """
    Sends an email asynchronously to avoid blocking the request cycle.
    """
    def send_email():
        try:
            from .models import EmailConfiguration
            connection = get_custom_email_connection()
            if not connection:
                print("Failed to get custom email connection.")
                return False
                
            config = EmailConfiguration.objects.first()
            sender_email = config.smtp_user

            html_content = render_to_string(template_name, context)
            text_content = strip_tags(html_content)
            
            msg = EmailMultiAlternatives(
                subject=subject,
                body=text_content,
                from_email=f"Qodix <{sender_email}>",
                to=[], # Empty 'to'
                bcc=recipient_list, # Use BCC for mass emails or multiple receivers
                connection=connection
            )
            msg.attach_alternative(html_content, "text/html")
            msg.send()
        except Exception as e:
            print(f"Error sending email: {e}")

    thread = threading.Thread(target=send_email)
    thread.start()
