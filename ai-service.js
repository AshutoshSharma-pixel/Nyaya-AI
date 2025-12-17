// ================================
// Nyaya AI – AI Service (STRICT PHASE 2.5: HARD LOCKS)
// ================================

const AI_SERVICE = {

    async processQuery(userQuery, userCity = "New Delhi", lockedRole = null, lockedCaseType = null) {
        console.log("Nyaya AI Processing:", userQuery, "| Locked Role:", lockedRole, "| Locked Case:", lockedCaseType);

        const query = userQuery.trim();

        // 0. STATIC GATING (MOVED TO DASHBOARD, BUT SAFEGUARD HERE TOO)
        // If dashboard lets it through, we strictly classify or refuse.
        // But per requirements, Dashboard should handle "Hi", "WTF".
        // We will focus on processing meaningful queries here.

        // 1. SAFETY REFUSAL (INTENT VS ALLEGATION CHECKS)
        const refusal = this.checkSafetyRefusal(query);
        if (refusal) return { text: refusal, role: lockedRole, caseType: lockedCaseType };

        // 2. DETECT ROLE (HARD LOCK CHECK)
        let role = lockedRole;
        const newDetectedRole = this.detectRole(query);

        if (newDetectedRole !== "UNKNOWN") {
            if (lockedRole && lockedRole !== newDetectedRole) {
                // HARD LOCK VIOLATION - DO NOT SWITCH
                console.log(`Role Switch Blocked: Locked=${lockedRole}, New=${newDetectedRole}`);
                return {
                    text: `You are currently discussing a case where allegations are ${lockedRole === 'ACCUSED' ? 'against you' : 'made by you'}. To discuss a different situation, please start a new chat.`,
                    role: lockedRole,
                    caseType: lockedCaseType
                };
            }
            // No lock or same role -> Allow
            role = newDetectedRole;
        } else if (!role) {
            role = "UNKNOWN";
        }

        // 3. CLASSIFY CASE (WITH TYPE LOCKING)
        const classification = this.classifyCase(query, role, lockedCaseType);

        // 4. SUICIDE RISK HARD STOP
        if (classification.type === "Suicide Risk") {
            return {
                text: "I cannot assist with this request.\n\n" +
                    "If you are in immediate distress, please contact emergency services or a suicide prevention helpline (AASRA: 91-22-27546669).\n\n" +
                    "I can only provide legal information.",
                role: role,
                caseType: classification.type
            };
        }

        // 5. LEGAL CONTENT
        const legalContent = this.generateLegalContent(classification, query);

        // 6. LAWYER TYPE
        const lawyerType = classification.lawyerType;

        // 7. FINAL RESPONSE
        const responseText = this.formatFinalResponse(legalContent, lawyerType);

        return {
            text: responseText,
            role: role,
            caseType: classification.type
        };
    },

    // ================================
    // SAFETY REFUSAL (INTENT VS ALLEGATIONS)
    // ================================
    checkSafetyRefusal(query) {
        const q = query.toLowerCase();

        // ALLOW LEGAL CONTEXTS
        const defenseContexts = [
            "false case", "allegations", "accused", "charges", "filed against me",
            "fir against me", "complaint against me", "my defense", "defend myself",
            "on me", "against me", "case filed", "my wife filed"
        ];

        if (defenseContexts.some(ctx => q.includes(ctx))) return null;

        // BLOCK VIOLENT INTENT
        const harmfulPhrases = [
            "how to kill", "how to murder", "ways to kill", "help me kill",
            "how to hurt", "how to beat", "how to assault", "how to hide body",
            "dispose of body", "make bomb", "make weapon", "evade police", "escape police"
        ];

        if (harmfulPhrases.some(p => q.includes(p))) {
            return (
                "I cannot help with requests involving harm, violence, or illegal acts.\n\n" +
                "If someone is in danger, please contact emergency services immediately.\n\n" +
                "I can provide information on legal procedures only."
            );
        }
        return null;
    },

    // ================================
    // ROLE DETECTION (STRICT)
    // ================================
    detectRole(query) {
        const q = query.toLowerCase();

        const strictAccusedSignals = [
            "false case", "false fir", "fake case",
            "filed against me", "filed on me", "case against me", "fir against me",
            "accused me", "allegations on me", "complaint against me",
            "rape case on me", "dowry case on me", "my wife filed",
            "498a against me", "domestic violence case on me",
            "on me", "against me"
        ];

        if (strictAccusedSignals.some(s => q.includes(s))) return "ACCUSED";

        const victimSignals = [
            "i was raped", "he raped me",
            "sexual assault happened to me",
            "happened to me", "i am a victim"
        ];

        if (victimSignals.some(s => q.includes(s))) return "VICTIM";

        return "UNKNOWN";
    },

    // ================================
    // CASE CLASSIFICATION (WITH LOCKING)
    // ================================
    classifyCase(query, role, lockedCaseType) {
        const q = query.toLowerCase();
        let type = null;
        let lawyerType = "Civil Lawyer";

        // 1. DETECT STRONG SIGNAL FIRST
        if (q.includes("murder") || q.includes("killed") || q.includes("homicide") || q.includes("302")) {
            type = "Homicide";
            lawyerType = "Criminal Defence Lawyer";
        }
        else if (q.includes("rape") || q.includes("sexual assault") || q.includes("molestation") || q.includes("376") || q.includes("354") || q.includes("pocso")) {
            type = "Sexual Offence";
            lawyerType = "Criminal Defence Lawyer";
        }
        else if (q.includes("suicide") || q.includes("kill myself")) {
            type = "Suicide Risk";
            lawyerType = null;
        }
        else if (q.includes("domestic violence") || q.includes("husband beats") || q.includes("498a") || q.includes("dowry")) {
            type = "Domestic Violence";
            lawyerType = "Family / Criminal Lawyer";
        }
        else if (q.includes("fraud") || q.includes("scam") || q.includes("cheated") || q.includes("420")) {
            type = "Fraud / Cheating";
            lawyerType = "Criminal Lawyer";
        }
        else if (q.includes("cheque bounce") || q.includes("138")) {
            type = "Cheque Bounce";
            lawyerType = "Civil / Banking Lawyer";
        }
        else if (q.includes("cyber") || q.includes("hack") || q.includes("nude photos")) {
            type = "Cyber Crime";
            lawyerType = "Cyber Crime Lawyer";
        }
        else if (q.includes("property") || q.includes("land") || q.includes("tenant")) {
            type = "Property Dispute";
            lawyerType = "Property / Civil Lawyer";
        }

        // 2. APPLY LOCK LOGIC
        if (type) {
            // New specific type detected -> Override lock implied
        } else if (lockedCaseType && lockedCaseType !== "General Legal Query" && lockedCaseType !== "Unknown") {
            // No new specific type -> Use Locked
            type = lockedCaseType;

            // Restore Lawyer Type for Locked Case
            if (type === "Homicide" || type === "Sexual Offence") lawyerType = "Criminal Defence Lawyer";
            if (type === "Domestic Violence") lawyerType = "Family / Criminal Lawyer";
            if (type === "Fraud / Cheating") lawyerType = "Criminal Lawyer";
            if (type === "Cheque Bounce") lawyerType = "Civil / Banking Lawyer";
            if (type === "Cyber Crime") lawyerType = "Cyber Crime Lawyer";
            if (type === "Property Dispute") lawyerType = "Property / Civil Lawyer";
        } else {
            // No new type, no lock -> Default
            type = "General Legal Query";
            if (role === 'ACCUSED') lawyerType = "Criminal Defence Lawyer";
        }

        return { type, role, lawyerType };
    },

    // ================================
    // LEGAL CONTENT GENERATION (NEUTRAL)
    // ================================
    generateLegalContent(classification, query) {
        const { type, role } = classification;

        // ACCUSED
        if (role === "ACCUSED") {
            return {
                summary: `You have indicated that a case or allegation (${type}) has been made against you. Indian law provides specific rights and procedures for the accused.`,
                laws: ["Article 20 & 22 (Constitution)", "Section 438 BNSS (Anticipatory Bail)", "Section 41A BNSS"],
                explanation: `In a ${type} case, the process begins with an FIR. However, arrest is not automatic in all cases. The law presumes innocence. You have the right to know the grounds of arrest and to consult a lawyer.`,
                consequence: "Police may investigate and file a chargesheet. If the offence is non-bailable, you may need to seek bail from the court.",
                steps: [
                    "Consult a Criminal Defence Lawyer immediately.",
                    "Do not ignore notices from police (Section 41A).",
                    "Apply for Anticipatory Bail if arrest is feared.",
                    "Preserve all evidence.",
                    "Do not contact the complainant."
                ]
            };
        }

        // VICTIM
        if (role === "VICTIM") {
            return {
                summary: `You are reporting a ${type} incident. The law provides for immediate registration of FIR and protection of victim rights.`,
                laws: ["BNS Relevant Sections", "BNSS Section 173 (Investigation)", "Victim Compensation"],
                explanation: `For ${type}, police must register an FIR irrespective of jurisdiction (Zero FIR). Investigation must be unbiased and time-bound.`,
                consequence: "Once FIR is filed, police will investigate, collect evidence, and file a report in court.",
                steps: [
                    "File an FIR at the nearest police station.",
                    "Request a copy of the FIR (it is your right).",
                    "Provide all available evidence/details.",
                    "Consult a lawyer to monitor the investigation."
                ]
            };
        }

        // UNKNOWN (STRICT PROCEDURAL SAFEGUARDS)
        return {
            summary: "You have asked about a legal topic. Under Indian law (BNSS), due process must be followed.",
            laws: ["Article 21 (Right to Life)", "Bharatiya Nagarik Suraksha Sanhita (BNSS)"],
            explanation: "The law establishes a due process. For any offense, specific procedures for FIR, investigation, and trial apply. Presumption of innocence is a fundamental principle.",
            consequence: "Outcomes depend on evidence and legal procedure.",
            steps: [
                "Review relevant BNS/BNSS provisions.",
                "Consult a qualified legal professional.",
                "Ensure compliance with procedural law.",
                "Preserve relevant records."
            ]
        };
    },

    formatFinalResponse(legal, lawyerType) {
        let res = "";
        res += "1. Legal Information Overview\n" + legal.summary + "\n\n";
        res += "2. Relevant Legal Provisions\n";
        legal.laws.forEach(l => res += "- " + l + "\n");
        res += "\n";
        res += "3. Procedural Explanation\n" + legal.explanation + "\n\n";
        res += "4. Legal Implications\n" + legal.consequence + "\n\n";
        res += "5. Recommended Procedural Steps\n";
        legal.steps.forEach(s => res += "- " + s + "\n");
        res += "\n";
        res += "6. Professional Assistance\n";
        res += "Type of Professional Recommended: " + (lawyerType || "General Legal Consultant");
        return res;
    }
};

window.AIService = AI_SERVICE;

window.callOpenAI = async function (prompt, context = {}) {
    return new Promise(resolve => {
        setTimeout(async () => {
            const result = await AI_SERVICE.processQuery(
                prompt,
                "New Delhi",
                context.lockedRole,
                context.lockedCaseType
            );
            resolve(result);
        }, 1200);
    });
};
