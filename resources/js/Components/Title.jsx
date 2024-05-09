import React from "react";

const Title = ({ children }) => {
    return (
        <h1 className="text-black bg-zinc-100 w-full text-center font-bold py-2 rounded-lg uppercase">
            {children}
        </h1>
    );
};

export default Title;
