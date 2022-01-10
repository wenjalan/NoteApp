import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

// Main App Component
function App() {
  return (<MarkdownTest />);
}

// Markdown Side-by-Side Demo
function MarkdownTest() {
  // text input state
  const [input, setInput] = useState('');
  return (
    <div className="app-container">
      <InputBox setInput={setInput} />
      <DisplayBox text={input} />
    </div>
  );
}

// Markdown Raw Input Box
function InputBox(props) {
  let onChange = (e) => {
    // set input to value of input box
    props.setInput(e.target.value);
  }
  return (
    <div className="input-box-container">
      <h1>Raw Input</h1>
      <textarea className="raw-input-textarea" onChange={onChange}/> 
    </div>
  )
}

// Markdown Display Box
function DisplayBox(props) {
  const text = props.text;
  return (
    <div className="display-box-container">
      <h1>Display</h1>
      <ReactMarkdown className="display-markdown">
        {text}
      </ReactMarkdown>
    </div>
  )
}

export default App;
