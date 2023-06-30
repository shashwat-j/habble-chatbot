import React from 'react'

const ButtonsVoiceUI = ({startRecording, stopRecording, chat, message}) => {
  return (
    <div className='mt-8'>
        <button className='bg-green-300 mx-2' onClick={() => startRecording()}>Start speaking</button>
      <button className='bg-red-300' onClick={() => {
        stopRecording()
        chat(message)
      }}>Stop</button>
    </div>
  )
}

export default ButtonsVoiceUI