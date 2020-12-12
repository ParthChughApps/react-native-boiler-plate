import * as React from "react"
import Svg, { G, Rect, Path, Ellipse } from "react-native-svg"

function SvgComponent() {
  return (
    <Svg style={{marginTop: 30}} width={"100%"} height={273} viewBox="0 0 200 273">
      <G data-name="Group 62">
        <G data-name="Group 23" transform="translate(-125 -477)" fill="#000">
          <Rect
            data-name="Rectangle 140"
            width={127}
            height={231}
            rx={15}
            transform="translate(125 519)"
          />
          <G
            data-name="Rectangle 133"
            transform="translate(130 522)"
            fill="#6c6666"
            stroke="#707070"
          >
            <Rect width={117} height={220} rx={15} stroke="none" />
            <Rect
              x={0.5}
              y={0.5}
              width={116}
              height={219}
              rx={14.5}
              fill="none"
            />
          </G>
          <Path
            data-name="Rectangle 134"
            d="M159 522h57v9a4 4 0 01-4 4h-49a4 4 0 01-4-4v-9z"
            fill="#231b1b"
          />
          <G data-name="Rectangle 135" fill="#fff" stroke="#707070">
            <Path stroke="none" d="M149 564h77v143h-77z" />
            <Path fill="none" d="M149.5 564.5h76v142h-76z" />
          </G>
          <Ellipse
            data-name="Ellipse 23"
            cx={8.5}
            cy={12}
            rx={8.5}
            ry={12}
            transform="translate(155 582)"
            fill="#ff4747"
          />
          <Path
            data-name="Rectangle 136"
            fill="#ff4747"
            opacity={0.49}
            d="M178 586h38v6h-38z"
          />
          <Path
            data-name="Rectangle 137"
            fill="#ff4747"
            opacity={0.49}
            d="M178 596h38v6h-38z"
          />
          <Ellipse
            data-name="Ellipse 24"
            cx={8.5}
            cy={12}
            rx={8.5}
            ry={12}
            transform="translate(199 616)"
            fill="#ff4747"
          />
          <Path
            data-name="Rectangle 138"
            fill="#ff4747"
            opacity={0.49}
            d="M155 622h38v6h-38z"
          />
          <Path
            data-name="Rectangle 139"
            fill="#ff4747"
            opacity={0.49}
            d="M155 632h38v6h-38z"
          />
          <Path
            data-name="Icon material-sms"
            d="M319.3 477h-45.6a5.752 5.752 0 00-5.672 5.816l-.028 52.34 11.4-11.631h39.9a5.776 5.776 0 005.7-5.816v-34.893a5.776 5.776 0 00-5.7-5.816zm-31.35 26.17h-5.7v-5.815h5.7zm11.4 0h-5.7v-5.815h5.7zm11.4 0h-5.7v-5.815h5.7z"
          />
        </G>
      </G>
    </Svg>
  )
}

export default SvgComponent
