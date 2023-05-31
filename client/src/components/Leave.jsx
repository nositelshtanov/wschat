import React from 'react'

export default function Leave({leaveRoom}) {
  return (
    <div>
        <button type='button' onClick={leaveRoom}>Выйти</button>
    </div>
  )
}
