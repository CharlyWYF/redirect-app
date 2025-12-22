import { writeFileSync } from 'fs'
import path from 'path'
import { exec } from 'child_process'

export async function POST(req: Request) {
    const { rules } = await req.json()

    const filePath = path.join(process.cwd(), 'redirect-rules.json')

    writeFileSync(
        filePath,
        JSON.stringify({ rules }, null, 2)
    )

    // 依赖 GitHub + Vercel 自动部署
    exec('git add . && git commit -m "update redirect rules" && git push')

    return Response.json({ ok: true })
}
