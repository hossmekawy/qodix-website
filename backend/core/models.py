from django.db import models
from django.utils.text import slugify

class HeroSection(models.Model):
    headline = models.CharField(max_length=255, default="WE CRAFT SOLUTIONS THAT ACCELERATE YOUR SUCCESS.")
    typewriter_words = models.TextField(help_text="Comma-separated words for the typewriter effect (e.g., SOLUTIONS, EXPERIENCES, FUTURES)")
    button_1_text = models.CharField(max_length=50, default="View Our Work")
    button_1_link = models.CharField(max_length=255, default="#work")
    button_2_text = models.CharField(max_length=50, default="Get a Quote")
    button_2_link = models.CharField(max_length=255, default="#contact")

    def __str__(self):
        return "Hero Section Configuration"

class TechStack(models.Model):
    name = models.CharField(max_length=100)
    logo_svg = models.TextField(help_text="SVG code or URL for the logo", blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name

class Service(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    icon = models.CharField(max_length=100, help_text="Lucide icon name (e.g., 'Code', 'Cpu', 'TrendingUp')", blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class Stat(models.Model):
    value = models.CharField(max_length=50)
    label = models.CharField(max_length=100)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.value} {self.label}"

class Project(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    category = models.CharField(max_length=100)
    result_metric = models.CharField(max_length=255)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    content = models.TextField(blank=True, help_text="Rich HTML content for the detail page.")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class Testimonial(models.Model):
    client_name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    quote = models.TextField()
    logo = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.client_name} - {self.company}"

class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    category = models.CharField(max_length=100)
    read_time = models.CharField(max_length=50)
    date = models.DateField(auto_now_add=True)
    summary = models.TextField()
    content = models.TextField(blank=True, help_text="Rich HTML content for the detail page.")
    image = models.ImageField(upload_to='blogs/', blank=True, null=True)
    
    # Author details
    author_name = models.CharField(max_length=100, default="Qodix Team")
    author_role = models.CharField(max_length=100, default="Editorial")
    author_avatar = models.ImageField(upload_to='authors/', blank=True, null=True)

    class Meta:
        ordering = ['-date']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class Comment(models.Model):
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments')
    name = models.CharField(max_length=100)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Comment by {self.name} on {self.post.title}"

class SocialLink(models.Model):
    name = models.CharField(max_length=50)
    url = models.URLField(max_length=255)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name

class PageContent(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    content = models.TextField(help_text="HTML content for static pages like Privacy Policy.")

    def __str__(self):
        return self.title

class JobApplication(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    cv_base64 = models.TextField(blank=True)
    image_base64 = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Job Application: {self.name}"

class ProjectInquiry(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry: {self.name}"

class SiteSettings(models.Model):
    navbar_logo_text = models.CharField(max_length=100, default="Qodix")
    footer_tagline = models.TextField(default="Ready to Tech It Easy? Let's talk.")
    cta_button_text = models.CharField(max_length=50, default="Start a Project")
    cta_button_link = models.CharField(max_length=255, default="#contact")

    def __str__(self):
        return "Site Settings"

class EmailConfiguration(models.Model):
    smtp_host = models.CharField(max_length=255, default='smtp.gmail.com')
    smtp_port = models.IntegerField(default=587)
    smtp_user = models.EmailField(blank=True, null=True)
    smtp_password = models.CharField(max_length=255, blank=True, null=True)
    use_tls = models.BooleanField(default=True)
    
    inquiry_receivers = models.TextField(help_text="Comma-separated list of emails to receive project inquiries (max 5)", blank=True)

    class Meta:
        verbose_name = "Email Configuration"
        verbose_name_plural = "Email Configuration"

    def get_receiver_list(self):
        if not self.inquiry_receivers:
            return []
        return [email.strip() for email in self.inquiry_receivers.split(',') if email.strip()][:5]

    def __str__(self):
        return "Email & Notification Settings"

class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.email
