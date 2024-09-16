export interface LoadingArticleListProps {
  size?: number
}

export const LoadingArticleList = ({ size = 5 }: LoadingArticleListProps) => {
  const index = Array.from({ length: size }, (_, i) => i)
  return (
    <ul className="grid gap-8 @lg:gap-10">
      {index.map((id) => {
        return (
          <li key={id}>
            <div className="lowercase grid gap-3 w-full">
              <div className="animate-pulse w-[100px] h-[20px] bg-gray-400/10 rounded-md" />
              <div className="animate-pulse max-w-[300px] w-full h-[28px] bg-gray-400/10 rounded-md" />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
