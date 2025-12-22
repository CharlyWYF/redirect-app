export const metadata = {
    title: 'Redirect App',
    description: 'Multi-rule redirect app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
