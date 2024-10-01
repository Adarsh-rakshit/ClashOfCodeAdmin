import React,{useId} from 'react'

const Input = React.forwardRef(
    function Input({
        label,
        type="text",
        className="",
        ...props
    },ref){
        const id = useId();
        return (
            <div className='w-full'>
                {label && (
                    <label htmlFor={id}
                        className='inline-block mb-1 mt-1 pl-1 text-gray-300'>
                        {label}
                    </label>
                )}
                <input
                    className={ className ? `${className}`:`block
                px-2
            w-full
            mt-1
            border-gray-600
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            bg-transparent
            placeholder-gray-600
            text-gray-300
            mb-2`}
                    type={type}
                    ref={ref}
                    {...props}
                    id={id}
                />
            </div>
        )
    }
)

export default Input