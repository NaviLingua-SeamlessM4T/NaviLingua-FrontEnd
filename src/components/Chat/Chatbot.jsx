// eslint-disable-next-line no-unused-vars
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  Avatar,
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
// import { getAuth } from "firebase/auth";
import { Bot } from "lucide-react";

const ChatBot = () => {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "👋🏻 Hi, I am NaviLingua! How can I help you?",
      sentTime: "just now",
      sender: "ChatGPT",
      role: "system",
    },
  ]);

  const apiKey = import.meta.env.VITE_OPENAI_KEY;
  const orgKey = import.meta.env.VITE_ORGANIZATION_KEY;

  const generateChat = async (message) => {
    const newMessage = {
      message: message,
      sender: "UserGPT",
      direction: "outgoing",
    };
    // post all the old Messages & new Message
    const newMessages = [...messages, newMessage];

    // update our messages state
    setMessages(newMessages);

    // set a typing indicator for chatgpt is typing
    setTyping(true);

    // process message to chatgpt: send it over and see the response
    await sendMessage(newMessages);
  };

  async function sendMessage(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        // response from chatGPT
        role = "assistant";
      } else {
        // request from user
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content:
        "You are an AI Assistant chatbot of NaviLingua a webapp that provides migrants with information about their new country in their native language powered by SeamlessM4T GenAI created by meta. SeamlessM4T is a breakthrough multilingual AI model enabling real-time speech/text translation across 100+ languages. This unified model enables multiple tasks like Speech-to-Speech (S2ST), Speech-to-Text (S2TT), Text-to-Speech (T2ST) translation and more capabilities, without relying on multiple separate models. SeamlessM4T is designed to provide high-quality translation, allowing people from different linguistic communities to communicate effortlessly through speech and text. This allows for seamless communication between speakers of different languages. Answer as short and concise as possible",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "OpenAI-Organization": orgKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => data.json())
      .then((data) => {
        const response = data.choices[0].message.content;
        setMessages([
          ...chatMessages,
          {
            message: response,
            sender: "ChatGPT",
            role: "system",
          },
        ]);
        setTyping(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

//   const auth = getAuth();
//   const user = auth.currentUser;
//   const photoURL = user.photoURL;
  const photoURL = '';

  return (
    <div className="bg-white fixed bottom-4 right-4 w-80 border-4 border-white rounded-lg shadow-lg mb-20">
      <div className="h-24 py-5 text-center text-white bg-gradient-to-r from-yellow-300 to-yellow-600 rounded-lg ">
        <div className="flex items-center justify-center t">
          <Bot className="text-white" size={28} />
          <h2 className="text-white px-2 font-bold text-xl">
            NaviLingua<span className="font-normal">Bot</span>
          </h2>
        </div>
        <div>
          <p className="text-blue-100 pt-2">Do you have any questions?</p>
        </div>
      </div>
      <div className="h-96 overflow-y-auto mb-4 mt-2">
        <MainContainer className="md:h-full border-0">
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                typing ? (
                  <TypingIndicator content="NaviLinguaBot is typing" />
                ) : null
              }
              className="text-white"
            >
              {messages.map((message, i) => {
                if (message.role === "system") {
                  return (
                    <>
                      <Message
                        key={i}
                        model={message}
                        className="pt-2"
                        avatarPosition="tl"
                      >
                        <Avatar
                          src="https://cdn-icons-png.flaticon.com/512/4712/4712009.png"
                          className="p-1"
                          size="md"
                          status="available"
                        />
                      </Message>
                    </>
                  );
                } else {
                  return (
                    <>
                      <Message key={i} model={message} className="pt-2 rounded">
                        {photoURL ? (
                          <Avatar src={photoURL} size="md" status="available" />
                        ) : (
                          <Avatar src='https://toppng.com/public/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png' size="md" status="available" />
                        )}
                      </Message>
                    </>
                  );
                }
              })}
            </MessageList>
            <MessageInput
              className="bg-slate-600"
              placeholder="Your message here..."
              onSend={generateChat}
              attachButton={false}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default ChatBot;