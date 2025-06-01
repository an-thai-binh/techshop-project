'use client'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-4',
}

export default function Loading({
  size = 'md',
  color = 'border-blue-500',
  className = '',
}: LoadingProps) {
  return (
    <div
      className={` ${sizeMap[size]} ${color} animate-spin rounded-full border-t-transparent bg-red-500 ${className} `}
      role="status"
    />
  )
}
