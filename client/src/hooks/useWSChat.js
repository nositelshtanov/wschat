import { useEffect, useRef, useState } from "react";

export default function useWSChat() {
    const websock = useRef();
    const [rooms, setRooms] = useState();
    const [isAuth, setIsAuth] = useState(false);
    const [members, setMembers] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");

        websock.current = ws;

        ws.addEventListener("open", (e) => {

        });

        ws.addEventListener("message", (e) => {
            const mes = JSON.parse(e.data);

            switch (mes.event) {
                case "rooms":
                    setRooms(mes.data);
                break;
                case "authSuc":
                    setIsAuth(mes.data);
                break;
                case "joined":
                    setMessages(prev => [mes.data, ...prev]);
                break;
                case "sendMes":
                    setMessages(prev => [mes.data, ...prev]);
                break;
                case "members":
                    setMembers(mes.data);
                break;
                default:
                    console.log("неизвестное сообщение");
                break;
            }
        });

        ws.onerror = function(e) {
            alert("ошибка", e);
        }
    }, []);

    return {
        websock, 
        rooms, setRooms, 
        isAuth, setIsAuth, 
        members, setMembers, 
        messages, setMessages
    };
}