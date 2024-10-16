'use client'

import { toPng } from 'html-to-image'
import { ScalingIcon } from 'lucide-react'
import { forwardRef, useRef, useState } from 'react'

const canvasSize = {
    width: 600,
    height: 315,
}

const defaultValues = {
    title: 'Hey',
    subTitle: 'Edit this header',
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
                <header className="text-bg grid w-full gap-4">
                    <input
                        className="w-full border-y border-border bg-transparent text-4xl font-medium
                            placeholder-foreground focus:outline-none"
                        value={title}
                        onChange={(e) => {
                            const value = e.target.value.slice(0, 13)
                            setTitle(value)
                        }}
                        placeholder={defaultValues.title}
                        autoFocus
                    />
                    <input
                        type="textarea"
                        className="w-full border-y border-border bg-transparent text-xl placeholder-foreground
                            focus:outline-none"
                        value={subTitle}
                        onChange={(e) => {
                            const value = e.target.value.slice(0, 28)
                            setSubTitle(value)
                        }}
                        placeholder={defaultValues.subTitle}
                    />
                </header>
            </section>

            <div className="mb-12 flex flex-col gap-2">
                <h3 className="text-bg w-fit">Open Graph Image</h3>
                <p className="text-bg w-fit">
                    Customize the header above and download the image
                </p>
                <div className="my-4 flex items-center gap-5">
                    <button
                        className="grid w-fit shrink-0 place-items-center rounded bg-foreground px-4 py-2 font-sans
                            text-sm font-normal text-background"
                        onClick={handleDownload}
                    >
                        Download
                    </button>
                    <div className="text-bg flex w-fit items-center gap-1 text-foreground/50">
                        <ScalingIcon className="h-4" />
                        <p className="text-xs font-normal">1200 x 630 pixels</p>
                    </div>
                </div>
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
        <div className="fixed -top-[400px]">
            <div
                className={'relative z-20 bg-background px-4'}
                style={{ width: canvasSize.width, height: canvasSize.height }}
                ref={ref}
            >
                <div className="absolute -z-10 h-full w-full bg-background">
                    <div
                        className="h-full w-full bg-background
                            bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)]
                            [background-size:16px_16px]
                            [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]"
                    />
                </div>

                <div className="z-50 mx-auto grid h-full max-w-[90%] gap-3 overflow-visible">
                    <section className={'flex h-full w-full items-center'}>
                        <header className="grid w-full gap-6">
                            <h1 className="text-fore text-7xl font-medium">
                                {title || defaultValues.title}
                            </h1>
                            <h2 className="text-4xl">
                                {subTitle || defaultValues.subTitle}
                            </h2>
                        </header>
                    </section>
                </div>
            </div>
        </div>
    )
})

HeaderContent.displayName = 'HeaderContent'
