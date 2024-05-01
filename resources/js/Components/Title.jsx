import React from "react";

const Title = ({ children }) => {
    return (
        <h1 className="text-white bg-zinc-800 w-full text-center font-bold py-2 rounded-md uppercase">
            {children}
        </h1>
    );
};

export default Title;
