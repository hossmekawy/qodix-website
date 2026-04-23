from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import BlogPost, Project, NewsletterSubscriber
from .utils import send_qodix_email_async

@receiver(post_save, sender=BlogPost)
def notify_subscribers_new_blog(sender, instance, created, **kwargs):
    if created:
        subscribers = NewsletterSubscriber.objects.filter(is_active=True).values_list('email', flat=True)
        if subscribers:
            send_qodix_email_async(
                subject=f"New Insight from Qodix: {instance.title}",
                template_name="emails/newsletter_blog.html",
                context={'post': instance},
                recipient_list=list(subscribers)
            )

@receiver(post_save, sender=Project)
def notify_subscribers_new_project(sender, instance, created, **kwargs):
    if created:
        subscribers = NewsletterSubscriber.objects.filter(is_active=True).values_list('email', flat=True)
        if subscribers:
            send_qodix_email_async(
                subject=f"New Work from Qodix: {instance.title}",
                template_name="emails/newsletter_project.html",
                context={'project': instance},
                recipient_list=list(subscribers)
            )
