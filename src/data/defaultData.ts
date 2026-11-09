/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppData } from '../types';

export const DEFAULT_APP_DATA: AppData = {
  "branding": {
    "schoolName": "ZHS",
    "eventName": "ZYPAC",
    "eventSubtext": "ZHS · 14 November",
    "footerSchoolTitle": "ZHS Youth Parliament",
    "footerDescription": "ZHS Youth Parliament for Action and Change. A simulation of parliamentary democracy fostering critical deliberation, procedure, and consensus.",
    "copyrightNotice": "© 2026 ZHS Youth Parliament for Action and Change (ZYPAC) · 14 November",
    "officialEmail": "zypac.secretariat@zhs.edu",
    "schoolAddress": "ZHS Campus, Senior Block Auditorium & Parliamentary Chambers"
  },
  "home": {
    "heroHeading": "ZHS Youth Parliament for Action and Change",
    "heroTagline": "Debate. Decide. Deliver.",
    "eventDate": "2026-11-14T09:00:00",
    "eventTimeDisplay": "14 November · 9:00 AM – 2:00 PM",
    "stats": {
      "stat1": "60–70 Delegates",
      "label1": "Student Representatives",
      "stat2": "2 Chambers",
      "label2": "Lok Sabha & AIPPM",
      "stat3": "4 Sessions Each",
      "label3": "Structured Parliamentary Flow"
    },
    "visionLine": "ZYPAC gives every student a voice in democracy — to debate real issues, respect procedure, and build consensus.",
    "newsTicker": "Registration open · Orientation Wednesday · Delegate Kit released",
    "lokSabhaBox": {
      "title": "Lok Sabha",
      "subtitle": "House of the People · Parliamentary Simulation",
      "agendaText": "Discussion on the Special Intensive Revision (SIR) of Electoral Rolls and the handling of public protests in the National Capital Region: examining voter representation, democratic accountability, and the balance between public order and the right to peaceful assembly.",
      "themeBadge": "Legislative Chamber"
    },
    "aippmBox": {
      "title": "AIPPM",
      "subtitle": "All India Political Parties Meet",
      "agendaText": "Deliberation on the Independence of the Media in India and the detention of journalists during public order operations: balancing Freedom of the Press, regulation, democratic accountability, and constitutional safeguards for press freedom.",
      "themeBadge": "All-Party Consultation"
    }
  },
  "about": {
    "heading": "What is a Youth Parliament?",
    "introText": "A practice platform where students play MPs and party leaders. You debate real national issues, follow real parliamentary procedure, and learn how decisions are made. It is a simulation of democracy — not a debate competition.",
    "corePrinciples": [
      "Democracy",
      "Procedure",
      "Respect",
      "Consensus"
    ],
    "glossary": [
      {
        "term": "Roll Call",
        "definition": "The formal attendance verification at the start of each session where delegates declare their presence as Present or Present and Voting."
      },
      {
        "term": "Question Hour",
        "definition": "A dedicated parliamentary period reserved for delegates to raise inquiries on public policy, governance implementation, and administrative accountability."
      },
      {
        "term": "Amendment",
        "definition": "A formal proposal to modify, add to, or delete a specific clause within a draft resolution or communiqué under floor consideration."
      },
      {
        "term": "Communiqué",
        "definition": "The final official statement and policy consensus document adopted collaboratively by the chamber at the conclusion of deliberations."
      },
      {
        "term": "Point of Order",
        "definition": "An intervention raised by a delegate when there has been an alleged breach of parliamentary rules, procedural guidelines, or committee decorum."
      },
      {
        "term": "Quorum",
        "definition": "The minimum number of seated members required to be present before the chamber can officially conduct proceedings and take votes."
      },
      {
        "term": "Chit",
        "definition": "A written note sent through committee pages or student rapporteurs to the Executive Board or to another fellow delegate during proceedings."
      },
      {
        "term": "Chair",
        "definition": "The presiding officer (Speaker or Chairman) responsible for moderating debates, upholding parliamentary discipline, and ruling on procedure."
      }
    ],
    "addressingChair": {
      "lokSabha": "Honourable Speaker",
      "aippm": "Honourable Chairman",
      "guideline": "All speeches and interventions must be directed through the Chair. Direct remarks between delegates without the Chair's permission are strictly prohibited."
    },
    "whatToBring": [
      "Notebook and writing materials",
      "Official briefing sheet and research dossiers",
      "Formal school uniform or dignified formal ethnic wear",
      "Delegate identification badge (distributed at morning registration)"
    ]
  },
  "agendas": {
    "lokSabha": {
      "chamberName": "Lok Sabha",
      "fullTitle": "Lok Sabha — House of the People",
      "agendaText": "Discussion on the Special Intensive Revision (SIR) of Electoral Rolls and the handling of public protests in the National Capital Region: examining voter representation, democratic accountability, and the balance between public order and the right to peaceful assembly.",
      "backgroundContext": "The session will examine structural concerns surrounding voter enumeration accuracy, institutional independence of electoral authorities, and the constitutional threshold for policing assemblies in high-density metropolitan zones.",
      "sessionFlow": [
        {
          "stepNumber": 1,
          "title": "Roll call + opening statements",
          "description": "Formal quorum verification followed by timed introductory stances from treasury and opposition benches."
        },
        {
          "stepNumber": 2,
          "title": "Question Hour + debate — no cross-examination, no rebuttals",
          "description": "Structured substantive exchange focused on constitutional provisions, statutory powers, and policy alternatives."
        },
        {
          "stepNumber": 3,
          "title": "Amendments + voting",
          "description": "Clause-by-clause reading of the proposed policy draft, tabling of formal amendments, and recorded division voting."
        },
        {
          "stepNumber": 4,
          "title": "Summary + closing",
          "description": "Rapporteur summation, Speaker's concluding address, and adoption of the final legislative resolution record."
        }
      ],
      "documentDeliverable": "Resolutions & Communiqués"
    },
    "aippm": {
      "chamberName": "AIPPM",
      "fullTitle": "All India Political Parties Meet (AIPPM)",
      "agendaText": "Deliberation on the Independence of the Media in India and the detention of journalists during public order operations: balancing Freedom of the Press, regulation, democratic accountability, and constitutional safeguards for press freedom.",
      "backgroundContext": "Convening representatives across party lines to deliberate on Fourth Estate safeguards, investigative protections, misinformation oversight, and legal thresholds for law enforcement actions during sensitive public security incidents.",
      "sessionFlow": [
        {
          "stepNumber": 1,
          "title": "Roll call + opening positions by party leaders",
          "description": "Chamber attendance and high-level party ideology statements on constitutional freedoms and state responsibility."
        },
        {
          "stepNumber": 2,
          "title": "Structured debate — no rebuttals",
          "description": "Sequential floor speaking turns examining regulatory frameworks, judicial precedents, and operational guidelines."
        },
        {
          "stepNumber": 3,
          "title": "Consensus-building",
          "description": "Informal consultation and cross-party caucus to draft mutually acceptable declarations and policy commitments."
        },
        {
          "stepNumber": 4,
          "title": "Final communiqué + closing",
          "description": "Joint adoption of the consensus Communiqué, remarks by the Chairman, and adjournment sine die."
        }
      ],
      "documentDeliverable": "Resolutions & Communiqués"
    }
  },
  "schedule": {
    "headerTime": "9:00 AM – 2:00 PM",
    "dateDisplay": "Saturday, 14 November",
    "venueNote": "ZHS Senior Block Auditorium & Parliamentary Chambers",
    "lokSabhaSlots": [
      {
        "id": "ls-1",
        "sessionLabel": "Session 1",
        "timeRange": "",
        "activityTitle": "Roll Call & Opening Statements",
        "notes": "Admin fills exact timing slot"
      },
      {
        "id": "ls-2",
        "sessionLabel": "Session 2",
        "timeRange": "",
        "activityTitle": "Question Hour & Structured Parliamentary Debate",
        "notes": "No cross-examination, no rebuttals"
      },
      {
        "id": "ls-3",
        "sessionLabel": "Session 3",
        "timeRange": "",
        "activityTitle": "Tabling of Amendments & Division Voting",
        "notes": "Clause-by-clause reading & formal voting"
      },
      {
        "id": "ls-4",
        "sessionLabel": "Session 4",
        "timeRange": "",
        "activityTitle": "Summary & Speaker's Closing Session",
        "notes": "Rapporteur report & final resolution adoption"
      }
    ],
    "aippmSlots": [
      {
        "id": "aippm-1",
        "sessionLabel": "Session 1",
        "timeRange": "",
        "activityTitle": "Roll Call & Opening Positions by Party Leaders",
        "notes": "Admin fills exact timing slot"
      },
      {
        "id": "aippm-2",
        "sessionLabel": "Session 2",
        "timeRange": "",
        "activityTitle": "Structured Deliberation on Fourth Estate Safeguards",
        "notes": "Sequential turns without rebuttals"
      },
      {
        "id": "aippm-3",
        "sessionLabel": "Session 3",
        "timeRange": "",
        "activityTitle": "Cross-Party Consultation & Consensus-Building",
        "notes": "Joint drafting of compromise language"
      },
      {
        "id": "aippm-4",
        "sessionLabel": "Session 4",
        "timeRange": "",
        "activityTitle": "Adoption of Final Communiqué & Adjournment",
        "notes": "Formal Communiqué ratification & Chair address"
      }
    ]
  },
  "team": [
    {
      "id": "member-1",
      "name": "Tariq Siddiqui",
      "role": "General Secretary",
      "description": "Overall convenor of ZYPAC; coordinating executive operations, chamber alignment, and external liaison.",
      "imageUrl": "",
      "isCore": true
    },
    {
      "id": "member-2",
      "name": "Aanya Verma",
      "role": "Vice Secretary",
      "description": "Directing delegate registration, credentials management, allocation matrices, and attendee correspondence.",
      "imageUrl": "",
      "isCore": true
    },
    {
      "id": "member-3",
      "name": "Faculty Advisor",
      "role": "Teacher-in-Charge",
      "description": "Senior Faculty Advisor overseeing institutional compliance, academic integrity, and final administrative escalation.",
      "imageUrl": "",
      "isCore": true
    },
    {
      "id": "member-4",
      "name": "Rohan Mukherjee",
      "role": "Head — Orchestration, Arrangements & Registration",
      "description": "Managing physical chamber layouts, stationery distribution, hospitality, and daily floor logistics.",
      "imageUrl": "",
      "isCore": true
    },
    {
      "id": "member-5",
      "name": "Meera Nair",
      "role": "Head — Technical, Documentation & Media",
      "description": "Leading audiovisual systems, live chamber recording, rapporteur documentation, and press releases.",
      "imageUrl": "",
      "isCore": true
    },
    {
      "id": "member-6",
      "name": "Kabir Khan",
      "role": "Head — Code of Conduct & Procedure",
      "description": "Ensuring strict adherence to parliamentary Rules of Procedure, decorum enforcement, and disciplinary advisory.",
      "imageUrl": "",
      "isCore": true
    },
    {
      "id": "member-7",
      "name": "Pooja Hegde",
      "role": "Head — Delegate Welfare / Finance",
      "description": "Coordinating student health support, accessibility provisions, refreshment counters, and logistical budgeting.",
      "imageUrl": "",
      "isCore": true
    },
    {
      "id": "member-8",
      "name": "Aditya Narayan",
      "role": "Speaker, Lok Sabha",
      "description": "Presiding officer of the House of the People; regulating debate time, ruling on procedural points, and conducting divisions.",
      "imageUrl": "",
      "isCore": true
    },
    {
      "id": "member-9",
      "name": "Zoya Qureshi",
      "role": "Deputy Speaker, Lok Sabha",
      "description": "Assisting the Speaker in managing the speakers list, logging amendments, and maintaining chamber records.",
      "imageUrl": "",
      "isCore": true
    },
    {
      "id": "member-10",
      "name": "Harshvardhan Rao",
      "role": "Chairman, AIPPM",
      "description": "Moderating the All India Political Parties Meet; encouraging consensus, managing floor time, and guiding compromise.",
      "imageUrl": "",
      "isCore": true
    },
    {
      "id": "member-11",
      "name": "Ananya Deshmukh",
      "role": "Vice Chairman, AIPPM",
      "description": "Documenting multi-party positions, compiling working communiqués, and assisting with structured caucus administration.",
      "imageUrl": "",
      "isCore": true
    },
    {
      "id": "member-12",
      "name": "Student Parliamentary Corps",
      "role": "Volunteers (list)",
      "description": "Floor pages, chits couriers, registry assistants, and technical monitors ensuring smooth minute-by-minute chamber flow: Bilal Ahmed, Sana Farooqi, Devansh Roy, Kritika Sen, Naman Jain, and Priyanshu Pal.",
      "imageUrl": "",
      "isCore": false
    }
  ],
  "resources": {
    "sections": [
      {
        "id": "res-1",
        "title": "1. Research Materials",
        "description": "Comprehensive background dossiers on SIR electoral roll revision and statutory media protection laws.",
        "details": "Includes reference gazettes, Election Commission backgrounders on Special Intensive Revision (SIR), Supreme Court landmark rulings on peaceful assembly, and journalistic protections under Article 19(1)(a).",
        "downloadLabel": "Download Research Dossier (PDF)"
      },
      {
        "id": "res-2",
        "title": "2. Dress Code",
        "description": "Official standards for chamber attire reflecting parliamentary dignity.",
        "details": "Delegates must wear strictly pressed official school uniform or sober, formal ethnic wear (Kurta-pyjama with Nehru jacket, or formal salwar/sari). Western business formal is also permitted. Casuals, graphic tees, and sneakers are not allowed.",
        "downloadLabel": "View Attire Protocol Guidelines"
      },
      {
        "id": "res-3",
        "title": "3. Rules of Procedure (RoP)",
        "description": "The codified parliamentary manual governing debates, points, chits, and division voting.",
        "details": "Covers speaking orders, time limits, the prohibition of direct cross-examination and personal rebuttals, handling Points of Order, and consensus-building mechanisms for both Lok Sabha and AIPPM.",
        "downloadLabel": "Download Official Rules of Procedure (PDF)"
      },
      {
        "id": "res-4",
        "title": "4. Delegate Kit",
        "description": "Everything a student MP or party representative needs before entering their assigned chamber.",
        "details": "Contains delegate badge template, chamber seating chart, parliamentary writing pad guidelines, opening speech timing breakdown, and resolution submission sheets.",
        "downloadLabel": "Download Complete Delegate Kit"
      },
      {
        "id": "res-5",
        "title": "5. Templates",
        "description": "Official formats for tabling Amendments, working Communiqués, and formal Chits to the Chair.",
        "details": "Standardized templates for (a) Amendment Submission Form, (b) Working Paper / Consensus Draft, (c) Final Communiqué format, and (d) Speaker Chit Paper.",
        "downloadLabel": "Download Blank Document Templates (.ZIP)"
      }
    ]
  },
  "updates": [
    {
      "id": "up-1",
      "date": "30 October 2026",
      "title": "Delegate Kit Released for All Registered MPs",
      "text": "The official delegate kits including chamber background briefings and draft agenda guides are now live on the Resources portal.",
      "isPinned": true
    },
    {
      "id": "up-2",
      "date": "28 October 2026",
      "title": "Mandatory Orientation Session Scheduled for Wednesday",
      "text": "All delegates and student volunteers must attend the hybrid parliamentary briefing session this Wednesday at 3:30 PM in the Senior Hall."
    },
    {
      "id": "up-3",
      "date": "25 October 2026",
      "title": "Chamber Allocations & Role Allotment Published",
      "text": "List of assigned constituencies for Lok Sabha and political party assignments for AIPPM have been emailed to selected delegates."
    }
  ],
  "gallery": [],
  "contact": {
    "officialEmail": "zypac.secretariat@zhs.edu",
    "generalSecretaryName": "Tariq Siddiqui",
    "schoolAddress": "ZHS Campus, Senior Block Auditorium & Parliamentary Chambers",
    "roleContacts": [
      {
        "id": "c-1",
        "role": "General Secretary",
        "scope": "Overall queries & executive coordination",
        "personName": "Tariq Siddiqui",
        "email": "gensec.zypac@zhs.edu",
        "phone": "+91 98110 XXXXX"
      },
      {
        "id": "c-2",
        "role": "Vice Secretary",
        "scope": "Registration & delegate affairs",
        "personName": "Aanya Verma",
        "email": "delegates.zypac@zhs.edu",
        "phone": "+91 98111 XXXXX"
      },
      {
        "id": "c-3",
        "role": "Head, Code of Conduct",
        "scope": "Discipline & Rules of Procedure (RoP)",
        "personName": "Kabir Khan",
        "email": "conduct.zypac@zhs.edu",
        "phone": "+91 98112 XXXXX"
      },
      {
        "id": "c-4",
        "role": "Head, Technical & Media",
        "scope": "Media, documentation & tech desk",
        "personName": "Meera Nair",
        "email": "media.zypac@zhs.edu",
        "phone": "+91 98113 XXXXX"
      },
      {
        "id": "c-5",
        "role": "Teacher-in-Charge",
        "scope": "Faculty escalation & school administration",
        "personName": "Faculty Advisor",
        "email": "advisor.zypac@zhs.edu",
        "phone": "+91 98114 XXXXX"
      }
    ]
  }
};
