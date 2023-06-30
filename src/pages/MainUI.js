import React, { useState } from 'react'
import VoiceUI from '../componenets/VoiceUI'
import TextUI from '../componenets/TextUI'
import { useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import { useWhisper } from '@chengsokdara/use-whisper'
import { useSpeechSynthesis } from 'react-speech-kit'

//chat ui is getting updated on the next render lol
const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_TOKEN,//OPEN_AI_TOKEN
  });
delete configuration.baseOptions.headers['User-Agent'];//because calling api from frontend
const openai = new OpenAIApi(configuration);

const MainUI = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const {
    transcript,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: process.env.REACT_APP_OPENAI_API_TOKEN, //OPEN_AI_TOKEN
  })

  const { speak } = useSpeechSynthesis();


  const chat = async ( message) => {
    // e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    window.scrollTo(0,1e10)
// console.log(chats)
    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              `you are languageGPT an assistant to help me improve my english language and conversation skills. You have to act like we are a tinder match and have a conversation with me. Reply should be a proper sentence and make up details about yourself if required.along with reply, include a short feedback of the grammar, vocabulary (ignore punctuations) and what can be improved in my previous message. use only the following json format and do not return any text outside the json object. format: {"reply": "CHAT_REPLY", "feedback": "FEEDBACK"} Your response should not contain any text outside of the curly braces as used in format`,
          },
          {
            role: "user",
            content: "Hi! What is your name"
          },
          {
            role: "assistant",
            content: `{"reply":"My name is Habble, and I'm excited to get to know you! What brings you to Tinder?", "feedback":"Good grammar and vocabulary. Keep it up!"}`
          },
          ...chats,
        ],
      })
      .then((res) => {
        msgs.push(res.data.choices[0].message);
        setChats(msgs);
        setIsTyping(false);
        window.scrollTo(0,1e10);
        let assistantMessage = JSON.parse(res.data.choices[0].message.content)
        speak({text: assistantMessage.reply})//text to speech
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(()=>{
    setMessage(transcript.text)
  },[transcript.text])




    const [textUIIsClosed, setTextUIIsClosed] = useState(false)

  return (
    
    <div className='h-screen w-full flex-col'>
        <div className={`${textUIIsClosed? "hidden" : "h-[67%]"}`}>
            <TextUI chats={chats} isTyping={isTyping}/>
        </div>

        <div className={`${textUIIsClosed? "h-full" : "h-[33%]"}`}>
            <VoiceUI textUIIsClosed={textUIIsClosed} setTextUIIsClosed={setTextUIIsClosed} startRecording={startRecording} stopRecording={stopRecording} chat={chat} message={message}/>
        </div>
    </div>
  )
}

export default MainUI