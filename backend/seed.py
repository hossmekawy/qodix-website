import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'qodix.settings')
django.setup()

from core.models import HeroSection, TechStack, Service, Stat, Project, Testimonial, BlogPost, SiteSettings

def seed():
    # Hero Section
    HeroSection.objects.get_or_create(
        headline="WE CRAFT SOLUTIONS THAT ACCELERATE YOUR SUCCESS.",
        typewriter_words="SOLUTIONS,EXPERIENCES,FUTURES",
        button_1_text="View Our Work",
        button_1_link="#work",
        button_2_text="Get a Quote",
        button_2_link="#contact"
    )

    # Tech Stack
    techs = [
        ("React", "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"),
        ("Node.js", "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"),
        ("AWS", "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"),
        ("Python", "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"),
        ("Flutter", "https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png"),
        ("Next.js", "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"),
        ("Django", "https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg")
    ]
    for i, (name, logo) in enumerate(techs):
        TechStack.objects.get_or_create(name=name, defaults={"logo_svg": logo, "order": i})

    # Services
    services = [
        ("Web & App Dev", "Custom built, high performance applications tailored to your business needs.", "Code"),
        ("AI Integrations", "Leveraging artificial intelligence to automate workflows and unlock new possibilities.", "Cpu"),
        ("Digital Strategy", "Comprehensive digital transformation roadmaps that align with your core objectives.", "TrendingUp")
    ]
    for i, (title, desc, icon) in enumerate(services):
        Service.objects.get_or_create(title=title, defaults={"description": desc, "icon": icon, "order": i})

    # Stats
    stats = [
        ("120+", "Projects Delivered"),
        ("98%", "Client Retention"),
        ("5", "Countries Served"),
        ("3-Week", "Avg. Launch")
    ]
    for i, (value, label) in enumerate(stats):
        Stat.objects.get_or_create(value=value, defaults={"label": label, "order": i})

    # Projects
    projects = [
        ("FinTech Mobile App", "Finance", "Increased user retention by 45%"),
        ("E-Commerce Platform Redesign", "Retail", "Boosted conversion rate by 2.5x"),
        ("AI-Powered CRM Integration", "Enterprise", "Saved 20 hours per week per agent")
    ]
    for i, (title, cat, metric) in enumerate(projects):
        Project.objects.get_or_create(title=title, defaults={"category": cat, "result_metric": metric, "order": i})

    # Testimonials
    testimonials = [
        ("Sarah Jenkins", "CTO", "TechNova", "Qodix delivered our complex application ahead of schedule and with impeccable quality."),
        ("Mark Benson", "Founder", "RetailPro", "The digital transformation strategy provided by Qodix completely revolutionized our operations.")
    ]
    for i, (name, role, company, quote) in enumerate(testimonials):
        Testimonial.objects.get_or_create(client_name=name, defaults={"role": role, "company": company, "quote": quote, "order": i})

    # Blog Posts
    blogs = [
        ("The Future of AI in Web Development", "AI Integration", "5 min read", "Exploring how AI is transforming the way we build and maintain web applications."),
        ("Building Scalable Microservices Architecture", "Backend", "8 min read", "A comprehensive guide to transitioning from monolith to microservices."),
        ("Why 'Quiet Luxury' Design is Taking Over Tech", "Design", "4 min read", "Analyzing the shift towards minimalist, high-contrast, and premium digital experiences.")
    ]
    for title, cat, read_time, summary in blogs:
        BlogPost.objects.get_or_create(title=title, defaults={"category": cat, "read_time": read_time, "summary": summary})

    # Site Settings
    SiteSettings.objects.get_or_create(
        navbar_logo_text="Qodix",
        footer_tagline="Ready to Tech It Easy? Let's talk.",
        cta_button_text="Start a Project",
        cta_button_link="#contact"
    )

    print("Database seeded successfully.")

if __name__ == "__main__":
    seed()
