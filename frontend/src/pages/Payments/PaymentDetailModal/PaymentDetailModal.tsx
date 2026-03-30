import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, X } from "lucide-react";

type PaymentStatus = "Pending" | "Escrowed" | "Released" | "Failed";

interface StateTransition {
  status: PaymentStatus;
  timestamp: string;
}

interface Payment {
  id: string;
  date: string;
  shipmentId: string;
  amount: number;
  token: string;
  status: PaymentStatus;
  txHash: string;
  payerAddress?: string;
  payeeAddress?: string;
  createdAt?: string;
  updatedAt?: string;
  stateTransitions?: StateTransition[];
}

const statusClasses: Record<PaymentStatus, string> = {
  Pending:
    "bg-[rgba(245,158,11,0.15)] text-[#fbbf24] border border-[rgba(245,158,11,0.3)]",
  Escrowed:
    "bg-[rgba(98,255,255,0.15)] text-[#62ffff] border border-[rgba(98,255,255,0.3)]",
  Released:
    "bg-[rgba(16,185,129,0.15)] text-[#34d399] border border-[rgba(16,185,129,0.3)]",
  Failed:
    "bg-[rgba(239,68,68,0.15)] text-[#f87171] border border-[rgba(239,68,68,0.3)]",
};

const getStellarExplorerUrl = (hash: string) =>
  `https://stellar.expert/explorer/public/tx/${hash}`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  payment: Payment | null;
}

const PaymentDetailModal: React.FC<Props> = ({ isOpen, onClose, payment }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !payment) return null;

  const timeline =
    payment.stateTransitions && payment.stateTransitions.length > 0
      ? payment.stateTransitions
      : [{ status: payment.status, timestamp: payment.date }];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
    >
      <div
        className="bg-[rgba(8,40,50,0.95)] border border-[rgba(98,255,255,0.2)] rounded-2xl p-6 w-full max-w-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4 gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-[#62ffff] mb-4">
              Payment Details
            </h2>
            <p className="text-text-secondary text-sm">
              Full payment metadata and state timeline
            </p>
          </div>
          <div className="flex items-start gap-2">
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-text-secondary hover:text-white hover:cursor-pointer transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <dl className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-text-secondary">Amount</dt>
              <dd className="text-white font-medium">
                ${payment.amount.toLocaleString()} {payment.token}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-secondary">Status</dt>
              <dd className="text-white font-medium">
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase inline-block ${statusClasses[payment.status]}`}
                >
                  {payment.status}
                </span>
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-secondary">Shipment</dt>
              <dd className="text-white font-medium">
                <Link
                  to={`/dashboard/shipments/${payment.shipmentId}`}
                  className="text-[#62ffff] hover:underline"
                >
                  {payment.shipmentId}
                </Link>
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-secondary">Payer</dt>
              <dd className="text-white font-medium break-all">
                {payment.payerAddress ?? "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-secondary">Payee</dt>
              <dd className="text-white font-medium break-all">
                {payment.payeeAddress ?? "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-secondary">Transaction</dt>
              <dd className="text-white font-medium break-all flex items-center gap-2">
                <a
                  href={getStellarExplorerUrl(payment.txHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#62ffff] hover:underline break-words"
                >
                  {payment.txHash}
                </a>
                <ExternalLink size={14} className="text-[#62ffff]" />
              </dd>
            </div>
          </dl>

          <dl className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-text-secondary">Created</dt>
              <dd className="text-white font-medium">
                {payment.createdAt ?? payment.date}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-secondary">Last Updated</dt>
              <dd className="text-white font-medium">
                {payment.updatedAt ?? payment.date}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-text-secondary mb-2">State Timeline</dt>
              <div className="flex flex-col gap-3">
                {timeline.map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="min-w-[10px] h-10 flex items-center justify-center">
                      <div
                        className={`w-3 h-3 rounded-full ${t.status === payment.status ? "bg-[#62ffff]" : "bg-[#2c5364]"}`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-semibold text-white uppercase">
                          {t.status}
                        </div>
                        <div className="text-text-secondary text-xs">
                          {new Date(t.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailModal;
