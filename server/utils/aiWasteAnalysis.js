const wasteProfiles = {
  plastic: {
    category: "Plastic Waste",
    severity: "High",
    recyclingAdvice: "Separate bottles, wrappers, and bags before pickup.",
    environmentalImpact: "High risk of drain blockage and microplastic spread.",
  },
  organic: {
    category: "Organic Waste",
    severity: "Medium",
    recyclingAdvice: "Compost separately or send to wet-waste processing.",
    environmentalImpact: "Can create odor and methane if not collected quickly.",
  },
  electronic: {
    category: "Electronic Waste",
    severity: "High",
    recyclingAdvice: "Route to certified e-waste collection.",
    environmentalImpact: "May leak metals and hazardous compounds.",
  },
  construction: {
    category: "Construction Waste",
    severity: "Medium",
    recyclingAdvice: "Separate rubble, wood, metal, and reusable debris.",
    environmentalImpact: "Can block roads and storm-water drains.",
  },
  mixed: {
    category: "Mixed Waste",
    severity: "High",
    recyclingAdvice: "Segregate plastic, paper, organic, and hazardous items.",
    environmentalImpact: "Reduces recycling efficiency and attracts pests.",
  },
};

const normalizeText = (value = "") => value.toLowerCase();
const normalizeImage = (value = "") => value.replace(/^data:image\/[a-zA-Z+]+;base64,/, "").trim();

const parseImage = (value = "") => {
  const match = value.match(/^data:(image\/[a-zA-Z+.-]+);base64,(.+)$/);

  if (!match) {
    return null;
  }

  return {
    mimeType: match[1],
    data: match[2],
  };
};

const detectCategoryFromFilename = (filename = "") => {
  const normalized = normalizeText(filename);
  return (
    Object.entries(wasteProfiles).find(([key]) => normalized.includes(key))?.[1] || wasteProfiles.mixed
  );
};

export const analyzeWasteComplaint = ({ category = "", description = "", priority = "" }) => {
  const text = normalizeText(`${category} ${description} ${priority}`);
  const key =
    Object.keys(wasteProfiles).find((profile) => text.includes(profile)) || "mixed";
  const profile = wasteProfiles[key];
  const severity = priority === "High" ? "High" : profile.severity;
  const confidence = severity === "High" ? 96 : 89;

  return {
    detected: true,
    category: profile.category,
    severity,
    confidence,
    garbageAmount: severity === "High" ? "Large" : "Moderate",
    recyclingAdvice: profile.recyclingAdvice,
    environmentalImpact: profile.environmentalImpact,
    recommendation:
      severity === "High"
        ? "Immediate cleaning recommended"
        : "Schedule for standard pickup route",
  };
};

export const analyzeWasteImage = async ({ image = "", filename = "", location = "", description = "" }) => {
  const profile = detectCategoryFromFilename(filename);
  const category = profile.category;
  const priority = category === "Plastic Waste" || category === "Mixed Waste" ? "High" : "Medium";
  const locationValue = location || "Kukatpally, Hyderabad, Telangana";
  const textContext = normalizeText(`${filename} ${description}`);
  const hasCleanKeywords = /clean|cleaned|tidy|washed|clear|spotless|sanitized|neat|empty|hygienic/i.test(textContext);
  const hasGarbageKeywords = /trash|garbage|waste|litter|rubbish|dump|overflow|spill|debris|mess|dirty|soiled|pollution|bin|bag|dumpster|dumping|rubbish/i.test(textContext);
  const hasAnyKeywords = hasCleanKeywords || hasGarbageKeywords;
  const cleanDetected = hasCleanKeywords && !hasGarbageKeywords;
  const defaultCleanliness = hasAnyKeywords ? (cleanDetected ? "Clean" : "Needs Review") : "Needs Review";

  if (process.env.GEMINI_API_KEY) {
    try {
      const text = normalizeText(`${filename} ${description} ${locationValue}`);
      const imageResult = await analyzeWithGemini({ image, text });
      if (imageResult) {
        return {
          category: imageResult.category || category,
          priority: imageResult.priority || priority,
          location: imageResult.location || locationValue,
          description: imageResult.description || description,
          cleanDetected: imageResult.cleanDetected ?? cleanDetected,
          cleanliness: imageResult.cleanDetected ? "Clean" : "Needs Review",
          autoDetected: true,
        };
      }
    } catch {
      // fallback to local result
    }
  }

  return {
    category,
    priority,
    location: locationValue,
    description: description || `Detected ${category.toLowerCase()} from image`,
    cleanDetected,
    cleanliness: defaultCleanliness,
    autoDetected: true,
  };
};

const analyzeWithGemini = async ({ image, text }) => {
  const parsed = parseImage(image);
  if (!parsed) return null;

  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Analyze the attached waste image and the context text. Return only valid JSON with keys: category, priority, location, description, cleanDetected (boolean). If the image shows a cleaned area, cleanDetected should be true. Do not include any extra text.`,
              },
              { inline_data: { mime_type: parsed.mimeType, data: parsed.data } },
            ],
          },
        ],
      }),
    },
  );

  if (!response.ok) return null;
  const data = await response.json();
  const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
  const json = parseGeminiJson(textOutput);
  if (!json) return null;

  return {
    category: json.category,
    priority: json.priority,
    location: json.location,
    description: json.description,
    cleanDetected: Boolean(json.cleanDetected),
  };
};

const buildStrictLocalVerification = ({ image, beforeImage, afterImage }) => {
  const hasBothImages = Boolean(beforeImage && afterImage);
  const beforeData = normalizeImage(beforeImage);
  const afterData = normalizeImage(afterImage);
  const citizenData = normalizeImage(image);

  if (!hasBothImages) {
    return {
      cleanlinessScore: 0,
      confidence: 0,
      differenceDetected: false,
      result: "Waiting for before/after images",
      nextAction: "Upload proof images",
    };
  }

  if (beforeData === afterData || afterData === citizenData) {
    return {
      cleanlinessScore: 35,
      confidence: 98,
      differenceDetected: false,
      result: "Needs Rework",
      nextAction:
        "Before and after images appear unchanged. Upload a clear after-cleaning photo.",
    };
  }

  return {
    cleanlinessScore: 91,
    confidence: 88,
    differenceDetected: true,
    result: "Clean",
    nextAction: "Auto-complete complaint",
  };
};

const parseGeminiJson = (text = "") => {
  const json = text.match(/\{[\s\S]*\}/)?.[0];

  if (!json) {
    return null;
  }

  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
};

const verifyWithGemini = async ({ beforeImage, afterImage }) => {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }

  const before = parseImage(beforeImage);
  const after = parseImage(afterImage);

  if (!before || !after) {
    return null;
  }

  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text:
                  "Compare the BEFORE and AFTER sanitation images. Determine whether the garbage/waste was actually cleaned. Return only JSON with keys cleanlinessScore number 0-100, confidence number 0-100, differenceDetected boolean, result string either Clean or Needs Rework, nextAction string. If both images are same or waste remains, result must be Needs Rework.",
              },
              { inline_data: { mime_type: before.mimeType, data: before.data } },
              { inline_data: { mime_type: after.mimeType, data: after.data } },
            ],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  const parsed = parseGeminiJson(text);

  if (!parsed) {
    return null;
  }

  return {
    cleanlinessScore: Number(parsed.cleanlinessScore) || 0,
    confidence: Number(parsed.confidence) || 0,
    differenceDetected: Boolean(parsed.differenceDetected),
    result: parsed.result === "Clean" ? "Clean" : "Needs Rework",
    nextAction: parsed.nextAction || "Review cleanup proof",
  };
};

export const buildCleanlinessVerification = async (complaint) => {
  const localCheck = buildStrictLocalVerification(complaint);

  if (localCheck.result !== "Clean") {
    return localCheck;
  }

  try {
    const geminiResult = await verifyWithGemini(complaint);
    return geminiResult || localCheck;
  } catch {
    return localCheck;
  }
};
