"use client";
import { useEffect, useState } from "react";
import { Download, RefreshCw, Trash2, FileText } from "lucide-react";
import { intake } from "@/content/intake";
import type { Locale } from "@/content/site";
type RecordItem = {
  id: string;
  protocol: string;
  name: string;
  phone: string;
  email: string;
  observations: string;
  createdAt: string;
  expiresAt: string;
  files: { id: string; name: string; size: number }[];
};
export function Receipts({ locale }: { locale: Locale }) {
  const t = intake(locale);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  async function load(more = false) {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(
        "/api/solicitacoes" +
          (more && cursor ? "?cursor=" + encodeURIComponent(cursor) : ""),
        { cache: "no-store" },
      );
      if (!response.ok)
        throw Error(
          response.status === 401 || response.status === 403
            ? t.unauthorized
            : t.adminError,
        );
      const data = await response.json();
      setRecords((current) =>
        more ? [...current, ...data.records] : data.records,
      );
      setCursor(data.cursor);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : t.adminError);
    } finally {
      setBusy(false);
    }
  }
  useEffect(() => {
    load();
  }, []);
  async function remove(id: string) {
    if (!confirm(t.confirmDelete)) return;
    setError("");
    try {
      const tokenResponse = await fetch("/api/intake-token", {
        cache: "no-store",
      });
      if (!tokenResponse.ok) throw Error();
      const { token } = await tokenResponse.json();
      const response = await fetch("/api/solicitacoes/" + id, {
        method: "DELETE",
        headers: { "X-Intake-Token": token },
      });
      if (!response.ok) throw Error();
      setRecords(records.filter((r) => r.id !== id));
    } catch {
      setError(t.deleteError);
    }
  }
  return (
    <section className="receipts-page container">
      <div className="section-heading">
        <div>
          <h1>{t.adminTitle}</h1>
          <p>{t.adminIntro}</p>
        </div>
        <button
          className="button outline"
          disabled={busy}
          onClick={() => load()}
        >
          <RefreshCw size={18} />
          {t.refresh}
        </button>
      </div>
      {error && (
        <p className="upload-error" role="alert">
          {error}
        </p>
      )}
      {busy && <p role="status">{t.loading}</p>}
      {!busy && !records.length && !error && <p>{t.empty}</p>}
      <div className="receipts-grid">
        {records.map((record) => (
          <article className="receipt-card" key={record.id}>
            <span className="receipt-protocol">{record.protocol}</span>
            <h2>{record.name}</h2>
            <p>
              <a href={"tel:" + record.phone}>{record.phone}</a>
              {record.email && (
                <>
                  <br />
                  <a href={"mailto:" + record.email}>{record.email}</a>
                </>
              )}
            </p>
            <p className="receipt-dates">
              {t.receivedAt}:{" "}
              {new Intl.DateTimeFormat(locale, {
                dateStyle: "short",
                timeStyle: "short",
                timeZone: "America/Sao_Paulo",
              }).format(new Date(record.createdAt))}
              <br />
              {t.expires}:{" "}
              {new Intl.DateTimeFormat(locale, {
                dateStyle: "short",
                timeZone: "America/Sao_Paulo",
              }).format(new Date(record.expiresAt))}
            </p>
            {record.observations && (
              <div className="receipt-notes">
                <h3>{t.observations}</h3>
                <p>{record.observations}</p>
              </div>
            )}
            <ul className="receipt-files">
              {record.files.map((file) => (
                <li key={file.id}>
                  <FileText size={20} />
                  <span>{file.name}</span>
                  <a
                    href={
                      "/api/solicitacoes/" + record.id + "/files/" + file.id
                    }
                    aria-label={t.download + ": " + file.name}
                    download
                  >
                    <Download size={20} />
                  </a>
                </li>
              ))}
            </ul>
            <button
              className="receipt-delete"
              onClick={() => remove(record.id)}
            >
              <Trash2 size={16} />
              {t.delete}
            </button>
          </article>
        ))}
      </div>
      {cursor && (
        <button
          className="button outline"
          disabled={busy}
          onClick={() => load(true)}
        >
          {t.more}
        </button>
      )}
    </section>
  );
}
