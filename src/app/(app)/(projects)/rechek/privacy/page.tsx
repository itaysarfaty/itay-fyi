import { Hero } from '@/components/hero'

const Title = ({ text }: { text: string }) => (
    <h2 className="text-bg mt-6 mb-3 text-base font-semibold">{text}</h2>
)
export default async function PrivacyPage() {
    return (
        <div className="">
            <Hero title="Rechek" subTitle="Privacy Policy" />

            <div className="flex flex-col gap-6">
                <p className="text-bg mb-4">
                    Hi — I'm Itay, the developer behind RECHEK, and I take your
                    privacy seriously. This policy is here to explain what I
                    collect (nothing really), what I do with it (also nothing),
                    and how RECHEK works behind the scenes.
                </p>

                <div>
                    <Title text="What I Collect" />
                    <p className="text-bg mb-4">
                        I don't collect any personal information. The only thing
                        RECHEK saves is a list of restaurants you've selected —
                        including their name, address, and CAMIS ID — and that's
                        stored locally on your device. It never gets sent to me
                        or anyone else.
                    </p>
                </div>

                <div>
                    <Title text="Where the Data Comes From" />
                    <p className="text-bg mb-4">
                        All restaurant inspection info comes directly from the
                        NYC Open Data portal. Your device makes the request — I
                        don't see it, store it, or route it through any of my
                        own servers.
                    </p>
                </div>

                <div>
                    <Title text="What I Don't Do" />
                    <ul className="text-bg mb-4 list-disc pl-6">
                        <li>I don't ask you to create an account</li>
                        <li>
                            I don't collect your name, email, or anything
                            personal
                        </li>
                        <li>I don't track what you search for or click on</li>
                        <li>
                            I don't use analytics, crash reporting, or error
                            tracking tools
                        </li>
                        <li>I don't show ads or partner with ad networks</li>
                        <li>I don't use cookies (I prefer bagels anyway)</li>
                    </ul>
                </div>

                <div>
                    <Title text="Permissions" />
                    <p>
                        RECHEK doesn't ask for access to your location, camera,
                        contacts, microphone, or anything else on your phone.
                    </p>
                </div>
                <p className="my-6 text-sm">Last updated: August 2024</p>
            </div>
        </div>
    )
}
