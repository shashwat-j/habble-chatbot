import React from 'react'

const TextUI = ({chats, isTyping}) => {
  return (
    <div className='bg-red-300 h-full w-full'>
        {/* Bot: hello <br/> You: What is up bot? */}
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

    </div>
  )
}

export default TextUI