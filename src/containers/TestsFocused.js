import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24.153 28.024" {...props}>
      <Path
        d="M19.241 2.542V0H4.911v2.542H0V6.3a4.926 4.926 0 004.911 4.911H5a7.141 7.141 0 005.574 5.889v4.045H8.812a.974.974 0 00-.982.982v1.3h-1.5v4.594h11.5V23.43h-1.5v-1.3a.974.974 0 00-.982-.982h-1.769V17.1a7.176 7.176 0 005.576-5.894h.087A4.926 4.926 0 0024.153 6.3V2.542h-4.912zM4.911 8.725A2.441 2.441 0 012.485 6.3V5.027h2.427zm7.569.693l-1.27 1.243L10 9.389 8.783 8.176l1.271-1.242 1.213 1.213 2.889-2.86L15.4 6.558zM21.668 6.3a2.441 2.441 0 01-2.427 2.427v-3.7h2.427z"
        fill="#fffefe"
      />
    </Svg>
  )
}

export default SvgComponent
