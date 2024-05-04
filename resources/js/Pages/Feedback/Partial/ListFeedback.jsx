import Bubble from "./Bubble";

const ListFeedback = ({ feedbacks, user }) => {
    if (feedbacks.length == 0) return <p>Empty Feedback</p>;
    return (
        <ul className="space-y-3">
            {feedbacks.map((item) => {
                return (
                    <Bubble
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
