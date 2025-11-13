export default function HomePage() {
  return (
    <main className="container hero">
      <section>
        <h1>Pay It Forward. Feed a Neighbor.</h1>
        <p className="lead">
          We connect people who want to help with neighbors who need a hot
          meal—quickly, privately, and with dignity. This Next.js app will
          power secure requests and pay-it-forward donations.
        </p>

        <div className="cta-row">
          <a className="btn primary" href="/service">
            Get Started
          </a>
        </div>
      </section>
    </main>
  );
}
