import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

// Main App Component
function App() {
  return (<MarkdownTest />);
}

// Markdown Side-by-Side Demo
function MarkdownTest() {
  // Input Box State
  const [input, setInput] = useState('');
  const [inputPosition, setInputPosition] = useState({
    start: undefined,
    end: undefined
  });

  // component
  return (
    <div className="app-container">
      <Caret/>
      <InputBox setInputPosition={setInputPosition} setInput={setInput}/>
      <DisplayBox text={input}/>
    </div>
  );
}

// Markdown Raw Input Box
function InputBox(props) {
  // on text change
  let onChange = (e) => {
    // set input to value of input box
    props.setInput(e.target.value);

    // set caret position
    props.setInputPosition({
      start: e.target.selectionStart,
      end: e.target.selectionEnd
    });
  }
  // on selection change
  let onSelectionChange = (e) => {
    // set caret position
    props.setInputPosition({
      start: e.target.selectionStart,
      end: e.target.selectionEnd
    });
  }
  return (
    <div className="input-box-container">
      <h1>Raw Input</h1>
      <textarea className="raw-input-textarea" onChange={onChange} onSelect={onSelectionChange}/> 
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

// Caret
// TODO: Make the caret render at the correct position on the DisplayBox
function Caret() {
  return (
    <span className='caret'/>
  );
}

export default App;
