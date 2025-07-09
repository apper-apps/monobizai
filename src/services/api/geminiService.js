// Gemini API service for AI agent responses
const GEMINI_API_KEY = window.__gemini_api_key || "demo-key";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";

export const geminiService = {
  async generateResponse(prompt, agentSystemPrompt, chatHistory = []) {
    try {
      // Simulate API delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      // Build context from chat history
      const contextMessages = chatHistory.slice(-5).map(msg => 
        `${msg.sender === "user" ? "User" : "Agent"}: ${msg.text}`
      ).join("\n");
      
      // Construct the full prompt
      const fullPrompt = `${agentSystemPrompt}\n\nPrevious conversation:\n${contextMessages}\n\nCurrent user message: ${prompt}\n\nProvide a helpful, professional response as this specialized agent:`;
      
      // In a real implementation, you would make an actual API call here
      // For demo purposes, we'll return a simulated response
      if (GEMINI_API_KEY === "demo-key") {
        return this.generateDemoResponse(prompt, agentSystemPrompt);
      }
      
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: fullPrompt
            }]
          }]
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
      
    } catch (error) {
      console.error("Gemini API error:", error);
      throw new Error("Failed to generate AI response. Please try again.");
    }
  },
  
  generateDemoResponse(prompt, agentSystemPrompt) {
    // Demo responses based on agent type
    const agentType = agentSystemPrompt.toLowerCase();
    
    if (agentType.includes("hr")) {
      return "As your HR specialist, I recommend implementing a structured onboarding process that includes clear job descriptions, mentorship programs, and regular check-ins. For recruitment, consider using multiple channels including job boards, social media, and employee referrals. Would you like me to help you create specific HR policies or procedures?";
    } else if (agentType.includes("marketing")) {
      return "Great question! For effective marketing, I suggest starting with a clear understanding of your target audience and their pain points. Consider implementing a content marketing strategy that includes blog posts, social media engagement, and email campaigns. Would you like me to help you develop a specific marketing strategy or create content ideas for your business?";
    } else if (agentType.includes("sales")) {
      return "To improve your sales process, focus on understanding your customers' needs and building relationships. Implement a CRM system to track leads, create a sales funnel, and develop follow-up sequences. Consider offering value-first interactions and addressing objections proactively. What specific sales challenges are you facing that I can help you with?";
    } else if (agentType.includes("customer support")) {
      return "Excellent customer support is crucial for retention. Implement a multi-channel support system, create detailed FAQs, and establish clear response time goals. Train your team on active listening and problem-solving techniques. Consider implementing a ticketing system to track and resolve issues efficiently. How can I help you improve your current support processes?";
    } else if (agentType.includes("seo")) {
      return "For effective SEO, start with keyword research to understand what your customers are searching for. Optimize your website's technical aspects, create high-quality content, and build authoritative backlinks. Focus on local SEO if you serve a specific geographic area. Regular monitoring and adjustment of your strategy is key. What specific SEO challenges can I help you address?";
    } else {
      return `As your ${agentType} specialist, I'm here to provide expert guidance tailored to your business needs. Based on your question: "${prompt}", I recommend taking a strategic approach that considers your specific business context and goals. What additional information can you share about your situation so I can provide more targeted advice?`;
    }
  }
};