import { cn } from '@/utils'

export interface YDividerProps {
    className?: string
    children?: React.ReactNode
}

export const YDivider = ({ children, className }: YDividerProps) => {
    return (
        <div
            className={cn(
                `-ml-[2%] flex h-fit w-[104%] items-start justify-start border-y border-border
                px-[2%]`,
                className
            )}
        >
            {children}
        </div>
    )
}

export interface YDividerProps {
    className?: string
    children?: React.ReactNode
}

export const Divider = ({ className }: YDividerProps) => {
    return (
        <div
            className={cn(
                '-ml-[2%] h-px w-[104%] border-b border-border px-[2%]',
                className
            )}
        />
    )
}
