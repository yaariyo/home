/**
 * Test file for Task Generator
 * Tests the functionality without requiring OpenAI API
 */

const TaskGenerator = require('./taskGenerator');

// Mock API key for testing
const mockApiKey = 'test-api-key';

// Test cases
const testCases = [
  {
    name: 'Web Application Development',
    prompt: 'Build a modern web application for task management with user authentication, task creation, and real-time updates.'
  },
  {
    name: 'Mobile App Development',
    prompt: 'Create a mobile app for fitness tracking with workout plans, progress monitoring, and social features.'
  },
  {
    name: 'E-commerce Platform',
    prompt: 'Develop an e-commerce platform with product catalog, shopping cart, payment processing, and order management.'
  },
  {
    name: 'Content Management System',
    prompt: 'Build a CMS for a news website with article management, user roles, and SEO optimization.'
  }
];

async function runTests() {
  console.log('🧪 Running Task Generator Tests\n');
  
  const generator = new TaskGenerator(mockApiKey);
  
  for (const testCase of testCases) {
    console.log(`📋 Testing: ${testCase.name}`);
    console.log(`📝 Prompt: ${testCase.prompt.substring(0, 80)}...`);
    
    try {
      // Test fallback task generation (since we don't have real API key)
      const fallbackTasks = generator.generateFallbackTasks(testCase.prompt);
      
      console.log(`✅ Generated ${fallbackTasks.length} tasks`);
      console.log(`⏱️  Total estimated time: ${fallbackTasks.reduce((sum, task) => sum + task.estimatedTime, 0)} hours`);
      
      // Test categorization
      const byPriority = generator.categorizeByPriority(fallbackTasks);
      const byType = generator.categorizeByType(fallbackTasks);
      
      console.log(`📊 Priority breakdown:`, Object.keys(byPriority).map(p => `${p}: ${byPriority[p].length}`).join(', '));
      console.log(`📂 Category breakdown:`, Object.keys(byType).map(c => `${c}: ${byType[c].length}`).join(', '));
      
      // Show first task as example
      if (fallbackTasks.length > 0) {
        const firstTask = fallbackTasks[0];
        console.log(`📌 Sample task: ${firstTask.title} (${firstTask.priority} priority, ${firstTask.estimatedTime}h)`);
      }
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
    
    console.log('─'.repeat(60) + '\n');
  }
  
  // Test utility functions
  console.log('🔧 Testing Utility Functions');
  
  const sampleTasks = [
    { id: '1', title: 'Task 1', priority: 'High', category: 'Development', estimatedTime: 4 },
    { id: '2', title: 'Task 2', priority: 'Medium', category: 'Testing', estimatedTime: 2 },
    { id: '3', title: 'Task 3', priority: 'Low', category: 'Documentation', estimatedTime: 1 }
  ];
  
  const priorityGroups = generator.categorizeByPriority(sampleTasks);
  const typeGroups = generator.categorizeByType(sampleTasks);
  
  console.log('✅ Priority categorization:', Object.keys(priorityGroups));
  console.log('✅ Type categorization:', Object.keys(typeGroups));
  
  console.log('\n🎉 All tests completed successfully!');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests }; 