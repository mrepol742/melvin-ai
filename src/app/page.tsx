"use client";

import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { useChatStore } from "@/store/chats";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function Melvin() {
  const { chats, activeChatId, addMessage } = useChatStore();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId);

  const handleSubmit = (input: string) => {
    if (!input.trim() || !activeChatId) return;

    addMessage(activeChatId, { role: "user", content: input });
    setInput("");

    setTimeout(() => {
      addMessage(activeChatId, { role: "bot", content: "🤖 Dummy response" });
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() !== "") {
        handleSubmit(input);
        setInput("");
      }
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto"; // reset
    const lineHeight = 24;
    const maxLines = 12;
    const maxHeight = lineHeight * maxLines;

    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, [input]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-100">
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {activeChat?.messages.length === 0 ? (
            <div className="text-center text-gray-500 text-sm mt-auto mb-4">
              Start the conversation below 👇
            </div>
          ) : (
            activeChat?.messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    msg.role === "user" ? "hidden" : "bg-gray-300 text-gray-800"
                  }`}
                >
                  {msg.role === "user" ? "U" : "B"}
                </div>

                <div
                  className={`max-w-md px-4 py-3 rounded-2xl text-sm shadow break-words whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-gray-800 text-white rounded-br-none"
                      : "bg-gray-300 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <ReactMarkdown
                    children={msg.content}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        if (inline) {
                          return (
                            <code className="px-1 rounded font-mono" {...props}>
                              {children}
                            </code>
                          );
                        } else {
                          return (
                            <SyntaxHighlighter
                              style={oneDark}
                              language={match ? match[1] : "text"}
                              PreTag="div"
                              className="rounded-md text-sm"
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          );
                        }
                      },
                    }}
                  />
                </div>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    msg.role === "user" ? "bg-gray-800 text-white" : "hidden"
                  }`}
                >
                  {msg.role === "user" ? "U" : "B"}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="sticky bottom-0 bg-white border-t p-4">
          <div className="flex items-end gap-3 max-w-4xl mx-auto w-full">
            <textarea
              ref={textareaRef}
              className="flex-1 border border-gray-300 text-black rounded-xl px-4 py-3 text-sm resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              onClick={() => {
                if (input.trim() !== "") {
                  handleSubmit(input);
                  setInput("");
                }
              }}
              className="px-5 py-3 bg-gray-800 text-white text-sm rounded-xl hover:bg-gray-700 transition"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
