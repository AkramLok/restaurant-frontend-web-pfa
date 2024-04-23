import React from 'react';

const Select = ({ label, options }) => {
    return (
        <form className="w-full">
            <label htmlFor="select" className="block mb-2 text-sm font-medium text-white">{label}</label>
            <select id="select" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </form>
    )
}

export default Select;
