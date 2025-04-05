import { SVGProps } from "react";

export default function BarsIcon(_props: SVGProps<SVGSVGElement>) {
    return <svg xmlns="http://www.w3.org/2000/svg" fill = {_props.fill} viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className={_props.className}>
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>  
}