export type FieldConfig = {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'boolean' | 'image' | 'date';
};

export type EntityConfig = {
    endpoint: string;
    name: string;
    singleton?: boolean; // If true, we just edit the first item directly
    fields: FieldConfig[];
    listFields: string[]; // Fields to show in the table
};

export const NEXUS_ENTITIES: Record<string, EntityConfig> = {
    'hero': {
        name: 'Hero Section',
        endpoint: 'hero',
        singleton: true,
        listFields: ['title', 'subtitle'],
        fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea' },
            { name: 'button_text', label: 'Button Text', type: 'text' },
            { name: 'button_link', label: 'Button Link', type: 'text' },
            { name: 'background_video', label: 'Background Video', type: 'text' },
        ]
    },
    'settings': {
        name: 'Site Settings',
        endpoint: 'settings',
        singleton: true,
        listFields: ['site_name'],
        fields: [
            { name: 'site_name', label: 'Site Name', type: 'text' },
            { name: 'contact_email', label: 'Contact Email', type: 'text' },
            { name: 'contact_phone', label: 'Contact Phone', type: 'text' },
            { name: 'address', label: 'Address', type: 'textarea' },
            { name: 'footer_text', label: 'Footer Text', type: 'textarea' },
        ]
    },
    'email-config': {
        name: 'Email Configuration',
        endpoint: 'email-config',
        singleton: true,
        listFields: ['smtp_host'],
        fields: [
            { name: 'smtp_host', label: 'SMTP Host', type: 'text' },
            { name: 'smtp_port', label: 'SMTP Port', type: 'number' },
            { name: 'smtp_user', label: 'SMTP User', type: 'text' },
            { name: 'smtp_password', label: 'SMTP Password', type: 'text' },
            { name: 'use_tls', label: 'Use TLS', type: 'boolean' },
            { name: 'default_from_email', label: 'Default From Email', type: 'text' },
            { name: 'inquiry_receivers', label: 'Inquiry Receivers (comma separated)', type: 'textarea' },
        ]
    },
    'pages': {
        name: 'Page Content',
        endpoint: 'pages',
        listFields: ['title', 'slug'],
        fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'slug', label: 'Slug', type: 'text' },
            { name: 'content', label: 'Content (Markdown)', type: 'textarea' },
        ]
    },
    'blogs': {
        name: 'Blog Posts',
        endpoint: 'blogs',
        listFields: ['title', 'category', 'created_at'],
        fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'slug', label: 'Slug', type: 'text' },
            { name: 'summary', label: 'Summary', type: 'textarea' },
            { name: 'content', label: 'Content (Markdown)', type: 'textarea' },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'author', label: 'Author', type: 'text' },
            { name: 'featured_image', label: 'Featured Image', type: 'image' },
        ]
    },
    'projects': {
        name: 'Projects',
        endpoint: 'projects',
        listFields: ['title', 'client', 'category'],
        fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'slug', label: 'Slug', type: 'text' },
            { name: 'client', label: 'Client', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'challenge', label: 'Challenge', type: 'textarea' },
            { name: 'solution', label: 'Solution', type: 'textarea' },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'live_url', label: 'Live URL', type: 'text' },
            { name: 'github_url', label: 'Github URL', type: 'text' },
            { name: 'featured_image', label: 'Featured Image', type: 'image' },
        ]
    },
    'services': {
        name: 'Services',
        endpoint: 'services',
        listFields: ['title', 'icon'],
        fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'icon', label: 'Icon (Lucide name)', type: 'text' },
        ]
    },
    'tech-stack': {
        name: 'Tech Stack',
        endpoint: 'tech-stack',
        listFields: ['name', 'category'],
        fields: [
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'icon_url', label: 'Icon URL', type: 'text' },
        ]
    },
    'testimonials': {
        name: 'Testimonials',
        endpoint: 'testimonials',
        listFields: ['client_name', 'company'],
        fields: [
            { name: 'client_name', label: 'Client Name', type: 'text' },
            { name: 'company', label: 'Company', type: 'text' },
            { name: 'content', label: 'Content', type: 'textarea' },
            { name: 'avatar', label: 'Avatar', type: 'image' },
            { name: 'rating', label: 'Rating (1-5)', type: 'number' },
        ]
    },
    'stats': {
        name: 'Stats',
        endpoint: 'stats',
        listFields: ['label', 'value'],
        fields: [
            { name: 'label', label: 'Label', type: 'text' },
            { name: 'value', label: 'Value', type: 'text' },
            { name: 'suffix', label: 'Suffix', type: 'text' },
            { name: 'icon', label: 'Icon', type: 'text' },
        ]
    },
    'socials': {
        name: 'Social Links',
        endpoint: 'socials',
        listFields: ['platform', 'url'],
        fields: [
            { name: 'platform', label: 'Platform', type: 'text' },
            { name: 'url', label: 'URL', type: 'text' },
            { name: 'icon', label: 'Icon (Lucide name)', type: 'text' },
        ]
    },
    'comments': {
        name: 'Comments',
        endpoint: 'comments',
        listFields: ['name', 'post', 'created_at'],
        fields: [
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'content', label: 'Content', type: 'textarea' },
            { name: 'post', label: 'Post ID', type: 'number' },
        ]
    },
    'join': {
        name: 'Job Applications',
        endpoint: 'join',
        listFields: ['name', 'email', 'role', 'created_at'],
        fields: [
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'email', label: 'Email', type: 'text' },
            { name: 'role', label: 'Role', type: 'text' },
            { name: 'portfolio_url', label: 'Portfolio URL', type: 'text' },
            { name: 'cover_letter', label: 'Cover Letter', type: 'textarea' },
        ]
    },
    'inquiry': {
        name: 'Project Inquiries',
        endpoint: 'inquiry',
        listFields: ['name', 'email', 'budget', 'created_at'],
        fields: [
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'email', label: 'Email', type: 'text' },
            { name: 'company', label: 'Company', type: 'text' },
            { name: 'project_type', label: 'Project Type', type: 'text' },
            { name: 'budget', label: 'Budget', type: 'text' },
            { name: 'details', label: 'Details', type: 'textarea' },
        ]
    },
    'newsletter': {
        name: 'Newsletter Subscribers',
        endpoint: 'newsletter',
        listFields: ['email', 'subscribed_at'],
        fields: [
            { name: 'email', label: 'Email', type: 'text' },
        ]
    },
};
