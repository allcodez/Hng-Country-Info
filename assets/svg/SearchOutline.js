import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = ({ color = "#000", ...props }) => (
    <Svg

        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            fillRule="evenodd"
            stroke={color}
            strokeLinecap="round"
            strokeWidth={1.5}
            d="M18.5 18.5 22 22M6.75 3.27a9.5 9.5 0 1 1-3.48 3.48"
        />
    </Svg>
)
export default SvgComponent
