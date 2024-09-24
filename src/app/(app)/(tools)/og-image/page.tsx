'use client'

import { toPng } from 'html-to-image'
import { forwardRef, useRef, useState } from 'react'

import { TextScaffold } from '@/components/text-scaffold'

const canvasSize = {
    width: 600,
    height: 315,
}

const defaultValues = {
    title: 'Itay Sarfaty',
    subTitle: 'Software Engineer',
}

export default function OGImagePage() {
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const canvasRef = useRef<HTMLDivElement>(null)

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
            <HeaderContent ref={canvasRef} title={title} subTitle={subTitle} />
            <section
                className={'flex h-[500px] w-full items-center @container'}
            >
                <header className="grid w-full gap-6">
                    <TextScaffold>
                        <input
                            className="w-full border-none bg-transparent text-5xl font-medium placeholder-foreground
                                focus:outline-none"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={defaultValues.title}
                            autoFocus
                        />
                    </TextScaffold>
                    <TextScaffold>
                        <input
                            type="textarea"
                            className="w-full border-none bg-transparent text-2xl placeholder-foreground
                                focus:outline-none"
                            value={subTitle}
                            onChange={(e) => setSubTitle(e.target.value)}
                            placeholder={defaultValues.subTitle}
                        />
                    </TextScaffold>
                </header>
            </section>

            <div className="flex flex-col gap-6">
                <TextScaffold>
                    <h3 className="text-2xl font-medium">
                        Open Graph Generator
                    </h3>
                </TextScaffold>
                <TextScaffold>
                    <p className="text-xl">
                        I built this tool to easily generate an open graph
                        image. Update the header above and download.
                    </p>
                </TextScaffold>
                <button
                    className="my-4 grid w-fit shrink-0 place-items-center rounded bg-foreground px-4 py-2
                        font-sans text-sm font-normal text-background"
                    onClick={handleDownload}
                >
                    Download
                </button>
            </div>
        </div>
    )
}

const HeaderContent = forwardRef<
    HTMLDivElement,
    {
        title: string
        subTitle: string
    }
>(({ title, subTitle }, ref) => {
    return (
        <div className="fixed -top-[1000px]">
            <div
                className={'bg-background px-4'}
                style={{ width: canvasSize.width, height: canvasSize.height }}
                ref={ref}
            >
                <div className="x-dash mx-auto grid h-full max-w-[90%] gap-3 overflow-visible">
                    <section
                        className={'flex h-full w-full items-center @container'}
                    >
                        <header className="grid w-full gap-6">
                            <TextScaffold>
                                <h1 className="text-7xl font-medium">
                                    {title || defaultValues.title}
                                </h1>
                            </TextScaffold>
                            <TextScaffold>
                                <h2 className="text-4xl">
                                    {subTitle || defaultValues.subTitle}
                                </h2>
                            </TextScaffold>
                        </header>
                    </section>
                </div>
            </div>
        </div>
    )
})

HeaderContent.displayName = 'HeaderContent'
