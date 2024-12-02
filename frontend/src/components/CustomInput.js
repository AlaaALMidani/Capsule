
export const CustomInput = ({ type, name, value, label, handleChange }) => {
    return (
        <div className="block">
            <label className="mb-2 font-semibold">{label}</label>
            <input
                type={type ? type : "text"}
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={name}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />
        </div>
    );
}