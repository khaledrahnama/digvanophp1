-- Digvano Database Schema
-- Professional IT services company database structure

SET FOREIGN_KEY_CHECKS=0;
DROP DATABASE IF EXISTS digvano;
CREATE DATABASE digvano CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE digvano;

-- Contacts table for form submissions
CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    service_type ENUM(
        'ai_data_solutions',
        'software_development',
        'iot_integration',
        'web_app_development',
        'procurement',
        'maintenance'
    ) NOT NULL,
    budget_range ENUM(
        'under-10k',
        '10k-25k',
        '25k-50k',
        '50k-100k',
        '100k-plus'
    ),
    message TEXT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    status ENUM('new', 'contacted', 'in_progress', 'completed') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_service_type (service_type),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Chat sessions table
CREATE TABLE chat_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP NULL,
    message_count INT DEFAULT 0,
    country VARCHAR(100),
    city VARCHAR(100),
    
    INDEX idx_session_id (session_id),
    INDEX idx_ip_address (ip_address),
    INDEX idx_started_at (started_at)
);

-- Chat messages table with AI response tracking
CREATE TABLE chat_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    session_id VARCHAR(255) NOT NULL,
    message_type ENUM('user', 'ai') NOT NULL,
    message_text TEXT NOT NULL,
    intent VARCHAR(100),
    confidence_score DECIMAL(3,2),
    response_time_ms INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (session_id) REFERENCES chat_sessions(session_id) ON DELETE CASCADE,
    INDEX idx_session_timestamp (session_id, timestamp),
    INDEX idx_intent (intent)
);

-- Services catalog table
CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100),
    features JSON,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug),
    INDEX idx_sort_order (sort_order)
);

-- FAQ table
CREATE TABLE faqs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_sort_order (sort_order)
);

-- Insert initial services data
INSERT INTO services (title, slug, description, icon, features, sort_order) VALUES
('AI & Data Solutions', 'ai-data-solutions', 'Intelligent systems that learn and adapt to your business needs with machine learning, predictive analytics, and computer vision.', '🤖', '["Machine Learning Models", "Predictive Analytics", "Computer Vision", "Data Engineering", "AI-powered Automation"]', 1),
('Software & Systems Development', 'software-development', 'Custom enterprise solutions built for scale and performance with robust architecture and cutting-edge technologies.', '💻', '["Custom Enterprise Tools", "Automation Software", "Cloud Solutions", "API Development", "System Architecture"]', 2),
('IoT & Smart Integration', 'iot-integration', 'Connected ecosystems that bridge hardware and software for industrial and consumer applications.', '🌐', '["Smart Device Integration", "Industrial IoT", "Real-time Monitoring", "Hardware-Software Ecosystems", "Sensor Networks"]', 3),
('Web & App Development', 'web-app-development', 'Modern, responsive applications that deliver exceptional user experiences across all platforms.', '📱', '["React & Next.js Applications", "Mobile App Development", "Progressive Web Apps", "E-commerce Solutions", "UI/UX Design"]', 4),
('IT Procurement', 'it-procurement', 'Strategic technology sourcing and implementation services to optimize your IT infrastructure.', '🛒', '["Hardware Procurement", "Software Licensing", "Vendor Management", "Cost Optimization", "Technology Assessment"]', 5),
('Maintenance & Support', 'maintenance-support', 'Reliable ongoing support to keep your systems running smoothly with 24/7 monitoring.', '🔧', '["24/7 System Monitoring", "Proactive Maintenance", "Security Updates", "Performance Optimization", "Technical Support"]', 6);

-- Insert FAQ data
INSERT INTO faqs (question, answer, category, sort_order) VALUES
('What services does Digvano offer?', 'We offer comprehensive IT solutions including AI & Data Solutions, Software Development, IoT Integration, Web & App Development, IT Procurement, and Maintenance & Support services. Each service is tailored to meet specific business needs.', 'services', 1),
('How long does a typical project take?', 'Project timelines vary based on complexity. Small websites take 2-4 weeks, custom software 1-3 months, and enterprise AI solutions 3-6 months. We provide detailed timelines after initial consultation.', 'projects', 2),
('Do you work with startups?', 'Absolutely! We specialize in helping startups build their MVP and scale their technology. We offer flexible engagement models and understand the unique challenges startups face.', 'clients', 3),
('What technologies do you use?', 'We use modern tech stacks including React, Node.js, Python, TensorFlow, AWS, Azure, and various IoT platforms. We choose technologies based on project requirements and long-term maintainability.', 'technology', 4),
('How do you handle project security?', 'Security is our priority. We implement industry best practices including encryption, secure coding standards, regular security audits, and compliance with relevant regulations like GDPR and HIPAA where applicable.', 'security', 5);

SET FOREIGN_KEY_CHECKS=1;