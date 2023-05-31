import React, { useState } from 'react'
import s from './Auth.module.css'

export default function Auth({onAuth, changeName}) {
    const [name, setName] = useState("");

    return (
        <form className={s.auth_conteiner}>
            <h3 className={s.auth_h3}>Авторизация</h3>
            <input 
                onInput={(e) => {
                    setName(e.target.value);
                    changeName(e.target.value);
                }} 
                value={name} 
                type="text" 
                placeholder='Введите свое имя' 
                className={s.auth_input} 
            />
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    onAuth(name);
                }} 
                type='submit'
                className={s.auth_btn}
            >Авторизоваться</button>
        </form>
    )
}
