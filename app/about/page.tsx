export default function AboutPage() {
    return (
      <main className="container section">

        {/* About our mission */}
        <h1>About Our Mission</h1>
        <p className="lead">
          Community Outreach Meals is dedicated to ensuring that every person,
          regardless of circumstance, can access a warm meal with dignity.
        </p>
  
        <div className="grid-3">
          <div className="card">
            <h3>Our Purpose</h3>
            <p className="muted">
              We bridge the gap between neighbors who want to sponsor meals and
              individuals or families facing temporary hardship.
            </p>
          </div>
  
          <div className="card">
            <h3>Our Values</h3>
            <p className="muted">
              Compassion, dignity, transparency, and community-driven support.
            </p>
          </div>
  
          <div className="card">
            <h3>Our Partners</h3>
            <p className="muted">
              Local restaurants who prepare sponsored meals and help us deliver
              kindness directly to people in need.
            </p>
          </div>
        </div>
      </main>
    );
  }
  