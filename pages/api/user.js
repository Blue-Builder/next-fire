export default async (req, res) => {
  const { user } = req.query

  res.status(200).json({ uid: user.uid })
}
