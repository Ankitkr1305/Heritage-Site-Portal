import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import inch, cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0f172a'),
        alignment=TA_LEFT
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10.5,
        leading=15,
        textColor=colors.HexColor('#475569'),
        alignment=TA_LEFT
    )

    badge_style = ParagraphStyle(
        'Badge',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.HexColor('#d97706'),
        alignment=TA_LEFT
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=colors.HexColor('#1e293b'),
        spaceAfter=6,
        spaceBefore=10
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#0f172a')
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#334155')
    )

    code_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#0f172a')
    )

    speech_title_style = ParagraphStyle(
        'SpeechTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#0f172a')
    )

    speech_body_style = ParagraphStyle(
        'SpeechBody',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#1e293b')
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#ffffff')
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#1e293b')
    )

    story = []

    # Header Box (Official Strip)
    header_data = [
        [
            Paragraph("<b>ARCHAEOLOGICAL SURVEY OF INDIA & MINISTRY OF TOURISM</b>", badge_style),
            Paragraph("<b>ACADEMIC VIVA & PROJECT DEFENSE REPORT</b>", ParagraphStyle('RightMeta', parent=badge_style, alignment=TA_RIGHT, textColor=colors.HexColor('#64748b')))
        ]
    ]
    t_header = Table(header_data, colWidths=[320, 200])
    t_header.setStyle(TableStyle([
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_header)

    story.append(Spacer(1, 4))
    story.append(Paragraph("HeritageWatch AI — Crowd Management Portal", title_style))
    story.append(Paragraph("A smart-tourism, real-time optical crowd telemetry and gate safety platform built with Next.js 14 (pure JavaScript / JSX), Node.js JWT/Bcrypt authentication, MongoDB, and Next.js Edge Middleware.", subtitle_style))
    story.append(Spacer(1, 8))

    # Meta Tags row
    meta_data = [
        [
            Paragraph("<b>Stack:</b> Next.js 14 • React (JSX) • Node.js • MongoDB", table_cell_style),
            Paragraph("<b>Syllabus:</b> Units I – VI Completed", table_cell_style),
            Paragraph("<b>Deploy:</b> Vercel Production + GitHub CI/CD", table_cell_style)
        ]
    ]
    t_meta = Table(meta_data, colWidths=[200, 150, 170])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f1f5f9')),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_meta)

    story.append(Spacer(1, 14))
    story.append(Paragraph("1. Executive 4-Member Work Allocation Matrix", h1_style))

    # Executive Summary Table
    matrix_data = [
        [
            Paragraph("Member", table_header_style),
            Paragraph("Assigned Role", table_header_style),
            Paragraph("Technical Focus Area", table_header_style),
            Paragraph("Syllabus Units", table_header_style),
            Paragraph("Primary Deliverables", table_header_style)
        ],
        [
            Paragraph("<b>Member 1</b>", table_cell_style),
            Paragraph("<b>Frontend & UI Lead</b>", table_cell_style),
            Paragraph("React JSX, Tailwind CSS, Responsive UI", table_cell_style),
            Paragraph("Unit I & Unit V", table_cell_style),
            Paragraph("Homepage, Monument Explorer, QR E-Pass Viewer (/passes)", table_cell_style)
        ],
        [
            Paragraph("<b>Member 2</b>", table_cell_style),
            Paragraph("<b>Backend & Telemetry Lead</b>", table_cell_style),
            Paragraph("REST Route Handlers, Optical Sensors Simulation", table_cell_style),
            Paragraph("Unit II & Unit III", table_cell_style),
            Paragraph("Queue APIs, MASI Decision Engine, Computer Vision heatmaps", table_cell_style)
        ],
        [
            Paragraph("<b>Member 3</b>", table_cell_style),
            Paragraph("<b>Security & Auth Engineer</b>", table_cell_style),
            Paragraph("Node.js Bcrypt, JWT, Edge Middleware", table_cell_style),
            Paragraph("Unit IV & Unit VI", table_cell_style),
            Paragraph("Password hashing, Signed token cookies, Edge RBAC route shield", table_cell_style)
        ],
        [
            Paragraph("<b>Member 4</b>", table_cell_style),
            Paragraph("<b>DB Architect & DevOps Lead</b>", table_cell_style),
            Paragraph("MongoDB Mongoose, Multi-site Admin, Vercel CI/CD", table_cell_style),
            Paragraph("Unit IV & Unit V", table_cell_style),
            Paragraph("5x Admin Sub-sites, Database pooling, GitHub & Vercel deployment", table_cell_style)
        ]
    ]

    t_matrix = Table(matrix_data, colWidths=[65, 110, 130, 80, 135])
    t_matrix.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0f172a')),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('BACKGROUND', (0,1), (-1,1), colors.HexColor('#f8fafc')),
        ('BACKGROUND', (0,2), (-1,2), colors.HexColor('#ffffff')),
        ('BACKGROUND', (0,3), (-1,3), colors.HexColor('#f8fafc')),
        ('BACKGROUND', (0,4), (-1,4), colors.HexColor('#ffffff')),
    ]))
    story.append(t_matrix)

    story.append(Spacer(1, 14))
    story.append(Paragraph("2. Detailed Member Profiles & Viva Defense Scripts", h1_style))

    # Helper function to generate a member block
    def make_member_card(num_str, title_str, units_str, bg_color, file_items, viva_text):
        content = []
        # Header strip inside table
        head = [
            [
                Paragraph(f"<b>{num_str}: {title_str}</b>", ParagraphStyle('HeadTitle', parent=h2_style, textColor=colors.HexColor('#0f172a'))),
                Paragraph(f"<b>Syllabus: {units_str}</b>", ParagraphStyle('HeadUnits', parent=badge_style, alignment=TA_RIGHT, textColor=colors.HexColor('#475569')))
            ]
        ]
        t_head = Table(head, colWidths=[360, 140])
        t_head.setStyle(TableStyle([
            ('BOTTOMPADDING', (0,0), (-1,-1), 3),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ]))
        content.append(t_head)
        content.append(Spacer(1, 4))

        # Files owned
        files_text = "<b>Owned Project Files:</b><br/>" + "<br/>".join([f"• <font face='Courier' size='7.5'>{f}</font>" for f in file_items])
        content.append(Paragraph(files_text, body_style))
        content.append(Spacer(1, 5))

        # Viva Speech Box
        speech_data = [
            [
                Paragraph("<b>VIVA SPEAKING SCRIPT (What to say to Examiner):</b><br/>" + f'"{viva_text}"', speech_body_style)
            ]
        ]
        t_speech = Table(speech_data, colWidths=[500])
        t_speech.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f1f5f9')),
            ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#94a3b8')),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
            ('LEFTPADDING', (0,0), (-1,-1), 6),
            ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ]))
        content.append(t_speech)

        # Wrap in border container
        wrapper = Table([[content]], colWidths=[520])
        wrapper.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor(bg_color)),
            ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor('#cbd5e1')),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ]))
        return wrapper

    # Member 1
    m1_files = [
        "src/app/page.jsx (Main Public Tourist Portal)",
        "src/app/monuments/[slug]/page.jsx (Dynamic Pre-rendered SSG Monument Pages)",
        "src/app/passes/page.jsx (Printable QR E-Pass Viewer)",
        "src/components/Navbar.jsx & Footer.jsx (Site-wide responsive header & helpline)",
        "src/components/DestinationsExplorer.jsx (Interactive 7-Heritage Site cards)"
    ]
    m1_speech = (
        "Mera main role public tourist portal aur dynamic page routing develop karne ka tha. "
        "Maine Next.js 14 App Router ke through file-based dynamic routes (/monuments/[slug]) implement kiye with "
        "generateStaticParams taaki saare UNESCO pages instantly pre-render hon. Saath hi Tailwind CSS ke sath mobile-friendly UI, "
        "interactive time-slot booking modal, aur printable QR digital pass viewer (/passes) create kiya."
    )
    story.append(make_member_card("MEMBER 01", "Frontend Architect & Tourist Experience Lead", "Unit I & Unit V", "#f8fafc", m1_files, m1_speech))
    story.append(Spacer(1, 8))

    # Member 2
    m2_files = [
        "src/app/api/monuments/route.js & [slug]/route.js (Destination REST endpoints)",
        "src/app/api/bookings/route.js (Slot decrement & pass booking engine)",
        "src/app/api/sensors/route.js (Optical turnstiles & camera telemetry)",
        "src/components/MasiEngineSection.jsx (MASI Closed-loop Decision Algorithm)",
        "src/components/ComputerVisionSection.jsx (YOLO Bounding Box simulated telemetry)"
    ]
    m2_speech = (
        "Maine backend REST APIs aur optical crowd telemetry simulation design kiya. "
        "Next.js Route Handlers ke zariye APIs banayi jo real-time queue wait-times, live turnstile metrics, aur hourly "
        "capacity decrement calculate karti hain. Saath hi MASI engine (Measure, Analyze, Simulate, Intervene) implement kiya "
        "jo crowd surge hone par tourists ko shortest-gate corridor recommend karta hai."
    )
    story.append(make_member_card("MEMBER 02", "Backend API & Telemetry Specialist", "Unit II & Unit III", "#ffffff", m2_files, m2_speech))

    # Page Break for clean 2-page print
    story.append(PageBreak())

    # Member 3
    m3_files = [
        "src/lib/auth.js (Bcrypt Salt-10 hashing & Signed JWT sign/verify)",
        "src/middleware.js (Next.js Edge Middleware for Role-Based Access Control)",
        "src/app/api/auth/login/route.js & register/route.js (Authentication endpoints)",
        "src/app/api/auth/me/route.js & logout/route.js (Session verification & token revocation)",
        "src/app/login/page.jsx (Unified Secure Officer & Tourist Portal)"
    ]
    m3_speech = (
        "Mera focus Node.js authentication aur access security par tha. "
        "Maine bcryptjs use karke passwords ko 10 salt rounds ke sath irreversible hash kiya aur jsonwebtoken ke through "
        "tamper-proof 7-day signed JWT tokens issue kiye. Next.js Edge Middleware (src/middleware.js) likha jo network edge par "
        "har request ko intercept karta hai aur normal tourists ko /admin route se automatically redirect kar deta hai."
    )
    story.append(make_member_card("MEMBER 03", "Authentication, RBAC & Security Engineer", "Unit IV & Unit VI", "#f8fafc", m3_files, m3_speech))
    story.append(Spacer(1, 8))

    # Member 4
    m4_files = [
        "src/models/User.js, Monument.js, Booking.js, Sensor.js, Alert.js (Mongoose Schemas)",
        "src/lib/mongodb.js & dbService.js (Connection pooling & in-memory cache)",
        "src/app/admin/ (5x Dedicated Sub-sites: Overview, Monuments, Bookings, Alerts, Sensors)",
        "next.config.mjs & jsconfig.json (Build configuration & clean JavaScript setup)",
        "GitHub Repository & Vercel Production Deployment Pipeline"
    ]
    m4_speech = (
        "Mera role database architecture, officer administration suite aur cloud deployment manage karna tha. "
        "Maine MongoDB aur Mongoose ke schemas design kiye with an in-memory fallback cache taaki database down hone par bhi site live rahe. "
        "Officers ke liye 5 dedicated control rooms (/admin) banaye jahan se gates aur alerts control hote hain, aur poore project ko "
        "GitHub aur Vercel par CI/CD pipeline ke through live deploy kiya."
    )
    story.append(make_member_card("MEMBER 04", "DB Architect, Admin Portal & DevOps Lead", "Unit IV & Unit V", "#ffffff", m4_files, m4_speech))

    story.append(Spacer(1, 12))
    story.append(Paragraph("3. Academic Syllabus Coverage Verification (Units I – VI)", h1_style))

    curr_data = [
        [
            Paragraph("<b>Unit I: Fundamentals & Routing</b><br/>App Router, Nested Layouts (/admin/layout.jsx), Dynamic Routes ([slug]), Error & Loading UI.", table_cell_style),
            Paragraph("<b>Unit II: Rendering & Data Fetching</b><br/>Hybrid SSR/SSG (generateStaticParams), Server vs Client Components, Fetch API caching.", table_cell_style),
            Paragraph("<b>Unit III: API Development & Forms</b><br/>REST Route Handlers (GET, POST), dynamic parameter extraction, request payload validation.", table_cell_style)
        ],
        [
            Paragraph("<b>Unit IV: Auth & Database</b><br/>Bcrypt password hashing, signed JWT tokens, secure cookies, RBAC, MongoDB Mongoose ODM models.", table_cell_style),
            Paragraph("<b>Unit V: Performance, SEO & Deploy</b><br/>Next/image optimization, code splitting with dynamic imports, sitemap.js, Vercel cloud deployment.", table_cell_style),
            Paragraph("<b>Unit VI: Security Best Practices</b><br/>Edge Middleware guards, HTTP Security Headers (X-Frame-Options, nosniff), Clean JavaScript/JSX architecture.", table_cell_style)
        ]
    ]
    t_curr = Table(curr_data, colWidths=[173, 173, 174])
    t_curr.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_curr)

    story.append(Spacer(1, 14))
    footer_text = Paragraph(
        "<b>HeritageWatch AI</b> • Archaeological Survey of India & Ministry of Tourism • "
        "GitHub: <font color='#0284c7'>github.com/Ankitkr1305/Heritage-Site-Portal</font> • "
        "Live URL: <font color='#0284c7'>heritage-site-portal.vercel.app</font>",
        ParagraphStyle('FooterText', parent=body_style, alignment=TA_CENTER, fontSize=7.5, textColor=colors.HexColor('#64748b'))
    )
    story.append(footer_text)

    doc.build(story)
    print(f"Successfully generated: {filename}")

if __name__ == '__main__':
    project_pdf = r"c:\Users\ANKIT VERMA\OneDrive\Desktop\nextPro\Heritage_Portal_Team_Work_Division.pdf"
    desktop_pdf = r"c:\Users\ANKIT VERMA\OneDrive\Desktop\Heritage_Portal_Team_Work_Division.pdf"

    build_pdf(project_pdf)
    build_pdf(desktop_pdf)
