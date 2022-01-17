import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import TextArea from './TextArea';

// Main App Component
function App() {
  return (<TextArea />);
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
  
  // render the caret
  useEffect(() => {
    // get the display markdown
    const displayMarkdown = document.getElementsByClassName('display-markdown')[0];

    // if there are no children, draw caret at beginning
    if (!displayMarkdown.lastChild) {
      const displayMarkdownBoundingBox = displayMarkdown.getBoundingClientRect();
      const newCaret = document.createElement('span');
      newCaret.className = 'caret';
      newCaret.style.top = displayMarkdownBoundingBox.top + 'px';
      newCaret.style.left = displayMarkdownBoundingBox.left + 'px';
      displayMarkdown.appendChild(newCaret);
    }
    // otherwise, draw caret at end of last child
    else {
      // set width of all children to fit-content
      for (let i = 0; i < displayMarkdown.children.length; i++) {
        displayMarkdown.children[i].style.width = 'fit-content';
      }

      // remove previous caret
      const caret = document.getElementsByClassName('caret')[0];
      if (caret) {
        displayMarkdown.removeChild(caret);
      }

      // create a new caret
      const lastChildBoundingBox = displayMarkdown.lastChild.getBoundingClientRect();
      const newCaret = document.createElement('span');
      newCaret.className = 'caret';
      newCaret.style.top = lastChildBoundingBox.top + 'px';
      newCaret.style.left = lastChildBoundingBox.right + 'px';
      newCaret.style.height = lastChildBoundingBox.height + 'px';
      displayMarkdown.appendChild(newCaret);
    }
  }, [text]);

  return (
    <div className="display-box-container">
      <h1>Display</h1>
      <ReactMarkdown className="display-markdown" children={text} />
    </div>
  )
}

export default App;
