

// Custom function for handling principle highlighting
function highlightPrinciple(element) {
  // Remove highlight from all principles first
  const allPrinciples = document.querySelectorAll('.principle-list li');
  allPrinciples.forEach(item => {
    item.classList.remove('highlight');
  });
  
  // Add highlight to the clicked principle
  element.classList.add('highlight');
}

// DOM traversal methods (requirement: minimum 2)
const principleList = document.getElementById('main-illustration'); // getElementById
const allPrincipleItems = document.getElementsByTagName('li'); // getElementsByTagName
const wrapperSections = document.querySelectorAll('.wrapper'); // querySelectorAll

// Mouse-based events (requirement: minimum 2)
const principles = document.querySelectorAll('.principle-list li');
principles.forEach(principle => {
  // Click event
  principle.addEventListener('click', function() {
    highlightPrinciple(this);
  });
  
  // Mouseover event
  principle.addEventListener('mouseover', function() {
    this.style.cursor = 'pointer';
    this.style.color = '#3B5AFB';
  });
  
  // Mouseout event
  principle.addEventListener('mouseout', function() {
    if (!this.classList.contains('highlight')) {
      this.style.color = '#333';
    }
  });
});

// Key-based event (requirement: minimum 1)
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    // Remove all highlights when ESC key is pressed
    const highlightedItems = document.querySelectorAll('.highlight');
    highlightedItems.forEach(item => {
      item.classList.remove('highlight');
    });
    
    // Reset principle text colors
    principles.forEach(principle => {
      principle.style.color = '#333';
    });
  }
});

// DOM tree navigation property (requirement: minimum 1)
const chatWidget = document.getElementById('chat-widget');
const chatToggle = chatWidget.firstElementChild; // Using firstElementChild

// Add an element to DOM at runtime (requirement)
chatToggle.addEventListener('click', function() {
  // Check if chat box already exists
  const existingChatBox = document.getElementById('chat-box');
  
  if (existingChatBox) {
    // If it exists, toggle its visibility
    existingChatBox.style.display = existingChatBox.style.display === 'none' ? 'block' : 'none';
  } else {
    // Create new chat box element
    const chatBox = document.createElement('div');
    chatBox.id = 'chat-box';
    
    // Assign attributes to the element
    chatBox.setAttribute('class', 'chat-container');
    chatBox.innerHTML = `
      <div class="chat-header">
        <h3>Digital Learning Institute Support</h3>
        <button id="close-chat">×</button>
      </div>
      <div class="chat-messages">
        <p><strong>Support:</strong> Hello! How can I help you understand Mayer's principles today?</p>
      </div>
      <div class="chat-input">
        <input type="text" placeholder="Type your question here..." id="chat-input-field">
        <button id="send-message">Send</button>
      </div>
    `;
    
    // Insert the element into DOM using appendChild
    chatWidget.appendChild(chatBox);
    
    // Changing style of HTML element by changing class (requirement)
    chatToggle.classList.add('active');
    
    // Add close button functionality
    document.getElementById('close-chat').addEventListener('click', function() {
      chatBox.style.display = 'none';
      chatToggle.classList.remove('active');
    });
    
    // Add send message functionality
    document.getElementById('send-message').addEventListener('click', sendMessage);
    document.getElementById('chat-input-field').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
});

// Callback function for sending messages
function sendMessage() {
  const inputField = document.getElementById('chat-input-field');
  const userMessage = inputField.value.trim();
  
  if (userMessage) {
    const messagesContainer = document.querySelector('.chat-messages');
    messagesContainer.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    inputField.value = '';
    
    // Simulate response after a short delay
    setTimeout(() => {
      messagesContainer.innerHTML += `<p><strong>Support:</strong> Thank you for your question about Mayer's principles. Our team will get back to you shortly.</p>`;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
  }
}

// Add styles for the chat widget components
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .chat-container {
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 300px;
      height: 400px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 0 15px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 1001;
    }
    
    .chat-header {
      padding: 10px 15px;
      background: #3B5AFB;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .chat-header h3 {
      margin: 0;
      font-size: 16px;
    }
    
    #close-chat {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
    
    .chat-messages {
      flex: 1;
      padding: 15px;
      overflow-y: auto;
    }
    
    .chat-input {
      display: flex;
      padding: 10px;
      border-top: 1px solid #eee;
    }
    
    .chat-input input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-right: 5px;
    }
    
    .chat-input button {
      background: #3B5AFB;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 4px;
      cursor: pointer;
    }
    
    #chat-toggle.active {
      background: #242F66;
      transform: scale(1.1);
    }
  </style>
`);

// Implement newsletter form submission redirect
const subscribeForm = document.querySelector('.newsletter form');
if (subscribeForm) {
  subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    window.location.href = 'HTML2.html';
  });
}

// Initialize subscription confirmation page with email value
window.addEventListener('DOMContentLoaded', function() {
  const subscriberEmail = document.getElementById('subscriber-email');
  if (subscriberEmail) {
    // Simulate getting email from form/storage
    const storedEmail = localStorage.getItem('subscriberEmail') || 'your.email@example.com';
    subscriberEmail.textContent = storedEmail;
  }
});

// Create smooth scrolling for principle links
document.querySelectorAll('.principle-list li a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const principleText = this.textContent;
    
    // Find the section with this principle using childNodes and nextElementSibling
    let found = false;
    wrapperSections.forEach(section => {
      const headingText = section.querySelector('h2')?.textContent || '';
      if (headingText.includes(principleText.split('–')[0].trim())) {
        section.scrollIntoView({ behavior: 'smooth' });
        // Change style by changing class list
        section.classList.add('highlight');
        setTimeout(() => {
          section.classList.remove('highlight');
        }, 2000);
        found = true;
      }
    });
  });
});