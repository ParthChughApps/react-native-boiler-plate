import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 28.107 28.024" {...props}>
      <Path
        d="M.591 12.314l2.357-.017v15.144a.584.584 0 00.583.583h7.367a.584.584 0 00.583-.583v-9.815h5.155v9.814a.584.584 0 00.583.583h7.372a.584.584 0 00.583-.583V12.16l2.356-.015a.583.583 0 00.361-1.037A1230.037 1230.037 0 0114.431.134a.579.579 0 00-.743 0L.212 11.282a.583.583 0 00.379 1.032z"
        fill="#fff3f3"
        fillRule="evenodd"
      />
    </Svg>
  )
}

export default SvgComponent
