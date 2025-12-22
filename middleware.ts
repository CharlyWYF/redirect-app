import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import rules from './redirect-rules.json'

export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname

    const rule = rules.rules.find(r => r.source === pathname)

    if (rule) {
        return NextResponse.redirect(rule.destination, rule.status)
    }

    return NextResponse.next()
}
