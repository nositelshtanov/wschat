import React from 'react'

export default function ChatInfo({members}) {
  return (
    <div>
        Участники:
        <ul>
            {
                members.map(member => 
                    <li key={member}>{member}</li>
                )
            }    
        </ul>
    </div>
  )
}
