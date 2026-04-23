from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    HeroSectionViewSet, TechStackViewSet, ServiceViewSet, 
    StatViewSet, ProjectViewSet, TestimonialViewSet, 
    BlogPostViewSet, SiteSettingsViewSet, HomePageDataView,
    SocialLinkViewSet, PageContentViewSet, JobApplicationViewSet, ProjectInquiryViewSet,
    CommentViewSet, NewsletterSubscriberViewSet, EmailConfigurationViewSet
)

router = DefaultRouter()
router.register(r'hero', HeroSectionViewSet)
router.register(r'tech-stack', TechStackViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'stats', StatViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'testimonials', TestimonialViewSet)
router.register(r'blogs', BlogPostViewSet)
router.register(r'settings', SiteSettingsViewSet)
router.register(r'socials', SocialLinkViewSet)
router.register(r'pages', PageContentViewSet)
router.register(r'email-config', EmailConfigurationViewSet)
router.register(r'join', JobApplicationViewSet, basename='join')
router.register(r'inquiry', ProjectInquiryViewSet, basename='inquiry')
router.register(r'comments', CommentViewSet, basename='comments')
router.register(r'newsletter', NewsletterSubscriberViewSet, basename='newsletter')

urlpatterns = [
    path('homepage-data/', HomePageDataView.as_view(), name='homepage-data'),
    path('', include(router.urls)),
]
