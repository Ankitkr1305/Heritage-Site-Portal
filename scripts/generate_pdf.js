const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HeritageWatch AI — 4-Member Team Work Division & Viva Guide</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1e293b;
      background: #ffffff;
      line-height: 1.5;
      font-size: 13px;
      padding: 24px;
    }
    
    @page {
      size: A4;
      margin: 12mm;
    }

    @media print {
      body {
        padding: 0;
      }
      .page-break {
        page-break-before: always;
      }
      .card {
        break-inside: avoid;
      }
    }

    .header-banner {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #ffffff;
      padding: 22px;
      border-radius: 12px;
      margin-bottom: 20px;
      border: 1px solid #334155;
    }

    .gov-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255,255,255,0.15);
      padding-bottom: 8px;
      margin-bottom: 10px;
      font-size: 11px;
      color: #94a3b8;
    }

    .gov-strip span.emblem {
      color: #f59e0b;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    .title {
      font-size: 20px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 6px;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 12px;
      color: #cbd5e1;
      max-width: 650px;
      line-height: 1.4;
    }

    .meta-pills {
      display: flex;
      gap: 8px;
      margin-top: 12px;
      flex-wrap: wrap;
    }

    .pill {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 3px 8px;
      border-radius: 999px;
      font-size: 10.5px;
      color: #e2e8f0;
      font-weight: 500;
    }

    .pill.green {
      background: rgba(16, 185, 129, 0.2);
      border-color: rgba(16, 185, 129, 0.4);
      color: #34d399;
    }

    .pill.amber {
      background: rgba(245, 158, 11, 0.2);
      border-color: rgba(245, 158, 11, 0.4);
      color: #fbbf24;
    }

    .section-title {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 5px;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .summary-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
    }

    .summary-table th {
      background: #f8fafc;
      text-align: left;
      padding: 8px 12px;
      font-size: 11px;
      font-weight: 700;
      color: #475569;
      border-bottom: 2px solid #e2e8f0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .summary-table td {
      padding: 8px 12px;
      font-size: 11.5px;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
    }

    .summary-table tr:last-child td {
      border-bottom: none;
    }

    .member-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 20px;
    }

    .card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 14px;
      position: relative;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 6px;
    }

    .member-num {
      font-size: 10.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 2px 7px;
      border-radius: 4px;
      display: inline-block;
    }

    .m1 .member-num { background: #dbeafe; color: #1e40af; }
    .m2 .member-num { background: #dcfce7; color: #166534; }
    .m3 .member-num { background: #fef3c7; color: #92400e; }
    .m4 .member-num { background: #f3e8ff; color: #6b21a8; }

    .role-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #0f172a;
      margin-top: 3px;
    }

    .unit-tag {
      font-size: 10px;
      font-weight: 600;
      color: #64748b;
      background: #f1f5f9;
      padding: 2px 5px;
      border-radius: 4px;
    }

    .file-list {
      list-style: none;
      margin: 6px 0 10px 0;
    }

    .file-list li {
      font-family: 'Courier New', Courier, monospace;
      font-size: 10px;
      color: #334155;
      background: #f8fafc;
      padding: 2.5px 5px;
      border-radius: 4px;
      margin-bottom: 3px;
      border-left: 3px solid #cbd5e1;
    }

    .speech-box {
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      padding: 8px 10px;
      border-radius: 6px;
      font-size: 10.5px;
      color: #334155;
      line-height: 1.45;
    }

    .speech-box strong {
      color: #0f172a;
      display: block;
      margin-bottom: 2px;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .curriculum-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 14px;
      margin-top: 14px;
    }

    .curriculum-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-top: 8px;
    }

    .curr-item {
      background: #ffffff;
      padding: 8px 10px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      font-size: 10.5px;
    }

    .curr-item strong {
      color: #0f172a;
      font-size: 11px;
      display: block;
      margin-bottom: 3px;
    }

    .footer {
      margin-top: 20px;
      text-align: center;
      font-size: 10px;
      color: #94a3b8;
      border-top: 1px solid #e2e8f0;
      padding-top: 10px;
    }
  </style>
</head>
<body>

  <!-- Header Banner -->
  <div class="header-banner">
    <div class="gov-strip">
      <span class="emblem">🏛️ Archaeological Survey of India & Ministry of Tourism</span>
      <span>Official Academic Team Project Documentation</span>
    </div>
    <h1 class="title">HeritageWatch AI — Crowd Management Portal</h1>
    <p class="subtitle">
      Smart-Tourism, Real-Time Optical Telemetry, Node.js JWT Authentication & Command Center.
      Complete 4-Member Technical Division & Viva Defense Reference.
    </p>
    <div class="meta-pills">
      <div class="pill green">✓ Next.js 14 & React (Pure JavaScript / JSX)</div>
      <div class="pill green">✓ Node.js Bcrypt & JWT RBAC</div>
      <div class="pill green">✓ Vercel Production Deployed</div>
      <div class="pill amber">⚡ Academic Syllabus Units I – VI Fully Covered</div>
    </div>
  </div>

  <!-- Summary Table -->
  <h2 class="section-title">📊 Executive Work Allocation Matrix</h2>
  <table class="summary-table">
    <thead>
      <tr>
        <th>Member</th>
        <th>Specialized Role</th>
        <th>Primary Tech Domain</th>
        <th>Syllabus Mapping</th>
        <th>Key Deliverables</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Member 1</strong></td>
        <td>Frontend & Tourist Experience Lead</td>
        <td>React, Tailwind CSS, Responsive UI</td>
        <td>Unit I (Routing) & Unit V (SEO)</td>
        <td>Homepage, Monument Explorer, Digital E-Pass QR (/passes)</td>
      </tr>
      <tr>
        <td><strong>Member 2</strong></td>
        <td>Backend & Telemetry Specialist</td>
        <td>Route Handlers, Optical Sensors Simulation</td>
        <td>Unit II (SSR/SSG) & Unit III (REST APIs)</td>
        <td>Queue APIs, MASI Decision Engine, Computer Vision heatmaps</td>
      </tr>
      <tr>
        <td><strong>Member 3</strong></td>
        <td>Auth & Security Engineer</td>
        <td>Node.js Bcrypt, JWT, Edge Middleware</td>
        <td>Unit IV (Auth & Sessions) & Unit VI (Security)</td>
        <td>Password hashing, Token cookies, Protected route RBAC</td>
      </tr>
      <tr>
        <td><strong>Member 4</strong></td>
        <td>DB Architect & DevOps Lead</td>
        <td>MongoDB Mongoose, Admin Sub-Portals, CI/CD</td>
        <td>Unit IV (Database) & Unit V (Deployment)</td>
        <td>5x Admin Sub-sites, Database pooling, Vercel & GitHub CI/CD</td>
      </tr>
    </tbody>
  </table>

  <!-- Page Break for Detailed Cards -->
  <div class="page-break"></div>

  <h2 class="section-title">👥 In-Depth Member Breakdown & Viva Defense Scripts</h2>
  
  <div class="member-grid">
    
    <!-- Member 1 -->
    <div class="card m1">
      <div class="card-header">
        <div>
          <span class="member-num">Member 01</span>
          <div class="role-title">Frontend & Tourist Experience Lead</div>
        </div>
        <span class="unit-tag">Units I & V</span>
      </div>
      <p style="font-size: 11px; color: #475569; margin-bottom: 5px;">
        Responsible for tourist-facing portals, dynamic routing, time-slot selection bar, and mobile responsiveness.
      </p>
      <ul class="file-list">
        <li>src/app/page.jsx (Homepage Portal)</li>
        <li>src/app/monuments/[slug]/page.jsx (Dynamic SSG Pages)</li>
        <li>src/app/passes/page.jsx (Digital QR E-Pass Viewer)</li>
        <li>src/components/Navbar.jsx & Footer.jsx</li>
        <li>src/components/DestinationsExplorer.jsx (7 Sites)</li>
      </ul>
      <div class="speech-box">
        <strong>🎤 Viva Defense Statement (2 Minutes):</strong>
        "I spearheaded the public tourist experience. Utilizing Next.js 14 App Router, I created file-based dynamic routes (<code>/monuments/[slug]</code>) with <code>generateStaticParams</code> for instant pre-rendering. I developed the interactive time-slot booking modal, responsive queue indicator cards, and the print-ready digital QR pass viewer at <code>/passes</code> with zero layout shift."
      </div>
    </div>

    <!-- Member 2 -->
    <div class="card m2">
      <div class="card-header">
        <div>
          <span class="member-num">Member 02</span>
          <div class="role-title">Backend API & Telemetry Specialist</div>
        </div>
        <span class="unit-tag">Units II & III</span>
      </div>
      <p style="font-size: 11px; color: #475569; margin-bottom: 5px;">
        Architected REST Route Handlers, automated quota decrements, and the MASI crowd surge decision engine.
      </p>
      <ul class="file-list">
        <li>src/app/api/monuments/route.js & [slug]/route.js</li>
        <li>src/app/api/bookings/route.js (Pass Booking REST API)</li>
        <li>src/app/api/sensors/route.js (Turnstiles Telemetry)</li>
        <li>src/components/MasiEngineSection.jsx (MASI Algorithm)</li>
        <li>src/components/ComputerVisionSection.jsx (YOLO Heatmaps)</li>
      </ul>
      <div class="speech-box">
        <strong>🎤 Viva Defense Statement (2 Minutes):</strong>
        "I was responsible for backend REST API architecture and optical telemetry simulation. I implemented Route Handlers for ticket decrementing with concurrency safeguards, and engineered the MASI algorithm (Measure, Analyze, Simulate, Intervene) to dynamically suggest shortest-gate corridors and calculate live hourly density curves."
      </div>
    </div>

    <!-- Member 3 -->
    <div class="card m3">
      <div class="card-header">
        <div>
          <span class="member-num">Member 03</span>
          <div class="role-title">Authentication & Security Engineer</div>
        </div>
        <span class="unit-tag">Units IV & VI</span>
      </div>
      <p style="font-size: 11px; color: #475569; margin-bottom: 5px;">
        Engineered Node.js cryptographic security, password salting, signed JWT tokens, and Edge Middleware RBAC.
      </p>
      <ul class="file-list">
        <li>src/lib/auth.js (Bcrypt Salt-10 & JWT Sign/Verify)</li>
        <li>src/middleware.js (Next.js Edge Middleware RBAC)</li>
        <li>src/app/api/auth/login/route.js & register/route.js</li>
        <li>src/app/api/auth/me/route.js & logout/route.js</li>
        <li>src/app/login/page.jsx (Unified Secure Portal)</li>
      </ul>
      <div class="speech-box">
        <strong>🎤 Viva Defense Statement (2 Minutes):</strong>
        "I owned authentication, session management, and access control. I integrated <code>bcryptjs</code> to hash user passwords with 10 salt rounds and <code>jsonwebtoken</code> for signing 7-day tokens. Critically, I built the Edge Middleware that intercepts requests at the network edge, verifying officer claims and shielding the <code>/admin</code> dashboard from unauthorized tourists."
      </div>
    </div>

    <!-- Member 4 -->
    <div class="card m4">
      <div class="card-header">
        <div>
          <span class="member-num">Member 04</span>
          <div class="role-title">DB Architect, Admin Portal & DevOps Lead</div>
        </div>
        <span class="unit-tag">Units IV & V</span>
      </div>
      <p style="font-size: 11px; color: #475569; margin-bottom: 5px;">
        Designed Mongoose database schemas, officer multi-site control rooms, and automated CI/CD deployment.
      </p>
      <ul class="file-list">
        <li>src/models/User.js, Monument.js, Booking.js, Sensor.js</li>
        <li>src/lib/mongodb.js (Connection Pooling & Cache)</li>
        <li>src/app/admin/ (5x Dedicated Control Sub-Sites)</li>
        <li>next.config.mjs & jsconfig.json</li>
        <li>Vercel Production Deployment & GitHub CI/CD</li>
      </ul>
      <div class="speech-box">
        <strong>🎤 Viva Defense Statement (2 Minutes):</strong>
        "I engineered the database architecture, officer administration suite, and cloud deployment pipeline. I created Mongoose schemas with a fail-safe in-memory cache, built the multi-site officer control rooms (gate toggles, QR turnstile scanner, and emergency PA dispatcher), and deployed the production build to Vercel with GitHub CI/CD integration."
      </div>
    </div>

  </div>

  <!-- Syllabus Coverage Reference -->
  <div class="curriculum-box">
    <h3 style="font-size: 12.5px; font-weight: 700; color: #0f172a; margin-bottom: 6px;">
      🎓 Academic Syllabus Verification (Units I – VI Checklist)
    </h3>
    <div class="curriculum-grid">
      <div class="curr-item">
        <strong>Unit I: Fundamentals & Routing</strong>
        App Router, Nested Layouts (<code>/admin/layout.jsx</code>), Dynamic Routes (<code>[slug]</code>), Loading and Error UI.
      </div>
      <div class="curr-item">
        <strong>Unit II: Rendering & Data Fetching</strong>
        Hybrid SSR, SSG (<code>generateStaticParams</code>), ISR, Server vs Client Components, Fetch API caching.
      </div>
      <div class="curr-item">
        <strong>Unit III: API Development & Actions</strong>
        REST Route Handlers (GET, POST), dynamic parameter extraction, request payload validation, and optimistic UI.
      </div>
      <div class="curr-item">
        <strong>Unit IV: Auth, Sessions & Database</strong>
        Bcrypt password hashing, signed JWT tokens, HTTP-only cookies, RBAC, MongoDB Mongoose ODM connectivity.
      </div>
      <div class="curr-item">
        <strong>Unit V: Performance, SEO & Deploy</strong>
        Next/image optimization, code-splitting with dynamic imports, sitemap.js, robots.js, and Vercel cloud deployment.
      </div>
      <div class="curr-item">
        <strong>Unit VI: Advanced Features & Security</strong>
        Edge Middleware, Security Headers (X-Frame-Options, nosniff), Clean JavaScript/JSX modular architecture.
      </div>
    </div>
  </div>

  <div class="footer">
    HeritageWatch AI Project • Built with Next.js 14, Node.js, React JSX, MongoDB & Tailwind CSS • Repository: github.com/Ankitkr1305/Heritage-Site-Portal
  </div>

</body>
</html>
`;

// Write HTML file
const htmlPath = path.join(__dirname, '..', 'team_work_division.html');
fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('HTML generated at:', htmlPath);

// Generate PDF using Google Chrome Headless
const pdfPath = path.join(__dirname, '..', 'Heritage_Portal_Team_Work_Division.pdf');
const desktopPdfPath = 'C:\\Users\\ANKIT VERMA\\OneDrive\\Desktop\\Heritage_Portal_Team_Work_Division.pdf';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

try {
  console.log('Running Chrome Headless to generate PDF...');
  const cmd = `"${chromePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfPath}" "${htmlPath}"`;
  execSync(cmd, { stdio: 'inherit' });
  console.log('PDF successfully created in project folder:', pdfPath);
  
  // Copy to Desktop as well
  fs.copyFileSync(pdfPath, desktopPdfPath);
  console.log('PDF successfully copied directly to Desktop:', desktopPdfPath);
} catch (err) {
  console.error('Error generating PDF with Chrome:', err.message);
}
