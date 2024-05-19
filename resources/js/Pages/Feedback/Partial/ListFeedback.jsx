import Bubble from "./Bubble";

const ListFeedback = ({ feedbacks, user }) => {
    if (user.role != "guru") return null;
    if (feedbacks.length == 0) return <p>Empty Feedback</p>;
    return (
        <ul className="gap-2 flex-wrap items-start justify-start flex">
            {feedbacks.map((item) => {
                return (
                    <Bubble
                        createdAt={item.created_at}
                        text={item.text}
                        isMe={user.id == item.user.id}
                        username={item.user.name}
                    />
                );
            })}
        </ul>
    );
};
export default ListFeedback;
