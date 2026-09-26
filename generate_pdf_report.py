import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#726D82"))
        
        # Header (Pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 755, "BROADNET INTERNET SERVICES — Pre-Deployment Information & Checklist")
            self.drawRightString(558, 755, "Confidential Client Document")
            self.setStrokeColor(colors.HexColor("#E2DFEB"))
            self.setLineWidth(0.5)
            self.line(54, 747, 558, 747)

        # Footer (All pages)
        self.setStrokeColor(colors.HexColor("#E2DFEB"))
        self.setLineWidth(0.5)
        self.line(54, 45, 558, 45)
        
        self.drawString(54, 32, "Broadnet Internet Services • # 1093, Fire Station Road, Avadi, Chennai - 600054 • Contact: +91 9884344075")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 32, page_str)
        self.restoreState()

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom palette
    c_primary = colors.HexColor("#500EBA")
    c_dark = colors.HexColor("#1C093D")
    c_red = colors.HexColor("#EF1313")
    c_body = colors.HexColor("#2D2B38")
    c_muted = colors.HexColor("#6A6578")
    c_bg_light = colors.HexColor("#F8F6FC")
    c_border = colors.HexColor("#DDD8E8")
    c_green = colors.HexColor("#0D8A4E")

    # Typography styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=c_dark,
        spaceAfter=4
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10.5,
        leading=14,
        textColor=c_primary,
        spaceAfter=12
    )

    meta_style = ParagraphStyle(
        'DocMeta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=c_muted
    )

    h1_style = ParagraphStyle(
        'Heading1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=c_primary,
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=13,
        textColor=c_body,
        spaceAfter=5
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=12,
        textColor=c_body
    )

    tbl_hdr = ParagraphStyle(
        'TblHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.white
    )

    tbl_cell = ParagraphStyle(
        'TblCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=10.5,
        textColor=c_body
    )

    tbl_cell_bold = ParagraphStyle(
        'TblCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.8,
        leading=10.5,
        textColor=c_dark
    )

    badge_required = ParagraphStyle(
        'BadgeRequired',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.2,
        leading=9,
        textColor=c_red
    )

    badge_optional = ParagraphStyle(
        'BadgeOptional',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.2,
        leading=9,
        textColor=c_primary
    )

    badge_confirmed = ParagraphStyle(
        'BadgeConfirmed',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.2,
        leading=9,
        textColor=c_green
    )

    story = []

    # Title block
    story.append(Paragraph("BROADNET INTERNET SERVICES", title_style))
    story.append(Paragraph("Website Pre-Deployment Checklist &amp; Required Information Report", subtitle_style))
    
    meta_text = (
        "<b>Target Business:</b> Broadnet Internet Services &bull; "
        "<b>Location:</b> Avadi, Chennai - 600054<br/>"
        "<b>Leadership:</b> Janardhanam. L (Director - Operations) &bull; "
        "<b>Prepared By:</b> Antigravity Engineering &bull; "
        "<b>Date:</b> September 2026"
    )
    story.append(Paragraph(meta_text, meta_style))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=1.5, color=c_primary, spaceBefore=4, spaceAfter=10))

    # Executive Summary Box
    summary_html = (
        "<b>Executive Summary:</b><br/>"
        "The Broadnet website is fully built, mobile-optimized, and styled using Broadnet's solid brand palette "
        "(#500EBA Royal Purple and #EF1313 Red) with all gradients removed. "
        "To make the website 100% complete and ready for public launch, this document provides an itemized "
        "list of business credentials, regulatory details, plan terms, and media assets required from Broadnet. "
        "High-definition relevant images have been generated and deployed across all pages as realistic placeholders, "
        "allowing a direct one-click swap when actual photography is provided."
    )
    summary_table = Table(
        [[Paragraph(summary_html, body_style)]],
        colWidths=[504]
    )
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_bg_light),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(summary_table)
    story.append(Spacer(1, 10))

    # SECTION 1: Current Status & Integrated Data
    story.append(Paragraph("1. Current Integrated Business Data (Confirmed)", h1_style))
    story.append(Paragraph(
        "The following information has been extracted and integrated across all pages:", body_style
    ))

    confirmed_data = [
        [Paragraph("Item / Parameter", tbl_hdr), Paragraph("Current Value on Website", tbl_hdr), Paragraph("Status", tbl_hdr)],
        [Paragraph("Company Name", tbl_cell_bold), Paragraph("BROADNET INTERNET SERVICES", tbl_cell), Paragraph("CONFIRMED", badge_confirmed)],
        [Paragraph("Director - Operations", tbl_cell_bold), Paragraph("Janardhanam. L", tbl_cell), Paragraph("CONFIRMED", badge_confirmed)],
        [Paragraph("Primary Phone &amp; WhatsApp", tbl_cell_bold), Paragraph("+91 9884344075", tbl_cell), Paragraph("CONFIRMED", badge_confirmed)],
        [Paragraph("Main Operating Office", tbl_cell_bold), Paragraph("# 1093, Fire Station Road, Avadi, Chennai - 600054", tbl_cell), Paragraph("CONFIRMED", badge_confirmed)],
        [Paragraph("Operating Hours", tbl_cell_bold), Paragraph("Monday to Saturday, open until 6:00 PM (Field dispatch active)", tbl_cell), Paragraph("CONFIRMED", badge_confirmed)],
        [Paragraph("Service Categories", tbl_cell_bold), Paragraph("FTTH Fiber Broadband, Wi-Fi Solutions, CCTV Surveillance Cameras", tbl_cell), Paragraph("CONFIRMED", badge_confirmed)],
        [Paragraph("ISP PIN Check Mode", tbl_cell_bold), Paragraph("Instant lookup (Zero contact info required from visitor)", tbl_cell), Paragraph("CONFIRMED", badge_confirmed)],
        [Paragraph("Security Camera Mode", tbl_cell_bold), Paragraph("Dedicated Callback &amp; Site Survey Inquiry Form (with Phone)", tbl_cell), Paragraph("CONFIRMED", badge_confirmed)],
    ]
    t1 = Table(confirmed_data, colWidths=[130, 290, 84])
    t1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_dark),
        ('BOX', (0,0), (-1,-1), 0.5, c_border),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
        ('PADDING', (0,0), (-1,-1), 4.5),
    ]))
    story.append(t1)
    story.append(Spacer(1, 10))

    # SECTION 2: Required Business & Legal Information
    story.append(Paragraph("2. Required Business &amp; Regulatory Information", h1_style))
    story.append(Paragraph(
        "To ensure statutory compliance, build visitor trust, and support commercial billing, please provide:", body_style
    ))

    req_biz_data = [
        [Paragraph("Required Information", tbl_hdr), Paragraph("Why It Is Needed", tbl_hdr), Paragraph("Priority", tbl_hdr)],
        [
            Paragraph("Official Support / Sales Email", tbl_cell_bold),
            Paragraph("e.g., support@broadnet.in or broadnetavadi@gmail.com for contact page and automated inquiry dispatch.", tbl_cell),
            Paragraph("HIGH", badge_required)
        ],
        [
            Paragraph("GSTIN (Tax Registration Number)", tbl_cell_bold),
            Paragraph("Required for B2B commercial internet invoices and footer tax transparency.", tbl_cell),
            Paragraph("HIGH", badge_required)
        ],
        [
            Paragraph("ISP License / Franchise Partner Name", tbl_cell_bold),
            Paragraph("e.g., Class B/C ISP license or franchise tie-up (BSNL / RailTel / Tata Tele / Direct Class-B).", tbl_cell),
            Paragraph("RECOMMENDED", badge_optional)
        ],
        [
            Paragraph("Customer Self-Care / Quick Pay URL", tbl_cell_bold),
            Paragraph("Direct portal link or UPI payment QR code for monthly plan renewals and billing self-service.", tbl_cell),
            Paragraph("HIGH", badge_required)
        ],
        [
            Paragraph("Official Tagline / Slogan", tbl_cell_bold),
            Paragraph("Currently using 'FTTH | Wi-Fi | Network Solutions'. Confirm if any alternate marketing tagline exists.", tbl_cell),
            Paragraph("MEDIUM", badge_optional)
        ],
        [
            Paragraph("Emergency Escalation Number", tbl_cell_bold),
            Paragraph("Dedicated fiber cut / overnight emergency support contact if different from +91 9884344075.", tbl_cell),
            Paragraph("OPTIONAL", badge_optional)
        ]
    ]
    t2 = Table(req_biz_data, colWidths=[140, 280, 84])
    t2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_dark),
        ('BOX', (0,0), (-1,-1), 0.5, c_border),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
        ('PADDING', (0,0), (-1,-1), 4.5),
    ]))
    story.append(t2)
    story.append(Spacer(1, 10))

    # SECTION 3: Broadband Plans & Commercial Policy Confirmation
    story.append(Paragraph("3. Broadband Plans &amp; Pricing Confirmation", h1_style))
    story.append(Paragraph(
        "Current residential plans deployed on the website. Please confirm or amend the rates and commercial terms:", body_style
    ))

    plans_data = [
        [Paragraph("Plan Name", tbl_hdr), Paragraph("Speed", tbl_hdr), Paragraph("Monthly Price", tbl_hdr), Paragraph("Included Hardware &amp; Terms", tbl_hdr), Paragraph("Verification", tbl_hdr)],
        [
            Paragraph("Fiber Starter", tbl_cell_bold),
            Paragraph("40 Mbps", tbl_cell),
            Paragraph("Rs. 499 / mo", tbl_cell_bold),
            Paragraph("Truly Unlimited, Dual-Band Router, Standard Installation", tbl_cell),
            Paragraph("CONFIRM RATE", badge_required)
        ],
        [
            Paragraph("Fiber Turbo (Featured)", tbl_cell_bold),
            Paragraph("100 Mbps", tbl_cell),
            Paragraph("Rs. 699 / mo", tbl_cell_bold),
            Paragraph("Truly Unlimited, Gigabit Dual-Band Wi-Fi, Free Setup", tbl_cell),
            Paragraph("CONFIRM RATE", badge_required)
        ],
        [
            Paragraph("Fiber Ultra Pro", tbl_cell_bold),
            Paragraph("200 Mbps", tbl_cell),
            Paragraph("Rs. 999 / mo", tbl_cell_bold),
            Paragraph("Truly Unlimited, Gigabit ONT Router, Priority On-Site Setup", tbl_cell),
            Paragraph("CONFIRM RATE", badge_required)
        ],
    ]
    t3 = Table(plans_data, colWidths=[95, 55, 75, 195, 84])
    t3.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_dark),
        ('BOX', (0,0), (-1,-1), 0.5, c_border),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
        ('PADDING', (0,0), (-1,-1), 4.5),
    ]))
    story.append(t3)
    
    story.append(Spacer(1, 6))
    plan_bullets = [
        "<b>Taxes:</b> Confirm whether prices are inclusive of 18% GST or if GST is billed additionally.",
        "<b>Installation Fee Policy:</b> Specify installation charge for monthly subscribers vs. free installation on 6 or 12-month advance recharges.",
        "<b>Router Deposit:</b> Confirm whether ONT / Wi-Fi router requires a refundable security deposit or is provided gratis under service agreement.",
        "<b>B2B Enterprise Leased Lines:</b> Provide commercial pricing for 300 Mbps, 500 Mbps, or dedicated bandwidth if applicable."
    ]
    for b in plan_bullets:
        story.append(Paragraph(f"&bull; {b}", bullet_style))
    story.append(Spacer(1, 10))

    # Page Break for clean reading
    story.append(PageBreak())

    # SECTION 4: Serviceable PIN Codes & Network Coverage Data
    story.append(Paragraph("4. Serviceable PIN Codes &amp; Locality Database", h1_style))
    story.append(Paragraph(
        "Broadnet's instant availability checker matches visitor input against local areas without requiring phone numbers. "
        "The current verified list is shown below. Please review and provide any additional PIN codes or neighborhoods:", body_style
    ))

    pincode_data = [
        [Paragraph("PIN Code", tbl_hdr), Paragraph("Primary Localities &amp; Landmarks Covered", tbl_hdr), Paragraph("Network Status", tbl_hdr)],
        [Paragraph("600054", tbl_cell_bold), Paragraph("Avadi Main Town, Fire Station Road, Nehru Nagar, Gandhi Nagar, Avadi Bus Stand", tbl_cell), Paragraph("ACTIVE / CENTRAL HUB", badge_confirmed)],
        [Paragraph("600071", tbl_cell_bold), Paragraph("Kamaraj Nagar, IAF Avadi, Mittanamalli, Muthapudupet", tbl_cell), Paragraph("ACTIVE", badge_confirmed)],
        [Paragraph("600053", tbl_cell_bold), Paragraph("Ambattur OT, Menambedu, Ambattur Industrial Estate", tbl_cell), Paragraph("ACTIVE", badge_confirmed)],
        [Paragraph("600062", tbl_cell_bold), Paragraph("Pattabiram, Hindu College, Nemilichery, Sekkadu", tbl_cell), Paragraph("ACTIVE", badge_confirmed)],
        [Paragraph("600077", tbl_cell_bold), Paragraph("Thiruverkadu, Koladi, Velappanchavadi, Sundarasozhapuram", tbl_cell), Paragraph("ACTIVE", badge_confirmed)],
        [Paragraph("600055", tbl_cell_bold), Paragraph("CRPF Camp Avadi, HVF Estate, Giri Nagar", tbl_cell), Paragraph("ACTIVE", badge_confirmed)],
    ]
    t4 = Table(pincode_data, colWidths=[70, 350, 84])
    t4.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_dark),
        ('BOX', (0,0), (-1,-1), 0.5, c_border),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
        ('PADDING', (0,0), (-1,-1), 4.5),
    ]))
    story.append(t4)
    story.append(Spacer(1, 10))

    # SECTION 5: Security Camera & Surveillance Equipment Specification
    story.append(Paragraph("5. Surveillance Camera Catalogue &amp; Package Specifications", h1_style))
    story.append(Paragraph(
        "The camera catalogue currently includes 8 core product models with filter tabs (Indoor, Outdoor, IP, Dome, Bullet, PTZ, Wi-Fi, NVR). "
        "To finalize this section:", body_style
    ))

    camera_bullets = [
        "<b>Brand Authorization:</b> Specify authorized partner brands distributed (e.g., Hikvision, CP Plus, Dahua, TP-Link Tapo, Ezviz).",
        "<b>Turnkey Security Bundles:</b> Provide pricing for standard pre-configured kits if desired:",
        "&nbsp;&nbsp;&bull; <i>Home Starter Kit:</i> 2 Full HD Cameras + 4-Ch NVR + 1TB Hard Disk + Wiring &amp; Setup.",
        "&nbsp;&nbsp;&bull; <i>Commercial Security Kit:</i> 4 to 8 4MP IP Cameras + 8-Ch NVR + 2TB Hard Disk + Mobile Live Monitoring.",
        "<b>Warranty Terms:</b> Confirm manufacturer warranty period (typically 1 or 2 years) and local on-site service commitment.",
        "<b>AMC (Annual Maintenance Contract):</b> Confirm if Broadnet provides periodic CCTV cleaning and maintenance packages."
    ]
    for cb in camera_bullets:
        story.append(Paragraph(f"&bull; {cb}", bullet_style))
    story.append(Spacer(1, 10))

    # SECTION 6: Image Assets Specification & Swap Matrix
    story.append(Paragraph("6. Image Assets &amp; Photography Swap Guide", h1_style))
    story.append(Paragraph(
        "High-definition relevant placeholder images have been generated and integrated. "
        "Before live deployment, Broadnet can swap them with actual company photography:", body_style
    ))

    images_data = [
        [Paragraph("Target File &amp; Page Location", tbl_hdr), Paragraph("Current Placeholder Image", tbl_hdr), Paragraph("Recommended Real Image", tbl_hdr), Paragraph("Dimensions", tbl_hdr)],
        [
            Paragraph("assets/hero-router.jpg<br/>(index.html Hero Card)", tbl_cell_bold),
            Paragraph("Sleek Wi-Fi 6 router on modern desk with glowing fiber optic cable.", tbl_cell),
            Paragraph("Actual optical fiber ONT/router brand provided to Broadnet subscribers.", tbl_cell),
            Paragraph("1920 &times; 1080 (16:9)", tbl_cell)
        ],
        [
            Paragraph("assets/camera-hero.jpg<br/>(index.html &amp; cameras.html)", tbl_cell_bold),
            Paragraph("Modern outdoor high-definition bullet camera on clean building wall.", tbl_cell),
            Paragraph("Actual installed CCTV camera from a customer home/store installation.", tbl_cell),
            Paragraph("1600 &times; 1200 (4:3)", tbl_cell)
        ],
        [
            Paragraph("assets/infrastructure.jpg<br/>(about.html)", tbl_cell_bold),
            Paragraph("Telecommunications fiber optic distribution rack with tidy patching.", tbl_cell),
            Paragraph("Broadnet Avadi server rack, OLT equipment, or technician on site.", tbl_cell),
            Paragraph("1920 &times; 1080 (16:9)", tbl_cell)
        ],
        [
            Paragraph("assets/coverage-map.jpg<br/>(index.html Coverage Grid)", tbl_cell_bold),
            Paragraph("Modern stylized vector roadmap showing fiber network coverage grid.", tbl_cell),
            Paragraph("Google Maps satellite/road route screenshot of Avadi fiber lines.", tbl_cell),
            Paragraph("1600 &times; 1200 (4:3)", tbl_cell)
        ],
        [
            Paragraph("Director / Team Photo<br/>(Optional on about.html)", tbl_cell_bold),
            Paragraph("Executive avatar badge.", tbl_cell),
            Paragraph("Professional high-resolution photo of Director Janardhanam. L and technician team.", tbl_cell),
            Paragraph("800 &times; 800 (1:1)", tbl_cell)
        ],
    ]
    t5 = Table(images_data, colWidths=[120, 134, 160, 90])
    t5.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_dark),
        ('BOX', (0,0), (-1,-1), 0.5, c_border),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
        ('PADDING', (0,0), (-1,-1), 4.5),
    ]))
    story.append(t5)
    story.append(Spacer(1, 10))

    # SECTION 7: Domain, Hosting & Deployment Checklist
    story.append(Paragraph("7. Technical Hosting &amp; Production Deployment Checklist", h1_style))
    
    checklist_data = [
        [Paragraph("Checklist Item", tbl_hdr), Paragraph("Technical Requirement", tbl_hdr), Paragraph("Status", tbl_hdr)],
        [
            Paragraph("Domain Name Registration", tbl_cell_bold),
            Paragraph("Select &amp; register domain (e.g. broadnet.in, broadnetisp.com, or broadnetchennai.in).", tbl_cell),
            Paragraph("ACTION REQUIRED", badge_required)
        ],
        [
            Paragraph("SSL / HTTPS Security", tbl_cell_bold),
            Paragraph("Automated TLS/SSL encryption certificate for trusted security badge in web browsers.", tbl_cell),
            Paragraph("READY (VIA HOSTING)", badge_confirmed)
        ],
        [
            Paragraph("Mobile Optimization &amp; Responsiveness", tbl_cell_bold),
            Paragraph("Verified across iPhone (Safari), Android (Chrome), tablets, and desktop resolutions.", tbl_cell),
            Paragraph("COMPLETED &amp; TESTED", badge_confirmed)
        ],
        [
            Paragraph("Lead Notification Route", tbl_cell_bold),
            Paragraph("Camera callback inquiries automatically routed via WhatsApp (+91 9884344075) &amp; form dispatch.", tbl_cell),
            Paragraph("ACTIVE VIA WHATSAPP API", badge_confirmed)
        ],
        [
            Paragraph("Google Business Profile Sync", tbl_cell_bold),
            Paragraph("Provide Google Maps Place ID to display live verified 5-star customer reviews.", tbl_cell),
            Paragraph("PENDING PLACE ID", badge_optional)
        ],
    ]
    t6 = Table(checklist_data, colWidths=[140, 260, 104])
    t6.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_dark),
        ('BOX', (0,0), (-1,-1), 0.5, c_border),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
        ('PADDING', (0,0), (-1,-1), 4.5),
    ]))
    story.append(t6)
    story.append(Spacer(1, 12))

    # Closing signoff block
    signoff_html = (
        "<b>Next Steps for Deployment:</b><br/>"
        "1. Review the required items above and provide details via WhatsApp or email.<br/>"
        "2. If actual site / hardware photographs are available, share them for immediate replacement.<br/>"
        "3. Once finalized, the website is 100% production-ready for public domain deployment."
    )
    signoff_table = Table([[Paragraph(signoff_html, body_style)]], colWidths=[504])
    signoff_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_bg_light),
        ('BOX', (0,0), (-1,-1), 1, c_primary),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(signoff_table)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated PDF report at: {filename}")

if __name__ == "__main__":
    assets_dir = r"d:\Work\Brands\BroadNet\website\assets"
    os.makedirs(assets_dir, exist_ok=True)
    pdf_path = os.path.join(assets_dir, "Broadnet_Website_Information_Requirement_Report.pdf")
    build_pdf(pdf_path)
