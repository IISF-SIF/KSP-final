//Chatbot.jsx
"use client"
import Groq from 'groq-sdk';
import Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import "./Chatbot.css";

const API_KEY = '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'; // Replace with your actual API key
const SystemPrompt = `Welcome to our hackathon project! We have developed an innovative AI-based end-to-end solution for traffic management and prediction aimed at reducing congestion in urban environments. Our solution focuses on optimizing signal timings, visualizing accident data, and enhancing object detection using natural language. Feel free to ask any questions about how our project works or specific components of it. Here's a brief overview of what we offer:

Overview:

Traffic Flow Optimization Metrics: Analyzing traffic flow at junctions to optimize signal times and assess efficiency.
AI-Optimized Signal Timings: Using Deep Reinforcement Learning for dynamic signal timings based on real-time traffic.
User-Centric Accident Dashboard: Visualizing accident hotspots with real-time insights from CSV data.
Object Detection using Natural Language: Utilizing YOLO World to detect any object via natural language queries.
Map Routing: An alternative to Google Maps using Open Street Maps, with future integration of CCTV data for accurate traffic representation.
Innovations and Technologies:

Deep Learning Models: Attention-based models for traffic flow prediction visualized on an interactive dashboard.
Deep-RL Models: Double Deep-Q Network (DQN) for signal time optimization, evaluated in the SUMO environment.
YOLO World: Advanced computer vision for detecting vehicles and traffic bottlenecks from CCTV footage, cross-validating GPS data.
Custom Simulations: SUMO traffic simulations in dense regions of Bangalore for real-world signal time optimization.
User and Admin Interfaces: Interactive interfaces for traffic management metrics and real-time congestion updates.
Unique Solutions:

Attention-Based Hotspot Prediction: Using Spatio-Temporal-Decoupled Masked Pre-training (STD-MAE2) for predicting traffic congestion hotspots.
RL for Signal Optimization: State-of-the-art reinforcement learning models trained and evaluated using the RESCO2 benchmark.
Accurate Traffic Detection: YOLO World enables natural language interaction and accurate vehicle detection, enhancing GPS data accuracy.
Bangalore-Based Simulation: Testing RL-based signal optimization in real-world scenarios.
Intuitive Interfaces: Dynamic maps, real-time updates, and visualizations for efficient decision-making and driver convenience.
Benchmarking:

Signal Time Optimization: Performance tested on RESCO2 benchmarks for real-world traffic networks.
Traffic Flow Optimization: STD-MAE model's performance on California Transportation Performance Measurement System (PeMS) datasets.
Please go ahead and ask your questions. For example, you might want to know how our accident dashboard works, how we optimize signal timings, or how our YOLO World object detection operates. We're here to help explain any part of our project!`

const groq = new Groq({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true   
});

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today? I am a chatbot created by Team Straight Outta Vellore to give you insights about the product developed by them.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === '') return;
    
    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);
    setInput('');
    setLoading(true);
  
    try {
        if (typeof input !== 'string') {
            throw new Error('Input must be a string');
        }
    
        const trimmedInput = input.trim();
        const chatCompletion = await groq.chat.completions.create({
            messages: [
            { role: 'system', content: SystemPrompt }, // Replace with your actual system prompt
            { role: 'user', content: trimmedInput },
            ],
            model: 'llama3-70b-8192',
            temperature: 1,
            max_tokens: 512,
            top_p: 1,
            stream: true,
            stop: null,
        });
    
        let botResponse = '';
        for await (const chunk of chatCompletion) {
        botResponse += chunk.choices[0]?.delta?.content || '';
            }

        setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);

    } catch (error) {
        console.error('Error:', error.response || error.message || error);
        let errorMessage = 'Something went wrong. Please try again later.';
        if (error.response) {
            if (error.response.status === 401) {
            errorMessage = 'Unauthorized. Please check your API key.';
            } else if (error.response.status === 403) {
            errorMessage = 'Forbidden. You do not have access to this resource.';
            } else if (error.response.status === 404) {
            errorMessage = 'Not Found. The API endpoint is incorrect.';
            } else if (error.response.status >= 500) {
            errorMessage = 'Server error. Please try again later.';
            }
        }
        setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: errorMessage }]);
        } finally {
        setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
              <h2>TEAM STRAIGHT OUTTA VELLORE</h2>
              <div className="back"><Link  href="/admin">Back to the website</Link></div>
       
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
        {loading && <div className="message bot typing">Typing...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
