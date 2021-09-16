import { getTrackBackground, Range } from 'react-range'
import { forwardRef } from 'react'

interface RangeInputProps {
    value: number[]
    onChange?: ((value: number[]) => void)
    onFinalChange?: ((value: number[]) => void)
    min: number
    max: number
    step: number
    label: string
    rest?: any
}

const RangeInput = forwardRef(
    (
        {
            value,
            onChange,
            onFinalChange,
            min,
            max,
            step,
            label,
            ...rest
        }: RangeInputProps,
        ref
    ) => {
        return (
            <>
                <div className={`mb-2 text-gray`}>
                    {label}
                </div>
                <Range
                    {...rest}
                    values={value}
                    step={step}
                    min={min}
                    max={max}
                    onFinalChange={(value) => {
                        onFinalChange && onFinalChange(value)
                    }}
                    onChange={(value) => {
                        onChange && onChange(value)
                    }}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: "36px",
                                display: "flex",
                                width: "100%"
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: "4px",
                                    width: "100%",
                                    borderRadius: "3px",
                                    background: getTrackBackground({
                                        values: value,
                                        colors: ["#e1e5ee", "#3e3e70", "#e1e5ee"],
                                        min: min,
                                        max: max
                                    }),
                                    alignSelf: "center"
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props, isDragged , value}) => (
                        <div
                            {...props}
                            className={`h-9 w-9 rounded-full flex justify-center items-center shadow ${isDragged ? "bg-gray-light" : "bg-white"}`}
                            style={{
                                ...props.style,
                                outline: "none"
                            }}
                        >
                            <span className={`text-xs text-purple`}>{value}%</span>
                        </div>
                    )}
                />
                </>
        );
    }
)

export default RangeInput;