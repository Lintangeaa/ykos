function Popup({ isOpen, setIsOpen, children }) {
    return (
        <>
            <div
                className={`${
                    isOpen ? "block" : "hidden"
                } fixed  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full max-w-xl bg-zinc-800 p-4 rounded-md z-50`}
            >
                {children}
            </div>
            <div
                onClick={() => setIsOpen(false)}
                className={`${
                    isOpen ? "flex" : "hidden"
                } fixed top-0 left-0 w-full h-screen bg-zinc-900/20 backdrop-blur-md items-center p-7`}
            ></div>
        </>
    );
}

export default Popup;
