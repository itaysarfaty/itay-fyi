import { cn } from '@/lib/utils'

export interface TextScaffoldProps {
  className?: string
  children?: React.ReactNode
}

export const TextScaffold = ({ children, className }: TextScaffoldProps) => {
  return (
    <div
      className={cn(
        'w-[110%] -ml-[5%] px-[5%]  flex items-start justify-start h-fit y-dash',
        className,
      )}
    >
      {children}
    </div>
  )
}
