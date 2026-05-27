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
                            <button onClick={() => downloadPdf(templateRef, { orientation: "portrait", widthInches: 8.27, heightInches: 11.69, scale: 3, filename: "matrix-invoice.pdf" })} disabled={isGenerating} className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] px-3 py-1.5 rounded bg-red-500/15 text-red-500 hover:bg-red-500/25 transition-colors disabled:opacity-50">
                                {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />} PDF
                            </button>
                        </div>
                        <div className="p-3 md:p-6 flex justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d] overflow-auto">
                            <div className="transform scale-[0.42] sm:scale-[0.55] md:scale-[0.7] origin-top">
                                <div ref={templateRef} style={{ width: 620, height: 877, background: "#ffffff", fontFamily: BRAND.fonts.body, padding: "48px 50px", position: "relative", overflow: "hidden" }}>
                                    {/* Subtle background watermark */}
                                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0.015, pointerEvents: "none", zIndex: 0 }}>
                                        <img src={BRAND.logoTransparent} alt="" crossOrigin="anonymous" style={{ width: 350, height: 350, objectFit: "contain" }} />
                                    </div>

                                    {/* Header Section */}
                                    <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
                                        <div>
                                            <img src={BRAND.logo} alt="Matrix Logo" crossOrigin="anonymous" style={{ width: 64, height: 64, objectFit: "contain", marginBottom: 12 }} />
                                            <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 16, fontWeight: 900, color: "#000", textTransform: "uppercase" }}>{BRAND.companyShort}</div>
                                            <div style={{ fontSize: 10, color: BRAND.colors.yellowDark, fontWeight: 800, marginTop: 4, textTransform: "uppercase" }}>{BRAND.tagline}</div>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 40, fontWeight: 900, color: BRAND.colors.yellow, lineHeight: 1 }}>INVOICE</div>
                                            <div style={{ fontSize: 12, color: "#888", marginTop: 12, fontWeight: 700 }}>NO. <span style={{ color: "#333" }}>{data.invoiceNo}</span></div>
                                            <div style={{ fontSize: 12, color: "#888", fontWeight: 700 }}>DATE <span style={{ color: "#333" }}>{data.date}</span></div>
                                        </div>
                                    </div>

                                    <div style={{ height: 4, width: 40, background: BRAND.colors.yellow, marginBottom: 32 }} />

                                    {/* From / To Section */}
                                    <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", marginBottom: 40, gap: 40 }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 11, fontWeight: 900, color: "#aaa", marginBottom: 10, textTransform: "uppercase" }}>FROM</div>
                                            <div style={{ fontSize: 14, color: "#111", fontWeight: 800, marginBottom: 4 }}>{BRAND.company}</div>
                                            <div style={{ fontSize: 12, color: "#666", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{BRAND.location}{"\n"}{BRAND.phone}{"\n"}{BRAND.email}</div>
                                        </div>
                                        <div style={{ flex: 1, textAlign: "right" }}>
                                            <div style={{ fontSize: 11, fontWeight: 900, color: "#aaa", marginBottom: 10, textTransform: "uppercase" }}>BILL TO</div>
                                            <div style={{ fontSize: 14, color: "#111", fontWeight: 800, marginBottom: 4 }}>{data.clientName}</div>
                                            <div style={{ fontSize: 12, color: "#666", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{data.clientAddress}</div>
                                        </div>
                                    </div>

                                    {/* Table Section */}
                                    <div style={{ position: "relative", zIndex: 1, marginBottom: 32 }}>
                                        <div style={{ display: "flex", borderBottom: `2px solid #000`, padding: "0 12px 12px 12px" }}>
                                            <div style={{ flex: 3.5, fontSize: 12, fontWeight: 900, color: "#000" }}>DESCRIPTION</div>
                                            <div style={{ flex: 0.8, fontSize: 12, fontWeight: 900, color: "#000", textAlign: "center" }}>QTY</div>
                                            <div style={{ flex: 1.2, fontSize: 12, fontWeight: 900, color: "#000", textAlign: "right" }}>RATE</div>
                                            <div style={{ flex: 1.5, fontSize: 12, fontWeight: 900, color: "#000", textAlign: "right" }}>AMOUNT</div>
                                        </div>
                                        {data.items.map((item, i) => (
                                            <div key={i} style={{ display: "flex", padding: "14px 12px", borderBottom: "1px solid #efefef", alignItems: "center" }}>
                                                <div style={{ flex: 3.5 }}>
                                                    <div style={{ fontSize: 13, color: "#111", fontWeight: 600 }}>{item.description || "—"}</div>
                                                </div>
                                                <div style={{ flex: 0.8, fontSize: 13, color: "#444", textAlign: "center" }}>{item.qty}</div>
                                                <div style={{ flex: 1.2, fontSize: 13, color: "#444", textAlign: "right" }}>{item.rate.toLocaleString("en-GH", { minimumFractionDigits: 2 })}</div>
                                                <div style={{ flex: 1.5, fontSize: 13, color: "#111", textAlign: "right", fontWeight: 700 }}>GH₵ {(item.qty * item.rate).toLocaleString("en-GH", { minimumFractionDigits: 2 })}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Totals Section */}
                                    <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "flex-end", marginBottom: 40 }}>
                                        <div style={{ width: 260 }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", background: "rgba(217,222,0,0.1)", borderRadius: 6 }}>
                                                <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 16, fontWeight: 900, color: "#000" }}>GRAND TOTAL</div>
                                                <div style={{ fontFamily: BRAND.fonts.heading, fontSize: 18, fontWeight: 900, color: BRAND.colors.yellowDark }}>GH₵ {total.toLocaleString("en-GH", { minimumFractionDigits: 2 })}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Notes & Terms Section */}
                                    <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 40 }}>
                                        <div style={{ flex: 1 }}>
                                            {data.notes && (
                                                <div style={{ marginBottom: 20 }}>
                                                    <div style={{ fontSize: 11, fontWeight: 900, color: "#aaa", marginBottom: 8, textTransform: "uppercase" }}>NOTES</div>
                                                    <div style={{ fontSize: 11, color: "#666", lineHeight: 1.7, whiteSpace: "pre-wrap", borderLeft: `2px solid ${BRAND.colors.yellow}`, paddingLeft: 12 }}>{data.notes}</div>
                                                </div>
                                            )}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            {data.paymentTerms && (
                                                <div>
                                                    <div style={{ fontSize: 11, fontWeight: 900, color: "#aaa", marginBottom: 8, textTransform: "uppercase" }}>PAYMENT TERMS</div>
                                                    <div style={{ fontSize: 11, color: "#666", lineHeight: 1.7 }}>{data.paymentTerms}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Footer Section */}
                                    <div style={{ position: "absolute", bottom: 40, left: 50, right: 50, borderTop: "1px solid #efefef", paddingTop: 16 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#aaa", fontWeight: 600 }}>
                                            <span style={{textTransform: "uppercase"}}>{BRAND.companyShort}</span>
                                            <span style={{textTransform: "uppercase"}}>{BRAND.location}</span>
                                            <span style={{textTransform: "uppercase"}}>{BRAND.website}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden p-5 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                <div key={i} className="mb-3 space-y-2 sm:space-y-0 sm:flex sm:gap-2 sm:mb-2">
                                    <input type="text" value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} placeholder="Description" className="w-full sm:flex-[3] bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-raleway focus:border-[#D9DE00] focus:outline-none placeholder:text-white/15" />
                                    <div className="flex gap-2">
                                        <input type="number" value={item.qty} onChange={(e) => updateItem(i, "qty", Number(e.target.value))} placeholder="Qty" className="flex-1 sm:flex-[0.7] bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-raleway focus:border-[#D9DE00] focus:outline-none text-center" />
                                        <input type="number" value={item.rate} onChange={(e) => updateItem(i, "rate", Number(e.target.value))} placeholder="Rate" className="flex-1 sm:flex-[1] bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-raleway focus:border-[#D9DE00] focus:outline-none text-right" />
                                        <button onClick={() => removeItem(i)} className="text-red-500/50 hover:text-red-500 flex-shrink-0"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold tracking-[2px] text-white/30 mb-2">NOTES</label>
                            <textarea value={data.notes} onChange={(e) => setData({ ...data, notes: e.target.value })} rows={2} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-raleway focus:border-[#D9DE00] focus:outline-none resize-none" />
                        </div>

                        <button onClick={() => downloadPdf(templateRef, { orientation: "portrait", widthInches: 8.27, heightInches: 11.69, scale: 3, filename: "matrix-invoice.pdf" })} disabled={isGenerating} className="w-full flex items-center justify-center gap-2 bg-[#D9DE00] text-black font-bold py-3 rounded-lg text-sm tracking-wider font-montserrat hover:bg-[#e5ea2a] transition-colors disabled:opacity-50">
                            {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} DOWNLOAD PDF
                        </button>
                    </div>
                </div>

                <div className="xl:w-[380px] min-h-[400px] md:min-h-[600px]">
                    <AiWritingAssistant materialType="invoice" onApply={handleAiApply} />
                </div>
            </div>
        </div>
    );
}
