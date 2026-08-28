import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000/api';
const FRONTEND_URL = 'http://localhost:5173';

const runTests = async () => {
  console.log('====================================================');
  console.log('🧪 RUNNING PRODUCTION PORTFOLIO E2E TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  const test = async (name, fn) => {
    try {
      process.stdout.write(`• Testing [${name}] ... `);
      await fn();
      console.log('✅ PASSED');
      passed++;
    } catch (err) {
      console.log(`❌ FAILED: ${err.message}`);
      if (err.response?.data) {
        console.log(`  Response:`, JSON.stringify(err.response.data));
      }
      failed++;
    }
  };

  let adminToken = null;

  // 1. Health Check
  await test('Backend Health Check', async () => {
    const res = await axios.get(`${BACKEND_URL}/health`);
    if (res.data.status !== 'online') throw new Error('Health status is not online');
    if (!res.data.database.isConnected) throw new Error('Database is not connected');
  });

  // 2. Profile API
  await test('Verified Profile Retrieval (Maduraaganesh N.)', async () => {
    const res = await axios.get(`${BACKEND_URL}/profile`);
    if (!res.data.success) throw new Error('Failed to get profile');
    if (res.data.data.name !== 'Maduraaganesh N.') throw new Error(`Unexpected name: ${res.data.data.name}`);
    if (res.data.data.company !== 'Zoho') throw new Error(`Unexpected company: ${res.data.data.company}`);
    if (res.data.data.role !== 'AI Engineer') throw new Error(`Unexpected role: ${res.data.data.role}`);
  });

  // 3. Dynamic GitHub Repositories
  await test('Dynamic GitHub Repositories Fetch (MADURAAGANESH-N)', async () => {
    const res = await axios.get(`${BACKEND_URL}/github/repos`);
    if (!res.data.success) throw new Error('Failed to retrieve GitHub repos');
    if (res.data.total <= 0) throw new Error('No repos returned from GitHub API');
    console.log(`(Discovered ${res.data.total} public repos)`);
  });

  // 4. Featured GitHub Projects
  await test('Featured GitHub Projects', async () => {
    const res = await axios.get(`${BACKEND_URL}/github/featured`);
    if (!res.data.success) throw new Error('Featured endpoint failed');
    if (res.data.count <= 0) throw new Error('No featured repos returned');
  });

  // 5. GitHub Profile Stats
  await test('GitHub Profile Statistics & Total Stars Calculation', async () => {
    const res = await axios.get(`${BACKEND_URL}/github/profile`);
    if (!res.data.success) throw new Error('Profile stats failed');
    if (res.data.data.username !== 'MADURAAGANESH-N') throw new Error('Wrong username');
  });

  // 6. Confirmed Skills
  await test('Skills API Retrieval', async () => {
    const res = await axios.get(`${BACKEND_URL}/skills`);
    if (!res.data.success) throw new Error('Failed to fetch skills');
    if (res.data.total < 10) throw new Error('Too few skills returned');
  });

  // 7. Experience Timeline
  await test('Experience Timeline Retrieval (Zoho AI Engineer)', async () => {
    const res = await axios.get(`${BACKEND_URL}/experience`);
    if (!res.data.success) throw new Error('Failed to get experience');
    const zohoExp = res.data.data.find((e) => e.company === 'Zoho');
    if (!zohoExp) throw new Error('Zoho experience entry not found');
  });

  // 8. Education Records
  await test('Education Records (B.Tech IT)', async () => {
    const res = await axios.get(`${BACKEND_URL}/education`);
    if (!res.data.success) throw new Error('Failed to get education');
    const itEdu = res.data.data.find((e) => e.degree === 'B.Tech');
    if (!itEdu) throw new Error('B.Tech record not found');
  });

  // 9. Contact Form Submission
  await test('Contact Form Submission', async () => {
    const payload = {
      name: 'Dr. Recruiter Test',
      email: 'recruiter.ai@example.com',
      subject: 'AI Engineering Lead Opportunity',
      message: 'Hello Maduraaganesh, we are impressed by your AI & GenAI systems work at Zoho.',
    };
    const res = await axios.post(`${BACKEND_URL}/contact`, payload);
    if (!res.data.success) throw new Error('Contact submission failed');
  });

  // 10. Admin Authentication
  await test('Admin Login & JWT Token Generation', async () => {
    const res = await axios.post(`${BACKEND_URL}/auth/login`, {
      email: 'nmaduraaganesh@gmail.com',
      password: 'Admin@ZohoAI2026',
    });
    if (!res.data.success || !res.data.token) throw new Error('Login failed');
    adminToken = res.data.token;
  });

  // 11. Protected Inquiries Inbox
  await test('Protected Messages Inbox Query with JWT', async () => {
    const res = await axios.get(`${BACKEND_URL}/contact`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (!res.data.success) throw new Error('Inbox fetch failed');
    const testMsg = res.data.data.find((m) => m.name === 'Dr. Recruiter Test');
    if (!testMsg) throw new Error('Submitted contact message not found in inbox');
  });

  // 12. GitHub Overrides Update
  await test('GitHub Repository Overrides Update via Admin', async () => {
    const res = await axios.post(
      `${BACKEND_URL}/github/featured`,
      {
        repoName: 'PetCare-Chatbot',
        isFeatured: true,
        customCategory: 'Generative AI',
      },
      {
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    );
    if (!res.data.success) throw new Error('Updating repo config failed');
  });

  // 13. Frontend Dev Server Index
  await test('Frontend Vite Dev Server Availability', async () => {
    const res = await axios.get(FRONTEND_URL);
    if (res.status !== 200) throw new Error('Frontend returned non-200');
    if (!res.data.includes('Maduraaganesh N.')) throw new Error('Title missing from HTML');
  });

  console.log('\n====================================================');
  console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) process.exit(1);
};

runTests();
