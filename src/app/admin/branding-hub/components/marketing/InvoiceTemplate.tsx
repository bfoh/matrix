"use client";

import { useState, useRef } from "react";
import { ArrowLeft, Download, Loader2, Plus, Trash2 } from "lucide-react";
import { usePdfDownload } from "../usePdfDownload";
import AiWritingAssistant from "../AiWritingAssistant";
import { BRAND } from "../brandConstants";

interface LineItem {
    description: string;
    qty: number;
    rate: number;
}

export default function InvoiceTemplate({ onBack }: { onBack: () => void }) {
    const templateRef = useRef<HTMLDivElement>(null);
    const { downloadPdf, isGenerating } = usePdfDownload();

    const [data, setData] = useState({
        invoiceNo: "INV-001",
        date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
        clientName: "Client Name",
        clientAddress: "Client Address\nCity, Country",
        items: [{ description: "Service description", qty: 1, rate: 0 }] as LineItem[],
        notes: "Thank you for your business.",
        paymentTerms: "Payment due within 30 days of invoice date.",
    });

    const total = data.items.reduce((sum, item) => sum + item.qty * item.rate, 0);

    const addItem = () => setData({ ...data, items: [...data.items, { description: "", qty: 1, rate: 0 }] });
    const removeItem = (i: number) => setData({ ...data, items: data.items.filter((_, idx) => idx !== i) });
    const updateItem = (i: number, field: keyof LineItem, value: string | number) => {
        const items = [...data.items];
        items[i] = { ...items[i], [field]: value };
        setData({ ...data, items });
    };

    const handleAiApply = (text: string) => {
        setData({ ...data, notes: text });
    };

    return (
        <div className="p-6 md:p-8">
            <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-[#D9DE00] transition-colors mb-6 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold tracking-[2px] font-raleway">BRANDING HUB / MARKETING</span>
            </button>

            <h1 className="text-2xl md:text-3xl font-bold font-montserrat tracking-wider mb-8">
                INVOICE <span className="text-[#D9DE00]">TEMPLATE</span>
            </h1>

            <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1 space-y-5">
                    {/* Preview */}
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <div className="px-5 py-3 flex justify-between items-center border-b border-white/[0.06]">
                            <span className="text-[10px] tracking-[2px] font-bold text-white/30">PREVIEW</span>
                            <button onClick={() => downloadPdf(templateRef, { orientation: "portrait", widthInches: 8.27, heightInches: 11.69, scale: 4, filename: "matrix-invoice.pdf" })} disabled={isGenerating} className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-red-500/15 text-red-500 hover:bg-red-500/25 transition-colors disabled:opacity-50">
                                {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />} PDF
                            </button>
                        </div>
                        <div className="p-6 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d] overflow-auto">
                            <div className="transform scale-[0.6] md:scale-[0.7] origin-top">
                                <div ref={templateRef} style={{ width: 620, height: 877, background: "#fafaf5", fontFamily: BRAND.fonts.body, padding: "32px 40px", position: "relative" }}>
                                    {/* Header */}
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                                        <img src={BRAND.logo} alt="Matrix Logo" crossOrigin="anonymous" style={{ width: 50, height: 50, objectFit: "contain" }} />
                                        <div style={{ textAlign: "right" }}>
                                            <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 24, fontWeight: 800, color: BRAND.colors.yellow, letterSpacing: 3 }}>INVOICE</div>
                                            <div style={{ fontSize: 9, color: "#777", marginTop: 4 }}>#{data.invoiceNo}</div>
                                            <div style={{ fontSize: 9, color: "#777" }}>{data.date}</div>
                                        </div>
                                    </div>

                                    <div style={{ height: 2, background: `linear-gradient(90deg, ${BRAND.colors.yellow}, ${BRAND.colors.yellow}33)`, marginBottom: 20 }} />

                                    {/* From / To */}
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28 }}>
                                        <div>
                                            <div style={{ fontSize: 8, fontWeight: 700, color: "#999", letterSpacing: 2, marginBottom: 4 }}>FROM</div>
                                            <div style={{ fontSize: 11, color: "#333", fontWeight: 600 }}>{BRAND.company}</div>
                                            <div style={{ fontSize: 9, color: "#777", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{BRAND.location}{"\n"}{BRAND.phone}{"\n"}{BRAND.email}</div>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <div style={{ fontSize: 8, fontWeight: 700, color: "#999", letterSpacing: 2, marginBottom: 4 }}>BILL TO</div>
                                            <div style={{ fontSize: 11, color: "#333", fontWeight: 600 }}>{data.clientName}</div>
                                            <div style={{ fontSize: 9, color: "#777", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{data.clientAddress}</div>
                                        </div>
                                    </div>

                                    {/* Items Table */}
                                    <div style={{ marginBottom: 24 }}>
                                        <div style={{ display: "flex", background: BRAND.colors.yellow, padding: "8px 12px", borderRadius: "4px 4px 0 0" }}>
                                            <div style={{ flex: 3, fontSize: 8, fontWeight: 700, color: "#000", letterSpacing: 1.5 }}>DESCRIPTION</div>
                                            <div style={{ flex: 1, fontSize: 8, fontWeight: 700, color: "#000", letterSpacing: 1.5, textAlign: "center" }}>QTY</div>
                                            <div style={{ flex: 1, fontSize: 8, fontWeight: 700, color: "#000", letterSpacing: 1.5, textAlign: "right" }}>RATE</div>
                                            <div style={{ flex: 1, fontSize: 8, fontWeight: 700, color: "#000", letterSpacing: 1.5, textAlign: "right" }}>AMOUNT</div>
                                        </div>
                                        {data.items.map((item, i) => (
                                            <div key={i} style={{ display: "flex", padding: "10px 12px", borderBottom: "1px solid #e8e8e0", alignItems: "center" }}>
                                                <div style={{ flex: 3, fontSize: 10, color: "#333" }}>{item.description || "—"}</div>
                                                <div style={{ flex: 1, fontSize: 10, color: "#555", textAlign: "center" }}>{item.qty}</div>
                                                <div style={{ flex: 1, fontSize: 10, color: "#555", textAlign: "right" }}>GH₵ {item.rate.toFixed(2)}</div>
                                                <div style={{ flex: 1, fontSize: 10, color: "#333", textAlign: "right", fontWeight: 600 }}>GH₵ {(item.qty * item.rate).toFixed(2)}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Total */}
                                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 28 }}>
                                        <div style={{ width: 200 }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: `2px solid ${BRAND.colors.yellow}` }}>
                                                <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 12, fontWeight: 800, color: "#111", letterSpacing: 1 }}>TOTAL</div>
                                                <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 14, fontWeight: 800, color: BRAND.colors.yellow }}>GH₵ {total.toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    {data.notes && (
                                        <div style={{ marginBottom: 16 }}>
                                            <div style={{ fontSize: 8, fontWeight: 700, color: "#999", letterSpacing: 2, marginBottom: 4 }}>NOTES</div>
                                            <div style={{ fontSize: 9, color: "#666", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{data.notes}</div>
                                        </div>
                                    )}
                                    {data.paymentTerms && (
                                        <div>
                                            <div style={{ fontSize: 8, fontWeight: 700, color: "#999", letterSpacing: 2, marginBottom: 4 }}>PAYMENT TERMS</div>
                                            <div style={{ fontSize: 9, color: "#666", lineHeight: 1.7 }}>{data.paymentTerms}</div>
                                        </div>
                                    )}

                                    {/* Footer */}
                                    <div style={{ position: "absolute", bottom: 24, left: 40, right: 40 }}>
                                        <div style={{ height: 1.5, background: `linear-gradient(90deg, ${BRAND.colors.yellow}, ${BRAND.colors.yellow}33)`, marginBottom: 6 }} />
                                        <div style={{ fontSize: 7, color: "#999", textAlign: "center", letterSpacing: "0.5px" }}>{BRAND.location} • {BRAND.phone} • {BRAND.email} • {BRAND.website}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden p-5 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">INVOICE #</label>
                                <input type="text" value={data.invoiceNo} onChange={(e) => setData({ ...data, invoiceNo: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">DATE</label>
                                <input type="text" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">CLIENT NAME</label>
                            <input type="text" value={data.clientName} onChange={(e) => setData({ ...data, clientName: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">CLIENT ADDRESS</label>
                            <textarea value={data.clientAddress} onChange={(e) => setData({ ...data, clientAddress: e.target.value })} rows={2} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none resize-none" />
                        </div>

                        {/* Line Items */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-[10px] font-bold tracking-[2px] text-white/30">LINE ITEMS</label>
                                <button onClick={addItem} className="text-[10px] font-bold text-[#D9DE00] flex items-center gap-1 hover:text-[#e5ea2a]"><Plus size={12} /> Add</button>
                            </div>
                            {data.items.map((item, i) => (
                                <div key={i} className="flex gap-2 mb-2">
                                    <input type="text" value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} placeholder="Description" className="flex-[3] bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-raleway focus:border-[#D9DE00] focus:outline-none placeholder:text-white/15" />
                                    <input type="number" value={item.qty} onChange={(e) => updateItem(i, "qty", Number(e.target.value))} className="flex-[0.7] bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-raleway focus:border-[#D9DE00] focus:outline-none text-center" />
                                    <input type="number" value={item.rate} onChange={(e) => updateItem(i, "rate", Number(e.target.value))} className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-raleway focus:border-[#D9DE00] focus:outline-none text-right" />
                                    <button onClick={() => removeItem(i)} className="text-red-500/50 hover:text-red-500"><Trash2 size={14} /></button>
                                </div>
                            ))}
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">NOTES</label>
                            <textarea value={data.notes} onChange={(e) => setData({ ...data, notes: e.target.value })} rows={2} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none resize-none" />
                        </div>

                        <button onClick={() => downloadPdf(templateRef, { orientation: "portrait", widthInches: 8.27, heightInches: 11.69, scale: 4, filename: "matrix-invoice.pdf" })} disabled={isGenerating} className="w-full flex items-center justify-center gap-2 bg-[#D9DE00] text-black font-bold py-3 rounded-lg text-sm tracking-wider font-montserrat hover:bg-[#e5ea2a] transition-colors disabled:opacity-50">
                            {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} DOWNLOAD PDF
                        </button>
                    </div>
                </div>

                <div className="xl:w-[380px] min-h-[600px]">
                    <AiWritingAssistant materialType="invoice" onApply={handleAiApply} />
                </div>
            </div>
        </div>
    );
}
