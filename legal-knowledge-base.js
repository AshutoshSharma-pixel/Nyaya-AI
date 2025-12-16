
// Legal Knowledge Base for Nyaya AI
// Comprehensive database of Indian legal provisions, judgments, and legal terminology

const LegalKnowledgeBase = {
    // IPC (Indian Penal Code) - Key Sections
    ipc: {
        "300": {
            title: "Murder",
            definition: "Culpable homicide is murder when the act by which the death is caused is done with the intention of causing death, or with the intention of causing such bodily injury as the offender knows to be likely to cause death, or with the intention of causing bodily injury to any person and the bodily injury intended to be inflicted is sufficient in the ordinary course of nature to cause death.",
            punishment: "Death or imprisonment for life",
            nature: "Non-bailable, cognizable",
            elements: ["Causing death", "Intention to cause death", "Knowledge of likelihood of death"],
            exceptions: ["Grave and sudden provocation", "Right of private defense", "Public servant acting in good faith", "Sudden fight", "Consent of victim"]
        },
        "302": {
            title: "Punishment for Murder",
            definition: "Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.",
            punishment: "Death or imprisonment for life + fine",
            nature: "Non-bailable, cognizable"
        },
        "304": {
            title: "Culpable Homicide not Amounting to Murder",
            definition: "Whoever commits culpable homicide not amounting to murder shall be punished with imprisonment for life, or imprisonment of either description for a term which may extend to ten years, and shall also be liable to fine.",
            punishment: "Life imprisonment or up to 10 years + fine",
            nature: "Non-bailable, cognizable"
        },
        "307": {
            title: "Attempt to Murder",
            definition: "Whoever does any act with such intention or knowledge and under such circumstances that, if he by that act caused death, he would be guilty of murder, shall be punished with imprisonment of either description for a term which may extend to ten years, and shall also be liable to fine.",
            punishment: "Up to 10 years + fine",
            nature: "Non-bailable, cognizable"
        },
        "354": {
            title: "Assault or Criminal Force to Woman with Intent to Outrage her Modesty",
            definition: "Whoever assaults or uses criminal force to any woman, intending to outrage or knowing it to be likely that he will thereby outrage her modesty, shall be punished with imprisonment of either description for a term which may extend to two years, or with fine, or with both.",
            punishment: "Up to 2 years + fine",
            nature: "Bailable, cognizable"
        },
        "354A": {
            title: "Sexual Harassment",
            definition: "A man committing any of the following acts: (i) physical contact and advances involving unwelcome and explicit sexual overtures; or (ii) a demand or request for sexual favours; or (iii) showing pornography against the will of a woman; or (iv) making sexually coloured remarks, shall be guilty of the offence of sexual harassment.",
            punishment: "Up to 3 years + fine",
            nature: "Non-bailable, cognizable"
        },
        "375": {
            title: "Rape",
            definition: "A man is said to commit 'rape' if he: (a) penetrates his penis, to any extent, into the vagina, mouth, urethra or anus of a woman or makes her to do so with him or any other person; or (b) inserts, to any extent, any object or a part of the body, not being the penis, into the vagina, the urethra or anus of a woman or makes her to do so with him or any other person; or (c) manipulates any part of the body of a woman so as to cause penetration into the vagina, urethra, anus or any part of body of such woman or makes her to do so with him or any other person; or (d) applies his mouth to the vagina, anus, urethra of a woman or makes her to do so with him or any other person.",
            punishment: "Rigorous imprisonment for not less than 10 years, but which may extend to imprisonment for life + fine",
            nature: "Non-bailable, cognizable"
        },
        "376": {
            title: "Punishment for Rape",
            definition: "Whoever, except in the cases provided for in sub-section (2), commits rape shall be punished with rigorous imprisonment of either description for a term which shall not be less than ten years, but which may extend to imprisonment for life, and shall also be liable to fine.",
            punishment: "Rigorous imprisonment for not less than 10 years, but which may extend to imprisonment for life + fine",
            nature: "Non-bailable, cognizable"
        },
        "377": {
            title: "Unnatural Offences",
            definition: "Whoever voluntarily has carnal intercourse against the order of nature with any man, woman or animal, shall be punished with imprisonment of either description for a term which may extend to ten years, and shall also be liable to fine.",
            punishment: "Up to 10 years + fine",
            nature: "Non-bailable, cognizable"
        },
        "378": {
            title: "Theft",
            definition: "Whoever, intending to take dishonestly any moveable property out of the possession of any person without that person's consent, moves that property in order to such taking, is said to commit theft.",
            punishment: "Up to 3 years + fine",
            nature: "Bailable, cognizable"
        },
        "379": {
            title: "Punishment for Theft",
            definition: "Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.",
            punishment: "Up to 3 years + fine",
            nature: "Bailable, cognizable"
        },
        "380": {
            title: "Theft in Dwelling House",
            definition: "Whoever commits theft in any building, tent or vessel, which building, tent or vessel is used as a human dwelling, or used for the custody of property, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.",
            punishment: "Up to 7 years + fine",
            nature: "Bailable, cognizable"
        },
        "406": {
            title: "Criminal Breach of Trust",
            definition: "Whoever commits criminal breach of trust shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.",
            punishment: "Up to 3 years + fine",
            nature: "Bailable, cognizable"
        },
        "415": {
            title: "Cheating",
            definition: "Whoever, by deceiving any person, fraudulently or dishonestly induces the person so deceived to deliver any property to any person, or to consent that any person shall retain any property, or intentionally induces the person so deceived to do or omit to do anything which he would not do or omit if he were not so deceived, and which act or omission causes or is likely to cause damage or harm to that person in body, mind, reputation or property, is said to 'cheat'.",
            punishment: "Up to 1 year + fine",
            nature: "Bailable, cognizable"
        },
        "420": {
            title: "Cheating and Dishonestly Inducing Delivery of Property",
            definition: "Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security, or anything which is signed or sealed, and which is capable of being converted into a valuable security, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.",
            punishment: "Up to 7 years + fine",
            nature: "Non-bailable, cognizable"
        },
        "498A": {
            title: "Husband or Relative of Husband of a Woman Subjecting Her to Cruelty",
            definition: "Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished with imprisonment for a term which may extend to three years and shall also be liable to fine.",
            punishment: "Up to 3 years + fine",
            nature: "Non-bailable, cognizable"
        },
        "499": {
            title: "Defamation",
            definition: "Whoever, by words either spoken or intended to be read, or by signs or by visible representations, makes or publishes any imputation concerning any person intending to harm, or knowing or having reason to believe that such imputation will harm, the reputation of such person, is said, except in the cases hereinafter expected, to defame that person.",
            punishment: "Up to 2 years + fine",
            nature: "Bailable, cognizable"
        },
        "500": {
            title: "Punishment for Defamation",
            definition: "Whoever defames another shall be punished with simple imprisonment for a term which may extend to two years, or with fine, or with both.",
            punishment: "Up to 2 years + fine",
            nature: "Bailable, cognizable"
        }
    },

    // CrPC (Code of Criminal Procedure) - Key Sections
    crpc: {
        "41": {
            title: "When Police May Arrest Without Warrant",
            definition: "Any police officer may without an order from a Magistrate and without a warrant, arrest any person who has been concerned in any cognizable offence, or against whom a reasonable complaint has been made, or credible information has been received, or a reasonable suspicion exists, of his having been so concerned.",
            conditions: ["Cognizable offence", "Reasonable complaint", "Credible information", "Reasonable suspicion"]
        },
        "46": {
            title: "Arrest How Made",
            definition: "In making an arrest the police officer or other person making the same shall actually touch or confine the body of the person to be arrested, unless there be a submission to the custody by word or action.",
            procedure: ["Physical touch or confinement", "Submission by word or action", "Use of reasonable force if necessary"]
        },
        "57": {
            title: "Person Arrested Not to be Detained More than Twenty-Four Hours",
            definition: "No police officer shall detain in custody a person arrested without warrant for a longer period than under all the circumstances of the case is reasonable, and such period shall not, in the absence of a special order of a Magistrate under section 167, exceed twenty-four hours exclusive of the time necessary for the journey from the place of arrest to the Magistrate's Court.",
            timeLimit: "24 hours (excluding journey time)"
        },
        "154": {
            title: "Information in Cognizable Cases",
            definition: "Every information relating to the commission of a cognizable offence, if given orally to an officer in charge of a police station, shall be reduced to writing by him or under his direction, and be read over to the informant; and every such information, whether given in writing or reduced to writing as aforesaid, shall be signed by the person giving it, and the substance thereof shall be entered in a book to be kept by such officer in such form as the State Government may prescribe in this behalf.",
            procedure: ["Oral information reduced to writing", "Read over to informant", "Signed by informant", "Entered in station diary"]
        },
        "167": {
            title: "Procedure When Investigation Cannot be Completed in Twenty-Four Hours",
            definition: "Whenever any person is arrested and detained in custody, and it appears that the investigation cannot be completed within the period of twenty-four hours fixed by section 57, and there are grounds for believing that the accusation or information is well-founded, the officer in charge of the police station or the police officer making the investigation, if he is not below the rank of sub-inspector, shall forthwith transmit to the nearest Judicial Magistrate a copy of the entries in the diary hereinafter prescribed relating to the case, and shall at the same time forward the accused to such Magistrate.",
            procedure: ["Transmit diary to Magistrate", "Forward accused to Magistrate", "Apply for remand if necessary"]
        },
        "438": {
            title: "Direction for Grant of Bail to Person Apprehending Arrest",
            definition: "When any person has reason to believe that he may be arrested on an accusation of having committed a non-bailable offence, he may apply to the High Court or the Court of Session for a direction under this section; and that Court may, if it thinks fit, direct that in the event of such arrest, he shall be released on bail.",
            conditions: ["Reason to believe arrest", "Non-bailable offence", "Application to High Court or Sessions Court"]
        }
    },

    // Constitution of India - Key Articles
    constitution: {
        "14": {
            title: "Equality Before Law",
            definition: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
            scope: "All persons within India",
            exceptions: ["Reasonable classification", "Special provisions for women and children", "Reservation for SC/ST/OBC"]
        },
        "15": {
            title: "Prohibition of Discrimination on Grounds of Religion, Race, Caste, Sex or Place of Birth",
            definition: "The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them.",
            scope: "Citizens only",
            exceptions: ["Special provisions for women and children", "Reservation for SC/ST/OBC", "Educational institutions"]
        },
        "19": {
            title: "Protection of Certain Rights Regarding Freedom of Speech, etc.",
            definition: "All citizens shall have the right to freedom of speech and expression, assembly, association, movement, residence and settlement, and profession, occupation, trade or business.",
            rights: ["Freedom of speech and expression", "Assembly", "Association", "Movement", "Residence", "Profession"],
            restrictions: ["Reasonable restrictions", "Public order", "Decency or morality", "Defamation", "Incitement to offence"]
        },
        "21": {
            title: "Protection of Life and Personal Liberty",
            definition: "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
            scope: "All persons",
            includes: ["Right to life", "Right to personal liberty", "Right to dignity", "Right to privacy", "Right to health", "Right to education"]
        },
        "25": {
            title: "Freedom of Conscience and Free Profession, Practice and Propagation of Religion",
            definition: "Subject to public order, morality and health and to the other provisions of this Part, all persons are equally entitled to freedom of conscience and the right freely to profess, practise and propagate religion.",
            scope: "All persons",
            restrictions: ["Public order", "Morality", "Health", "Other fundamental rights"]
        },
        "32": {
            title: "Remedies for Enforcement of Rights Conferred by this Part",
            definition: "The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed.",
            scope: "Fundamental rights enforcement",
            writs: ["Habeas Corpus", "Mandamus", "Prohibition", "Quo Warranto", "Certiorari"]
        }
    },

    // Evidence Act - Key Sections
    evidence: {
        "3": {
            title: "Interpretation Clause",
            definition: "Evidence means and includes all statements which the Court permits or requires to be made before it by witnesses, in relation to matters of fact under inquiry; and all documents produced for the inspection of the Court.",
            types: ["Oral evidence", "Documentary evidence", "Primary evidence", "Secondary evidence"]
        },
        "101": {
            title: "Burden of Proof",
            definition: "Whoever desires any Court to give judgment as to any legal right or liability dependent on the existence of facts which he asserts, must prove that those facts exist.",
            principle: "He who asserts must prove"
        },
        "102": {
            title: "On Whom Burden of Proof Lies",
            definition: "The burden of proof in a suit or proceeding lies on that person who would fail if no evidence at all were given on either side.",
            principle: "Burden lies on the party who would fail without evidence"
        },
        "105": {
            title: "Burden of Proving that Case of Accused Comes Within Exceptions",
            definition: "When a person is accused of any offence, the burden of proving the existence of circumstances bringing the case within any of the General Exceptions in the Indian Penal Code, or within any special exception or proviso contained in any other part of the same Code, or in any law defining the offence, is upon him, and the Court shall presume the absence of such circumstances.",
            principle: "Accused must prove exceptions"
        },
        "114": {
            title: "Court May Presume Existence of Certain Facts",
            definition: "The Court may presume the existence of any fact which it thinks likely to have happened, regard being had to the common course of natural events, human conduct and public and private business, in their relation to the facts of the particular case.",
            principle: "Presumption of facts based on common course of events"
        }
    },

    // Landmark Judgments
    judgments: {
        "Kesavananda Bharati v. State of Kerala": {
            year: "1973",
            court: "Supreme Court",
            significance: "Basic Structure Doctrine",
            summary: "The Supreme Court held that Parliament cannot amend the basic structure of the Constitution. This case established the doctrine of basic structure which limits the amending power of Parliament under Article 368."
        },
        "Maneka Gandhi v. Union of India": {
            year: "1978",
            court: "Supreme Court",
            significance: "Expansion of Article 21",
            summary: "The Court held that the right to life under Article 21 includes the right to live with human dignity and personal liberty. It also established that the procedure established by law must be fair, just and reasonable."
        },
        "Vishaka v. State of Rajasthan": {
            year: "1997",
            court: "Supreme Court",
            significance: "Sexual Harassment at Workplace",
            summary: "The Court laid down guidelines for prevention of sexual harassment of women at workplace, which were later codified in the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013."
        },
        "Shakti Vahini v. Union of India": {
            year: "2018",
            court: "Supreme Court",
            significance: "Honour Killing",
            summary: "The Court held that honour killing is a crime and directed the government to take preventive measures. It also laid down guidelines for protection of couples facing threats due to inter-caste or inter-religious marriages."
        },
        "Navtej Singh Johar v. Union of India": {
            year: "2018",
            court: "Supreme Court",
            significance: "Decriminalization of Homosexuality",
            summary: "The Court decriminalized consensual homosexual acts between adults by striking down Section 377 of the IPC to the extent it criminalized consensual sexual acts between adults of the same sex."
        }
    },

    // Legal Terminology
    terminology: {
        "Bail": "Release of an accused person from custody on security given for their appearance in court",
        "Cognizable Offence": "An offence for which a police officer may arrest without warrant",
        "Non-bailable Offence": "An offence for which bail cannot be granted as a matter of right",
        "FIR": "First Information Report - the first information about commission of a cognizable offence",
        "Charge Sheet": "A formal document containing charges against the accused",
        "Summons": "A legal document ordering a person to appear in court",
        "Warrant": "A legal document authorizing arrest or search",
        "Anticipatory Bail": "Bail granted in anticipation of arrest",
        "Custody": "Detention of a person by legal authority",
        "Remand": "Sending an accused back to custody during investigation",
        "Bail Bond": "A document guaranteeing the appearance of the accused in court",
        "Surety": "A person who guarantees the appearance of the accused",
        "Prosecution": "The party conducting criminal proceedings against the accused",
        "Defense": "The party representing the accused in criminal proceedings",
        "Witness": "A person who gives evidence in court",
        "Cross-examination": "Questioning of a witness by the opposing party",
        "Examination-in-chief": "Questioning of a witness by the party who called them",
        "Re-examination": "Further questioning of a witness by the party who called them",
        "Evidence": "Information presented in court to prove or disprove facts",
        "Burden of Proof": "The obligation to prove a fact in court",
        "Standard of Proof": "The level of certainty required to prove a fact",
        "Reasonable Doubt": "Doubt based on reason and common sense",
        "Presumption": "An assumption of fact based on other facts",
        "Prima Facie": "At first sight; on the face of it",
        "Ex Parte": "Proceedings in the absence of one party",
        "Interim Order": "A temporary order passed during proceedings",
        "Stay Order": "An order stopping proceedings temporarily",
        "Injunction": "A court order preventing a person from doing something",
        "Damages": "Monetary compensation for loss or injury",
        "Compensation": "Payment for loss or injury suffered",
        "Restitution": "Restoration of something to its rightful owner",
        "Specific Performance": "Court order to perform a specific act",
        "Res Judicata": "A matter already decided by a court",
        "Stare Decisis": "The principle of following precedent",
        "Ratio Decidendi": "The legal reasoning behind a court's decision",
        "Obiter Dicta": "Statements made by a judge that are not binding",
        "Per Incuriam": "A decision made without considering relevant law",
        "Locus Standi": "The right to bring a case to court",
        "Limitation": "Time limit for filing a case",
        "Limitation Period": "The time within which a case must be filed",
        "Cause of Action": "The facts that give rise to a legal claim",
        "Jurisdiction": "The authority of a court to hear a case",
        "Territorial Jurisdiction": "Jurisdiction based on geographical area",
        "Subject Matter Jurisdiction": "Jurisdiction based on the type of case",
        "Appellate Jurisdiction": "Jurisdiction to hear appeals",
        "Original Jurisdiction": "Jurisdiction to hear cases for the first time",
        "Writ Jurisdiction": "Jurisdiction to issue writs",
        "Concurrent Jurisdiction": "Jurisdiction shared by multiple courts",
        "Exclusive Jurisdiction": "Jurisdiction belonging to only one court"
    },

    // Legal Procedures
    procedures: {
        "Criminal Trial": {
            steps: [
                "FIR Registration",
                "Investigation",
                "Chargesheet Filing",
                "Framing of Charges",
                "Evidence Stage",
                "Arguments",
                "Judgment",
                "Sentencing"
            ],
            timeline: "6 months to 2 years (depending on complexity)"
        },
        "Civil Suit": {
            steps: [
                "Filing of Plaint",
                "Service of Summons",
                "Written Statement",
                "Framing of Issues",
                "Evidence Stage",
                "Arguments",
                "Judgment",
                "Execution"
            ],
            timeline: "1 to 3 years (depending on complexity)"
        },
        "Bail Application": {
            steps: [
                "Filing of Bail Application",
                "Notice to Prosecution",
                "Hearing",
                "Order on Bail",
                "Execution of Bail Bond"
            ],
            timeline: "1 to 4 weeks"
        },
        "Anticipatory Bail": {
            steps: [
                "Filing of Application",
                "Notice to Prosecution",
                "Hearing",
                "Order on Anticipatory Bail",
                "Execution of Bond"
            ],
            timeline: "1 to 2 weeks"
        }
    }
};

// Function to search legal knowledge base
function searchLegalKnowledge(query) {
    const results = [];
    const searchTerm = query.toLowerCase();

    // Search IPC sections
    for (const [section, details] of Object.entries(LegalKnowledgeBase.ipc)) {
        if (details.title.toLowerCase().includes(searchTerm) ||
            details.definition.toLowerCase().includes(searchTerm) ||
            section.includes(searchTerm)) {
            results.push({
                type: 'IPC',
                section: section,
                ...details
            });
        }
    }

    // Search CrPC sections
    for (const [section, details] of Object.entries(LegalKnowledgeBase.crpc)) {
        if (details.title.toLowerCase().includes(searchTerm) ||
            details.definition.toLowerCase().includes(searchTerm) ||
            section.includes(searchTerm)) {
            results.push({
                type: 'CrPC',
                section: section,
                ...details
            });
        }
    }

    // Search Constitution articles
    for (const [article, details] of Object.entries(LegalKnowledgeBase.constitution)) {
        if (details.title.toLowerCase().includes(searchTerm) ||
            details.definition.toLowerCase().includes(searchTerm) ||
            article.includes(searchTerm)) {
            results.push({
                type: 'Constitution',
                article: article,
                ...details
            });
        }
    }

    // Search Evidence Act sections
    for (const [section, details] of Object.entries(LegalKnowledgeBase.evidence)) {
        if (details.title.toLowerCase().includes(searchTerm) ||
            details.definition.toLowerCase().includes(searchTerm) ||
            section.includes(searchTerm)) {
            results.push({
                type: 'Evidence Act',
                section: section,
                ...details
            });
        }
    }

    // Search judgments
    for (const [caseName, details] of Object.entries(LegalKnowledgeBase.judgments)) {
        if (caseName.toLowerCase().includes(searchTerm) ||
            details.summary.toLowerCase().includes(searchTerm) ||
            details.significance.toLowerCase().includes(searchTerm)) {
            results.push({
                type: 'Judgment',
                caseName: caseName,
                ...details
            });
        }
    }

    // Search terminology
    for (const [term, definition] of Object.entries(LegalKnowledgeBase.terminology)) {
        if (term.toLowerCase().includes(searchTerm) ||
            definition.toLowerCase().includes(searchTerm)) {
            results.push({
                type: 'Terminology',
                term: term,
                definition: definition
            });
        }
    }

    return results;
}

// Function to get comprehensive legal response
function getComprehensiveLegalResponse(query) {
    const searchTerm = query.toLowerCase();

    // Handle specific urgent legal situations with direct responses
    if (searchTerm.includes('accident') && (searchTerm.includes('killed') || searchTerm.includes('death') || searchTerm.includes('victim'))) {
        return `**URGENT LEGAL SITUATION - ROAD ACCIDENT RESULTING IN DEATH**

I understand you're in a serious legal situation. Let me provide immediate guidance:

**IMMEDIATE ACTIONS REQUIRED:**

1. **Contact a Criminal Lawyer IMMEDIATELY**
   - This is a serious matter under IPC Section 304A (Death by Negligence)
   - You need legal representation right away
   - Don't speak to police without your lawyer

2. **Legal Provisions Applicable:**
   - **IPC Section 304A:** Causing death by negligence
   - **Punishment:** Up to 2 years imprisonment + fine
   - **Nature:** Bailable, cognizable
   - **Motor Vehicles Act:** Additional penalties for traffic violations

3. **What to Do Right Now:**
   - **Don't admit guilt** to anyone
   - **Document everything** - photos, witness details, police report
   - **Get medical reports** if you were injured
   - **Preserve evidence** - vehicle damage, CCTV footage
   - **Get witness statements** if possible

4. **Police Investigation Process:**
   - FIR will be registered under Section 304A IPC
   - You may be arrested (bailable offence)
   - Vehicle may be seized for investigation
   - Insurance company will be involved

5. **Defense Strategies:**
   - **Prove lack of negligence** - show you followed traffic rules
   - **Establish victim's contributory negligence** if applicable
   - **Medical evidence** - prove you weren't under influence
   - **Expert opinion** - accident reconstruction report

6. **Insurance Coverage:**
   - **Third-party insurance** covers victim's family
   - **Legal liability** up to policy limits
   - **Criminal proceedings** separate from insurance

**CRITICAL REMINDERS:**
- This is a time-sensitive matter
- Get legal help before making any statements
- Don't negotiate with victim's family without lawyer
- Preserve all evidence immediately
- Consider anticipatory bail if arrest likely

**IMMEDIATE NEXT STEPS:**
1. Contact a criminal lawyer specializing in motor accident cases
2. Gather all evidence and documentation
3. Prepare for police investigation
4. Consider anticipatory bail application
5. Coordinate with insurance company

This is a serious legal situation requiring immediate professional help. I strongly recommend contacting a qualified criminal lawyer right away.`;
    }

    if (searchTerm.includes('murder') || searchTerm.includes('killed someone') || searchTerm.includes('homicide')) {
        return `**URGENT LEGAL SITUATION - HOMICIDE/MURDER**

This is an extremely serious legal matter. Here's what you need to know:

**IMMEDIATE ACTIONS:**

1. **Contact a Senior Criminal Lawyer IMMEDIATELY**
   - This involves IPC Section 300 (Murder) or 304 (Culpable Homicide)
   - Non-bailable offences - immediate legal help required
   - Don't make any statements without lawyer

2. **Legal Provisions:**
   - **IPC Section 300:** Murder - Death or life imprisonment
   - **IPC Section 304:** Culpable Homicide - Life imprisonment or up to 10 years
   - **Nature:** Non-bailable, cognizable offences

3. **Critical Steps:**
   - **Don't admit anything** to police or anyone
   - **Document circumstances** - self-defense, accident, provocation
   - **Get medical help** if injured
   - **Preserve all evidence**
   - **Don't flee** - this makes situation worse

4. **Possible Defenses:**
   - **Self-defense** (IPC Section 96-106)
   - **Accident** (IPC Section 80)
   - **Provocation** (IPC Section 300 Exception 1)
   - **Insanity** (IPC Section 84)
   - **Consent** (in specific cases)

5. **Police Investigation:**
   - FIR will be registered immediately
   - You will likely be arrested
   - Investigation will be thorough
   - Evidence collection is critical

**URGENT: Contact a criminal lawyer specializing in murder cases immediately. This is a life-and-death legal situation.**`;
    }

    if (searchTerm.includes('rape') || searchTerm.includes('sexual assault') || searchTerm.includes('molestation')) {
        return `**URGENT LEGAL SITUATION - SEXUAL OFFENCES**

This is a serious legal matter. Here's immediate guidance:

**LEGAL PROVISIONS:**
- **IPC Section 375:** Rape - 10 years to life imprisonment
- **IPC Section 354:** Assault on modesty - Up to 2 years
- **IPC Section 354A:** Sexual harassment - Up to 3 years
- **Nature:** Non-bailable, cognizable offences

**IMMEDIATE ACTIONS:**
1. **Contact a criminal lawyer immediately**
2. **Don't make any statements** without legal advice
3. **Preserve all evidence** - messages, photos, witnesses
4. **Get medical examination** if applicable
5. **Document everything** - timeline, circumstances

**Defense Strategies:**
- **Consent** - prove consent was given
- **False complaint** - establish malicious intent
- **Alibi** - prove you weren't present
- **Medical evidence** - contradict allegations

**Critical:** Get legal representation immediately. These are serious offences with severe penalties.`;
    }

    if (searchTerm.includes('fraud') || searchTerm.includes('cheated') || searchTerm.includes('scam')) {
        return `**FRAUD/CHEATING CASE**

**Legal Provisions:**
- **IPC Section 420:** Cheating - Up to 7 years imprisonment
- **IPC Section 415:** Cheating definition
- **Nature:** Non-bailable, cognizable

**Immediate Actions:**
1. **Document everything** - messages, emails, transactions
2. **File police complaint** if you're the victim
3. **Get legal advice** immediately
4. **Preserve evidence** - bank records, contracts
5. **Send legal notice** demanding return of money

**If You're Accused:**
- **Don't admit anything** without lawyer
- **Prove lack of dishonest intention**
- **Show victim's consent was genuine**
- **Challenge the cheating element**

**Evidence Required:**
- Written communications
- Bank transaction records
- Witness statements
- Contracts or agreements
- Police complaint copy

Get legal help immediately for proper guidance.`;
    }

    // Handle specific IPC section queries
    if (searchTerm.includes('ipc 420') || searchTerm.includes('section 420')) {
        return `# IPC Section 420 - Cheating and Dishonestly Inducing Delivery of Property

## Definition
Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security, or anything which is signed or sealed, and which is capable of being converted into a valuable security, shall be punished.

## Legal Details
- **Punishment:** Up to 7 years imprisonment + fine
- **Nature:** Non-bailable, cognizable offence

## Key Elements Required
1. **Cheating** (as defined in Section 415)
2. **Dishonest intention**
3. **Inducing delivery** of property
4. **Actual delivery** must occur

## Common Examples
- Fake job offers to extract money
- Fraudulent property deals
- Online scams and frauds
- Cheating in business transactions

## Defense Strategies
- Prove lack of dishonest intention
- Show no actual delivery occurred
- Establish victim's consent was genuine
- Challenge the cheating element

> **Important:** This is a serious offence. Get legal help immediately if you're facing charges.`;
    }

    if (searchTerm.includes('ipc 300') || searchTerm.includes('murder')) {
        return `# IPC Section 300 - Murder

## Definition
Culpable homicide is murder when the act by which the death is caused is done:
1. With intention to cause death, OR
2. With intention to cause such bodily injury as the offender knows is likely to cause death, OR
3. With intention to cause bodily injury sufficient in ordinary course of nature to cause death

## Legal Details
- **Punishment:** Death or imprisonment for life
- **Nature:** Non-bailable, cognizable offence

## Key Elements
- Causing death of a person
- Intention to cause death
- Knowledge of likelihood of death

## Exceptions (Not Murder)
- Grave and sudden provocation
- Right of private defense
- Public servant acting in good faith
- Sudden fight
- Consent of victim (in specific cases)

> **Critical:** This is the most serious offence in IPC. Get immediate legal help if facing charges.`;
    }

    // General search for other queries
    const searchResults = searchLegalKnowledge(query);

    if (searchResults.length === 0) {
        return null; // Fall back to general AI response
    }

    let response = "**Legal Knowledge Base Response:**\n\n";

    // Group results by type
    const groupedResults = {};
    searchResults.forEach(result => {
        if (!groupedResults[result.type]) {
            groupedResults[result.type] = [];
        }
        groupedResults[result.type].push(result);
    });

    // Format results by type
    for (const [type, results] of Object.entries(groupedResults)) {
        response += `**${type}:**\n\n`;

        results.slice(0, 3).forEach(result => { // Limit to 3 results per type
            if (type === 'IPC' || type === 'CrPC' || type === 'Evidence Act') {
                response += `**Section ${result.section}: ${result.title}**\n`;
                response += `${result.definition}\n`;
                if (result.punishment) response += `**Punishment:** ${result.punishment}\n`;
                if (result.nature) response += `**Nature:** ${result.nature}\n`;
                if (result.elements) response += `**Elements:** ${result.elements.join(', ')}\n`;
                if (result.exceptions) response += `**Exceptions:** ${result.exceptions.join(', ')}\n`;
            } else if (type === 'Constitution') {
                response += `**Article ${result.article}: ${result.title}**\n`;
                response += `${result.definition}\n`;
                if (result.scope) response += `**Scope:** ${result.scope}\n`;
                if (result.rights) response += `**Rights:** ${result.rights.join(', ')}\n`;
            } else if (type === 'Judgment') {
                response += `**${result.caseName} (${result.year})**\n`;
                response += `**Significance:** ${result.significance}\n`;
                response += `${result.summary}\n`;
            } else if (type === 'Terminology') {
                response += `**${result.term}:** ${result.definition}\n`;
            }
            response += "\n";
        });

        response += "\n";
    }

    response += "**Note:** This information is based on the legal knowledge base. For specific legal advice, please consult a qualified lawyer.\n\n";
    response += "**Source:** Bare Acts, Landmark Judgments, and Legal Commentaries";

    return response;
}

// Make functions available globally
window.LegalKnowledgeBase = LegalKnowledgeBase;
window.searchLegalKnowledge = searchLegalKnowledge;
window.getComprehensiveLegalResponse = getComprehensiveLegalResponse;
