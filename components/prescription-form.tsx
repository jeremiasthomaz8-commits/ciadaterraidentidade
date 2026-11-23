"use client";
import Link from "next/link";
import { useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { Upload, FileText, X, CheckCircle2, LockKeyhole } from "lucide-react";
import { intake } from "@/content/intake";
import { href, whatsapp, copy, type Locale } from "@/content/site";
import { WhatsAppIcon } from "./icons";
type Receipt = { protocol: string; count: number };
export function PrescriptionForm({ locale }: { locale: Locale }) {
  const t = intake(locale);
  const input = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  function addFiles(incoming: File[]) {
    const next = [...files, ...incoming].filter(
      (f, i, all) =>
        all.findIndex(
          (v) =>
            v.name === f.name &&
            v.size === f.size &&
            v.lastModified === f.lastModified,
        ) === i,
    );
    if (
      next.length > 3 ||
      next.some(
        (f) =>
          !f.size ||
          f.size > 10 * 1024 * 1024 ||
          !["application/pdf", "image/png", "image/jpeg"].includes(f.type) ||
          !/\.(pdf|png|jpe?g)$/i.test(f.name),
      ) ||
      next.reduce((n, f) => n + f.size, 0) > 20 * 1024 * 1024
    ) {
      setError(t.invalid_files);
      return;
    }
    setFiles(next);
    setError("");
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!files.length) {
      setError(t.invalid_files);
      input.current?.focus();
      return;
    }
    const form = event.currentTarget;
    const data = new FormData(form);
    data.delete("file-picker");
    setBusy(true);
    setError("");
    try {
      const tokenResponse = await fetch("/api/intake-token", {
        cache: "no-store",
        credentials: "same-origin",
      });
      if (!tokenResponse.ok) throw Error("unavailable");
      const { token } = await tokenResponse.json();
      for (const file of files) data.append("files", file, file.name);
      const response = await fetch("/api/solicitacoes", {
        method: "POST",
        headers: { "X-Intake-Token": token },
        body: data,
        credentials: "same-origin",
      });
      const result = await response.json();
      if (!response.ok) throw Error(result.error ?? "server_error");
      if (
        result.status !== "received" ||
        !result.protocol ||
        result.count !== files.length
      )
        throw Error("server_error");
      setReceipt({ protocol: result.protocol, count: result.count });
      setFiles([]);
      form.reset();
    } catch (cause) {
      const code = cause instanceof Error ? cause.message : "server_error";
      setError((t as Record<string, string>)[code] ?? t.error);
    } finally {
      setBusy(false);
    }
  }
  if (receipt)
    return (
      <div className="upload-success" role="status">
        <span className="success-icon">
          <CheckCircle2 size={40} />
        </span>
        <h2>{t.received}</h2>
        <p>{t.receivedText}</p>
        <div className="receipt-number">
          <span>{t.protocol}</span>
          <strong>{receipt.protocol}</strong>
          <small>
            {receipt.count} {t.fileCount}
          </small>
        </div>
        <a
          className="button primary"
          href={whatsapp(t.whatsapp + receipt.protocol)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          {t.notify}
        </a>
        <button
          type="button"
          className="button outline"
          onClick={() => setReceipt(null)}
        >
          {t.another}
        </button>
      </div>
    );
  return (
    <form
      className="contact-form prescription-form"
      onSubmit={submit}
      onInvalid={(e) =>
        (e.target as HTMLInputElement).setCustomValidity(
          (e.target as HTMLInputElement).validity.valueMissing
            ? copy[locale].contact.invalidRequired
            : t.invalid_fields,
        )
      }
      onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
    >
      <fieldset disabled={busy}>
        <legend>{t.formTitle}</legend>
        <label htmlFor="prescription-files">{t.files} *</label>
        <div
          className={"file-drop" + (dragging ? " is-dragging" : "")}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            if (!busy) addFiles([...e.dataTransfer.files]);
          }}
        >
          <Upload size={32} strokeWidth={1.5} />
          <input
            ref={input}
            id="prescription-files"
            name="file-picker"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            aria-describedby="file-rules"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              addFiles([...(e.target.files ?? [])]);
              e.target.value = "";
            }}
          />
          <label className="file-choose" htmlFor="prescription-files">
            {t.choose}
          </label>
          <span>{t.drop}</span>
        </div>
        <p id="file-rules" className="file-rules">
          {t.limits}
        </p>
        {files.length > 0 && (
          <ul className="selected-files">
            {files.map((file, i) => (
              <li key={file.name + file.size}>
                <FileText size={21} />
                <span>
                  {file.name}
                  <small>{(file.size / 1024 / 1024).toFixed(2)} MB</small>
                </span>
                <button
                  type="button"
                  aria-label={t.remove + ": " + file.name}
                  onClick={() =>
                    setFiles(files.filter((_, index) => index !== i))
                  }
                >
                  <X size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
        <label htmlFor="prescription-name">{t.name} *</label>
        <input
          id="prescription-name"
          name="name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
        />
        <div className="form-columns">
          <div>
            <label htmlFor="prescription-phone">{t.phone} *</label>
            <input
              id="prescription-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              minLength={10}
              inputMode="tel"
              maxLength={30}
            />
          </div>
          <div>
            <label htmlFor="prescription-email">{t.email}</label>
            <input
              id="prescription-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={160}
            />
          </div>
        </div>
        <label htmlFor="prescription-observations">{t.observations}</label>
        <textarea
          id="prescription-observations"
          name="observations"
          rows={4}
          maxLength={3000}
          placeholder={t.placeholder}
        />
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="prescription-website">Website</label>
          <input
            id="prescription-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <label className="checkbox-label">
          <input type="checkbox" name="consent" value="yes" required />
          <span>
            {t.consent}{" "}
            <Link href={href(locale, "/privacidade")}>{t.privacy}</Link>
          </span>
        </label>
        {error && (
          <p className="upload-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="button primary" disabled={busy}>
          <Upload size={20} />
          {busy ? t.sending : t.submit}
        </button>
        <div className="upload-privacy">
          <LockKeyhole size={18} />
          <span>{t.confidential}</span>
        </div>
      </fieldset>
    </form>
  );
}
