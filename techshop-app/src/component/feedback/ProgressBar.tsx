'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'

export default function ProgressBar() {
  const pathname = usePathname()

  useEffect(() => {
    NProgress.configure({ showSpinner: false })

    const style = document.createElement('style')
    style.id = 'nprogress-custom-style'
    style.innerHTML = `
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background-color: #3b82f6;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        z-index: 9999;
      }
    `
    if (!document.getElementById('nprogress-custom-style')) {
      document.head.appendChild(style)
    }

    NProgress.start()
    const timeout = setTimeout(() => {
      NProgress.done()
    }, 500)

    return () => {
      clearTimeout(timeout)
      NProgress.done()
    }
  }, [pathname])

  return null
}
