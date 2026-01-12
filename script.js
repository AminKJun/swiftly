// AI Talent Matcher functionality
function matchTalent() {
  const input = document.getElementById("brandInput");
  const resultBox = document.getElementById("result");
  const brandNiche = input.value.trim().toLowerCase();

  if (!brandNiche) {
    resultBox.innerHTML = "<p>Please describe your brand niche to find the perfect match.</p>";
    resultBox.classList.add("has-result");
    return;
  }

  // Simulate AI processing
  resultBox.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
  resultBox.classList.add("has-result");

  setTimeout(() => {
    const matches = getAIMatch(brandNiche);
    resultBox.innerHTML = `
      <p><strong>AI Match Found!</strong></p>
      <p>${matches.name} - ${matches.type}</p>
      <p>${matches.followers} followers | ${matches.engagement} engagement rate</p>
      <p><em>${matches.reason}</em></p>
    `;
  }, 1500);
}

function getAIMatch(niche) {
  const talentDatabase = [
    {
      name: "Alex Chen",
      type: "Tech Creator",
      followers: "1.2M",
      engagement: "4.8%",
      keywords: ["tech", "software", "ai", "gadgets", "electronics", "startup", "saas", "app"],
      reason: "Perfect for tech-forward brands seeking authentic product reviews and tutorials."
    },
    {
      name: "Sarah Miller",
      type: "Lifestyle Influencer",
      followers: "850K",
      engagement: "5.2%",
      keywords: ["lifestyle", "wellness", "home", "family", "food", "travel", "daily", "routine"],
      reason: "Ideal for lifestyle brands targeting engaged millennial audiences."
    },
    {
      name: "Emma Johnson",
      type: "Fashion Model",
      followers: "2.1M",
      engagement: "3.9%",
      keywords: ["fashion", "beauty", "clothing", "style", "luxury", "designer", "makeup", "skincare"],
      reason: "Best for fashion and beauty brands seeking high-visibility campaigns."
    },
    {
      name: "Marcus Davis",
      type: "Fitness Influencer",
      followers: "920K",
      engagement: "6.1%",
      keywords: ["fitness", "health", "gym", "sports", "nutrition", "workout", "athletic", "supplement"],
      reason: "Excellent for fitness and health brands with highly engaged audience."
    }
  ];

  // Find best match based on keywords
  let bestMatch = talentDatabase[0];
  let highestScore = 0;

  talentDatabase.forEach(talent => {
    const score = talent.keywords.filter(keyword => niche.includes(keyword)).length;
    if (score > highestScore) {
      highestScore = score;
      bestMatch = talent;
    }
  });

  return bestMatch;
}

// Chat Widget Functionality
function toggleChat() {
  const chatContainer = document.getElementById("chat-container");
  chatContainer.classList.toggle("open");
}

function handleChatKeypress(event) {
  if (event.key === "Enter") {
    sendChatMessage();
  }
}

function sendChatMessage() {
  const input = document.getElementById("chat-input");
  const messagesContainer = document.getElementById("chat-messages");
  const message = input.value.trim();

  if (!message) return;

  // Add user message
  const userMessageDiv = document.createElement("div");
  userMessageDiv.className = "chat-message user";
  userMessageDiv.innerHTML = `<p>${escapeHtml(message)}</p>`;
  messagesContainer.appendChild(userMessageDiv);

  // Clear input
  input.value = "";

  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Show typing indicator
  const typingDiv = document.createElement("div");
  typingDiv.className = "chat-message bot";
  typingDiv.id = "typing-message";
  typingDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Simulate AI response after delay
  setTimeout(() => {
    const typingMessage = document.getElementById("typing-message");
    if (typingMessage) {
      typingMessage.remove();
    }

    const response = getAIResponse(message);
    const botMessageDiv = document.createElement("div");
    botMessageDiv.className = "chat-message bot";
    botMessageDiv.innerHTML = `<p>${response}</p>`;
    messagesContainer.appendChild(botMessageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 1000 + Math.random() * 1000);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function getAIResponse(message) {
  const lowerMessage = message.toLowerCase();

  // Knowledge base for the AI agent
  const responses = {
    greeting: {
      patterns: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
      response: "Hello! Welcome to Swiftly Agency. I'm here to help you with influencer marketing. What would you like to know?"
    },
    services: {
      patterns: ["services", "what do you do", "what do you offer", "help me with"],
      response: "We offer three main services: <br><br>1. <strong>SEO & Organic Growth</strong> - Boost your visibility with data-driven strategies<br>2. <strong>Paid & Organic Ads</strong> - Maximize ROI across all platforms<br>3. <strong>Influencer Marketing</strong> - Connect with perfect-fit creators using our AI matching"
    },
    pricing: {
      patterns: ["price", "cost", "how much", "pricing", "rates", "budget"],
      response: "Our pricing varies based on your campaign goals and scale. We offer flexible packages starting from $2,500/month for small businesses to enterprise solutions for larger brands. Would you like to schedule a consultation to discuss your specific needs?"
    },
    influencers: {
      patterns: ["influencer", "creator", "talent", "who do you work with"],
      response: "We work with a diverse network of verified influencers across all niches - from tech reviewers and fitness experts to fashion models and lifestyle creators. Our AI matches you with creators who align with your brand values and target audience."
    },
    ai: {
      patterns: ["ai", "artificial intelligence", "how does it work", "matching", "algorithm"],
      response: "Our AI Talent Matcher analyzes brand requirements, audience demographics, engagement rates, and content style to find the perfect influencer match. It considers over 50 data points to ensure authentic partnerships that drive real results."
    },
    contact: {
      patterns: ["contact", "reach", "email", "phone", "call", "talk", "meeting", "schedule"],
      response: "You can reach us by clicking the 'Work With Us' button on our homepage, or email us at hello@swiftly.agency. We typically respond within 24 hours and can schedule a free consultation call."
    },
    results: {
      patterns: ["results", "roi", "success", "case study", "examples", "performance"],
      response: "Our campaigns typically see 3-5x ROI on influencer spend. On average, our clients experience a 40% increase in brand awareness and 25% boost in conversion rates within the first 90 days."
    },
    start: {
      patterns: ["get started", "start", "begin", "sign up", "work with you"],
      response: "Getting started is easy! 1) Click 'Work With Us' to fill out a brief form, 2) We'll schedule a discovery call to understand your goals, 3) Our AI matches you with ideal creators, 4) We launch and optimize your campaign. Ready to begin?"
    }
  };

  // Check for matching patterns
  for (const category in responses) {
    const { patterns, response } = responses[category];
    if (patterns.some(pattern => lowerMessage.includes(pattern))) {
      return response;
    }
  }

  // Default response
  return "That's a great question! For more specific information about our influencer marketing services, I'd recommend speaking with one of our specialists. You can schedule a free consultation by clicking 'Work With Us' on our homepage. Is there anything else I can help you with?";
}

// Initialize smooth scrolling for navigation
document.addEventListener("DOMContentLoaded", function() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});
