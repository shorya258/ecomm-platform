import jwt from 'jsonwebtoken';

export async function POST(req) {
console.log("login hit")
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;

    // Here you can perform additional checks, such as ensuring the user exists in your database
    // Example: const user = await findUserByEmail(email);

    // For now, we'll assume verification is successful
    res.redirect(`/dashboard?email=${email}`); // Redirect to the dashboard or any other page
  } catch (error) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
}
