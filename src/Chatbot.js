import { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { useWhisper } from '@chengsokdara/use-whisper'
import { useSpeechSynthesis } from 'react-speech-kit'

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_TOKEN,//OPEN_AI_TOKEN
  });
delete configuration.baseOptions.headers['User-Agent'];//because calling api from frontend
const openai = new OpenAIApi(configuration);

function Chatbot() {
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


  const chat = async (e, message) => {
    e.preventDefault();

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



  return (
    <main>
      <h1>Habble Chat</h1>

      <section>
        {chats && chats.length
          ? chats.map((chat, index) => {
            if(chat.role==="user"){
                return(<p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                <span>
                <b>{chat.role.toUpperCase()}</b>
                </span>
                <span>:</span>
                <span>{chat.content}</span>
            </p>)
            }
            else{
                // console.log(JSON.parse(chat.content))
                let AssistantMsg = JSON.parse(chat.content)
                return(<p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                <span>
                <b>{chat.role.toUpperCase()}</b>
                </span>
                <span>:</span>
                <span>{AssistantMsg.reply}</span>
                <span className='bg-yellow-100 text-red-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-fulls cursor-pointer' onClick={(e)=>{e.target.innerHTML=AssistantMsg.feedback}}>feedback</span>
            </p>)
            }
           
            }
            )
          : ""}
      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>

      <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          className="w-[500px] border border-black"
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>

      <div className="mx-4 flex">
      {/* <textarea placeholder='hello...' onChange={(e)=>{setUserMsg(e.target.value)}}></textarea>
      <button onClick={handleSend}>send</button> */}
      </div>
      <button className='bg-green-300 mx-2' onClick={() => startRecording()}>Start speaking</button>
      <button className='bg-red-300' onClick={() => stopRecording()}>Stop</button>
    </main>
  );
}

export default Chatbot;