from rest_framework import viewsets, views, status, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.permissions import BasePermission, SAFE_METHODS, IsAdminUser

from .models import (
    HeroSection, TechStack, Service, Stat, Project, Testimonial, 
    BlogPost, SiteSettings, SocialLink, PageContent, JobApplication, ProjectInquiry,
    Comment, NewsletterSubscriber, EmailConfiguration
)
from .serializers import (
    HeroSectionSerializer, TechStackSerializer, ServiceSerializer, 
    StatSerializer, ProjectSerializer, TestimonialSerializer, 
    BlogPostSerializer, SiteSettingsSerializer, SocialLinkSerializer, 
    PageContentSerializer, JobApplicationSerializer, ProjectInquirySerializer,
    CommentSerializer, NewsletterSubscriberSerializer, EmailConfigurationSerializer
)
from .utils import send_qodix_email_async

class IsAdminOrReadOnly(BasePermission):
    """
    The request is authenticated as an admin, or is a read-only request.
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)

class IsAdminOrPostOnly(BasePermission):
    """
    The request is authenticated as an admin, or is a POST request (for public submissions).
    """
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return bool(request.user and request.user.is_staff)


class HeroSectionViewSet(viewsets.ModelViewSet):
    queryset = HeroSection.objects.all()
    serializer_class = HeroSectionSerializer
    permission_classes = [IsAdminOrReadOnly]

class TechStackViewSet(viewsets.ModelViewSet):
    queryset = TechStack.objects.all()
    serializer_class = TechStackSerializer
    permission_classes = [IsAdminOrReadOnly]

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminOrReadOnly]

class StatViewSet(viewsets.ModelViewSet):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer
    permission_classes = [IsAdminOrReadOnly]

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category']
    search_fields = ['title', 'category']
    permission_classes = [IsAdminOrReadOnly]

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [IsAdminOrReadOnly]

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category']
    search_fields = ['title', 'summary', 'category']
    permission_classes = [IsAdminOrReadOnly]

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAdminOrPostOnly]

class SocialLinkViewSet(viewsets.ModelViewSet):
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer
    permission_classes = [IsAdminOrReadOnly]

class PageContentViewSet(viewsets.ModelViewSet):
    queryset = PageContent.objects.all()
    serializer_class = PageContentSerializer
    lookup_field = 'slug'
    permission_classes = [IsAdminOrReadOnly]

class SiteSettingsViewSet(viewsets.ModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer
    permission_classes = [IsAdminOrReadOnly]

class EmailConfigurationViewSet(viewsets.ModelViewSet):
    queryset = EmailConfiguration.objects.all()
    serializer_class = EmailConfigurationSerializer
    permission_classes = [IsAdminUser] # Only admins should even see this config

class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    permission_classes = [IsAdminOrPostOnly]

class NewsletterSubscriberViewSet(viewsets.ModelViewSet):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer
    permission_classes = [IsAdminOrPostOnly]

class ProjectInquiryViewSet(viewsets.ModelViewSet):
    queryset = ProjectInquiry.objects.all()
    serializer_class = ProjectInquirySerializer
    permission_classes = [IsAdminOrPostOnly]

    def perform_create(self, serializer):
        inquiry = serializer.save()
        config = EmailConfiguration.objects.first()
        if config and config.inquiry_receivers:
            receivers = config.get_receiver_list()
            if receivers:
                send_qodix_email_async(
                    subject=f"New Project Inquiry - {inquiry.name}",
                    template_name="emails/inquiry_notification.html",
                    context={'inquiry': inquiry},
                    recipient_list=receivers
                )

class HomePageDataView(views.APIView):
    """
    A single endpoint to fetch all data needed for the homepage.
    """
    permission_classes = [] # Publicly accessible
    def get(self, request):
        hero = HeroSection.objects.first()
        settings = SiteSettings.objects.first()
        
        data = {
            'hero': HeroSectionSerializer(hero, context={'request': request}).data if hero else None,
            'settings': SiteSettingsSerializer(settings, context={'request': request}).data if settings else None,
            'tech_stack': TechStackSerializer(TechStack.objects.all(), many=True, context={'request': request}).data,
            'services': ServiceSerializer(Service.objects.all(), many=True, context={'request': request}).data,
            'stats': StatSerializer(Stat.objects.all(), many=True, context={'request': request}).data,
            'projects': ProjectSerializer(Project.objects.all(), many=True, context={'request': request}).data,
            'testimonials': TestimonialSerializer(Testimonial.objects.all(), many=True, context={'request': request}).data,
            'blogs': BlogPostSerializer(BlogPost.objects.all()[:3], many=True, context={'request': request}).data,
            'socials': SocialLinkSerializer(SocialLink.objects.all(), many=True, context={'request': request}).data,
        }
        return Response(data)
