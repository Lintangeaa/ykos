const Bubble = ({ text, isMe, username, createdAt }) => {
    return (
        <div
            className={`break-words max-w-64 p-4 rounded-lg bg-slate-100 text-black`}
        >
            <div className="flex items-center justify-between gap-1 text-xs text-black/70 w-full">
                <p>{username}</p>
            </div>
            <p className="my-1">{text}</p>
            <p className="text-xs text-black/70">{dateFormatter(createdAt)}</p>
        </div>
    );
};

export default Bubble;

export const dateFormatter = (rawDate) => {
    const date = new Date(rawDate);
    console.log(rawDate, date);
    return date.toLocaleString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Use `false` for 24-hour time format
    });
};
