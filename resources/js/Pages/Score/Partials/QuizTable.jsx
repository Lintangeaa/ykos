import React from "react";
const TableQuizScores = ({ datas }) => {
    return (
        <div className="overflow-x-scroll">
            <div className="px-4 py-2 text-black rounded-t-lg bg-zinc-100 w-fit">
                Kuis
            </div>
            <table className="w-full overflow-hidden text-sm text-left text-gray-700 rounded-b-lg table-auto">
                <thead className="text-sm text-black uppercase bg-white">
                    <tr>
                        <th className="px-6 py-3">#</th>
                        <th className="px-6 py-3">Course</th>
                        <th className="px-6 py-3">Nilai</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.length === 0 && (
                        <tr className="bg-white/80">
                            <td
                                colSpan={5}
                                className="px-6 py-3 text-center text-black"
                            >
                                Data is empty..
                            </td>
                        </tr>
                    )}
                    {datas.map((data, index) => (
                        <tr
                            key={data.id}
                            className="text-black rounded-md bg-white/80"
                        >
                            <td className="px-6 py-3">{index + 1}.</td>
                            <td className="px-6 py-3">
                                {data.quiz.course.name}
                            </td>
                            <td className="px-6 py-3">{data.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableQuizScores;
