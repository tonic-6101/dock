# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

"""
Create 100 example contacts for the Dock People Hub.

Usage (inside container):
    bench execute dock.demo.create_demo_people.create_demo_people --site dock.localhost
    bench execute dock.demo.create_demo_people.delete_demo_people --site dock.localhost
"""

import frappe

# 100 diverse, realistic people across various companies and roles
PEOPLE = [
    # --- Tech companies ---
    {"full_name": "Lena Kowalski", "email": "lena.kowalski@meridian.io", "phone": "+49 30 1234 5001", "company": "Meridian Systems", "designation": "CTO", "shared": 1},
    {"full_name": "Marcus Chen", "email": "marcus.chen@meridian.io", "phone": "+49 30 1234 5002", "company": "Meridian Systems", "designation": "Backend Engineer", "shared": 1},
    {"full_name": "Aisha Patel", "email": "aisha.patel@meridian.io", "phone": "+49 30 1234 5003", "company": "Meridian Systems", "designation": "Product Manager", "shared": 1},
    {"full_name": "Tom Eriksson", "email": "tom.eriksson@meridian.io", "phone": "+46 8 555 0101", "company": "Meridian Systems", "designation": "DevOps Lead", "shared": 0},
    {"full_name": "Yuki Tanaka", "email": "yuki.tanaka@meridian.io", "phone": "+81 3 6789 0001", "company": "Meridian Systems", "designation": "UX Designer", "shared": 1},

    {"full_name": "Sofia Reyes", "email": "sofia.reyes@novacraft.dev", "phone": "+34 91 234 5601", "company": "NovaCraft", "designation": "Frontend Engineer", "shared": 1},
    {"full_name": "Daniel Okafor", "email": "daniel.okafor@novacraft.dev", "phone": "+234 1 234 5001", "company": "NovaCraft", "designation": "CEO", "shared": 1},
    {"full_name": "Emma Lindqvist", "email": "emma.lindqvist@novacraft.dev", "phone": "+46 8 555 0201", "company": "NovaCraft", "designation": "QA Engineer", "shared": 0},
    {"full_name": "Raj Mehta", "email": "raj.mehta@novacraft.dev", "phone": "+91 22 3456 7001", "company": "NovaCraft", "designation": "Full Stack Developer", "shared": 1},
    {"full_name": "Clara Hoffmann", "email": "clara.hoffmann@novacraft.dev", "phone": "+49 89 1234 5001", "company": "NovaCraft", "designation": "Data Scientist", "shared": 1},

    {"full_name": "James Mwangi", "email": "james.mwangi@cloudpeak.co", "phone": "+254 20 345 6001", "company": "CloudPeak Solutions", "designation": "Solutions Architect", "shared": 1},
    {"full_name": "Nina Petrova", "email": "nina.petrova@cloudpeak.co", "phone": "+7 495 123 4501", "company": "CloudPeak Solutions", "designation": "Security Engineer", "shared": 0},
    {"full_name": "Lucas Ferreira", "email": "lucas.ferreira@cloudpeak.co", "phone": "+55 11 3456 7001", "company": "CloudPeak Solutions", "designation": "Infrastructure Lead", "shared": 1},
    {"full_name": "Hannah Kim", "email": "hannah.kim@cloudpeak.co", "phone": "+82 2 1234 5001", "company": "CloudPeak Solutions", "designation": "Project Manager", "shared": 1},
    {"full_name": "Omar Hassan", "email": "omar.hassan@cloudpeak.co", "phone": "+20 2 3456 7001", "company": "CloudPeak Solutions", "designation": "Support Engineer", "shared": 1},

    # --- Design & Creative ---
    {"full_name": "Isabelle Moreau", "email": "isabelle@atelier-moreau.fr", "phone": "+33 1 4567 8901", "company": "Atelier Moreau", "designation": "Creative Director", "shared": 1},
    {"full_name": "Kai Nakamura", "email": "kai@studiozenith.jp", "phone": "+81 3 6789 0101", "company": "Studio Zenith", "designation": "Art Director", "shared": 1},
    {"full_name": "Marta Kowalczyk", "email": "marta@pixelhaus.de", "phone": "+49 40 1234 5001", "company": "PixelHaus", "designation": "UI Designer", "shared": 1},
    {"full_name": "Andre Williams", "email": "andre@brandforge.com", "phone": "+1 212 555 0101", "company": "BrandForge", "designation": "Brand Strategist", "shared": 0},
    {"full_name": "Zara Ali", "email": "zara@lumenstudio.co.uk", "phone": "+44 20 7890 1001", "company": "Lumen Studio", "designation": "Motion Designer", "shared": 1},

    # --- Consulting & Professional Services ---
    {"full_name": "Henrik Johansson", "email": "henrik.j@nordicadvisors.se", "phone": "+46 8 555 0301", "company": "Nordic Advisors", "designation": "Managing Partner", "shared": 1},
    {"full_name": "Priya Sharma", "email": "priya.sharma@insightpartners.in", "phone": "+91 11 2345 6001", "company": "Insight Partners", "designation": "Strategy Consultant", "shared": 1},
    {"full_name": "Michael Torres", "email": "m.torres@pacificgroup.com", "phone": "+1 415 555 0201", "company": "Pacific Group", "designation": "Senior Analyst", "shared": 0},
    {"full_name": "Fatima Al-Rashid", "email": "fatima@gulfconsult.ae", "phone": "+971 4 345 6001", "company": "Gulf Consulting", "designation": "Principal Consultant", "shared": 1},
    {"full_name": "Stefan Müller", "email": "stefan.mueller@alpineadvisory.ch", "phone": "+41 44 234 5001", "company": "Alpine Advisory", "designation": "Risk Advisor", "shared": 1},

    # --- Manufacturing & Engineering ---
    {"full_name": "Chen Wei", "email": "chen.wei@precisionworks.cn", "phone": "+86 21 3456 7001", "company": "PrecisionWorks", "designation": "Plant Manager", "shared": 1},
    {"full_name": "Anna Bergström", "email": "anna.b@nordicsteel.se", "phone": "+46 31 555 0101", "company": "Nordic Steel AB", "designation": "Quality Director", "shared": 1},
    {"full_name": "Roberto Colombo", "email": "r.colombo@eurotech.it", "phone": "+39 02 3456 7001", "company": "EuroTech Industries", "designation": "Chief Engineer", "shared": 0},
    {"full_name": "Kenji Watanabe", "email": "kenji.w@tokyoprecision.jp", "phone": "+81 3 6789 0201", "company": "Tokyo Precision", "designation": "R&D Manager", "shared": 1},
    {"full_name": "Maria Santos", "email": "maria.santos@iberiamfg.es", "phone": "+34 91 234 5701", "company": "Iberia Manufacturing", "designation": "Operations Lead", "shared": 1},

    # --- Finance & Accounting ---
    {"full_name": "David Nguyen", "email": "d.nguyen@apexfinance.com", "phone": "+1 312 555 0301", "company": "Apex Finance", "designation": "CFO", "shared": 1},
    {"full_name": "Sarah O'Brien", "email": "sarah.obrien@emeraldbooks.ie", "phone": "+353 1 234 5001", "company": "Emerald Bookkeeping", "designation": "Senior Accountant", "shared": 1},
    {"full_name": "Amit Gupta", "email": "amit.gupta@capitalbridge.in", "phone": "+91 22 3456 7101", "company": "Capital Bridge", "designation": "Investment Analyst", "shared": 0},
    {"full_name": "Julia Schneider", "email": "j.schneider@rheinfinanz.de", "phone": "+49 221 1234 5001", "company": "Rhein Finanz", "designation": "Tax Advisor", "shared": 1},
    {"full_name": "Carlos Rivera", "email": "carlos.r@latamcapital.mx", "phone": "+52 55 3456 7001", "company": "LatAm Capital", "designation": "Portfolio Manager", "shared": 1},

    # --- Healthcare & Biotech ---
    {"full_name": "Dr. Elena Vasquez", "email": "e.vasquez@biomedica.es", "phone": "+34 93 234 5001", "company": "BioMedica", "designation": "Research Director", "shared": 1},
    {"full_name": "Dr. Thomas Richter", "email": "t.richter@genova-health.de", "phone": "+49 69 1234 5001", "company": "Genova Health", "designation": "Chief Medical Officer", "shared": 1},
    {"full_name": "Mei Lin", "email": "mei.lin@sunrisepharma.sg", "phone": "+65 6789 0101", "company": "Sunrise Pharma", "designation": "Clinical Trial Manager", "shared": 0},
    {"full_name": "Patrick Dubois", "email": "p.dubois@francobiotech.fr", "phone": "+33 1 4567 8902", "company": "Franco Biotech", "designation": "Lab Director", "shared": 1},
    {"full_name": "Grace Adeyemi", "email": "grace.a@afrimedicare.ng", "phone": "+234 1 234 5101", "company": "AfriMediCare", "designation": "Operations Manager", "shared": 1},

    # --- Education & Research ---
    {"full_name": "Prof. Hans Weber", "email": "h.weber@tu-berlin.de", "phone": "+49 30 1234 5101", "company": "TU Berlin", "designation": "Professor of CS", "shared": 1},
    {"full_name": "Dr. Sana Khalil", "email": "s.khalil@oxford.ac.uk", "phone": "+44 1865 234 501", "company": "University of Oxford", "designation": "Research Fellow", "shared": 1},
    {"full_name": "Taro Shimizu", "email": "t.shimizu@todai.ac.jp", "phone": "+81 3 6789 0301", "company": "University of Tokyo", "designation": "Associate Professor", "shared": 0},
    {"full_name": "Lisa Andersson", "email": "l.andersson@kth.se", "phone": "+46 8 555 0401", "company": "KTH Royal Institute", "designation": "PhD Researcher", "shared": 1},
    {"full_name": "Benjamin Asante", "email": "b.asante@legon.edu.gh", "phone": "+233 30 234 5001", "company": "University of Ghana", "designation": "Lecturer", "shared": 1},

    # --- Legal ---
    {"full_name": "Claudia Bernstein", "email": "c.bernstein@lexpartners.de", "phone": "+49 89 1234 5101", "company": "Lex Partners", "designation": "Senior Partner", "shared": 1},
    {"full_name": "Jonathan Reed", "email": "j.reed@commonlaw.co.uk", "phone": "+44 20 7890 1101", "company": "Common Law LLP", "designation": "Barrister", "shared": 0},
    {"full_name": "Amira Benali", "email": "a.benali@maghreblaw.ma", "phone": "+212 5 234 5001", "company": "Maghreb Law Group", "designation": "Corporate Lawyer", "shared": 1},
    {"full_name": "Ricardo Mendez", "email": "r.mendez@surlegal.cl", "phone": "+56 2 3456 7001", "company": "Sur Legal", "designation": "IP Attorney", "shared": 1},
    {"full_name": "Nana Osei", "email": "n.osei@goldcoastlaw.gh", "phone": "+233 30 234 5101", "company": "Gold Coast Law", "designation": "Compliance Officer", "shared": 1},

    # --- Real Estate & Architecture ---
    {"full_name": "Viktor Novak", "email": "v.novak@urbanarch.cz", "phone": "+420 2 3456 7001", "company": "Urban Architects", "designation": "Lead Architect", "shared": 1},
    {"full_name": "Sarah Johanssen", "email": "s.johanssen@nordichomes.dk", "phone": "+45 33 234 5001", "company": "Nordic Homes", "designation": "Property Manager", "shared": 1},
    {"full_name": "Alejandro Ruiz", "email": "a.ruiz@solarestate.es", "phone": "+34 91 234 5801", "company": "Solar Estate", "designation": "Development Director", "shared": 0},
    {"full_name": "Ingrid Haugen", "email": "i.haugen@fjordliving.no", "phone": "+47 22 345 601", "company": "Fjord Living AS", "designation": "Interior Designer", "shared": 1},
    {"full_name": "Paul Leclerc", "email": "p.leclerc@parisimmo.fr", "phone": "+33 1 4567 8903", "company": "Paris Immobilier", "designation": "Commercial Agent", "shared": 1},

    # --- Media & Publishing ---
    {"full_name": "Olivia Hart", "email": "o.hart@digitalnews.co.uk", "phone": "+44 20 7890 1201", "company": "Digital News Corp", "designation": "Editor-in-Chief", "shared": 1},
    {"full_name": "Mateo Garcia", "email": "m.garcia@prensalatina.ar", "phone": "+54 11 3456 7001", "company": "Prensa Latina", "designation": "Senior Journalist", "shared": 0},
    {"full_name": "Ayumi Sato", "email": "a.sato@tokyopress.jp", "phone": "+81 3 6789 0401", "company": "Tokyo Press", "designation": "Features Editor", "shared": 1},
    {"full_name": "Frederik Madsen", "email": "f.madsen@scanmedia.dk", "phone": "+45 33 234 5101", "company": "Scan Media", "designation": "Content Director", "shared": 1},
    {"full_name": "Chioma Eze", "email": "c.eze@lagosvoice.ng", "phone": "+234 1 234 5201", "company": "Lagos Voice", "designation": "Digital Editor", "shared": 1},

    # --- Retail & E-commerce ---
    {"full_name": "Eva Horváth", "email": "e.horvath@shopcentral.hu", "phone": "+36 1 234 5001", "company": "ShopCentral", "designation": "E-commerce Manager", "shared": 1},
    {"full_name": "Ryan Park", "email": "r.park@seoulmarket.kr", "phone": "+82 2 1234 5101", "company": "Seoul Market", "designation": "Merchandising Lead", "shared": 1},
    {"full_name": "Nadia Romanova", "email": "n.romanova@euroretail.ru", "phone": "+7 495 123 4601", "company": "EuroRetail", "designation": "Store Director", "shared": 0},
    {"full_name": "Diego Morales", "email": "d.morales@tiendaverde.co", "phone": "+57 1 234 5001", "company": "Tienda Verde", "designation": "Supply Chain Manager", "shared": 1},
    {"full_name": "Astrid Svensson", "email": "a.svensson@nordicshop.se", "phone": "+46 8 555 0501", "company": "Nordic Shop", "designation": "Category Manager", "shared": 1},

    # --- Non-profit & NGO ---
    {"full_name": "Dr. Kofi Mensah", "email": "k.mensah@globalaid.org", "phone": "+233 30 234 5201", "company": "Global Aid Foundation", "designation": "Executive Director", "shared": 1},
    {"full_name": "Marie Dubois", "email": "m.dubois@earthwatch.org", "phone": "+33 1 4567 8904", "company": "EarthWatch", "designation": "Program Coordinator", "shared": 1},
    {"full_name": "Tariq Mahmoud", "email": "t.mahmoud@refugeeaid.org", "phone": "+962 6 234 5001", "company": "Refugee Aid Network", "designation": "Field Director", "shared": 0},
    {"full_name": "Emily Chang", "email": "e.chang@techforgood.org", "phone": "+1 650 555 0401", "company": "Tech For Good", "designation": "Grants Manager", "shared": 1},
    {"full_name": "Pieter van der Berg", "email": "p.vdberg@cleanocean.nl", "phone": "+31 20 234 5001", "company": "Clean Ocean Initiative", "designation": "Research Lead", "shared": 1},

    # --- Food & Hospitality ---
    {"full_name": "Antoine Laurent", "email": "a.laurent@bistroparisien.fr", "phone": "+33 1 4567 8905", "company": "Bistro Parisien", "designation": "Head Chef", "shared": 1},
    {"full_name": "Yoko Ishikawa", "email": "y.ishikawa@tokyofusion.jp", "phone": "+81 3 6789 0501", "company": "Tokyo Fusion", "designation": "Restaurant Manager", "shared": 1},
    {"full_name": "Marco Bianchi", "email": "m.bianchi@dolcevita.it", "phone": "+39 06 3456 7001", "company": "Dolce Vita Group", "designation": "Operations Director", "shared": 0},
    {"full_name": "Ximena Flores", "email": "x.flores@sabormexicano.mx", "phone": "+52 55 3456 7101", "company": "Sabor Mexicano", "designation": "Catering Manager", "shared": 1},
    {"full_name": "Liam O'Sullivan", "email": "l.osullivan@celticpub.ie", "phone": "+353 1 234 5101", "company": "Celtic Pub Group", "designation": "General Manager", "shared": 1},

    # --- Energy & Sustainability ---
    {"full_name": "Frida Gustafsson", "email": "f.gustafsson@greenpower.se", "phone": "+46 8 555 0601", "company": "GreenPower Nordic", "designation": "Sustainability Director", "shared": 1},
    {"full_name": "Abdul Rahman", "email": "a.rahman@solarquest.ae", "phone": "+971 4 345 6101", "company": "SolarQuest", "designation": "Project Engineer", "shared": 1},
    {"full_name": "Catherine Moreau", "email": "c.moreau@windeurope.fr", "phone": "+33 1 4567 8906", "company": "Wind Europe SA", "designation": "Technical Lead", "shared": 0},
    {"full_name": "Samuel Kimathi", "email": "s.kimathi@eastafricaenergy.ke", "phone": "+254 20 345 6101", "company": "East Africa Energy", "designation": "Grid Planning Manager", "shared": 1},
    {"full_name": "Jan Novotný", "email": "j.novotny@cleantech.cz", "phone": "+420 2 3456 7101", "company": "CleanTech Praha", "designation": "Innovation Manager", "shared": 1},

    # --- Logistics & Transport ---
    {"full_name": "Lars Henriksen", "email": "l.henriksen@nordicfreight.no", "phone": "+47 22 345 701", "company": "Nordic Freight", "designation": "Fleet Manager", "shared": 1},
    {"full_name": "Aiko Yamamoto", "email": "a.yamamoto@pacificlog.jp", "phone": "+81 3 6789 0601", "company": "Pacific Logistics", "designation": "Warehouse Director", "shared": 1},
    {"full_name": "Pedro Almeida", "email": "p.almeida@transbrasileiro.br", "phone": "+55 11 3456 7101", "company": "TransBrasileiro", "designation": "Route Planner", "shared": 0},
    {"full_name": "Katarina Jović", "email": "k.jovic@eurofreight.rs", "phone": "+381 11 234 5001", "company": "EuroFreight", "designation": "Customs Manager", "shared": 1},
    {"full_name": "William Achebe", "email": "w.achebe@africaexpress.ng", "phone": "+234 1 234 5301", "company": "Africa Express", "designation": "Logistics Coordinator", "shared": 1},

    # --- Telecom & IT Services ---
    {"full_name": "Elise Dubois", "email": "e.dubois@connectplus.fr", "phone": "+33 1 4567 8907", "company": "ConnectPlus", "designation": "Network Engineer", "shared": 1},
    {"full_name": "Sanjay Krishnan", "email": "s.krishnan@datastream.in", "phone": "+91 80 3456 7001", "company": "DataStream India", "designation": "Technical Director", "shared": 1},
    {"full_name": "Monica Stanescu", "email": "m.stanescu@techro.ro", "phone": "+40 21 234 5001", "company": "TechRO", "designation": "Systems Analyst", "shared": 0},
    {"full_name": "Kevin Nyström", "email": "k.nystrom@telcosweden.se", "phone": "+46 8 555 0701", "company": "Telco Sweden", "designation": "Product Owner", "shared": 1},
    {"full_name": "Rachel Mensah", "email": "r.mensah@ghanaconnect.gh", "phone": "+233 30 234 5301", "company": "Ghana Connect", "designation": "Service Delivery Lead", "shared": 1},

    # --- Insurance ---
    {"full_name": "Thomas Baumann", "email": "t.baumann@securitas.de", "phone": "+49 69 1234 5101", "company": "Securitas Versicherung", "designation": "Claims Manager", "shared": 1},
    {"full_name": "Ananya Desai", "email": "a.desai@shieldinsure.in", "phone": "+91 22 3456 7201", "company": "Shield Insurance", "designation": "Underwriter", "shared": 1},
    {"full_name": "George Papadopoulos", "email": "g.papadopoulos@aegeanins.gr", "phone": "+30 21 0234 5001", "company": "Aegean Insurance", "designation": "Actuary", "shared": 0},
    {"full_name": "Sophie Martin", "email": "s.martin@assurancevie.fr", "phone": "+33 1 4567 8908", "company": "Assurance Vie SA", "designation": "Policy Advisor", "shared": 1},
    {"full_name": "Joseph Kamau", "email": "j.kamau@safetynet.ke", "phone": "+254 20 345 6201", "company": "SafetyNet Kenya", "designation": "Regional Manager", "shared": 1},

    # --- Agriculture & Food Tech ---
    {"full_name": "Olga Kravchenko", "email": "o.kravchenko@agriplus.ua", "phone": "+380 44 234 5001", "company": "AgriPlus", "designation": "Agricultural Engineer", "shared": 1},
    {"full_name": "Miguel Herrera", "email": "m.herrera@granjasol.mx", "phone": "+52 33 3456 7001", "company": "Granja Sol", "designation": "Farm Operations Lead", "shared": 1},
    {"full_name": "Astrid de Vries", "email": "a.devries@smartfarm.nl", "phone": "+31 20 234 5101", "company": "SmartFarm NL", "designation": "Precision Ag Specialist", "shared": 0},
    {"full_name": "Ibrahim Diallo", "email": "i.diallo@sahelgreen.sn", "phone": "+221 33 234 5001", "company": "Sahel Green Initiative", "designation": "Project Lead", "shared": 1},
    {"full_name": "Hanna Virtanen", "email": "h.virtanen@nordicorganic.fi", "phone": "+358 9 234 5001", "company": "Nordic Organic", "designation": "Quality Assurance", "shared": 1},
]


def create_demo_people():
    """Create 100 example contacts for the People Hub."""
    created = 0
    skipped = 0

    for person in PEOPLE:
        if frappe.db.exists("Contact", {"email_id": person["email"]}):
            skipped += 1
            continue

        doc = frappe.new_doc("Contact")
        # Split full_name into first/last for Frappe Contact
        name_parts = person["full_name"].split(" ", 1)
        doc.first_name = name_parts[0]
        doc.last_name = name_parts[1] if len(name_parts) > 1 else ""
        doc.company_name = person.get("company", "")
        doc.designation = person.get("designation", "")
        doc.dock_shared = person.get("shared", 0)

        if person.get("email"):
            doc.append("email_ids", {"email_id": person["email"], "is_primary": 1})

        if person.get("phone"):
            doc.append("phone_nos", {"phone": person["phone"], "is_primary": 1})

        doc.insert(ignore_permissions=True)
        created += 1

    frappe.db.commit()
    print(f"Done: {created} contacts created, {skipped} skipped (already exist)")


def delete_demo_people():
    """Delete all demo contacts created by this script."""
    deleted = 0
    emails = [p["email"] for p in PEOPLE]

    for email in emails:
        contacts = frappe.get_all("Contact", filters={"email_id": email}, pluck="name")
        for name in contacts:
            frappe.delete_doc("Contact", name, force=True, ignore_permissions=True)
            deleted += 1

    frappe.db.commit()
    print(f"Done: {deleted} demo contacts deleted")
