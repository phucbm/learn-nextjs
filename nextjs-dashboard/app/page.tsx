import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {ArrowRight, Database, Lock, Palette, Zap} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {lusitana} from "@/app/ui/fonts"
import {authConfig} from "@/auth.config";

const techStack = [
    {name: "Vercel", description: "Headless Server Deployment", icon: Zap, color: "bg-blue-100 text-blue-700"},
    {name: "Neon", description: "PostgreSQL Database", icon: Database, color: "bg-green-100 text-green-700"},
    {name: "shadcn/ui", description: "UI Components", icon: Palette, color: "bg-purple-100 text-purple-700"},
    {
        name: "Auth.js",
        description: "Credentials & Github Authentication",
        icon: Lock,
        color: "bg-yellow-100 text-yellow-700",
    },
]

export default function HomePage() {
    return (
        <main className="min-h-screen flex flex-col bg-gray-50">
            <div className="flex-1 container mx-auto px-4 py-12 space-y-16 max-w-3xl">
                <header className="text-center space-y-4 min-h-[50vh] flex items-center justify-center">
                    <div>
                        <h1 className={`${lusitana.className} text-5xl md:text-7xl font-bold text-gray-900`}>ACME</h1>
                        <p className="text-xl md:text-2xl text-gray-600 flex gap-1.5">
                            <Link href="https://nextjs.org/learn/dashboard-app" target="_blank">
                                <span className="font-semibold text-gray-900">Learn Next.js | Dashboard app</span>
                            </Link>
                        </p>
                        <p className="text-xl md:text-2xl text-gray-600 flex gap-1.5 justify-center">
                            Customized by

                            <Link
                                href="https://github.com/phucbm/learn-nextjs"
                                className="text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                @phucbm
                            </Link>
                        </p>
                        <p className="pt-2">
                            <Button asChild>
                                <Link href={authConfig.pages.signIn}>
                                    <span>
                                        Go to Dashboard
                                    </span>
                                    <ArrowRight className="ml-2 h-6 w-6"/>
                                </Link>
                            </Button>
                        </p>
                    </div>
                </header>

                <Card className="border-none shadow-lg overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
                        <CardTitle className={`${lusitana.className} text-3xl md:text-4xl font-bold`}>Next.js
                            Dashboard</CardTitle>
                        <CardDescription className="text-lg md:text-xl text-blue-100">
                            This dashboard app was built using the Next.js framework and these technologies:
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        <div className="grid gap-6">
                            {techStack.map((tech) => (
                                <div
                                    key={tech.name}
                                    className={`flex items-center space-x-4 p-4 rounded-lg transition-all hover:scale-105 ${tech.color}`}
                                >
                                    <tech.icon className="h-8 w-8 flex-shrink-0"/>
                                    <div>
                                        <h3 className="font-semibold text-xl md:text-2xl">{tech.name}</h3>
                                        <p className="text-base md:text-lg">{tech.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="relative aspect-video rounded-lg overflow-hidden">
                            <Image src="/hero-desktop.png" fill className="object-cover" alt="Dashboard preview"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                                {techStack.map((tech) => (
                                    <Badge key={tech.name} variant="secondary" className="text-sm md:text-base">
                                        {tech.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <Button
                            asChild
                            size="lg"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg md:text-xl py-6"
                        >
                            <Link href={authConfig.pages.signIn}>
                                <span>Start Your Journey</span>
                                <ArrowRight className="ml-2 h-6 w-6"/>
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <footer className="border-t border-gray-200 bg-white">
                <div className="container mx-auto px-4 py-6 flex justify-center items-center">
                    <p className="text-sm text-gray-600 flex gap-1 items-center justify-center">© 2025 Acme Dashboard.
                        Customized by

                        <Link
                            href="https://github.com/phucbm/learn-nextjs"
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            @phucbm
                        </Link>
                        from
                        <Link href="https://nextjs.org/learn/dashboard-app" target="_blank">
                            <span className="font-semibold text-gray-900">Learn Next.js | Dashboard app</span>
                        </Link>
                    </p>
                </div>
            </footer>
        </main>
    )
}

