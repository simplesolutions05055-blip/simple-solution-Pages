// GET /api/health  →  quick health check
export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    service: 'simple-solutions-articles-pipeline',
    time: new Date().toISOString(),
    env: {
      supabase: !!process.env.SUPABASE_URL,
      resend:   !!process.env.RESEND_API_KEY,
      github:   !!process.env.GITHUB_TOKEN,
      jwt:      !!process.env.JWT_SECRET,
      webhook:  !!process.env.WEBHOOK_SECRET,
    },
  });
}
