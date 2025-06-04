import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import barclaysLogo from './assets/barclays.svg';

const BARCLAYS_BLUE = '#0076B6';

const initialMessages = [
  { sender: 'ai', text: 'Hi, for what technology do you want me to find the requests for you?' },
  { sender: 'user', text: 'Databricks' },
  { sender: 'ai', text: 'To use Databricks in your department, you will need access to the database - DB Access and Databricks - Databrick Access.' },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages] = useState(initialMessages);

  // Padding from bottom and right
  const padding = 32;
  const chatWidth = 420;
  const chatHeight = 710;

  return (
    <>
      {/* Chatbot Icon */}
      <button
        aria-label="Open chatbot"
        onClick={() => setOpen(true)}
        style={{
          background: BARCLAYS_BLUE,
          position: 'fixed',
          bottom: padding,
          right: padding,
          width: 72,
          height: 72,
          borderRadius: '50%',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          display: open ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <MessageCircle color="#fff" size={38} />
      </button>

      {/* Chat Window Overlay */}
      <div
        style={{
          position: 'fixed',
          bottom: padding,
          right: padding,
          width: chatWidth,
          maxWidth: '100vw',
          height: open ? chatHeight : 0,
          maxHeight: '90vh',
          background: '#fff',
          borderRadius: '1.5rem 1.5rem',
          boxShadow: open ? '0 0 32px rgba(0,0,0,0.18)' : 'none',
          overflow: 'hidden',
          transition: 'height 0.4s cubic-bezier(.4,2,.6,1)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{
          background: BARCLAYS_BLUE,
          color: '#fff',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
            <img src={barclaysLogo} alt="Barclays Logo" style={{ width: 36, height: 36 }} />
          <span style={{ fontWeight: 700, fontSize: 22 }}>AccessHub AI Chatbot</span>
          <button
            aria-label="Close chatbot"
            onClick={() => setOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: 30,
              cursor: 'pointer',
              marginLeft: 8,
            }}
          >
            ×
          </button>
        </div>
        {/* Chat History */}
        <div style={{
          flex: 1,
          background: '#f8fafc',
          padding: '1.25rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
            
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
                <div style={{
                    fontSize: 16,
                    color: '#64748b',
                }}>
                    {msg.sender === 'ai' ? 'AccessHub AI Agent' : 'You'}
                </div>
              <div
                style={{
                  background: msg.sender === 'ai' ? BARCLAYS_BLUE : '#e5e7eb',
                  color: msg.sender === 'ai' ? '#fff' : '#222',
                  borderRadius: msg.sender === 'ai' ? '1rem 1rem 1rem 0.25rem' : '1rem 1rem 0.25rem 1rem',
                  padding: '1rem 1.25rem',
                  fontSize: 18,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  lineHeight: 1.6,
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        {/* Input Area */}
        <div style={{
          background: '#f1f5f9',
          padding: '1rem 1.25rem',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <input
            type="text"
            placeholder="Type your message..."
            style={{
              flex: 1,
              border: 'none',
              borderRadius: 8,
              padding: '0.75rem 1rem',
              fontSize: 17,
              background: '#fff',
              color: '#222',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            }}
            disabled
            readOnly
          />
          <button
            style={{
              background: BARCLAYS_BLUE,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.75rem 1.5rem',
              fontWeight: 600,
              fontSize: 17,
              cursor: 'not-allowed',
              opacity: 0.7,
            }}
            disabled
          >
            Send
          </button>
        </div>
      </div>

      {/* Add mock Teams message below the chat window */}
      <div style={{
        position: 'fixed',
        bottom: 32 + 735, // chatHeight + padding + margin
        right: 32,
        width: 420,
        maxWidth: '100vw',
        background: '#f3f6fa',
        border: '1px solid #d1d5db',
        borderRadius: 18,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        padding: '1.5rem 1.5rem 1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        zIndex: 30
      }}>
        {/* Avatar */}
        <div style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#0076B6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 700,
          fontSize: 22,
          flexShrink: 0
        }}>JM</div>
        {/* Message */}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, color: '#222', fontSize: 17, marginBottom: 6 }}>
            John Manager
          </div>
          <div style={{ color: '#374151', fontSize: 16, lineHeight: 1.7 }}>
            Hi <b>John Manager</b>, <b>G01234567</b> have requested permission to those groups:
            <ul style={{ margin: '8px 0 8px 18px', padding: 0 }}>
              <li><a href="#" style={{ color: '#0076B6', textDecoration: 'underline' }}>DB Access</a></li>
              <li><a href="#" style={{ color: '#0076B6', textDecoration: 'underline' }}>Databrick Access</a></li>
              <li><a href="#" style={{ color: '#0076B6', textDecoration: 'underline' }}>VS Code</a></li>
              <li><span style={{ color: '#dc2626', fontWeight: 700, marginRight: 6 }}>!</span><a href="#" style={{ color: '#0076B6', textDecoration: 'underline' }}>AWS CLI</a></li>
            </ul>
            <div style={{ color: '#dc2626', background: '#fee2e2', borderRadius: 8, padding: '8px 14px', fontWeight: 600, fontSize: 15, margin: '8px 0 0 0', display: 'inline-block' }}>
              Potential anomaly detected: This request may not be appropriate for this user.
            </div>
            Please review and approve if required.
          </div>
        </div>
      </div>
    </>
  );
} 