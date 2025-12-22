import { NextResponse } from 'next/server'

export async function middleware(req) {
    try {
        const res = await fetch(`${req.nextUrl.origin}/redirect-rules.json`)
        const data = await res.json()
        const rules = data.rules

        const pathname = req.nextUrl.pathname
        const rule = rules.find(r => r.source === pathname)

        if (rule) {
            return NextResponse.redirect(rule.destination, rule.status)
        }
    } catch (err) {
        console.error('Failed to fetch redirect rules', err)
    }

    return NextResponse.next()
}
