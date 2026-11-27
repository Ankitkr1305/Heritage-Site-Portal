import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfgen import canvas

# Numbered canvas to calculate dynamic total page count
class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        # Don't draw running header/footer on title page (page 1)
        if self._pageNumber > 1:
            self.saveState()
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748b"))

            # Running Header
            self.drawString(40, 810, "Software Requirements Specification (SRS) — HeritageWatch AI")
            self.drawRightString(555, 810, "Continuous Assessment 3 • Autumn 2026")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(40, 804, 555, 804)

            # Running Footer
            self.line(40, 42, 555, 42)
            self.drawString(40, 30, "Archaeological Survey of India & Ministry of Tourism • Smart-Tourism Initiative")
            page_text = f"Page {self._pageNumber} of {page_count}"
            self.drawRightString(555, 30, page_text)
            self.restoreState()

def build_srs_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=46,
        bottomMargin=50
    )

    styles = getSampleStyleSheet()

    # Custom Typography Styles
    title_main = ParagraphStyle(
        'TitleMain',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor('#0f172a'),
        alignment=TA_CENTER
    )

    title_sub = ParagraphStyle(
        'TitleSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=13,
        leading=17,
        textColor=colors.HexColor('#475569'),
        alignment=TA_CENTER
    )

    title_doc = ParagraphStyle(
        'TitleDoc',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=colors.HexColor('#b45309'),
        alignment=TA_CENTER
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor('#0f172a'),
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor('#1e3a8a'),
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    h3_style = ParagraphStyle(
        'H3',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#334155'),
        spaceBefore=6,
        spaceAfter=3,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=13,
        textColor=colors.HexColor('#1e293b'),
        alignment=TA_JUSTIFY,
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=colors.HexColor('#1e293b'),
        leftIndent=12,
        spaceAfter=3
    )

    table_th = ParagraphStyle(
        'TableTH',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#ffffff')
    )

    table_td = ParagraphStyle(
        'TableTD',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#1e293b')
    )

    table_td_code = ParagraphStyle(
        'TableTDCode',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor('#0f172a')
    )

    callout_style = ParagraphStyle(
        'Callout',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#0f766e')
    )

    story = []

    # ==========================================
    # COVER / TITLE PAGE
    # ==========================================
    story.append(Spacer(1, 40))
    story.append(Paragraph("<b>ARCHAEOLOGICAL SURVEY OF INDIA & MINISTRY OF TOURISM</b>", ParagraphStyle('CoverGov', parent=styles['Normal'], alignment=TA_CENTER, fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=colors.HexColor('#d97706'))))
    story.append(Spacer(1, 10))
    story.append(Paragraph("HeritageWatch AI — Heritage Site Crowd Management & Security Telemetry System", title_main))
    story.append(Spacer(1, 8))
    story.append(Paragraph("Real-Time Queue Telemetry • Optical Sensing • Guaranteed Slot Pass Booking • ASI Officer Command Center", title_sub))
    story.append(Spacer(1, 14))
    story.append(Paragraph("SOFTWARE REQUIREMENTS SPECIFICATION (SRS)", title_doc))
    story.append(Spacer(1, 25))

    # Academic Project Metadata Table
    cover_meta = [
        [Paragraph("<b>Course Code:</b>", table_td), Paragraph("<b>INT219 / CSE326</b>", table_td)],
        [Paragraph("<b>Course Name:</b>", table_td), Paragraph("<b>Front-End Web Development & Full-Stack Systems</b>", table_td)],
        [Paragraph("<b>Academic Term:</b>", table_td), Paragraph("<b>Continuous Assessment 3 (Autumn 2026)</b>", table_td)],
        [Paragraph("<b>Primary Author / Lead:</b>", table_td), Paragraph("<b>Ankit Verma</b> (Reg. No: 12200000 / Group Lead)", table_td)],
        [Paragraph("<b>Team Member 2:</b>", table_td), Paragraph("Rahul Kumar (Backend & Real-Time Telemetry Specialist)", table_td)],
        [Paragraph("<b>Team Member 3:</b>", table_td), Paragraph("Priya Sharma (Security, Bcrypt & JWT Auth Engineer)", table_td)],
        [Paragraph("<b>Team Member 4:</b>", table_td), Paragraph("Vikram Aditya (Mongoose Database & DevOps Lead)", table_td)],
        [Paragraph("<b>Technology Stack:</b>", table_td), Paragraph("Next.js 14 (React JSX), Node.js, Bcrypt, JWT, MongoDB, Tailwind CSS, Edge Middleware", table_td)],
        [Paragraph("<b>Repository:</b>", table_td), Paragraph("<b>https://github.com/Ankitkr1305/Heritage-Site-Portal.git</b>", table_td_code)],
        [Paragraph("<b>Production Link:</b>", table_td), Paragraph("<b>https://heritage-site-portal.vercel.app</b>", table_td_code)]
    ]
    t_cover = Table(cover_meta, colWidths=[130, 385])
    t_cover.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,-1), colors.HexColor('#f8fafc')),
        ('BACKGROUND', (1,0), (1,-1), colors.HexColor('#ffffff')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_cover)

    story.append(Spacer(1, 35))
    story.append(Paragraph("<b>Executive Summary:</b> This Software Requirements Specification (SRS) establishes the complete functional and non-functional requirements for the HeritageWatch AI platform. The system addresses critical overcrowding, bottleneck surges, and gate inefficiencies at iconic Indian heritage destinations (Taj Mahal, Varanasi Ghats, Red Fort, Qutub Minar, Konark Sun Temple, Amber Fort, and Hampi) through optical telemetry, time-slot quota decrementing, and authenticated ASI officer oversight.", body_style))

    story.append(PageBreak())

    # ==========================================
    # TABLE OF CONTENTS & REVISION HISTORY
    # ==========================================
    story.append(Paragraph("Table of Contents", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#cbd5e1'), spaceAfter=8))

    toc_items = [
        ("Revision History", "Page ii"),
        ("1. Introduction", "Page 1"),
        ("   1.1 Purpose", "Page 1"),
        ("   1.2 Scope", "Page 1"),
        ("   1.3 Definitions, Acronyms, and Abbreviations", "Page 1"),
        ("   1.4 References", "Page 2"),
        ("   1.5 Overview", "Page 2"),
        ("2. General Description", "Page 2"),
        ("   2.1 Product Perspective", "Page 2"),
        ("   2.2 Product Functions", "Page 2"),
        ("   2.3 User Characteristics", "Page 3"),
        ("   2.4 General Constraints", "Page 3"),
        ("   2.5 Assumptions and Dependencies", "Page 3"),
        ("3. Specific Requirements", "Page 3"),
        ("   3.1 External Interface Requirements (UI, Hardware, Software, Communications)", "Page 3"),
        ("   3.2 Functional Requirements (Crowd Telemetry, E-Pass Booking, Gate Control, RBAC)", "Page 4"),
        ("   3.5 Non-Functional Requirements (Performance, Reliability, Security, Portability)", "Page 5"),
        ("   3.7 Design Constraints & 3.9 Other Requirements", "Page 5"),
        ("4. Analysis Models (Data Flow Diagrams - DFD Level 0 & DFD Level 1)", "Page 6"),
        ("5. GitHub Repository Link", "Page 6"),
        ("6. Deployed Production Link", "Page 6")
    ]
    toc_data = []
    for item, pg in toc_items:
        toc_data.append([
            Paragraph(f"<font color='#1e293b'>{item}</font>", table_td),
            Paragraph(f"<b><font color='#2563eb'>{pg}</font></b>", ParagraphStyle('TOCRight', parent=table_td, alignment=TA_RIGHT))
        ])
    t_toc = Table(toc_data, colWidths=[430, 85])
    t_toc.setStyle(TableStyle([
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_toc)
    story.append(Spacer(1, 14))

    story.append(Paragraph("Revision History", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#cbd5e1'), spaceAfter=8))

    rev_data = [
        [Paragraph("Revision", table_th), Paragraph("Date", table_th), Paragraph("Author(s)", table_th), Paragraph("Description of Changes", table_th)],
        [Paragraph("1.0", table_td), Paragraph("2026-11-20", table_td), Paragraph("Ankit Verma & Team", table_td), Paragraph("Initial baseline draft of project requirements and tourist booking features.", table_td)],
        [Paragraph("1.5", table_td), Paragraph("2026-11-22", table_td), Paragraph("Ankit Verma", table_td), Paragraph("Added ASI Command Center, multi-gate queue telemetry, and MASI surge engine.", table_td)],
        [Paragraph("2.0", table_td), Paragraph("2026-11-24", table_td), Paragraph("Ankit Verma", table_td), Paragraph("Integrated Node.js Bcrypt password hashing, signed JWT auth, and Edge Middleware RBAC.", table_td)],
        [Paragraph("2.2", table_td), Paragraph("2026-11-27", table_td), Paragraph("Ankit Verma", table_td), Paragraph("Refactored to pure React JSX architecture, completed Vercel deployment & final CA3 SRS.", table_td)]
    ]
    t_rev = Table(rev_data, colWidths=[55, 65, 115, 280])
    t_rev.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0f172a')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('BACKGROUND', (0,1), (-1,1), colors.HexColor('#f8fafc')),
        ('BACKGROUND', (0,3), (-1,3), colors.HexColor('#f8fafc')),
    ]))
    story.append(t_rev)

    story.append(PageBreak())

    # ==========================================
    # 1. INTRODUCTION
    # ==========================================
    story.append(Paragraph("1. Introduction", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#cbd5e1'), spaceAfter=8))

    story.append(Paragraph("1.1 Purpose", h2_style))
    story.append(Paragraph(
        "The purpose of this Software Requirements Specification (SRS) document is to detail the technical, architectural, "
        "and behavioral requirements for <b>HeritageWatch AI</b> — an intelligent crowd management, gate safety telemetry, and "
        "smart reservation platform designed for India's foremost UNESCO World Heritage monuments under the purview of the Archaeological "
        "Survey of India (ASI) and the Ministry of Tourism. This document is intended for software engineers, academic evaluators, system "
        "architects, and security compliance officers overseeing the continuous evaluation and deployment of the platform.",
        body_style
    ))

    story.append(Paragraph("1.2 Scope", h2_style))
    story.append(Paragraph(
        "<b>(1) Software Product Name:</b> HeritageWatch AI (Heritage Site Crowd Management & Security Telemetry System).<br/>"
        "<b>(2) Product Capabilities:</b> The platform provides: (a) real-time crowd density classification (Low, Moderate, High, Surge), "
        "(b) multi-gate queue wait-time telemetry comparing entry corridors (e.g., East Gate vs West Gate) with automated 'Shortest Queue' badges, "
        "(c) guaranteed time-slot entry pass reservations with dynamic ticket quota decrements, (d) printable and mobile-verified digital QR E-Passes "
        "accessible via dedicated <code>/passes</code> route, (e) optical computer-vision turnstile flow simulation with spatial density heatmaps, and "
        "(f) a restricted ASI Officer Command Center (<code>/admin</code>) featuring live gate toggles, turnstile QR scanner check-ins, and multi-channel "
        "emergency PA/SMS alert broadcasting.<br/>"
        "<b>(3) Exclusions:</b> The software does not directly process physical banking credit-card hardware or manage non-heritage commercial municipal transit.",
        body_style
    ))

    story.append(Paragraph("1.3 Definitions, Acronyms, and Abbreviations", h2_style))
    defs_data = [
        [Paragraph("Term / Acronym", table_th), Paragraph("Full Expansion & Contextual Definition", table_th)],
        [Paragraph("<b>ASI</b>", table_td_code), Paragraph("Archaeological Survey of India — Premier government organization for archaeological research and heritage monument protection.", table_td)],
        [Paragraph("<b>SRS</b>", table_td_code), Paragraph("Software Requirements Specification — Formal IEEE-compliant document defining software behavior and constraints.", table_td)],
        [Paragraph("<b>JWT</b>", table_td_code), Paragraph("JSON Web Token — An open standard (RFC 7519) compact, URL-safe means of representing claims securely between two parties.", table_td)],
        [Paragraph("<b>RBAC</b>", table_td_code), Paragraph("Role-Based Access Control — Access governance mechanism enforcing permissions according to user roles (Tourist vs Officer).", table_td)],
        [Paragraph("<b>MASI</b>", table_td_code), Paragraph("Measure, Analyze, Simulate, Intervene — The closed-loop algorithmic framework for dynamic crowd safety intervention.", table_td)],
        [Paragraph("<b>SSG / SSR</b>", table_td_code), Paragraph("Static Site Generation & Server-Side Rendering — Next.js rendering strategies for pre-compilation and on-demand generation.", table_td)],
        [Paragraph("<b>ODM</b>", table_td_code), Paragraph("Object Data Modeling — Object-oriented schema wrapper for MongoDB implemented via Mongoose.", table_td)],
        [Paragraph("<b>DFD</b>", table_td_code), Paragraph("Data Flow Diagram — Graphical model mapping inputs, business logic processes, data stores, and outputs.", table_td)]
    ]
    t_defs = Table(defs_data, colWidths=[100, 415])
    t_defs.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0f172a')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('BACKGROUND', (0,1), (-1,1), colors.HexColor('#f8fafc')),
        ('BACKGROUND', (0,3), (-1,3), colors.HexColor('#f8fafc')),
        ('BACKGROUND', (0,5), (-1,5), colors.HexColor('#f8fafc')),
        ('BACKGROUND', (0,7), (-1,7), colors.HexColor('#f8fafc')),
    ]))
    story.append(t_defs)
    story.append(Spacer(1, 6))

    story.append(Paragraph("1.4 References", h2_style))
    story.append(Paragraph("• IEEE Std 830-1998: IEEE Recommended Practice for Software Requirements Specifications.<br/>"
                           "• Next.js 14 Official Documentation & Edge Runtime Specification (Vercel Inc., 2024).<br/>"
                           "• RFC 7519: JSON Web Token (JWT) Standard (Internet Engineering Task Force).<br/>"
                           "• Archaeological Survey of India: Visitor Safety and Monument Carrying Capacity Guidelines (Ministry of Tourism, Govt of India).", bullet_style))

    story.append(Paragraph("1.5 Overview", h2_style))
    story.append(Paragraph(
        "The remainder of this SRS is structured into five subsequent chapters: Section 2 provides a comprehensive architectural perspective, "
        "user persona classifications, and general dependencies. Section 3 delineates external interface requirements, detailed functional "
        "use cases, and measurable non-functional attributes (Performance, Security, Reliability). Section 4 presents visual Level 0 and Level 1 "
        "Data Flow Diagrams (DFD). Sections 5 and 6 provide verified links to the GitHub source repository and live deployed cloud URL.",
        body_style
    ))

    # ==========================================
    # 2. GENERAL DESCRIPTION
    # ==========================================
    story.append(Paragraph("2. General Description", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#cbd5e1'), spaceAfter=8))

    story.append(Paragraph("2.1 Product Perspective", h2_style))
    story.append(Paragraph(
        "HeritageWatch AI is an independent, cloud-native web system that acts as the central software hub connecting: (1) public tourists via "
        "modern smartphones or desktop browsers, (2) edge optical turnstiles and camera telemetry feeds installed at monument gateways, and "
        "(3) ASI superintendent officers operating within an emergency command dispatch room. It operates atop Next.js 14 App Router, integrating "
        "Node.js serverless functions, Edge Middleware, and MongoDB Atlas.",
        body_style
    ))

    story.append(Paragraph("2.2 Product Functions", h2_style))
    story.append(Paragraph("• <b>Live Multi-Destination Monitoring:</b> Real-time telemetry across 7 heritage sites (Taj Mahal, Varanasi Ghats, Red Fort, Qutub Minar, Konark Sun Temple, Amber Fort, Hampi).<br/>"
                           "• <b>Automated Gate Balancing:</b> Identifies congested entry corridors and surfaces instantaneous queue wait-time advisories to redistribute visitor footfall.<br/>"
                           "• <b>Guaranteed Slot Reservation:</b> Decrements available slot capacity in real-time, preventing carrying-capacity overruns.<br/>"
                           "• <b>Cryptographic QR E-Pass Issuance:</b> Generates tamper-resistant digital entry passes complete with booking references, assigned gates, and printable layouts.<br/>"
                           "• <b>Officer Multi-Site Administration:</b> Restricted administrative portals for live gate toggles (Open, Restricted, Closed, Evacuation), gate QR scanners, and emergency PA/SMS alert dispatches.", bullet_style))

    story.append(Paragraph("2.3 User Characteristics", h2_style))
    story.append(Paragraph(
        "The system explicitly caters to two distinct user classes:<br/>"
        "<b>1. Public Tourists / Visitors:</b> General citizens and international visitors requiring intuitive, multilingual, and high-speed access to queue times, ticket tier rates (Indian Citizen, SAARC, Foreign National), and instant mobile pass booking without authentication barriers.<br/>"
        "<b>2. ASI Officers & Security Superintendents:</b> Authorized enforcement personnel trained in monument preservation and incident dispatch. Require secured access to live optical sensor telemetry, emergency gate control overrides, and QR check-in terminals.",
        body_style
    ))

    story.append(Paragraph("2.4 General Constraints", h2_style))
    story.append(Paragraph(
        "• <b>Client-Side Compatibility:</b> System must render seamlessly across standard modern web browsers (Chrome, Edge, Safari, Firefox) on both desktop and mobile viewports without requiring native app installation.<br/>"
        "• <b>Edge Runtime Limitations:</b> Middleware authentication must execute in Edge environments without relying on native C++ Node.js libraries, utilizing standard Web APIs (atob, Uint8Array).<br/>"
        "• <b>Zero-Crash Resiliency:</b> The application must feature an automated in-memory synchronized fallback cache, ensuring full booking and browsing operability even during intermittent database connectivity outages.",
        body_style
    ))

    story.append(Paragraph("2.5 Assumptions and Dependencies", h2_style))
    story.append(Paragraph(
        "• Assumes tourists possess standard web connectivity at the time of booking or save their issued digital pass offline.<br/>"
        "• Assumes local server or Vercel edge runtime environment supports Node.js 18+ and secure cookie headers.<br/>"
        "• Dependent on MongoDB 6.0+ for persistent operational data storage and Mongoose 8.0 for object-document mapping.",
        body_style
    ))

    story.append(PageBreak())

    # ==========================================
    # 3. SPECIFIC REQUIREMENTS
    # ==========================================
    story.append(Paragraph("3. Specific Requirements", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#cbd5e1'), spaceAfter=8))

    story.append(Paragraph("3.1 External Interface Requirements", h2_style))
    story.append(Paragraph("<b>3.1.1 User Interfaces:</b> Developed with React 18 (pure JSX) and Tailwind CSS. Employs an official government styling palette (Slate-900, Emerald-800, Amber-400), responsive grid destination cards, live queue countdown meters, and accessible ARIA modal dialogs.<br/>"
                           "<b>3.1.2 Hardware Interfaces:</b> Interfaces logically with simulated edge turnstiles (optical optical sensors transmitting pedestrian counts/minute) and mobile device cameras via standard browser video streams.<br/>"
                           "<b>3.1.3 Software Interfaces:</b> Node.js v20+ runtime, Next.js 14 App Router, MongoDB Atlas database through Mongoose ODM, and Vercel Edge Network.<br/>"
                           "<b>3.1.4 Communications Interfaces:</b> Enforces HTTPS over TLS 1.3, JSON-formatted RESTful HTTP methods (GET, POST, PATCH), secure SameSite=Lax HTTP-only cookies, and standard Edge security headers.", body_style))

    story.append(Paragraph("3.2 Functional Requirements", h2_style))

    # Feature 1
    story.append(Paragraph("3.2.1 Feature 1: Real-Time Crowd Telemetry & Multi-Gate Queue Monitoring", h3_style))
    story.append(Paragraph("• <b>Introduction:</b> Calculates live density percentages and gate-specific waiting times across all registered heritage sites.<br/>"
                           "• <b>Inputs:</b> Monument slug, simulated turnstile passage rates, optical sensor pedestrian density feeds.<br/>"
                           "• <b>Processing:</b> Evaluates current footfall against monument carrying capacity threshold. Flags status as LOW (<50%), MODERATE (50-75%), HIGH (75-90%), or SURGE (>90%). Compares queue wait times across all gates and flags the shortest corridor.<br/>"
                           "• <b>Outputs:</b> Dynamic crowd badge, gate cards with wait-time in minutes, fastest gate highlight, hourly projection chart.<br/>"
                           "• <b>Error Handling:</b> If database is unreachable, transparently falls back to synchronized default telemetry.", bullet_style))

    # Feature 2
    story.append(Paragraph("3.2.2 Feature 2: Guaranteed Time-Slot Reservation & Digital QR E-Pass Issuance", h3_style))
    story.append(Paragraph("• <b>Introduction:</b> Allows tourists to reserve morning, sunrise, midday, or sunset slots with automated quota protection.<br/>"
                           "• <b>Inputs:</b> Visitor name, email, phone number, ticket tier (Indian, SAARC, Foreigner), monument slug, chosen time slot.<br/>"
                           "• <b>Processing:</b> Decrements available quota for selected slot in MongoDB, generates unique booking reference (e.g., <code>EP-1795-XYZ</code>), and constructs cryptographic verification QR code payload.<br/>"
                           "• <b>Outputs:</b> Interactive modal confirmation and permanent entry pass stored in browser and viewable at <code>/passes</code>.<br/>"
                           "• <b>Error Handling:</b> Prevents overbooking if slot capacity is zero with HTTP 400 'Slot Exhausted' notification.", bullet_style))

    # Feature 3
    story.append(Paragraph("3.2.3 Feature 3: Role-Based Access Control (RBAC) & Node.js JWT Authentication", h3_style))
    story.append(Paragraph("• <b>Introduction:</b> Restricts sensitive administrative control rooms exclusively to verified ASI personnel.<br/>"
                           "• <b>Inputs:</b> User credentials (email and password) via <code>POST /api/auth/login</code>.<br/>"
                           "• <b>Processing:</b> Hashes and compares password using <code>bcryptjs</code> (10 salt rounds). Signs a tamper-proof 7-day JWT containing user ID, role, and email. Next.js Edge Middleware intercepts all <code>/admin/*</code> routes and decodes token.<br/>"
                           "• <b>Outputs:</b> <code>heritage_auth_token</code> secure cookie, HTTP 200 for officers, HTTP 307 redirect to <code>/login?unauthorized=true</code> for tourists.<br/>"
                           "• <b>Error Handling:</b> Rejects expired or malformed tokens; locks officer routes.", bullet_style))

    # Feature 4
    story.append(Paragraph("3.2.4 Feature 4: ASI Command Center & Emergency Gate Controller", h3_style))
    story.append(Paragraph("• <b>Introduction:</b> Provides dedicated officer control rooms across 5 sub-routes (<code>/admin</code>, <code>/admin/monuments</code>, <code>/admin/bookings</code>, <code>/admin/alerts</code>, <code>/admin/sensors</code>).<br/>"
                           "• <b>Inputs:</b> Officer gate status toggle (Open/Restricted/Evacuation), broadcast alert text, QR check-in scan.<br/>"
                           "• <b>Processing:</b> Instantly updates monument gate accessibility in database, marks booking records as 'CHECKED_IN', and dispatches urgent notices to public ticker.<br/>"
                           "• <b>Outputs:</b> Live site status banner change, verified check-in counters, and emergency loudspeaker/SMS dispatch logs.<br/>"
                           "• <b>Error Handling:</b> Rejects non-officer mutations with HTTP 403 Forbidden.", bullet_style))

    story.append(Paragraph("3.5 Non-Functional Requirements", h2_style))
    nfr_data = [
        [Paragraph("Category", table_th), Paragraph("Measurable Engineering Target & Implementation Verification", table_th)],
        [Paragraph("<b>3.5.1 Performance</b>", table_td), Paragraph("API response times shall remain < 200ms under 500 concurrent requests. Client First Contentful Paint (FCP) < 1.2s via SSG static pre-rendering and dynamic code splitting.", table_td)],
        [Paragraph("<b>3.5.2 Reliability</b>", table_td), Paragraph("Guaranteed > 99.5% uptime. Implements a synchronized in-memory cache fallback ensuring 100% reservation continuity even during local/remote database disconnections.", table_td)],
        [Paragraph("<b>3.5.3 Availability</b>", table_td), Paragraph("24x7 global accessibility backed by Vercel's global Anycast edge network with zero scheduled downtime during peak tourist holiday hours.", table_td)],
        [Paragraph("<b>3.5.4 Security</b>", table_td), Paragraph("Passwords hashed with irreversible bcrypt (salt rounds = 10). Cryptographic JWT tokens signed with HMAC-SHA256. Edge Middleware enforces strict security headers: X-Frame-Options: DENY, X-Content-Type-Options: nosniff.", table_td)],
        [Paragraph("<b>3.5.5 Maintainability</b>", table_td), Paragraph("Modular Next.js 14 App Router codebase written in pure, clean JavaScript (JSX) without legacy bindings. Adheres to separation of concerns (Components, Models, Lib, Actions).", table_td)],
        [Paragraph("<b>3.5.6 Portability</b>", table_td), Paragraph("100% device and OS agnostic. Operates smoothly on iOS Safari, Android Chrome, Windows, and macOS without platform-specific dependencies.", table_td)]
    ]
    t_nfr = Table(nfr_data, colWidths=[110, 405])
    t_nfr.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0f172a')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('BACKGROUND', (0,1), (-1,1), colors.HexColor('#f8fafc')),
        ('BACKGROUND', (0,3), (-1,3), colors.HexColor('#f8fafc')),
        ('BACKGROUND', (0,5), (-1,5), colors.HexColor('#f8fafc')),
    ]))
    story.append(t_nfr)
    story.append(Spacer(1, 6))

    story.append(Paragraph("3.7 Design Constraints & 3.9 Other Requirements", h2_style))
    story.append(Paragraph(
        "• <b>Design Constraints:</b> Architectural compliance with Next.js App Router paradigm; strict adherence to Indian Government National Informatics Centre (NIC) accessibility color-contrast guidelines.<br/>"
        "• <b>Statutory & Legal Requirements:</b> Adheres to Archaeological Survey of India (ASI) Antiquities and Art Treasures Act norms and Digital Personal Data Protection (DPDP) Act by anonymizing optical computer-vision facial data.",
        body_style
    ))

    story.append(PageBreak())

    # ==========================================
    # 4. ANALYSIS MODELS (DFD LEVEL 0 & LEVEL 1)
    # ==========================================
    story.append(Paragraph("4. Analysis Models", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#cbd5e1'), spaceAfter=8))

    story.append(Paragraph("4.1 Data Flow Diagrams (DFD)", h2_style))
    story.append(Paragraph(
        "Data Flow Diagrams visually represent how operational data traverses the HeritageWatch AI ecosystem — transforming raw visitor inputs "
        "and optical sensor signals into validated crowd safety decisions, tickets, and command interventions.",
        body_style
    ))

    story.append(Paragraph("4.1.1 DFD Level 0 (Context-Level Diagram)", h3_style))
    dfd0_data = [
        [Paragraph("External Entity", table_th), Paragraph("Input Data Flow to System", table_th), Paragraph("System Transformation Process", table_th), Paragraph("Output Data Flow to Entity", table_th)],
        [
            Paragraph("<b>Public Tourist</b>", table_td),
            Paragraph("Slot Selection, Visitor Info, Ticket Tier", table_td),
            Paragraph("<b>0.0<br/>HeritageWatch AI System</b><br/>(Core Platform)", table_td),
            Paragraph("Queue Wait Times, Shortest Gate Badge, Digital QR E-Pass (/passes)", table_td)
        ],
        [
            Paragraph("<b>Optical Sensors & Turnstiles</b>", table_td),
            Paragraph("Pedestrian Counts, Flow Rate per Min", table_td),
            Paragraph("Telemetry Aggregation & Density Calculation", table_td),
            Paragraph("Crowd Surge Alerts, Bottleneck Flags", table_td)
        ],
        [
            Paragraph("<b>ASI Officer / Admin</b>", table_td),
            Paragraph("Officer Credentials, Gate Override, Emergency Alerts", table_td),
            Paragraph("RBAC Verification, Command Dispatch & Audit Log", table_td),
            Paragraph("Live Command Center Dashboard, Turnstile Scan Feedback", table_td)
        ]
    ]
    t_dfd0 = Table(dfd0_data, colWidths=[105, 130, 130, 150])
    t_dfd0.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0f172a')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BACKGROUND', (0,1), (-1,1), colors.HexColor('#f8fafc')),
        ('BACKGROUND', (0,3), (-1,3), colors.HexColor('#f8fafc')),
    ]))
    story.append(t_dfd0)
    story.append(Spacer(1, 10))

    story.append(Paragraph("4.1.2 DFD Level 1 (Decomposed Functional Processes)", h3_style))
    dfd1_data = [
        [Paragraph("Process ID", table_th), Paragraph("Process Name", table_th), Paragraph("Involved Data Store", table_th), Paragraph("Data Flow Narrative", table_th)],
        [Paragraph("<b>P1.0</b>", table_td_code), Paragraph("Crowd Telemetry Processing", table_td), Paragraph("<code>D1: Monuments Store</code><br/><code>D2: Sensors Store</code>", table_td_code), Paragraph("Turnstile counts are aggregated every minute; calculates percentage capacity and updates live gate queue wait-times.", table_td)],
        [Paragraph("<b>P2.0</b>", table_td_code), Paragraph("Pass Reservation & Quota Mgmt", table_td), Paragraph("<code>D3: Bookings Store</code><br/><code>D1: Monuments Store</code>", table_td_code), Paragraph("Verifies slot availability; decrements carrying capacity quota; writes booking record; outputs signed QR code pass.", table_td)],
        [Paragraph("<b>P3.0</b>", table_td_code), Paragraph("Authentication & RBAC Guard", table_td), Paragraph("<code>D4: Users Store</code>", table_td_code), Paragraph("Bcrypt compares password hash; signs JWT token; Edge Middleware intercepts /admin and enforces officer role privileges.", table_td)],
        [Paragraph("<b>P4.0</b>", table_td_code), Paragraph("Emergency Command & Gate Control", table_td), Paragraph("<code>D1: Monuments Store</code><br/><code>D5: Alerts Store</code>", table_td_code), Paragraph("Officer executes gate status changes or emergency broadcasts; logs incident alert and pushes banner to tourist notice ticker.", table_td)]
    ]
    t_dfd1 = Table(dfd1_data, colWidths=[65, 130, 115, 205])
    t_dfd1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0f172a')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,1), (-1,1), colors.HexColor('#f8fafc')),
        ('BACKGROUND', (0,3), (-1,3), colors.HexColor('#f8fafc')),
    ]))
    story.append(t_dfd1)
    story.append(Spacer(1, 14))

    # ==========================================
    # 5. GITHUB LINK & 6. DEPLOYED LINK
    # ==========================================
    story.append(Paragraph("5. GitHub Repository Link", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#cbd5e1'), spaceAfter=8))
    
    git_box = [
        [
            Paragraph("<b>Official GitHub Source Code Repository:</b><br/>"
                      "<font size='9' color='#2563eb'><b>https://github.com/Ankitkr1305/Heritage-Site-Portal.git</b></font><br/>"
                      "<font size='8' color='#475569'>Branch: <code>main</code> • Pure JavaScript (React JSX) • Node.js JWT Auth • Mongoose Models</font>", table_td)
        ]
    ]
    t_git = Table(git_box, colWidths=[515])
    t_git.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0f9ff')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#0284c7')),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_git)
    story.append(Spacer(1, 10))

    story.append(Paragraph("6. Deployed Production Link", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#cbd5e1'), spaceAfter=8))
    
    dep_box = [
        [
            Paragraph("<b>Live Cloud Production Deployment URL:</b><br/>"
                      "<font size='9' color='#059669'><b>https://heritage-site-portal.vercel.app</b></font><br/>"
                      "<font size='8' color='#475569'>Hosted on Vercel Global Edge Network • CI/CD Auto-deploy • SSL TLS 1.3 Secured</font>", table_td)
        ]
    ]
    t_dep = Table(dep_box, colWidths=[515])
    t_dep.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#ecfdf5')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#10b981')),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_dep)

    # Build the PDF using NumberedCanvas
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"SRS Document successfully built at: {output_path}")

if __name__ == '__main__':
    project_srs = r"c:\Users\ANKIT VERMA\OneDrive\Desktop\nextPro\Heritage_Site_Crowd_Management_SRS.pdf"
    build_srs_pdf(project_srs)
