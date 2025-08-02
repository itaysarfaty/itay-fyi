'use client'

import { toPng } from 'html-to-image'
import { ScalingIcon } from 'lucide-react'
import { forwardRef, useRef, useState } from 'react'

import { DownloadOGHeader } from './components/download-of-header'

const canvasSize = {
    width: 600,
    height: 315,
}

const defaultValues = {
    title: 'Itay',
    subTitle: 'Pronounced EE-tie',
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
        <div className="grid gap-12">
            <HeaderContent ref={canvasRef} title={title} subTitle={subTitle} />
            <section
                className={
                    '@container flex h-fit w-full flex-col items-center gap-10 sm:flex-row sm:gap-14'
                }
            >
                <div className="grid w-full gap-4">
                    <label
                        htmlFor="title"
                        className="text-bg text-foreground w-fit text-lg font-medium"
                    >
                        Title
                    </label>

                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => {
                            const value = e.target.value.slice(0, 13)
                            setTitle(value)
                        }}
                        className="border-foreground/10 bg-foreground/4 dark:bg-foreground/[0.018] w-full
                            rounded-md border p-3 text-base font-normal backdrop-blur-xs"
                    />
                </div>

                <div className="grid w-full gap-4">
                    <label
                        htmlFor="subtitle"
                        className="text-bg text-foreground w-fit text-lg font-medium"
                    >
                        Subtitle
                    </label>

                    <input
                        id="subtitle"
                        type="text"
                        value={subTitle}
                        onChange={(e) => {
                            const value = e.target.value.slice(0, 28)
                            setSubTitle(value)
                        }}
                        className="border-foreground/10 bg-foreground/4 dark:bg-foreground/[0.018] w-full
                            rounded-md border p-3 text-base font-normal backdrop-blur-xs"
                    />
                </div>
            </section>

            <div className="mb-12 flex flex-col gap-2">
                <div className="my-4 flex items-center gap-5">
                    <DownloadOGHeader onDownload={handleDownload} />
                    <div className="text-bg text-foreground/50 flex w-fit items-center gap-1">
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
        <div className="border-foreground/50 mt-[20%] overflow-x-auto rounded-lg border drop-shadow-md">
            <div
                className="bg-background relative z-20"
                style={{ width: canvasSize.width, height: canvasSize.height }}
                ref={ref}
            >
                <div className="bg-background absolute -z-10 h-full w-full">
                    <div
                        className="bg-background h-full w-full
                            bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)]
                            mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]
                            bg-size-[16px_16px]"
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
