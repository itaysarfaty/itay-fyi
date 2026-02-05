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
                            className="text-bg mt-8 mb-3 text-lg font-medium
                                first:mt-0"
                            {...props}
                        >
                            {children}
                        </h1>
                    ),
                    h2: ({ children, ...props }) => (
                        <h2
                            className="text-bg mt-7 mb-2.5 text-base font-medium
                                first:mt-0"
                            {...props}
                        >
                            {children}
                        </h2>
                    ),
                    h3: ({ children, ...props }) => (
                        <h3
                            className="text-bg mt-6 mb-2 text-base font-medium
                                opacity-85 first:mt-0"
                            {...props}
                        >
                            {children}
                        </h3>
                    ),
                    p: ({ children, ...props }) => (
                        <p
                            className="text-bg mb-4 text-base leading-relaxed
                                last:mb-0"
                            {...props}
                        >
                            {children}
                        </p>
                    ),
                    a: ({ children, href, ...props }) => (
                        <a
                            className="text-bg text-base underline
                                underline-offset-2 opacity-85
                                transition-opacity hover:opacity-100"
                            href={href}
                            target={
                                href?.startsWith('http') ? '_blank' : undefined
                            }
                            rel={
                                href?.startsWith('http')
                                    ? 'noopener noreferrer'
                                    : undefined
                            }
                            {...props}
                        >
                            {children}
                        </a>
                    ),
                    strong: ({ children, ...props }) => (
                        <strong className="font-medium" {...props}>
                            {children}
                        </strong>
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
                            className="text-bg mb-4 list-outside list-disc
                                space-y-1.5 pl-5 last:mb-0
                                [&_ul]:mb-0 [&_ul]:mt-1.5"
                            {...props}
                        >
                            {children}
                        </ul>
                    ),
                    ol: ({ children, ...props }) => (
                        <ol
                            className="text-bg mb-4 list-outside
                                list-decimal space-y-1.5 pl-5 last:mb-0
                                [&_ol]:mb-0 [&_ol]:mt-1.5"
                            {...props}
                        >
                            {children}
                        </ol>
                    ),
                    li: ({ children, ...props }) => (
                        <li
                            className="text-bg text-base leading-relaxed"
                            {...props}
                        >
                            {children}
                        </li>
                    ),
                    code({ children, ...props }) {
                        return (
                            <code
                                className="bg-foreground/[0.06] rounded px-1.5
                                    py-0.5 font-mono text-[0.85em]"
                                {...props}
                            >
                                {children}
                            </code>
                        )
                    },
                    pre: ({ children, ...props }) => (
                        <pre
                            className="bg-foreground/[0.04] mb-4 min-w-0
                                overflow-x-auto rounded-lg p-4 last:mb-0
                                [&_code]:bg-transparent [&_code]:p-0"
                            {...props}
                        >
                            {children}
                        </pre>
                    ),
                    blockquote: ({ children, ...props }) => (
                        <blockquote
                            className="text-bg border-foreground/15 mb-4
                                border-l-2 pl-4 opacity-80 last:mb-0
                                [&_p]:mb-2 [&_p:last-child]:mb-0"
                            {...props}
                        >
                            {children}
                        </blockquote>
                    ),
                    hr: ({ ...props }) => (
                        <hr
                            className="border-foreground/10 my-8 border-t"
                            {...props}
                        />
                    ),
                    img: ({ alt, ...props }) => (
                        <img
                            className="mb-4 max-w-full rounded-lg last:mb-0"
                            alt={alt}
                            loading="lazy"
                            {...props}
                        />
                    ),
                    table: ({ children, ...props }) => (
                        <div className="mb-4 overflow-x-auto last:mb-0">
                            <table
                                className="w-full text-base"
                                {...props}
                            >
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ children, ...props }) => (
                        <thead
                            className="border-foreground/10 border-b"
                            {...props}
                        >
                            {children}
                        </thead>
                    ),
                    th: ({ children, ...props }) => (
                        <th
                            className="text-bg px-3 py-2 text-left text-base
                                font-medium"
                            {...props}
                        >
                            {children}
                        </th>
                    ),
                    td: ({ children, ...props }) => (
                        <td
                            className="text-bg border-foreground/5 border-t px-3
                                py-2 text-base"
                            {...props}
                        >
                            {children}
                        </td>
                    ),
                    del: ({ children, ...props }) => (
                        <del className="opacity-50" {...props}>
                            {children}
                        </del>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}
