import React, { useState } from 'react'

// Monetize Calculator // - Tailwind CSS for styling // - Preset CPM/RPM values are based on public industry reports (see chat for sources) // - Default USD->IDR exchange rate set to 16,702 (update if needed)

export default function MonetizeCalculator() { const DEFAULT_USD_IDR = 16702 // update if you want live rate

const presets = { TikTok: { 'Creator Fund (legacy)': { unit: 'USD_per_1000', low: 0.02, mid: 0.03, high: 0.04 }, 'Creator Rewards (long-form)': { unit: 'USD_per_1000', low: 0.4, mid: 0.7, high: 1.0 }, 'Market-low (emerging markets)': { unit: 'USD_per_1000', low: 0.005, mid: 0.01, high: 0.02 } }, Instagram: { 'Instagram Ads (advertiser CPM)': { unit: 'USD_per_1000', low: 0.5, mid: 2.0, high: 4.0 }, 'Influencer Sponsorship (brand CPM)': { unit: 'USD_per_1000', low: 10, mid: 17.5, high: 25 } } }

const [platform, setPlatform] = useState('TikTok') const [monetType, setMonetType] = useState(Object.keys(presets[platform])[0]) const [views, setViews] = useState(10000) const [usdIdr, setUsdIdr] = useState(DEFAULT_USD_IDR) const [customCPM, setCustomCPM] = useState({ low: '', mid: '', high: '' }) const [useCustom, setUseCustom] = useState(false)

const onPlatformChange = (p) => { setPlatform(p) const first = Object.keys(presets[p])[0] setMonetType(first) setUseCustom(false) setCustomCPM({ low: '', mid: '', high: '' }) }

const getCPMValues = () => { if (useCustom) { const l = parseFloat(customCPM.low) || 0 const m = parseFloat(customCPM.mid) || 0 const h = parseFloat(customCPM.high) || 0 return { low: l, mid: m, high: h, unit: 'USD_per_1000' } } return presets[platform][monetType] }

const formatIDR = (x) => { return 'Rp ' + Number(x).toLocaleString('id-ID', { maximumFractionDigits: 0 }) }

const cpm = getCPMValues() const viewsNum = Number(views) || 0 const factor = viewsNum / 1000

// compute USD earnings const usdLow = factor * (cpm.low || 0) const usdMid = factor * (cpm.mid || 0) const usdHigh = factor * (cpm.high || 0)

// convert to IDR const idrLow = usdLow * usdIdr const idrMid = usdMid * usdIdr const idrHigh = usdHigh * usdIdr

return ( <div className="min-h-screen bg-slate-50 p-6"> <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6"> <h1 className="text-2xl font-semibold mb-2">Monetize Calculator — TikTok & Instagram</h1> <p className="text-sm text-slate-600 mb-4">Per-video estimator. Presets are industry-based estimates for Indonesia; you can override with custom CPM values (USD per 1,000 views).</p>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-slate-700">Platform</label>
        <select value={platform} onChange={(e)=>onPlatformChange(e.target.value)} className="mt-1 block w-full rounded-md border p-2">
          <option>TikTok</option>
          <option>Instagram</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Monetization Type</label>
        <select value={monetType} onChange={(e)=>setMonetType(e.target.value)} className="mt-1 block w-full rounded-md border p-2">
          {Object.keys(presets[platform]).map(k => <option key={k}>{k}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Views (per video)</label>
        <input type="number" value={views} onChange={(e)=>setViews(e.target.value)} className="mt-1 block w-full rounded-md border p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">USD → IDR rate (for conversion)</label>
        <input type="number" value={usdIdr} onChange={(e)=>setUsdIdr(Number(e.target.value))} className="mt-1 block w-full rounded-md border p-2" />
      </div>

      <div className="md:col-span-2">
        <label className="inline-flex items-center">
          <input type="checkbox" checked={useCustom} onChange={(e)=>setUseCustom(e.target.checked)} className="mr-2" />
          <span className="text-sm">Override presets with custom CPM (USD per 1,000 views)</span>
        </label>

        {useCustom && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            <input placeholder="Low (USD)" value={customCPM.low} onChange={(e)=>setCustomCPM({...customCPM, low: e.target.value})} className="rounded-md border p-2" />
            <input placeholder="Mid (USD)" value={customCPM.mid} onChange={(e)=>setCustomCPM({...customCPM, mid: e.target.value})} className="rounded-md border p-2" />
            <input placeholder="High (USD)" value={customCPM.high} onChange={(e)=>setCustomCPM({...customCPM, high: e.target.value})} className="rounded-md border p-2" />
          </div>
        )}
      </div>
    </div>

    <div className="mt-6 bg-slate-50 p-4 rounded-lg">
      <h2 className="text-lg font-medium">Result (per video)</h2>
      <p className="text-sm text-slate-600">Formula: <code>(views ÷ 1000) × CPM</code> — CPM expressed as USD per 1,000 views. Conversion to IDR uses the exchange rate above.</p>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-white rounded-lg shadow-sm">
          <h3 className="font-semibold">Low estimate</h3>
          <p className="text-sm text-slate-500">USD: ${usdLow.toFixed(4)}</p>
          <p className="text-sm text-slate-500">IDR: {formatIDR(idrLow)}</p>
        </div>

        <div className="p-3 bg-white rounded-lg shadow-sm">
          <h3 className="font-semibold">Mid estimate</h3>
          <p className="text-sm text-slate-500">USD: ${usdMid.toFixed(4)}</p>
          <p className="text-sm text-slate-500">IDR: {formatIDR(idrMid)}</p>
        </div>

        <div className="p-3 bg-white rounded-lg shadow-sm">
          <h3 className="font-semibold">High estimate</h3>
          <p className="text-sm text-slate-500">USD: ${usdHigh.toFixed(4)}</p>
          <p className="text-sm text-slate-500">IDR: {formatIDR(idrHigh)}</p>
        </div>
      </div>

      <div className="mt-4 text-xs text-slate-500">
        <p>Presets (USD per 1,000 views) used in this calculator are industry estimates and will vary by niche, audience country, watch time, and platform program. Update custom CPM for more accurate results.</p>
      </div>
    </div>

    <div className="mt-6 text-right">
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Copy Result</button>
    </div>
  </div>

  <div className="max-w-3xl mx-auto mt-6 text-sm text-slate-600">
    <p className="font-medium">Notes</p>
    <ul className="list-disc pl-5">
      <li>Calculator shows per-video revenue estimates. For monthly revenue, multiply by expected video uploads per month.</li>
      <li>For sponsorship deals, brands often pay using a flat fee (per post) rather than strict CPM. Use influencer CPM presets as a guide.</li>
    </ul>
  </div>

</div>

) }
