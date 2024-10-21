import { CircleHelpIcon } from 'lucide-react'

export const AboutPert = () => {
    return (
        <section className="grid min-h-[200px] gap-4 rounded-lg border-[1px] border-foreground/10 px-6 py-5">
            <header className="-ml-[2px] flex items-center gap-2">
                <CircleHelpIcon className="h-4 text-blue-500" />
                <h1 className="text-bg w-fit text-lg font-medium text-foreground">
                    Pert formula
                </h1>
            </header>
            <p className="text-bg w-fit text-base font-light text-foreground">
                Pert is a three-point estimation method that uses probability
                and statistics to estimate task duration
            </p>

            <p className="text-bg w-fit text-base font-light text-foreground">
                Enter the minimum, maximum, and most likely time needed to
                complete the task.
            </p>
        </section>
    )
}
