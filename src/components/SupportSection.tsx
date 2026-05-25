import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Shield, HelpCircle, Send, CheckCircle2, RefreshCw, Cpu, Database, Network } from 'lucide-react';
import { SUPPORT_FAQS } from '../data';

export default function SupportSection() {
  const [faqs, setFaqs] = useState(SUPPORT_FAQS);
  const [searchWord, setSearchWord] = useState('');
  
  // Simulated Terminal State Manager
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'AETHER_DIAGNOSTICS v4.21 HANDSHAKE COMPLETED...',
    'ENTER "help" REGISTERED TO VIEW COMPATIBILITY COMMAND CORES.',
    ''
  ]);
  
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDesc, setTicketDesc] = useState('');
  const [ticketStatusMsg, setTicketStatusMsg] = useState<string | null>(null);

  const logsEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  const filteredFaqs = faqs.filter(
    faq => faq.q.toLowerCase().includes(searchWord.toLowerCase()) || 
           faq.a.toLowerCase().includes(searchWord.toLowerCase())
  );

  const executeTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    const cmdLogs = [...terminalLogs, `X_Slayer_42@aether_grid_node:~$ ${terminalInput}`];

    switch (cmd) {
      case 'help':
        setTerminalLogs([
          ...cmdLogs,
          'Available diagnostics core controllers:',
          '  └─ help        - Print database gateway procedures',
          '  └─ ping        - Query active node server handshake speed',
          '  └─ sys_status  - Verify CPU registers & graphics hardware states',
          '  └─ repair_grid - Execute automated sector recovery procedure',
          '  └─ clear       - Wipe terminal cache history logs',
          ''
        ]);
        break;
      case 'ping':
        setTerminalLogs([
          ...cmdLogs,
          'Pinging AetherNet router [gateway.aethernet.net] with 32 bytes data...',
          '  Reply from 104.18.25.105: bytes=32 time=14ms TTL=54',
          '  Reply from 104.18.25.105: bytes=32 time=13ms TTL=54',
          '  Reply from 104.18.25.105: bytes=32 time=15ms TTL=54',
          'Ping Handshake Complete. Stability status: OPTIMAL.',
          ''
        ]);
        break;
      case 'sys_status':
        setTerminalLogs([
          ...cmdLogs,
          '--- LOCAL ENVIRONMENT SYSTEM SPECIFICATIONS ---',
          '  CPU: Cortex Neural v4 Core - 8 Cores (OK)',
          '  GSI MEMORY BUFFER: 32 GB Virtual Frame cache (92% free)',
          '  GRAPHICS DECK: NVIDIA RTX 4070 Multi-Core (ACTIVE)',
          '  LEDGER DATABASE CONNECTIVITY: SECURE_MATRIX_1 (ACTIVE)',
          '  NODE GATEWAY: 0.0.0.0:3000 Inbound Ingress (SECURE)',
          ''
        ]);
        break;
      case 'repair_grid':
        setTerminalLogs([
          ...cmdLogs,
          'INITIALIZING SECTOR RECOVERY ENGINE...',
          '  [**] Verifying neural assets... [DONE]',
          '  [**] Checking credential certificates... [VALID]',
          '  [**] Sweeping duplicated system logs... [OK - 240MB cleared]',
          '  [**] Triggering diagnostic port resync... [ESTABLISHED]',
          'REPAIR PROCEDURE EXECUTED PERFECTLY. COMPATIBILITY ALIGNMENT AT 100%.',
          ''
        ]);
        break;
      case 'clear':
        setTerminalLogs([]);
        break;
      default:
        setTerminalLogs([
          ...cmdLogs,
          `ERR: Diagnostic token "${terminalInput}" unrecognized by main CPU deck. Try typing "help".`,
          ''
        ]);
        break;
    }

    setTerminalInput('');
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketDesc.trim()) return;

    setTicketStatusMsg(`SECURE LEDGER: Support ticket [TICKET-${Math.floor(Math.random() * 90000 + 10000)}] registered, queuing on active node lines...`);
    setTicketSubject('');
    setTicketDesc('');
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
      {/* Left Column: Command Terminal Emulator & Ticket Submission */}
      <div className="flex-[4] flex flex-col gap-5 overflow-y-auto pr-1">
        
        {/* Retro Terminal diagnostic widget */}
        <div className="bg-black/95 border border-cyan-400/30 rounded-[2rem] p-5 shadow-inner flex flex-col h-80 relative overflow-hidden shrink-0">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400/20"></div>
          
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5 text-xs text-slate-500 font-mono">
            <span className="flex items-center gap-2"><Terminal className="w-3.5 h-3.5 text-cyan-400" /> core_diagnostic@system_console:~$</span>
            <span className="text-[10px] text-cyan-500/50">SECURE SHELL</span>
          </div>

          {/* Interactive Logs Window */}
          <div className="flex-1 overflow-y-auto font-mono text-[10px] sm:text-xs text-cyan-400 space-y-1.5 scrollbar-thin">
            {terminalLogs.map((log, index) => (
              <p key={index} className="whitespace-pre-wrap leading-tight">
                {log}
              </p>
            ))}
            <div ref={logsEndRef} />
          </div>

          {/* Command Prompt Form */}
          <form onSubmit={executeTerminalCommand} className="mt-3 pt-2.5 border-t border-white/5 flex gap-2">
            <span className="font-mono text-xs text-slate-500 mt-1">X_Slayer_42@node:~$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Enter terminal token e.g. 'help', 'ping', 'repair_grid'..."
              className="flex-1 bg-transparent text-cyan-400 text-xs font-mono focus:outline-none placeholder:text-slate-700"
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500 text-cyan-400 hover:text-black rounded-lg transition-all text-[10px] font-mono font-black uppercase cursor-pointer"
            >
              RUN_CMD
            </button>
          </form>
        </div>

        {/* Submit support ticket form */}
        <div className="bg-[#0b0b13] border border-white/5 rounded-[2.5rem] p-6 shrink-0">
          <h3 className="text-xs font-black uppercase tracking-widest text-[#ececf1] flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-cyan-400" /> Create Support Grid Request
          </h3>

          {ticketStatusMsg && (
            <div className="p-4 bg-emerald-950/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono rounded-xl mb-4 flex gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{ticketStatusMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div>
              <label className="text-[9px] font-mono uppercase text-slate-500">Subject Core Matter</label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="Brief summary matching issue (e.g. skin not loading, latency on node C)"
                className="w-full bg-black/40 border border-white/10 focus:border-cyan-400 focus:outline-none p-3 rounded-xl text-xs text-slate-200 mt-1 placeholder:text-slate-600 font-sans"
                required
              />
            </div>

            <div>
              <label className="text-[9px] font-mono uppercase text-slate-500">Details of Interface Bug</label>
              <textarea
                value={ticketDesc}
                onChange={(e) => setTicketDesc(e.target.value)}
                placeholder="Give exact steps of failure logic for engineering diagnostic tests"
                rows={3}
                className="w-full bg-black/40 border border-white/10 focus:border-cyan-400 focus:outline-none p-3 rounded-xl text-xs text-slate-200 mt-1 placeholder:text-slate-600 font-sans resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-white text-black hover:bg-cyan-400 font-black uppercase text-[10px] rounded-xl transition-all flex items-center gap-1 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Submit Ledger Ticket
            </button>
          </form>
        </div>
      </div>

      {/* Right Column: FAQs Search grid */}
      <div className="flex-1 flex flex-col gap-5 overflow-y-auto pr-1">
        <div className="bg-[#0b0b13] border border-white/5 rounded-[2.5rem] p-6 h-full flex flex-col">
          <h3 className="text-xs font-black uppercase tracking-widest text-purple-400 flex items-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4 text-purple-400" /> Knowledge Directories
          </h3>

          <div className="relative mb-5">
            <input
              type="text"
              placeholder="Search guides database..."
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              className="w-full pl-3 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-400 transition-colors font-mono placeholder:text-slate-600"
            />
          </div>

          {/* Guide list items */}
          <div className="space-y-4 overflow-y-auto flex-1 h-32 pr-1 scrollbar-none">
            {filteredFaqs.length === 0 ? (
              <p className="text-[10px] font-mono text-slate-600 text-center py-6">No matching directories found inside databases.</p>
            ) : (
              filteredFaqs.map((faq, idx) => (
                <div key={idx} className="bg-black/30 border border-white/5 rounded-2xl p-4 hover:border-purple-400/10 transition-colors">
                  <h4 className="text-xs font-bold text-slate-305 text-cyan-400 line-clamp-2 leading-tight">
                    {faq.q}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
