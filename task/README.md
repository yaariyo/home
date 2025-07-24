# Yaariyo: Project Vision & Scope

## Vision Statement
Yaariyo aspires to be India’s most trusted, friendship-first social media platform, celebrating the nation’s diversity through vibrant, culturally relevant, and safe online communities. Built on a scalable, mobile-friendly, and open-source foundation, Yaariyo empowers users to connect, share, and grow in their preferred Indian languages. Committed to transparency, inclusivity, and compliance with Indian IT Rules 2021, Yaariyo prioritizes user privacy, local engagement, and community-driven innovation to shape the future of social networking in India.

## Scope
- Scalable, cloud-ready architecture for seamless growth and high availability
- Mobile-first, responsive design for optimal experience on all devices
- 100% open-source codebase with transparent development and community governance
- Multi-lingual support, targeting at least 10 major Indian languages at launch
- Features designed for vibrant, safe, and culturally relevant communities
- Strict compliance with Indian IT Rules 2021 and best practices for user privacy and safety
- Prioritization of trust, inclusivity, and local engagement in all platform features

---

# Alignment with Indian IT Rules 2021 & Local Engagement

Yaariyo is committed to full compliance with the Indian Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021. The platform will:
- Implement robust user verification and grievance redressal mechanisms
- Provide clear content moderation and reporting tools
- Ensure transparency in data handling and privacy practices
- Support local languages and culturally relevant content
- Foster safe, inclusive, and respectful online communities

These principles will guide all technical and community features, ensuring Yaariyo remains a responsible, India-centric social platform.

---

# Core Objectives

Yaariyo’s core objectives are foundational to its mission as a secure, user-friendly, and India-centric social platform. Each objective is described in detail below:

1. **Security**
   - Ensure robust protection of user data and privacy through industry-standard encryption, secure authentication, and regular security audits.
   - Implement proactive measures against abuse, spam, and unauthorized access.
   - Provide regular security training for staff and contributors.
   - Commit to rapid response and transparent communication in the event of security incidents.
   - Comply fully with Indian IT Rules 2021 and all relevant data protection laws.

2. **User-Friendliness**
   - Deliver an intuitive, accessible, and responsive user interface optimized for mobile, web, and low-bandwidth environments.
   - Ensure accessibility for users with disabilities (WCAG compliance).
   - Minimize friction in onboarding, posting, and community participation.
   - Provide clear guidance, help resources, and feedback mechanisms throughout the user journey.

3. **Multi-Language Support**
   - Support at least Hindi, Tamil, Telugu, Bengali, Marathi, and English at launch, with a scalable framework for additional Indian languages.
   - Offer seamless language switching and multi-lingual onboarding.
   - Ensure all major features (posting, reporting, notifications, help) are accessible in every supported language.
   - Encourage community-driven translation and cultural adaptation for future languages and features.

4. **Community Empowerment**
   - Enable users to create, join, and moderate groups based on interests, locations, or culture.
   - Provide tools for creators and community leaders, including analytics, badges, and monetization options.
   - Foster vibrant, safe, and inclusive communities with clear moderation and reporting workflows.
   - Maintain transparent community guidelines and fair, consistent moderation.
   - Support local events, causes, and initiatives through platform features.

5. **Legal Compliance**
   - Operate with 100% compliance to Indian IT Rules 2021, including grievance redressal, content takedown, and transparency reporting.
   - Maintain clear, multi-language terms of service, privacy policies, and community guidelines.
   - Ensure all legal and compliance documentation is accessible and regularly updated for stakeholders.
   - Provide ongoing legal review and adaptation as laws evolve.
   - Educate users about their rights and responsibilities on the platform.

---

# Task Master AI

An intelligent AI-powered task generation system that helps break down complex projects into actionable, manageable tasks.

## Features

- 🤖 **AI-Powered Task Generation**: Uses OpenAI GPT to intelligently break down projects
- 📊 **Structured Task Output**: Generates tasks with priorities, time estimates, and categories
- 🔄 **Fallback System**: Works even when AI API is unavailable
- 📱 **Easy Integration**: Simple API for integration into any application
- 🎯 **Smart Categorization**: Automatically categorizes tasks by priority and type

## Quick Start

### Installation

```bash
cd task
npm install
```

### Basic Usage

```javascript
const TaskGenerator = require('./taskGenerator');

// Initialize with your OpenAI API key
const generator = new TaskGenerator('your-openai-api-key');

// Generate tasks from a project description
const result = await generator.generateTasks(
  'Build a modern web application for task management with user authentication'
);

console.log(result.tasks);
```

### Example Output

```javascript
{
  success: true,
  tasks: [
    {
      id: 'task_1',
      title: 'Project Planning and Requirements Gathering',
      description: 'Define project scope, requirements, and success criteria',
      priority: 'High',
      estimatedTime: 4,
      category: 'Planning',
      dependencies: []
    },
    // ... more tasks
  ],
  totalTasks: 8,
  estimatedTotalTime: 45
}
```

## API Reference

### TaskGenerator Class

#### Constructor
```javascript
new TaskGenerator(apiKey)
```
- `apiKey` (string): Your OpenAI API key

#### Methods

##### generateTasks(prompt)
Generates structured tasks from a project description.

- `prompt` (string): Project description or goal
- Returns: Promise<Object> with tasks and metadata

##### categorizeByPriority(tasks)
Groups tasks by priority level.

- `tasks` (Array): Array of task objects
- Returns: Object with priority groups

##### categorizeByType(tasks)
Groups tasks by category.

- `tasks` (Array): Array of task objects
- Returns: Object with category groups

##### generateFallbackTasks(prompt)
Generates basic task structure when AI API is unavailable.

- `prompt` (string): Project description
- Returns: Array of basic task objects

## Task Object Structure

```javascript
{
  id: 'unique_task_id',
  title: 'Task title',
  description: 'Detailed task description',
  priority: 'High|Medium|Low',
  estimatedTime: 4, // hours
  category: 'Planning|Development|Testing|Deployment|Documentation',
  dependencies: ['task_id1', 'task_id2'] // IDs of dependent tasks
}
```

## Testing

Run the test suite to verify functionality:

```bash
npm test
```

This will test:
- Fallback task generation
- Task categorization
- Utility functions
- Error handling

## Environment Setup

### Required Environment Variables

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### Optional Configuration

```javascript
// You can customize the AI model and parameters
const response = await fetch(this.baseUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.apiKey}`
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo', // or 'gpt-4'
    temperature: 0.7,
    max_tokens: 2000
  })
});
```

## Integration Examples

### Next.js API Route

```javascript
// app/api/task-master-ai/route.js
import { NextResponse } from 'next/server';
import TaskGenerator from '../../../task/taskGenerator';

const generator = new TaskGenerator(process.env.OPENAI_API_KEY);

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const result = await generator.generateTasks(prompt);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

### React Component

```javascript
import { useState } from 'react';

export default function TaskGeneratorComponent() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateTasks = async (prompt) => {
    setLoading(true);
    try {
      const response = await fetch('/api/task-master-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const result = await response.json();
      setTasks(result.tasks);
    } catch (error) {
      console.error('Failed to generate tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Your UI components */}
    </div>
  );
}
```

## Error Handling

The system includes robust error handling:

- **API Failures**: Falls back to predefined task templates
- **Invalid Input**: Validates and sanitizes user input
- **Network Issues**: Graceful degradation with fallback tasks
- **Rate Limiting**: Built-in retry logic and error messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Check the test file for usage examples
- Review the PRD.txt for detailed requirements
- Open an issue in the repository 