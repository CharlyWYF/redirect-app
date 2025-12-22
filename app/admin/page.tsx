'use client'
import { useEffect, useState } from 'react'

export default function Admin() {
    const [rules, setRules] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/redirect-rules.json')
            .then(res => res.json())
            .then(data => setRules(data.rules))
            .finally(() => setLoading(false))
    }, [])

    function updateRule(i: number, key: string, value: string) {
        const next = [...rules]
        next[i] = { ...next[i], [key]: value }
        setRules(next)
    }

    function addRule() {
        setRules([...rules, { source: '', destination: '', status: 302 }])
    }

    async function save() {
        // ⚠️ 注意：在 Vercel Edge 上无法直接写 public 文件
        // 推荐方式：
        // 1️⃣ 本地修改 redirect-rules.json 然后 git push → 自动 redeploy
        // 2️⃣ 或搭建 API + 写入 DB / KV
        alert('请在本地修改 public/redirect-rules.json 并 redeploy')
    }

    if (loading) return <div>Loading...</div>

    return (
        <main style={{ padding: 40 }}>
            <h1>跳转规则配置</h1>

            {rules.map((r, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                    <input
                        placeholder="/path"
                        value={r.source}
                        onChange={e => updateRule(i, 'source', e.target.value)}
                        style={{ width: 120 }}
                    />
                    <input
                        placeholder="https://target.com"
                        value={r.destination}
                        onChange={e => updateRule(i, 'destination', e.target.value)}
                        style={{ width: 320, marginLeft: 8 }}
                    />
                </div>
            ))}

            <button onClick={addRule}>新增规则</button>
            <button onClick={save} style={{ marginLeft: 8 }}>
                保存（请本地修改 JSON 并 redeploy）
            </button>
        </main>
    )
}
