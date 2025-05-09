import { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import client from "../lib/axios";
import { login, selectUserId, setError, setLoading } from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header";

export default function GitaChatbot() {
    const [input, setInput] = useState("");
    const [chats, setChats] = useState([]);
    const [loading, setLoadingResponse] = useState(false);
    const userId = useSelector(selectUserId);
    const dispatch = useDispatch();
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("authToken");
            if (token) {
                try {
                    dispatch(setLoading(true));
                    const response = await client.get("/auth/verify-user", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (response.data.success && response.data.user) {
                        dispatch(login(response.data.user));
                    } else {
                        dispatch(setError("Authentication failed"));
                    }
                } catch (error) {
                    dispatch(setError("Token verification failed"));
                } finally {
                    dispatch(setLoading(false));
                }
            }
        };
        checkAuth();
    }, [dispatch]);

    useEffect(() => {
        if (userId) {
            fetchChatHistory();
        }
    }, [userId]);

    useEffect(() => {
        chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats, loading]);

    const fetchChatHistory = async () => {
        if (!userId) return;
        try {
            const res = await client.get(`/chat/history/${userId}`);
            if (res.data && Array.isArray(res.data.chats)) {
                setChats(res.data.chats);
            } else {
                console.error("Invalid chat data:", res.data);
            }
        } catch (error) {
            console.error("Error fetching chat history:", error);
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newUserMessage = {
            _id: Date.now(),
            question: input,
            response: null,
            timestamp: new Date().toISOString()
        };

        setChats((prevChats) => [...prevChats, newUserMessage]);
        setInput("");
        setLoadingResponse(true);

        try {
            const userInput = input;
            setTimeout(async () => {
                const res = await client.post("/chatbot/ask", { question: userInput, userId: userId });
                const botMessage = {
                    _id: Date.now() + 1,
                    question: userInput,
                    response: res.data.response,
                    timestamp: new Date().toISOString()
                };
                setChats((prevChats) => [...prevChats, botMessage]);
                setLoadingResponse(false);
            }, 3000);
        } catch (error) {
            console.error("Error sending message:", error);
            setLoadingResponse(false);
        }
    };

    return (
        <div>
            <Header />
            <div className="sticky top-[100px] bg-yellow-200 text-gray-900 p-4 text-center shadow-md z-10">
                Seek guidance on life’s challenges, gain spiritual insights, and understand reality through Bhagavad Gita wisdom. <br /><b>Know that our Aadhyatmic AI answers are completely based on Bhagavad Gita quotes so kindly keep your questions related to it</b>.
            </div>
            <div className="flex flex-col h-screen bg-gray-100 mt-[90px] p-4">
                <div className="flex-1 overflow-y-auto p-4 bg-white rounded shadow">
                    {chats
                        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                        .map((chat) => (
                            <div key={chat._id} className="mb-4">
                                <div className="flex justify-end w-full">
                                    <div className="flex flex-col items-end">
                                        <div className="bg-gray-200 text-gray-900 p-3 rounded-lg max-w-xs text-right">
                                            {chat.question}
                                        </div>
                                        <img src="/user-icon.png" alt="User" className="w-8 h-8 mt-2 rounded-full" />
                                    </div>
                                </div>
                                {chat.response && (
                                    <div className="flex justify-start w-full mt-2">
                                        <div className="flex flex-col items-start">
                                            <img src="/KrishnaIcon.jpeg" alt="Bot" className="w-8 h-8 mb-2 rounded-full" />
                                            <div className="bg-gray-700 text-white p-3 rounded-lg max-w-xs text-left">
                                                {chat.response}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    {loading && (
                        <div className="flex justify-start w-full mt-2">
                            <div className="flex flex-col items-start">
                                <img src="/KrishnaIcon.jpeg" alt="Bot" className="w-8 h-8 mb-2 rounded-full" />
                                <div className="bg-gray-700 text-white p-3 rounded-lg max-w-xs text-left">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></div>
                                        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-300"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={chatContainerRef} />
                </div>
                <div className="flex items-center p-3 mt-2 bg-white rounded shadow">
                    <input
                        type="text"
                        className="flex-1 p-2 border rounded focus:outline-none"
                        placeholder="Ask Bhagavad Gita..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button
                        className="ml-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                        onClick={sendMessage}
                    >
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
}