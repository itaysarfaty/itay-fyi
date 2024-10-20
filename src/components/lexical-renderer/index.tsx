import './lexical-style.css'

export interface LexicalRendersProps {
    content: string | null | undefined
}

export const LexicalRenderer = ({ content }: LexicalRendersProps) => {
    if (!content) return null
    return <div dangerouslySetInnerHTML={{ __html: content }} className="lr" />
}
