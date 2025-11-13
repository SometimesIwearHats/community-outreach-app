"use client";

import { FormEvent, useState } from "react";

type Tab = "request" | "pay";

export default function ServicePage() {
  const [activeTab, setActiveTab] = useState<Tab>("request");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRequestSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      recipientName: String(formData.get("recipientName") || ""),
      requestingFor: String(formData.get("requestingFor") || "self") as
        | "self"
        | "other",
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      address: String(formData.get("address") || ""),
      city: String(formData.get("city") || ""),
      postal: String(formData.get("postal") || ""),
      diet: String(formData.get("diet") || "none"),
      serves: String(formData.get("serves") || ""),
      notes: String(formData.get("notes") || ""),
      consent: formData.get("consent") === "on",
    };

    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let message = "Request failed";
        try {
          const data = await res.json();
          if (Array.isArray(data.details) && data.details.length > 0) {
            message = data.details.join(" ");
          } else if (typeof data.error === "string") {
            message = data.error;
          }
        } catch {
          // ignore JSON parse errors and keep default message
        }
        throw new Error(message);
      }

      setStatus(
        "Your meal request has been received. We will review it as soon as possible."
      );
      form.reset();
    } catch (err: any) {
      console.error(err);
      setStatus(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container section">
      <h1>Meal Service</h1>
      <p className="lead">
        Use this page to request a meal for yourself or someone else, or to
        sponsor meals through our Pay It Forward program.
      </p>

      {/* Tabs */}
      <div className="tabs" role="tablist" aria-label="Meal Service Options">
        <button
          className="tab"
          type="button"
          aria-selected={activeTab === "request"}
          aria-controls="panel-request"
          id="tab-request"
          onClick={() => setActiveTab("request")}
        >
          Request a Meal
        </button>
        <button
          className="tab"
          type="button"
          aria-selected={activeTab === "pay"}
          aria-controls="panel-pay"
          id="tab-pay"
          onClick={() => setActiveTab("pay")}
        >
          Pay It Forward
        </button>
      </div>

      {/* Request a Meal panel */}
      <section
        className="card"
        id="panel-request"
        role="tabpanel"
        aria-labelledby="tab-request"
        hidden={activeTab !== "request"}
      >
        <h2 className="card-title">Request a Meal</h2>
        <p className="muted small">
          No lengthy forms or proof required. Tell us where the meal is needed
          and any important details. We’ll handle the rest with care and
          discretion.
        </p>

        <form onSubmit={handleRequestSubmit}>
          <div className="row">
            <div className="field">
              <label htmlFor="rName">Recipient Name</label>
              <input
                id="rName"
                name="recipientName"
                required
                minLength={2}
                maxLength={120}
              />
            </div>
            <div className="field">
              <label htmlFor="rFor">Requesting For</label>
              <select id="rFor" name="requestingFor">
                <option value="self">Myself</option>
                <option value="other">Someone else</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="rEmail">Email</label>
              <input
                id="rEmail"
                type="email"
                name="email"
                required
                maxLength={255}
              />
            </div>
            <div className="field">
              <label htmlFor="rPhone">Phone</label>
              <input
                id="rPhone"
                type="tel"
                name="phone"
                required
                pattern="^[0-9]{10}$"
                title="Please enter a 10-digit phone number (numbers only)."
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="rAddress">Address</label>
            <input
              id="rAddress"
              name="address"
              required
              minLength={5}
              maxLength={255}
            />
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="rCity">City</label>
              <input
                id="rCity"
                name="city"
                required
                pattern="^[A-Za-zÀ-ÖØ-öø-ÿ' .-]{2,120}$"
                title="City must contain only letters (and spaces)."
              />
            </div>
            <div className="field">
              <label htmlFor="rPostal">Postal / ZIP Code</label>
              <input
                id="rPostal"
                name="postal"
                required
                pattern="^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$"
                title="Format: A1A1A1 (letters and digits only)."
              />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="rDiet">Dietary Needs</label>
              <select id="rDiet" name="diet" defaultValue="none">
                <option value="none">No restrictions</option>
                <option value="vegetarian">Vegetarian</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="rServes">Number of People</label>
              <select id="rServes" name="serves" defaultValue="1">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5+">5+</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="rNotes">Notes (optional)</label>
            <textarea
              id="rNotes"
              name="notes"
              rows={3}
              placeholder="Access notes, allergies, preferred time window, etc."
              maxLength={2000}
            />
          </div>

          <label className="checkbox">
            <input type="checkbox" id="rConsent" name="consent" required />
            <span>I consent to being contacted to coordinate this meal.</span>
          </label>

          <div className="notice">
            We aim to respond within 24 hours and work with nearby partner
            restaurants to fulfill your request.
          </div>

          <div className="form-actions">
            <button className="btn primary" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Request"}
            </button>
            {status && <span className="muted">{status}</span>}
          </div>
        </form>
      </section>

      {/* Pay It Forward panel (UI only for now) */}
      <section
        className="card"
        id="panel-pay"
        role="tabpanel"
        aria-labelledby="tab-pay"
        hidden={activeTab !== "pay"}
      >
        <h2 className="card-title">Pay It Forward</h2>
        <p className="muted small">
          Sponsor one meal or many. Your contribution goes directly toward meals
          for neighbors in need.
        </p>

        <form>
          <div className="row">
            <div className="field">
              <label htmlFor="pName">Your Name</label>
              <input id="pName" name="name" required />
            </div>
            <div className="field">
              <label htmlFor="pEmail">Your Email</label>
              <input id="pEmail" type="email" name="email" required />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="pAmount">Amount</label>
              <select id="pAmount" name="amount">
                <option value="15">$15 (one meal)</option>
                <option value="30">$30 (two meals)</option>
                <option value="60">$60 (family)</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div className="field" id="customAmountWrapper">
              <label htmlFor="pCustom">Custom Amount</label>
              <input
                id="pCustom"
                type="number"
                name="customAmount"
                min={1}
                step={1}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="pNote">Optional Note to Recipients</label>
            <textarea
              id="pNote"
              name="note"
              rows={3}
              placeholder="A kind word can mean a lot."
            />
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="pRecurring">Support Type</label>
              <select id="pRecurring" name="recurring">
                <option value="one-time">One-time</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="pFund">Focus Area (optional)</label>
              <select id="pFund" name="fund">
                <option value="general">General fund</option>
                <option value="families">Families</option>
                <option value="seniors">Seniors</option>
                <option value="students">Students</option>
              </select>
            </div>
          </div>

          <div className="notice">
            This is a visual placeholder. In the real app, this form will send
            data to a secure payment endpoint (e.g. Stripe Checkout) over HTTPS.
          </div>

          <button className="btn primary" type="button">
            Continue to Payment (coming soon)
          </button>
        </form>
      </section>
    </main>
  );
}
