import React from 'react'
import AvatarsVoiceUI from './AvatarsVoiceUI'
import ButtonsVoiceUI from './ButtonsVoiceUI'

const VoiceUI = ({textUIIsClosed, setTextUIIsClosed, startRecording, stopRecording, chat, message}) => {
  return (
    <div className='bg-gray-300 h-full w-full text-center'>

        <div>
            <button onClick={()=>{setTextUIIsClosed(!textUIIsClosed)}} className='bg-gray-800 text-white rounded-full'>toggle</button>
        </div>

        <div className=''>
        {textUIIsClosed?(
            <div className=''>
                <AvatarsVoiceUI/>
                <ButtonsVoiceUI startRecording={startRecording} stopRecording={stopRecording} chat={chat} message={message}/>
            </div>
        ):(
            <div className=''>
                <ButtonsVoiceUI startRecording={startRecording} stopRecording={stopRecording} chat={chat} message={message}/>
            </div>
        )}
        
        </div>
    </div>
  )
}

export default VoiceUI