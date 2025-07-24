/**
 * Task Generator - AI-powered task breakdown utility
 * Uses OpenAI API to generate structured tasks from project descriptions
 */

class TaskGenerator {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.openai.com/v1/chat/completions';
  }

  /**
   * Generate tasks from a project description
   * @param {string} prompt - Project description or goal
   * @returns {Promise<Array>} Array of structured tasks
   */
  async generateTasks(prompt) {
    try {
      const systemPrompt = `You are a professional project manager and task breakdown expert. 
Your job is to analyze project descriptions and break them down into actionable, specific tasks.

For each task, provide:
- A clear, actionable description
- Priority level (High, Medium, Low)
- Estimated time (in hours)
- Category (Planning, Development, Testing, Deployment, etc.)

Format your response as a JSON array of objects with these properties:
{
  "id": "unique_id",
  "title": "Task title",
  "description": "Detailed task description",
  "priority": "High|Medium|Low",
  "estimatedTime": "number in hours",
  "category": "Category name",
  "dependencies": ["task_id1", "task_id2"]
}

Make tasks specific, measurable, and achievable. Break down complex tasks into smaller subtasks.`;

      const userPrompt = `Please break down the following project into actionable tasks:

${prompt}

Generate 8-15 tasks that cover all aspects of this project.`;

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Parse JSON response
      const tasks = this.parseTasksFromResponse(content);
      
      return {
        success: true,
        tasks: tasks,
        totalTasks: tasks.length,
        estimatedTotalTime: tasks.reduce((sum, task) => sum + (task.estimatedTime || 0), 0)
      };

    } catch (error) {
      console.error('Task generation error:', error);
      return {
        success: false,
        error: error.message,
        tasks: this.generateFallbackTasks(prompt)
      };
    }
  }

  /**
   * Parse tasks from OpenAI response
   * @param {string} content - Raw response content
   * @returns {Array} Parsed tasks array
   */
  parseTasksFromResponse(content) {
    try {
      // Extract JSON from response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback parsing
      return this.parseTasksFromText(content);
    } catch (error) {
      console.error('Failed to parse tasks:', error);
      return [];
    }
  }

  /**
   * Fallback parsing for non-JSON responses
   * @param {string} content - Response content
   * @returns {Array} Parsed tasks array
   */
  parseTasksFromText(content) {
    const tasks = [];
    const lines = content.split('\n').filter(line => line.trim());
    
    let currentTask = null;
    
    for (const line of lines) {
      if (line.match(/^\d+\./)) {
        if (currentTask) {
          tasks.push(currentTask);
        }
        currentTask = {
          id: `task_${tasks.length + 1}`,
          title: line.replace(/^\d+\.\s*/, '').trim(),
          description: '',
          priority: 'Medium',
          estimatedTime: 2,
          category: 'General',
          dependencies: []
        };
      } else if (currentTask && line.trim()) {
        currentTask.description += line.trim() + ' ';
      }
    }
    
    if (currentTask) {
      tasks.push(currentTask);
    }
    
    return tasks;
  }

  /**
   * Generate fallback tasks when API fails
   * @param {string} prompt - Project description
   * @returns {Array} Basic task structure
   */
  generateFallbackTasks(prompt) {
    const basicTasks = [
      {
        id: 'task_1',
        title: 'Project Planning and Requirements Gathering',
        description: 'Define project scope, requirements, and success criteria',
        priority: 'High',
        estimatedTime: 4,
        category: 'Planning',
        dependencies: []
      },
      {
        id: 'task_2',
        title: 'Technical Architecture Design',
        description: 'Design system architecture and technical specifications',
        priority: 'High',
        estimatedTime: 6,
        category: 'Design',
        dependencies: ['task_1']
      },
      {
        id: 'task_3',
        title: 'Development Setup',
        description: 'Set up development environment and project structure',
        priority: 'Medium',
        estimatedTime: 2,
        category: 'Development',
        dependencies: ['task_2']
      },
      {
        id: 'task_4',
        title: 'Core Development',
        description: 'Implement main features and functionality',
        priority: 'High',
        estimatedTime: 16,
        category: 'Development',
        dependencies: ['task_3']
      },
      {
        id: 'task_5',
        title: 'Testing and Quality Assurance',
        description: 'Perform unit testing, integration testing, and bug fixes',
        priority: 'Medium',
        estimatedTime: 8,
        category: 'Testing',
        dependencies: ['task_4']
      },
      {
        id: 'task_6',
        title: 'Documentation',
        description: 'Create user documentation and technical documentation',
        priority: 'Low',
        estimatedTime: 4,
        category: 'Documentation',
        dependencies: ['task_4']
      },
      {
        id: 'task_7',
        title: 'Deployment Preparation',
        description: 'Prepare for production deployment and environment setup',
        priority: 'Medium',
        estimatedTime: 3,
        category: 'Deployment',
        dependencies: ['task_5', 'task_6']
      },
      {
        id: 'task_8',
        title: 'Launch and Monitoring',
        description: 'Deploy to production and monitor system performance',
        priority: 'High',
        estimatedTime: 2,
        category: 'Deployment',
        dependencies: ['task_7']
      }
    ];

    return basicTasks;
  }

  /**
   * Categorize tasks by priority
   * @param {Array} tasks - Array of tasks
   * @returns {Object} Tasks grouped by priority
   */
  categorizeByPriority(tasks) {
    return tasks.reduce((acc, task) => {
      const priority = task.priority || 'Medium';
      if (!acc[priority]) {
        acc[priority] = [];
      }
      acc[priority].push(task);
      return acc;
    }, {});
  }

  /**
   * Categorize tasks by category
   * @param {Array} tasks - Array of tasks
   * @returns {Object} Tasks grouped by category
   */
  categorizeByType(tasks) {
    return tasks.reduce((acc, task) => {
      const category = task.category || 'General';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(task);
      return acc;
    }, {});
  }
}

module.exports = TaskGenerator; 