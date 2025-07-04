-- Fix the profiles table to include missing columns
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS website_url TEXT,
ADD COLUMN IF NOT EXISTS github_url TEXT,
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS skills TEXT[],
ADD COLUMN IF NOT EXISTS experience_years INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS availability TEXT DEFAULT 'Available',
ADD COLUMN IF NOT EXISTS hourly_rate INTEGER,
ADD COLUMN IF NOT EXISTS points_earned INTEGER DEFAULT 0;

-- Add missing columns to tapris table
ALTER TABLE tapris 
ADD COLUMN IF NOT EXISTS banner_url TEXT,
ADD COLUMN IF NOT EXISTS logo_url TEXT,
ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS upvotes INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS downvotes INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS linkedin_import_data JSONB;

-- Create votes table for upvote/downvote functionality
CREATE TABLE IF NOT EXISTS tapri_votes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tapri_id UUID REFERENCES tapris(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    vote_type TEXT CHECK (vote_type IN ('upvote', 'downvote')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(tapri_id, user_id)
);

-- Create blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    author_id UUID REFERENCES auth.users(id),
    published BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    tags TEXT[],
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create automation services table (enhanced)
CREATE TABLE IF NOT EXISTS automation_services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    icon TEXT,
    category TEXT NOT NULL,
    pricing TEXT,
    features TEXT[],
    demo_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    popularity_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE tapri_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_services ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view votes" ON tapri_votes FOR SELECT USING (true);
CREATE POLICY "Users can insert their own votes" ON tapri_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own votes" ON tapri_votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own votes" ON tapri_votes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view published blog posts" ON blog_posts FOR SELECT USING (published = true OR auth.uid() = author_id);
CREATE POLICY "Authors can manage their posts" ON blog_posts FOR ALL USING (auth.uid() = author_id);

CREATE POLICY "Anyone can view active automation services" ON automation_services FOR SELECT USING (is_active = true);

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, published, featured, tags) VALUES
('The Future of Startup Collaboration', 'future-startup-collaboration', 'How Tapri is revolutionizing the way entrepreneurs connect and build together.', 'In today''s fast-paced digital world, the traditional methods of finding co-founders and building startups are rapidly evolving. Tapri represents a new paradigm in startup collaboration, where passionate entrepreneurs can discover like-minded individuals and transform ideas into reality.

## The Problem with Traditional Networking

Traditional networking events and platforms often fall short when it comes to meaningful connections. Entrepreneurs spend countless hours at events, exchanging business cards, but rarely find the right co-founder or team member who shares their vision and commitment.

## Enter Tapri: A New Approach

Tapri solves this by creating a curated ecosystem where:

- **Quality over Quantity**: We focus on meaningful connections rather than just networking
- **Skill-based Matching**: Our algorithm matches entrepreneurs based on complementary skills
- **Commitment Levels**: Clear expectations about time investment and equity
- **Transparency**: Open communication about goals, expectations, and project status

## The Power of Community

What sets Tapri apart is our community-driven approach. Every project is vetted, every entrepreneur is verified, and every connection is meaningful. We''re not just a platform; we''re a movement towards better startup collaboration.

## Looking Forward

As we continue to grow, we''re excited to introduce new features like AI-powered matching, automated legal documentation, and integrated funding opportunities. The future of startup collaboration is here, and it''s more exciting than ever.

Join us in building the next generation of successful startups, one meaningful connection at a time.', '/images/blog/startup-collaboration.jpg', true, true, ARRAY['startups', 'collaboration', 'networking', 'entrepreneurship']),

('10 Automation Tools Every Startup Needs', '10-automation-tools-startups', 'Discover the essential automation tools that can save your startup time and money.', 'Running a startup means wearing multiple hats and juggling countless tasks. The key to scaling efficiently is automation. Here are 10 essential automation tools every startup should consider:

## 1. LinkedIn Lead Generation

Automate your LinkedIn outreach to find potential customers, partners, and team members. Our LinkedIn scraper can help you build targeted lists and personalize your outreach at scale.

## 2. Content Creation & Scheduling

Consistent content creation is crucial for brand building. Automate your social media posts, blog content, and email newsletters to maintain a strong online presence.

## 3. Email Marketing Automation

Set up drip campaigns, welcome sequences, and behavioral triggers to nurture leads and convert them into customers without manual intervention.

## 4. Customer Support Chatbots

Implement AI-powered chatbots to handle common customer queries 24/7, freeing up your team to focus on complex issues.

## 5. Sales Pipeline Management

Automate your sales process with CRM integrations, lead scoring, and automated follow-ups to never miss an opportunity.

## 6. Financial Reporting

Automate your bookkeeping, expense tracking, and financial reporting to stay on top of your startup''s financial health.

## 7. Recruitment & HR

Streamline your hiring process with automated candidate screening, interview scheduling, and onboarding workflows.

## 8. Project Management

Use automation to assign tasks, send reminders, and track project progress without micromanaging your team.

## 9. Data Analytics & Reporting

Set up automated dashboards and reports to monitor key metrics and make data-driven decisions.

## 10. Legal & Compliance

Automate contract generation, compliance checks, and legal document management to reduce legal risks.

## Getting Started

The key is to start small and gradually automate more processes as your startup grows. Focus on the tasks that consume the most time or are most prone to human error.

Ready to automate your startup? Explore our automation services and see how we can help you scale efficiently.', '/images/blog/automation-tools.jpg', true, false, ARRAY['automation', 'productivity', 'tools', 'efficiency']),

('Building Your MVP: A Step-by-Step Guide', 'building-mvp-guide', 'Learn how to build a Minimum Viable Product that validates your startup idea effectively.', 'Building a Minimum Viable Product (MVP) is one of the most critical steps in your startup journey. It''s your first real test of whether your idea has market potential. Here''s a comprehensive guide to building an MVP that actually works.

## What is an MVP?

An MVP is the simplest version of your product that can still provide value to users and validate your core hypothesis. It''s not about building a basic version of your final product—it''s about testing your riskiest assumptions with minimal resources.

## Step 1: Define Your Core Hypothesis

Before writing a single line of code, clearly articulate:
- What problem are you solving?
- Who has this problem?
- How does your solution address it?
- What''s your unique value proposition?

## Step 2: Identify Your Riskiest Assumptions

List all the assumptions your business model depends on, then rank them by:
- How critical they are to your success
- How uncertain you are about them
- How expensive it would be if you''re wrong

## Step 3: Design Your MVP

Your MVP should test your riskiest assumptions with the least effort. Consider these approaches:

### The Landing Page MVP
Create a simple landing page describing your product and measure interest through sign-ups or pre-orders.

### The Concierge MVP
Manually deliver your service to a small group of customers to validate demand and refine your offering.

### The Wizard of Oz MVP
Create the appearance of a fully functional product while manually handling the backend processes.

## Step 4: Build and Launch

Keep it simple:
- Focus on core functionality only
- Use no-code/low-code tools when possible
- Prioritize speed over perfection
- Plan for iteration from day one

## Step 5: Measure and Learn

Define success metrics before launching:
- User engagement metrics
- Conversion rates
- Customer feedback
- Retention rates

## Step 6: Iterate or Pivot

Based on your learnings:
- If validation is positive: iterate and improve
- If validation is mixed: adjust your approach
- If validation is negative: consider pivoting

## Common MVP Mistakes to Avoid

1. **Building too much**: Remember, it''s a minimum viable product
2. **Ignoring user feedback**: Your assumptions might be wrong
3. **Perfectionism**: Launch early and iterate
4. **Wrong metrics**: Focus on learning, not vanity metrics
5. **No clear hypothesis**: Know what you''re testing

## Tools and Resources

- **Design**: Figma, Sketch, Canva
- **No-code development**: Bubble, Webflow, Airtable
- **Analytics**: Google Analytics, Mixpanel, Hotjar
- **User feedback**: Typeform, UserVoice, Intercom

## Conclusion

Building an MVP is about learning, not building. The goal is to validate your assumptions quickly and cheaply before investing significant time and money. Remember, many successful companies started with very simple MVPs that looked nothing like their final products.

The key is to start building, start learning, and start iterating. Your MVP is just the beginning of your startup journey, not the end goal.

Ready to build your MVP? Connect with experienced developers and designers on Tapri to bring your vision to life.', '/images/blog/mvp-guide.jpg', true, true, ARRAY['mvp', 'product development', 'startups', 'validation']);

-- Update automation services with more detailed information
INSERT INTO automation_services (name, description, long_description, icon, category, pricing, features, demo_url, popularity_score) VALUES
('LinkedIn Lead Scraper', 'Extract targeted leads from LinkedIn with advanced filtering and export capabilities.', 'Our LinkedIn Lead Scraper is a powerful tool that helps you identify and extract potential customers, partners, and team members from LinkedIn. With advanced filtering options, you can target specific industries, job titles, locations, and company sizes. The tool respects LinkedIn''s terms of service and includes built-in rate limiting to ensure safe operation.

Key Features:
- Advanced search filters (industry, location, job title, company size)
- Bulk profile extraction with contact information
- Export to CSV, Excel, or integrate with your CRM
- Real-time data validation and enrichment
- GDPR compliant data handling
- Built-in rate limiting for safe operation

Perfect for sales teams, recruiters, and business development professionals looking to scale their outreach efforts.', 'Users', 'Lead Generation', 'Starting at $99/month', ARRAY['Advanced Filtering', 'Bulk Export', 'CRM Integration', 'Data Validation', 'Rate Limiting', 'GDPR Compliant'], 'https://demo.tapri.com/linkedin-scraper', 95),

('AI Content Writer', 'Generate high-quality blog posts, social media content, and marketing copy using advanced AI.', 'Transform your content marketing with our AI Content Writer. This powerful tool generates engaging, SEO-optimized content for blogs, social media, email campaigns, and more. Trained on millions of high-performing pieces of content, our AI understands your brand voice and creates content that resonates with your audience.

Features:
- Blog post generation with SEO optimization
- Social media content for all major platforms
- Email marketing campaigns and sequences
- Product descriptions and landing page copy
- Brand voice customization and consistency
- Multi-language support (50+ languages)
- Plagiarism checking and originality scoring
- Content calendar integration

Save 10+ hours per week on content creation while maintaining quality and consistency across all your marketing channels.', 'PenTool', 'Content Marketing', 'Starting at $49/month', ARRAY['SEO Optimization', 'Multi-Platform', 'Brand Voice Training', 'Multi-Language', 'Plagiarism Check', 'Content Calendar'], 'https://demo.tapri.com/ai-writer', 88),

('Email Automation Suite', 'Complete email marketing automation with drip campaigns, segmentation, and analytics.', 'Supercharge your email marketing with our comprehensive automation suite. From welcome sequences to re-engagement campaigns, our platform handles every aspect of email marketing automation. With advanced segmentation, A/B testing, and detailed analytics, you can create personalized experiences that drive conversions.

Capabilities:
- Drag-and-drop email builder with professional templates
- Advanced audience segmentation and targeting
- Behavioral trigger-based automation
- A/B testing for subject lines, content, and send times
- Detailed analytics and conversion tracking
- Integration with 100+ popular tools and platforms
- Deliverability optimization and spam testing
- GDPR and CAN-SPAM compliance

Turn your email list into a revenue-generating machine with automation that works 24/7.', 'Mail', 'Email Marketing', 'Starting at $29/month', ARRAY['Drag-Drop Builder', 'Advanced Segmentation', 'Behavioral Triggers', 'A/B Testing', 'Analytics Dashboard', '100+ Integrations'], 'https://demo.tapri.com/email-automation', 92),

('Social Media Scheduler', 'Schedule and manage your social media presence across all major platforms from one dashboard.', 'Streamline your social media management with our all-in-one scheduling platform. Plan, create, and publish content across Facebook, Instagram, Twitter, LinkedIn, and more. With AI-powered optimal posting times, hashtag suggestions, and engagement analytics, you can maximize your social media ROI.

Features:
- Multi-platform posting (Facebook, Instagram, Twitter, LinkedIn, TikTok, Pinterest)
- Visual content calendar with drag-and-drop scheduling
- AI-powered optimal posting time recommendations
- Hashtag research and suggestion engine
- Team collaboration and approval workflows
- Comprehensive analytics and reporting
- Social listening and mention monitoring
- Automated responses and chatbot integration

Manage all your social media accounts efficiently and never miss an opportunity to engage with your audience.', 'Calendar', 'Social Media', 'Starting at $19/month', ARRAY['Multi-Platform', 'Visual Calendar', 'AI Optimization', 'Team Collaboration', 'Analytics', 'Social Listening'], 'https://demo.tapri.com/social-scheduler', 85),

('CRM Integration Hub', 'Connect and synchronize data between your favorite tools and CRM systems automatically.', 'Eliminate data silos and manual data entry with our CRM Integration Hub. Automatically sync customer data, leads, and interactions between your CRM and other business tools. With real-time synchronization and intelligent data mapping, your team always has access to the most up-to-date customer information.

Integration Capabilities:
- 200+ pre-built integrations with popular business tools
- Real-time bidirectional data synchronization
- Intelligent field mapping and data transformation
- Custom webhook and API integration support
- Data validation and duplicate prevention
- Automated workflow triggers based on CRM events
- Comprehensive audit logs and error handling
- Enterprise-grade security and compliance

Keep your customer data organized and accessible across all your business tools without manual effort.', 'Database', 'CRM & Sales', 'Starting at $79/month', ARRAY['200+ Integrations', 'Real-time Sync', 'Custom Webhooks', 'Data Validation', 'Workflow Triggers', 'Audit Logs'], 'https://demo.tapri.com/crm-hub', 78),

('Voice Call Automation', 'Automate outbound calls, lead qualification, and appointment scheduling with AI-powered voice assistants.', 'Scale your sales and customer service operations with AI-powered voice automation. Our intelligent voice assistants can handle outbound calls, qualify leads, schedule appointments, and provide customer support with natural, human-like conversations.

Voice AI Features:
- Natural language processing and generation
- Multi-language support with native accents
- Intelligent call routing and escalation
- Real-time sentiment analysis and adaptation
- Automated appointment scheduling and calendar integration
- Lead qualification and scoring
- Call recording and transcription
- Integration with popular CRM and sales tools

Increase your call volume 10x while maintaining personalized customer interactions. Perfect for sales teams, customer service, and appointment-based businesses.', 'Phone', 'Sales & Support', 'Starting at $149/month', ARRAY['Natural Language AI', 'Multi-Language', 'Sentiment Analysis', 'Calendar Integration', 'Lead Scoring', 'Call Recording'], 'https://demo.tapri.com/voice-automation', 82);
