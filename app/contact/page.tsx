"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("Thank you for reaching out — we’ll reply soon.");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container section">
      <h1>Contact &amp; Community Outreach</h1>
      <p className="lead">
        We’re here to answer questions, coordinate partnerships, and support our
        community.
      </p>

      <div className="grid-3">
        {/* Contact form */}
        <div className="card">
          <h3>Send Us a Message</h3>
          <p className="muted small">
            Have a question, partnership idea, or feedback? Send us a note and
            we’ll get back to you.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="field">
                <label htmlFor="contactName">Your Name</label>
                <input id="contactName" name="name" required />
              </div>
              <div className="field">
                <label htmlFor="contactEmail">Your Email</label>
                <input
                  id="contactEmail"
                  name="email"
                  type="email"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="contactMessage">Message</label>
              <textarea
                id="contactMessage"
                name="message"
                rows={4}
                placeholder="How can we help?"
                required
              />
            </div>

            {/* Form actions (button) */}
            <div className="form-actions">
              <button className="btn primary" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
              {status && <span className="muted">{status}</span>}
            </div>
          </form>
        </div>

        {/* Community programs */}
        <div className="card">
          <h3>Community Programs</h3>
          <p className="muted">
            We partner with schools, shelters, hospitals, and community groups
            to bring meals to people who need them most.
          </p>
          <ul className="muted">
            <li>Volunteer opportunities</li>
            <li>Corporate sponsorships</li>
            <li>Restaurant partnerships</li>
            <li>Community ambassadors</li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="card">
          <h3>FAQ</h3>

          <details>
            <summary>How do I become a sponsor?</summary>
            <p className="muted">
              You can support us directly through the Pay It Forward page.
            </p>
          </details>

          <details>
            <summary>Are my donations tax-deductible?</summary>
            <p className="muted">
              This depends on your local regulations and our partner
              organizations.
            </p>
          </details>

          <details>
            <summary>What if I have dietary restrictions?</summary>
            <p className="muted">
              Include them in your meal request form—we will match them with the
              right partner restaurant.
            </p>
          </details>
        </div>
      </div>
    </main>
  );
}
