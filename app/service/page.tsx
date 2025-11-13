export default function ServicePage() {
    return (
      <main className="container section">
        <h1>Meal Service</h1>
        <p className="lead">
          Use this page to request a meal for yourself or someone else, or to
          sponsor meals through our Pay It Forward program.
        </p>
  
        <div className="tabs" role="tablist" aria-label="Meal Service Options">
          <button
            className="tab"
            type="button"
            aria-selected="true"
            aria-controls="panel-request"
            id="tab-request"
          >
            Request a Meal
          </button>
          <button
            className="tab"
            type="button"
            aria-selected="false"
            aria-controls="panel-pay"
            id="tab-pay"
          >
            Pay It Forward
          </button>
        </div>
  
        <section
          className="card"
          id="panel-request"
          role="tabpanel"
          aria-labelledby="tab-request"
        >
          <h2 className="card-title">Request a Meal</h2>
          <p className="muted small">
            No lengthy forms or proof required. Tell us where the meal is needed
            and any important details. We’ll handle the rest with care and
            discretion.
          </p>
  
          <form>
            <div className="row">
              <div className="field">
                <label htmlFor="rName">Recipient Name</label>
                <input id="rName" name="recipientName" required />
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
                <input id="rEmail" type="email" name="email" required />
              </div>
              <div className="field">
                <label htmlFor="rPhone">Phone (optional)</label>
                <input id="rPhone" type="tel" name="phone" />
              </div>
            </div>
  
            <div className="field">
              <label htmlFor="rAddress">Address</label>
              <input id="rAddress" name="address" required />
            </div>
  
            <div className="row">
              <div className="field">
                <label htmlFor="rCity">City</label>
                <input id="rCity" name="city" required />
              </div>
              <div className="field">
                <label htmlFor="rPostal">Postal / ZIP Code</label>
                <input id="rPostal" name="postal" required />
              </div>
            </div>
  
            <div className="row">
              <div className="field">
                <label htmlFor="rDiet">Dietary Needs</label>
                <select id="rDiet" name="diet">
                  <option value="none">No restrictions</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="glutenfree">Gluten-free</option>
                  <option value="halal">Halal</option>
                  <option value="kosher">Kosher</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="rServes">Number of People</label>
                <select id="rServes" name="serves">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5+</option>
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
              />
            </div>
  
            <label className="checkbox">
              <input type="checkbox" id="rConsent" required />
              <span>I consent to being contacted to coordinate this meal.</span>
            </label>
  
            <div className="notice">
              We aim to respond within 24 hours and work with nearby partner
              restaurants to fulfill your request.
            </div>
  
            <button className="btn primary" type="submit">
              Submit Request
            </button>
          </form>
        </section>
  
        <section
          className="card"
          id="panel-pay"
          role="tabpanel"
          aria-labelledby="tab-pay"
          hidden
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
  
            <button className="btn primary" type="submit">
              Continue to Payment
            </button>
          </form>
        </section>
      </main>
    );
  }
  