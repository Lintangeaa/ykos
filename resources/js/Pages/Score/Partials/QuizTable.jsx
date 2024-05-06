import React from "react";
const TableQuizScores = ({ datas }) => {
    return (
        <div className="overflow-x-scroll">
            <div className="px-4 py-2 bg-zinc-300/10 text-zinc-300 rounded-t-lg w-fit">
                Quiz
            </div>
            <table className="table-auto w-full text-sm text-left text-gray-700 rounded-b-lg overflow-hidden">
                <thead className="text-sm text-white uppercase bg-zinc-900">
                    <tr>
                        <th className="py-3 px-6">#</th>
                        <th className="py-3 px-6">Course</th>
                        <th className="py-3 px-6">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.length === 0 && (
                        <tr className="bg-zinc-900/80">
                            <td
                                colSpan={5}
                                className="py-3 px-6 text-center text-white"
                            >
                                Data is empty..
                            </td>
                        </tr>
                    )}
                    {datas.map((data, index) => (
                        <tr
                            key={data.id}
                            className="bg-zinc-900/80 text-white rounded-md"
                        >
                            <td className="py-3 px-6">{index + 1}.</td>
                            <td className="py-3 px-6">
                                {data.quiz.course.name}
                            </td>
                            <td className="py-3 px-6">{data.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableQuizScores;
