const Bubble = ({ text, isMe, username }) => {
    return (
        <div
            className={`w-full flex ${isMe ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`w-3/4 p-4 rounded-lg ${
                    isMe ? "bg-gray-800 text-white" : " bg-zinc-800 text-white"
                }`}
            >
                <p>{text}</p>
                <div className="flex items-center justify-start mt-3 gap-2">
                    <div className="w-6 h-6 rounded-full bg-white"></div>
                    <p className="text-sm">{username}</p>
                </div>
            </div>
        </div>
    );
};
export default Bubble;
