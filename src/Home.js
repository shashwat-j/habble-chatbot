// import { useWhisper } from '@chengsokdara/use-whisper'
// import { useEffect, useState } from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit'
// const { Configuration, OpenAIApi } = require("openai");

// const Home = () => {
//   const [userMsg, setUserMsg] = useState("")
//   const [gptOutput, setGptOutput] = useState("")
//   const systemPrompt = `you are languageGPT an assistant to help me improve my english language and conversation skills. You have to act like we are a tinder match and have a conversation with me. Reply should be a proper sentence and make up details about yourself if required.along with reply, include a short feedback of the grammar, vocabulary (ignore punctuations) and what can be improved in my previous message. use only the following json format and do not return any text outside the json object. format: {"reply": "CHAT_REPLY", "feedback": "FEEDBACK"} Your response should not contain any text outside of the curly braces as used in format`
//   // const [messages, setMessages] = useState([{role: "system", content: systemPrompt}, {role: "assistant", content: "hi! how are you doing"}])
//   let messagesArray=[{role: "system", content: systemPrompt}, {role: "assistant", content: "hi! how are you doing"}]
//   const [messages, setMessages] = useState([{role: "system", content: systemPrompt}, {role: "assistant", content: "hi! how are you doing"}])
//   const [feedback, setFeedback] = useState("")

//   const {
//     recording,
//     speaking,
//     transcribing,
//     transcript,
//     pauseRecording,
//     startRecording,
//     stopRecording,
//   } = useWhisper({
//     apiKey: process.env.REACT_APP_OPENAI_API_TOKEN, //OPEN_AI_TOKEN
//   })

//   const { speak } = useSpeechSynthesis();

//   const configuration = new Configuration({
//     apiKey: process.env.REACT_APP_OPENAI_API_TOKEN,//OPEN_AI_TOKEN
//   });
//   delete configuration.baseOptions.headers['User-Agent'];//because calling api from frontend
//   const openai = new OpenAIApi(configuration);

//   const generateGptOutput = async () => {  
//     console.log(userMsg)
    
//     console.log(JSON.stringify(messages))
//     const baseCompletion = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: messagesArray,
//       temperature: 0.8
//     });
//     const basePromptOutput = baseCompletion.data.choices[0].message.content;
//     let splitted = basePromptOutput.split('Feedback')//splitting into reply and feedback
//     if (!splitted[1]){
//       splitted = basePromptOutput.split('feedback')
//     }
//     setGptOutput(splitted)
//     speak({text: splitted[0]})
//     messagesArray.push({"role": "assistant", "content": splitted[0]})
//     setMessages(messagesArray)
//     // feedbackArray.push(splitted[0])
//     setFeedback(splitted[1])
//     console.log(feedback)
//     // setMessages([...messages, {role: "assistant", content: basePromptOutput}])
//     console.log(gptOutput)
//     console.log(basePromptOutput)
//     console.log(baseCompletion.data.choices[0])
//     //res.status(200).json({ output: basePromptOutput });
//   };

//   function renderHistory(){
//     return (<div className='flex flex-col m-4'>
//       {messages.map((message, index)=>{
//         if(message.role==="assistant"){
//           // speak({ text: transcript?.text })
//           return( <div key={index} className="flex gap-2 text-red-800">
//           <span className="font-bold">gpt:</span>
//           <span>{message?.content}</span>
//         </div>)
//         }
//         if(message.role==="user"){
//           return(<div key={index} className="flex gap-2">
//       <span className="font-bold">you:</span>
//       <span>{message?.content}</span>
//       <span className='bg-yellow-100 text-red-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-fulls cursor-pointer' onClick={(e)=>{e.target.innerHTML=feedback; console.log(feedback)}}>feedback</span>
//     </div>)
//         }
//       })}
//   </div>)
//   }

//   function handleSend1(){
//     setUserMsg(transcript.text)
//     console.log(userMsg)
//     if(userMsg){
      
//       messagesArray.push({role: "user", content: userMsg})
//       setMessages(messagesArray)
//       console.log(messages)
//       generateGptOutput()
//       // setUserMsg("")
//     }
//   }

//   function handleSend() {
//     setUserMsg(transcript.text)
//     if (userMsg) {
//       const updatedMessages = [...messages, { role: 'user', content: userMsg }];
//       setMessages(updatedMessages);
//       setUserMsg(''); // Clear the user input field
//       console.log(updatedMessages);
//       generateGptOutput();
//     }
//   }


//   //jugaad
//   // useEffect(()=>{
//   //   setUserMsg(transcript.text)
//   //   console.log(userMsg)
//   //   if(userMsg){
//   //     messages.push({role: "user", content: userMsg})
//   //     generateGptOutput()
//   //     setUserMsg("")
//   //   }
//   // },[messages])

//   return (
//     <div>
//       {/* <p>Transcribed Text: {transcript.text}</p>
//       <button onClick={() => startRecording()}>Start</button>
//       <button onClick={() => pauseRecording()}>Pause</button>
//       <button onClick={() => stopRecording()}>Stop</button>

//       <div>
//       <button onClick={() => speak({ text: transcript?.text })}>Speak</button>
//       </div> */}

//       <h1 className="text-center">Learn Conversation</h1>
//       {renderHistory()}
//       <div className="mx-4 flex">
//       <textarea placeholder='hello...' onChange={(e)=>{setUserMsg(e.target.value)}}></textarea>
//       <button onClick={handleSend}>send</button>
//       </div>
//       <button className='bg-green-300 mx-2' onClick={() => startRecording()}>Start speaking</button>
//       <button className='bg-red-300' onClick={() => stopRecording()}>Stop</button>
//     </div>
//   )
// }

// export default Home;
