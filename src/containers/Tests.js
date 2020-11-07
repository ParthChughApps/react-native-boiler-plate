import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 25.153 29.024" {...props}>
      <Path
        d="M19.741 3.042V.5H5.411v2.542H.5V6.8a4.926 4.926 0 004.911 4.911H5.5a7.141 7.141 0 005.574 5.889v4.045H9.312a.974.974 0 00-.982.982v1.3h-1.5v4.594h11.5V23.93h-1.5v-1.3a.974.974 0 00-.982-.982h-1.769V17.6a7.176 7.176 0 005.576-5.894h.087A4.926 4.926 0 0024.653 6.8V3.042h-4.912zM5.411 9.225A2.441 2.441 0 012.985 6.8V5.527h2.427zm7.569.693l-1.27 1.243-1.21-1.272-1.217-1.213 1.271-1.242 1.213 1.213 2.889-2.86L15.9 7.058zM22.168 6.8a2.441 2.441 0 01-2.427 2.427v-3.7h2.427z"
        fill="none"
        stroke="#ffefef"
      />
    </Svg>
  )
}

export default SvgComponent

