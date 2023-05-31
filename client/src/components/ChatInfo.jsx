import React from 'react'
import s from "./ChatInfo.module.css"

export default function ChatInfo({members}) {
    return (
        <div className={s.info_container}>
            <h3 className={s.info_h3}>Участники:</h3>
            <ul className={s.info_ul}>
                {
                    members.map(member => 
                        <li className={s.info_li} key={member}>{member}</li>
                    )
                }    
            </ul>
        </div>
    )
}
