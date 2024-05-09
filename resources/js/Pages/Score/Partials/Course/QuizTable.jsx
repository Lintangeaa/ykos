// QuizTable.jsx
import React from "react";

const QuizTable = ({ datas }) => {
    return (
        <div className="overflow-x-scroll">
            <div className="px-4 py-2 mt-2 rounded-t-lg bg-zinc-300/10 text-zinc-300 w-fit">
                Quiz
            </div>
            <table className="w-full overflow-hidden text-sm text-left text-gray-700 rounded-b-lg table-auto">
                <thead className="text-sm text-white uppercase bg-zinc-900">
                    <tr>
                        <th className="px-6 py-3">#</th>
                        <th className="px-6 py-3">User</th>
                        <th className="px-6 py-3">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.length === 0 && (
                        <tr className="bg-zinc-900/80">
                            <td
                                colSpan={3}
                                className="px-6 py-3 text-center text-white"
                            >
                                No quiz scores available.
                            </td>
                        </tr>
                    )}
                    {datas.map((score, index) => (
                        <tr
                            key={score.id}
                            className="text-white rounded-md bg-zinc-900/80"
                        >
                            <td className="px-6 py-3">{index + 1}.</td>
                            <td className="px-6 py-3">{score.user.name}</td>
                            <td className="px-6 py-3">{score.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuizTable;
