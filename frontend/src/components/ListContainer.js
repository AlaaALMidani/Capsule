import React from "react";

const ListContainer = ({ title, description, children }) => {
    return (
        <div
            className="bg-gradient-to-r from-[#b2e4f7] to-[#d8f3fc] rounded-tl-3xl rounded-tr-3xl px-6 py-8 flex flex-col items-center relative z-10 w-[1300px] justify-self-center"
            style={{
                boxShadow: "0 -8px 6px rgba(0, 0, 0, 0.2), 8px 0 6px rgba(0, 0, 0, 0.1), -8px 0 6px rgba(0, 0, 0, 0.1)",
                top: "-140px"
            }}
        >
            {title && (
                <h1 className="text-3xl font-bold text-center mb-2 text-[#1b5b71] font-poppins">
                    {title}
                </h1>
            )}
            {description && (
                <p className="text-lg text-center text-gray-700 mb-4 font-poppins">
                    {description}
                </p>
            )}
            <p className="text-[#2b9abe]"></p>
            {React.Children.map(children, (child, index) => (
                <div
                    className={`w-full flex flex-col items-center ${index !== children.length - 1 ? "mb-6" : ""}`}
                    style={{
                        borderBottom: index !== children.length - 1 ? "1px solid #cccccc" : "none",
                        paddingBottom: index !== children.length - 1 ? "10px" : "0",
                    }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
};

export default ListContainer;
