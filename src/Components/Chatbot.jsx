import React, { useState, useRef, useEffect } from 'react';
import './style.css'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Welcome! How can I assist you with your mental health or fitness today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    setMessages(prevMessages => [...prevMessages, { text: input, isUser: true }]);
    setInput('');

    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages(prevMessages => [...prevMessages, { text: botResponse, isUser: false }]);
    }, 500);
  };

  // Bot response logic
  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        return "Hello! How can I assist you with your mental health or fitness today?";
    } else if (lowerInput.includes('anxious') || lowerInput.includes('anxiety')) {
        return "I'm sorry you're feeling anxious. Have you tried any deep breathing exercises? They can be very helpful in managing anxiety.";
    } else if (lowerInput.includes('workout') || lowerInput.includes('exercise')) {
        return "Regular exercise is great for both mental and physical health. What type of exercise do you enjoy? I can suggest some routines if you'd like.";
    } else if (lowerInput.includes('depressed') || lowerInput.includes('depression')) {
        return "I'm sorry to hear you're feeling depressed. It's important to reach out to a mental health professional. In the meantime, try to engage in activities you enjoy and maintain a regular sleep schedule.";
    } else if (lowerInput.includes('stress') || lowerInput.includes('stressed')) {
        return "Stress can be challenging. Have you tried mindfulness or meditation? Even a few minutes a day can make a difference.";
    } else if (lowerInput.includes('diet') || lowerInput.includes('nutrition')) {
        return "A balanced diet is crucial for both mental and physical health. Are you interested in learning about some healthy eating habits?";
    } else if (lowerInput.includes('sleep') || lowerInput.includes('insomnia')) {
        return "Good sleep is essential for mental health. Try to maintain a consistent sleep schedule and avoid screens before bedtime. Would you like more sleep hygiene tips?";
    } else if (lowerInput.includes('motivation') || lowerInput.includes('unmotivated')) {
        return "Lack of motivation can be tough. Try setting small, achievable goals and celebrate your progress. What's one small thing you could do today?";
    } else if (lowerInput.includes('meditation') || lowerInput.includes('mindfulness')) {
        return "Meditation and mindfulness are great tools for mental health. Would you like some resources to get started with a simple meditation practice?";
    } else if (lowerInput.includes('hydration') || lowerInput.includes('drink water')) {
        return "Staying hydrated is essential for health. Aim for at least 8 glasses of water a day. Do you need tips on how to increase your water intake?";
    } else if (lowerInput.includes('goal setting') || lowerInput.includes('set goals')) {
        return "Setting and tracking goals can boost motivation. Have you considered setting SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound)?";
    } else if (lowerInput.includes('self-care') || lowerInput.includes('relaxation')) {
        return "Self-care is important for mental health. Activities like reading, exercising, or hobbies can be relaxing. What self-care practices do you enjoy?";
    } else if (lowerInput.includes('therapy') || lowerInput.includes('counseling')) {
        return "Therapy can be very effective. If you're considering it, finding a qualified professional and discussing your needs can be a good first step. Do you need resources for finding a therapist?";
    } else if (lowerInput.includes('chronic pain') || lowerInput.includes('pain management')) {
        return "Managing chronic pain often requires a multi-faceted approach, including medication, physical therapy, and lifestyle changes. Have you consulted a healthcare provider for personalized advice?";
    } else if (lowerInput.includes('heart disease') || lowerInput.includes('cardiovascular health')) {
        return "Heart health is vital. Regular exercise, a balanced diet, and regular check-ups can help. If you have concerns, consulting a healthcare provider is recommended.";
    } else if (lowerInput.includes('diabetes') || lowerInput.includes('blood sugar')) {
        return "Managing diabetes involves monitoring blood sugar levels, maintaining a healthy diet, and regular exercise. Have you discussed your management plan with a healthcare provider?";
    } else if (lowerInput.includes('high blood pressure') || lowerInput.includes('hypertension')) {
        return "Managing high blood pressure includes lifestyle changes like diet and exercise, and sometimes medication. Have you checked with your healthcare provider for a tailored plan?";
    } else if (lowerInput.includes('immune system') || lowerInput.includes('immunity')) {
        return "Supporting your immune system involves a balanced diet, regular exercise, adequate sleep, and stress management. Are you looking for specific ways to boost your immune system?";
    } else if (lowerInput.includes('cancer') || lowerInput.includes('oncology')) {
        return "Cancer care and management vary widely depending on the type and stage. It's crucial to follow the treatment plan provided by your oncologist. Do you need information on support resources?";
    } else if (lowerInput.includes('allergies') || lowerInput.includes('allergic reaction')) {
        return "Managing allergies often involves avoiding triggers and taking prescribed medications. Have you identified your triggers or consulted a specialist for a treatment plan?";
    } else if (lowerInput.includes('preventive care') || lowerInput.includes('screenings')) {
        return "Preventive care includes regular check-ups, screenings, and vaccinations to detect health issues early. Are you due for any routine screenings or vaccinations?";
    } else {
        return "I'm here to assist with a wide range of health topics. If you have specific questions or need advice, please let me know. For personalized advice, consulting a healthcare professional is always a good idea.";
    }
  };


  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-[#a5fcad] rounded-lg shadow-2xl overflow-hidden">
      <div className="bg-green-600 text-white p-4 text-center">
        <h2 className="text-2xl font-bold">ZenZone Chatbot</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-white bg-opacity-70" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {messages.map((message, index) => (
          <div key={index} className={`my-3 ${message.isUser ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-4 rounded-lg shadow-md max-w-[80%] ${
              message.isUser 
                ? 'bg-green-500 text-white rounded-br-none' 
                : 'bg-white text-gray-800 rounded-bl-none'
            }`}>
              {message.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white bg-opacity-90 border-t border-green-300 flex">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-1 p-4 border border-green-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-4 rounded-r-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;