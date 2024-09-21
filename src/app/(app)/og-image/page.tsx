'use client'
import { TextScaffold } from '@/components/text-scaffold'
import { toPng } from 'html-to-image'
import { useRef, useState } from 'react'

export default function OGImagePage() {
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const canvasRef = useRef<HTMLDivElement>(null)

  const canvasSize = {
    width: 600,
    height: 315,
  }

  const defaultValues = {
    title: 'Itay Sarfaty',
    subTitle: 'Software Engineer',
  }

  const handleDownload = async () => {
    if (canvasRef.current === null) {
      return
    }
    const dataUrl = await toPng(canvasRef.current, {
      width: canvasSize.width,
      height: canvasSize.height,
      canvasHeight: canvasSize.height,
      canvasWidth: canvasSize.width,
    })
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = 'image.png'
    link.click()
  }
  return (
    <div>
      <section className={'h-[500px] flex items-center w-full @container'}>
        <header className="grid gap-6 w-full">
          <TextScaffold>
            <input
              className="text-5xl font-medium bg-transparent border-none focus:outline-none w-full placeholder-foreground"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={defaultValues.title}
              autoFocus
            />
          </TextScaffold>
          <TextScaffold>
            <input
              type="textarea"
              className="text-2xl bg-transparent border-none focus:outline-none w-full placeholder-foreground"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder={defaultValues.subTitle}
            />
          </TextScaffold>
        </header>
      </section>

      <div className="flex flex-col gap-6">
        <TextScaffold>
          <h3 className="text-2xl font-medium">Header Image Generator</h3>
        </TextScaffold>
        <TextScaffold>
          <p className="text-xl">Change the title and subtitle above and download when ready.</p>
        </TextScaffold>
        <button
          className="mt-4 w-fit shrink-0 bg-foreground font-sans text-sm  text-background font-normal rounded py-2 px-4 grid place-items-center"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
      <div className="fixed -top-[1000px]">
        <div
          className={`px-4 bg-background`}
          style={{ width: canvasSize.width, height: canvasSize.height }}
          ref={canvasRef}
        >
          <div className="max-w-[90%] h-full mx-auto overflow-visible x-dash grid gap-3">
            <section className={'h-full flex items-center w-full @container'}>
              <header className="grid gap-6 w-full">
                <TextScaffold>
                  <h1 className="text-6xl font-medium ">{title || defaultValues.title}</h1>
                </TextScaffold>
                <TextScaffold>
                  <h2 className="text-2xl ">{subTitle || defaultValues.subTitle}</h2>
                </TextScaffold>
              </header>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

interface InputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`font-sans font-light h-[40px] w-full p-2 border-[0.5px] border-foreground/10 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-foreground bg-background text-foreground `}
    />
  )
}
