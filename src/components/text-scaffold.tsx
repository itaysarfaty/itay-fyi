import { cn } from '@/utils'

export interface TextScaffoldProps {
    className?: string
    children?: React.ReactNode
}

export const TextScaffold = ({ children, className }: TextScaffoldProps) => {
    return (
        <div
            className={cn(
                'y-dash -ml-[5%] flex h-fit w-[110%] items-start justify-start px-[5%]',
                className
            )}
        >
            {children}
        </div>
    )
}
