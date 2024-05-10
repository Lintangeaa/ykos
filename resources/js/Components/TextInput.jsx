import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                "border-zinc-600 bg-white focus:border-zinc-700 focus:ring-zinc-700 rounded-md shadow-sm text-black " +
                className
            }
            ref={input}
        />
    );
});
