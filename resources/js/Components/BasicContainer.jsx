import React from "react";

const BasicContainer = ({ children }) => {
    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                {children}
            </div>
        </div>
    );
};

export default BasicContainer;
