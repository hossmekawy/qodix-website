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
        listFields: ['headline'],
        fields: [
            { name: 'headline', label: 'Headline', type: 'text' },
            { name: 'typewriter_words', label: 'Typewriter Words (Comma separated)', type: 'textarea' },
            { name: 'button_1_text', label: 'Button 1 Text', type: 'text' },
            { name: 'button_1_link', label: 'Button 1 Link', type: 'text' },
            { name: 'button_2_text', label: 'Button 2 Text', type: 'text' },
            { name: 'button_2_link', label: 'Button 2 Link', type: 'text' },
        ]
    },
    'settings': {
        name: 'Site Settings',
        endpoint: 'settings',
        singleton: true,
        listFields: ['navbar_logo_text'],
        fields: [
            { name: 'navbar_logo_text', label: 'Navbar Logo Text', type: 'text' },
            { name: 'footer_tagline', label: 'Footer Tagline', type: 'textarea' },
            { name: 'cta_button_text', label: 'CTA Button Text', type: 'text' },
            { name: 'cta_button_link', label: 'CTA Button Link', type: 'text' },
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
            { name: 'content', label: 'Content (HTML/Markdown)', type: 'textarea' },
        ]
    },
    'blogs': {
        name: 'Blog Posts',
        endpoint: 'blogs',
        listFields: ['title', 'category', 'date'],
        fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'slug', label: 'Slug (leave blank to auto-generate)', type: 'text' },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'read_time', label: 'Read Time (e.g. 5 min read)', type: 'text' },
            { name: 'summary', label: 'Summary', type: 'textarea' },
            { name: 'content', label: 'Content (HTML)', type: 'textarea' },
            { name: 'image', label: 'Featured Image', type: 'image' },
            { name: 'author_name', label: 'Author Name', type: 'text' },
            { name: 'author_role', label: 'Author Role', type: 'text' },
            { name: 'author_avatar', label: 'Author Avatar', type: 'image' },
        ]
    },
    'projects': {
        name: 'Projects',
        endpoint: 'projects',
        listFields: ['title', 'category', 'result_metric'],
        fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'slug', label: 'Slug (leave blank to auto-generate)', type: 'text' },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'result_metric', label: 'Result Metric', type: 'text' },
            { name: 'content', label: 'Content (HTML)', type: 'textarea' },
            { name: 'image', label: 'Project Image', type: 'image' },
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
        listFields: ['name'],
        fields: [
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'logo_svg', label: 'Logo SVG/URL', type: 'textarea' },
        ]
    },
    'testimonials': {
        name: 'Testimonials',
        endpoint: 'testimonials',
        listFields: ['client_name', 'company'],
        fields: [
            { name: 'client_name', label: 'Client Name', type: 'text' },
            { name: 'role', label: 'Role', type: 'text' },
            { name: 'company', label: 'Company', type: 'text' },
            { name: 'quote', label: 'Quote', type: 'textarea' },
            { name: 'logo', label: 'Company Logo / Avatar', type: 'image' },
        ]
    },
    'stats': {
        name: 'Stats',
        endpoint: 'stats',
        listFields: ['label', 'value'],
        fields: [
            { name: 'label', label: 'Label', type: 'text' },
            { name: 'value', label: 'Value', type: 'text' },
        ]
    },
    'socials': {
        name: 'Social Links',
        endpoint: 'socials',
        listFields: ['name', 'url'],
        fields: [
            { name: 'name', label: 'Platform Name', type: 'text' },
            { name: 'url', label: 'URL', type: 'text' },
        ]
    },
    'comments': {
        name: 'Comments',
        endpoint: 'comments',
        listFields: ['name', 'post', 'created_at'],
        fields: [
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'text', label: 'Content', type: 'textarea' },
            { name: 'post', label: 'Post ID', type: 'number' },
        ]
    },
    'join': {
        name: 'Job Applications',
        endpoint: 'join',
        listFields: ['name', 'email', 'submitted_at'],
        fields: [
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'email', label: 'Email', type: 'text' },
            { name: 'phone', label: 'Phone', type: 'text' },
            { name: 'cv_base64', label: 'CV (Base64)', type: 'textarea' },
            { name: 'image_base64', label: 'Image (Base64)', type: 'textarea' },
        ]
    },
    'inquiry': {
        name: 'Project Inquiries',
        endpoint: 'inquiry',
        listFields: ['name', 'email', 'submitted_at'],
        fields: [
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'email', label: 'Email', type: 'text' },
            { name: 'phone', label: 'Phone', type: 'text' },
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
