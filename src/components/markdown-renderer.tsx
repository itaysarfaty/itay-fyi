import ReactMarkdown from 'react-markdown'

import { cn } from '@/utils'

export interface MarkdownRendererProps {
    content: string | null | undefined
    className?: string
}

export const MarkdownRenderer = ({
    content,
    className,
}: MarkdownRendererProps) => {
    if (!content) return null

    return (
        <div className={cn('markdown-content min-w-0', className)}>
            <ReactMarkdown
                components={{
                    h1: ({ children, ...props }) => (
                        <h1
                            className="text-bg mb-2 text-lg font-medium"
                            {...props}
                        >
                            {children}
                        </h1>
                    ),
                    h2: ({ children, ...props }) => (
                        <h2
                            className="text-bg mb-2 text-base font-normal"
                            {...props}
                        >
                            {children}
                        </h2>
                    ),
                    h3: ({ children, ...props }) => (
                        <h3
                            className="text-bg mb-2 text-lg font-medium"
                            {...props}
                        >
                            {children}
                        </h3>
                    ),
                    p: ({ children, ...props }) => (
                        <p className="text-bg mb-10 text-base" {...props}>
                            {children}
                        </p>
                    ),
                    a: ({ children, ...props }) => (
                        <a
                            className="text-bg text-base underline
                                underline-offset-2"
                            {...props}
                        >
                            {children}
                        </a>
                    ),
                    em: ({ children, ...props }) => (
                        <em
                            className="text-bg font-light not-italic"
                            {...props}
                        >
                            {children}
                        </em>
                    ),
                    ul: ({ children, ...props }) => (
                        <ul
                            className="text-bg list-inside list-disc"
                            {...props}
                        >
                            {children}
                        </ul>
                    ),
                    ol: ({ children, ...props }) => (
                        <ol
                            className="text-bg list-inside list-decimal"
                            {...props}
                        >
                            {children}
                        </ol>
                    ),
                    li: ({ children, ...props }) => (
                        <li className="text-bg mb-[3px]" {...props}>
                            {children}
                        </li>
                    ),

                    code({ node, className, children, ...props }) {
                        return (
                            <code
                                className="inline-block rounded bg-transparent
                                    px-1.5 py-0.5 font-mono text-xs"
                                {...props}
                            >
                                {children}
                            </code>
                        )
                    },
                    pre: ({ children, ...props }) => (
                        <pre
                            className="bg-foreground/5 mb-10 min-w-0
                                overflow-x-auto rounded-lg p-4"
                            {...props}
                        >
                            {children}
                        </pre>
                    ),
                    blockquote: ({ children, ...props }) => (
                        <blockquote
                            className="text-bg border-foreground/20 mb-10
                                border-l-4 pl-4 italic"
                            {...props}
                        >
                            {children}
                        </blockquote>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}
