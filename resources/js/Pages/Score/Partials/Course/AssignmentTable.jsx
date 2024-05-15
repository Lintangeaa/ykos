// AssignmentTable.jsx
import React from "react";

const AssignmentTable = ({ datas }) => {
    return (
        <div className="overflow-x-scroll">
            <div className="px-4 py-2 text-black rounded-t-lg bg-white/80 w-fit">
                Tugas
            </div>
            <table className="w-full overflow-hidden text-sm text-left text-gray-700 rounded-b-lg table-auto">
                <thead className="text-sm text-black uppercase bg-white">
                    <tr>
                        <th className="px-6 py-3">#</th>
                        <th className="px-6 py-3">User</th>
                        <th className="px-6 py-3">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.length === 0 && (
                        <tr className="text-black bg-white/80">
                            <td
                                colSpan={3}
                                className="px-6 py-3 text-center text-black"
                            >
                                No assignment scores available.
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

export default AssignmentTable;
