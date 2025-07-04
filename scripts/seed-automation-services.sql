-- Seed automation services data

INSERT INTO automation_services (name, description, category, features, pricing_model, base_price, is_active) VALUES
(
  'LinkedIn Lead Generator',
  'Automatically find and connect with potential customers, partners, and team members on LinkedIn',
  'linkedin',
  ARRAY['Auto-connect requests', 'Profile scraping', 'Lead scoring', 'Message templates', 'Analytics dashboard'],
  'freemium',
  29.99,
  true
),
(
  'Content AI Writer',
  'Generate high-quality blog posts, social media content, and marketing copy using advanced AI',
  'content',
  ARRAY['Blog post generation', 'Social media posts', 'Email templates', 'SEO optimization', 'Brand voice training'],
  'freemium',
  19.99,
  true
),
(
  'Email Campaign Automation',
  'Create, send, and track email campaigns with advanced automation and personalization',
  'email',
  ARRAY['Drag-drop email builder', 'A/B testing', 'Automated sequences', 'Analytics', 'CRM integration'],
  'freemium',
  39.99,
  true
),
(
  'Smart Calling Assistant',
  'AI-powered calling system for lead qualification, customer support, and sales',
  'calling',
  ARRAY['AI voice calls', 'Call scheduling', 'Lead qualification', 'Call recording', 'CRM sync'],
  'paid',
  99.99,
  true
),
(
  'Social Media Manager',
  'Schedule, publish, and analyze your social media content across all platforms',
  'social',
  ARRAY['Multi-platform posting', 'Content calendar', 'Hashtag research', 'Analytics', 'Team collaboration'],
  'freemium',
  24.99,
  true
),
(
  'Customer Support Bot',
  'Intelligent chatbot for customer support, lead capture, and user engagement',
  'support',
  ARRAY['24/7 chat support', 'Lead qualification', 'Knowledge base integration', 'Handoff to humans', 'Analytics'],
  'freemium',
  49.99,
  true
),
(
  'Analytics Dashboard',
  'Comprehensive analytics and reporting for all your business metrics',
  'analytics',
  ARRAY['Real-time dashboards', 'Custom reports', 'Goal tracking', 'Team performance', 'Data export'],
  'freemium',
  34.99,
  true
),
(
  'Investor Outreach',
  'Find and connect with relevant investors for your startup funding rounds',
  'funding',
  ARRAY['Investor database', 'Pitch deck templates', 'Outreach automation', 'Meeting scheduling', 'Follow-up tracking'],
  'paid',
  199.99,
  true
);
