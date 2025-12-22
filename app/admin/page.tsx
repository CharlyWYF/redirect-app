'use client'
import { useState } from 'react'
import rulesData from '../../redirect-rules.json'

export default function Admin() {
    const [rules, setRules] = useState(rulesData.rules)

    function updateRule(i: number, key: string, value: string) {
        const next = [...rules]
        next[i] = { ...next[i], [key]: value }
        setRules(next)
    }

    function addRule() {
        setRules([...rules, { source: '', destination: '', status: 302 }])
    }

    async function save() {
        await fetch('/api/save', {
            method: 'POST',
            body: JSON.stringify({ rules })
        })
        alert('保存成功，正在重新部署（约 30 秒生效）')
    }

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
                保存并部署
            </button>
        </main>
    )
}
