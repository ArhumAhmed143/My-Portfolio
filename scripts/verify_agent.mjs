// Automated verification test script for Ghulam Ahmed Portfolio AI Agent
const BASE_URL = "http://localhost:3000";

async function runTests() {
  console.log("=== STARTING AUTOMATED PORTFOLIO AGENT VERIFICATION ===");
  let passed = 0;
  let failed = 0;

  // Test 1: Home page loads and includes agent
  try {
    const res = await fetch(BASE_URL);
    const html = await res.text();
    if (res.status === 200 && html.includes("Ghulam Ahmed")) {
      console.log("✅ Test 1 Passed: Homepage rendered successfully with 200 OK.");
      passed++;
    } else {
      console.error("❌ Test 1 Failed: Homepage did not return expected content.");
      failed++;
    }
  } catch (err) {
    console.error("❌ Test 1 Failed with error:", err.message);
    failed++;
  }

  // Test 2: Chat API general query
  try {
    const res = await fetch(`${BASE_URL}/api/agent/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "What services do you offer?" }),
    });
    const data = await res.json();
    if (res.status === 200 && data.success && data.intent === "services_overview") {
      console.log("✅ Test 2 Passed: Chat API correctly identified services_overview intent.");
      passed++;
    } else {
      console.error("❌ Test 2 Failed:", data);
      failed++;
    }
  } catch (err) {
    console.error("❌ Test 2 Failed with error:", err.message);
    failed++;
  }

  // Test 3: Chat API SaaS Project Recommendation
  try {
    const res = await fetch(`${BASE_URL}/api/agent/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Can you recommend a multi-company SaaS platform?" }),
    });
    const data = await res.json();
    const hasSaaS = data.recommendations?.some((p) => p.id === "saas-tenant");
    if (res.status === 200 && data.success && hasSaaS) {
      console.log("✅ Test 3 Passed: Chat API recommended SaaS Multi-Tenant Automation Platform.");
      passed++;
    } else {
      console.error("❌ Test 3 Failed:", data);
      failed++;
    }
  } catch (err) {
    console.error("❌ Test 3 Failed with error:", err.message);
    failed++;
  }

  // Test 4: Chat API POS Project Recommendation
  try {
    const res = await fetch(`${BASE_URL}/api/agent/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "I need an offline POS and inventory system" }),
    });
    const data = await res.json();
    const hasPOS = data.recommendations?.some((p) => p.id === "cloud-pos");
    if (res.status === 200 && data.success && hasPOS) {
      console.log("✅ Test 4 Passed: Chat API recommended Cloud-Based Multi-Store POS.");
      passed++;
    } else {
      console.error("❌ Test 4 Failed:", data);
      failed++;
    }
  } catch (err) {
    console.error("❌ Test 4 Failed with error:", err.message);
    failed++;
  }

  // Test 5: Lead Creation & Qualification API
  let createdLeadId = null;
  try {
    const leadPayload = {
      name: "Autonomous Test Lead",
      email: "test.lead@automationsystems.dev",
      company: "Automation Systems Inc.",
      serviceRequested: "Multi-Tenant SaaS Platforms",
      projectType: "Multi-Tenant SaaS Platforms",
      projectDescription: "Looking to deploy a multi-tenant client portal with isolated databases and automated billing.",
      budgetRange: "$3,000 - $5,000",
      expectedTimeline: "1 Month",
      conversationSummary: "Visitor requested multi-tenant architecture estimate.",
    };
    const res = await fetch(`${BASE_URL}/api/agent/lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadPayload),
    });
    const data = await res.json();
    if (res.status === 200 && data.success && data.lead?.id) {
      createdLeadId = data.lead.id;
      console.log("✅ Test 5 Passed: Lead created successfully. ID:", createdLeadId);
      passed++;
    } else {
      console.error("❌ Test 5 Failed:", data);
      failed++;
    }
  } catch (err) {
    console.error("❌ Test 5 Failed with error:", err.message);
    failed++;
  }

  // Test 6: Admin Leads API - Unauthorized without passcode
  try {
    const res = await fetch(`${BASE_URL}/api/agent/leads`);
    if (res.status === 401) {
      console.log("✅ Test 6 Passed: Admin API returned 401 Unauthorized as expected.");
      passed++;
    } else {
      console.error("❌ Test 6 Failed: Expected 401, got:", res.status);
      failed++;
    }
  } catch (err) {
    console.error("❌ Test 6 Failed with error:", err.message);
    failed++;
  }

  // Test 7: Admin Leads API - Authorized with passcode
  try {
    const res = await fetch(`${BASE_URL}/api/agent/leads`, {
      headers: { "x-admin-passcode": "ghulam-admin-2026" },
    });
    const data = await res.json();
    if (res.status === 200 && data.success && Array.isArray(data.leads)) {
      console.log("✅ Test 7 Passed: Admin API returned leads list and summary metrics.");
      console.log("   Total leads in system:", data.summary?.totalLeads);
      passed++;
    } else {
      console.error("❌ Test 7 Failed:", data);
      failed++;
    }
  } catch (err) {
    console.error("❌ Test 7 Failed with error:", err.message);
    failed++;
  }

  // Test 8: Admin Status Update (PATCH)
  if (createdLeadId) {
    try {
      const res = await fetch(`${BASE_URL}/api/agent/leads`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": "ghulam-admin-2026",
        },
        body: JSON.stringify({
          id: createdLeadId,
          status: "CONTACTED",
          notes: "Automated test verification note: Followed up via email.",
        }),
      });
      const data = await res.json();
      if (res.status === 200 && data.success && data.lead.status === "CONTACTED") {
        console.log("✅ Test 8 Passed: Lead status successfully updated to CONTACTED.");
        passed++;
      } else {
        console.error("❌ Test 8 Failed:", data);
        failed++;
      }
    } catch (err) {
      console.error("❌ Test 8 Failed with error:", err.message);
      failed++;
    }
  }

  // Test 9: Clean up test lead (DELETE)
  if (createdLeadId) {
    try {
      const res = await fetch(`${BASE_URL}/api/agent/leads?id=${createdLeadId}`, {
        method: "DELETE",
        headers: {
          "x-admin-passcode": "ghulam-admin-2026",
        },
      });
      const data = await res.json();
      if (res.status === 200 && data.success) {
        console.log("✅ Test 9 Passed: Test lead cleaned up successfully.");
        passed++;
      } else {
        console.error("❌ Test 9 Failed:", data);
        failed++;
      }
    } catch (err) {
      console.error("❌ Test 9 Failed with error:", err.message);
      failed++;
    }
  }

  console.log(`\n=== VERIFICATION COMPLETE: ${passed} Passed, ${failed} Failed ===`);
}

runTests();
