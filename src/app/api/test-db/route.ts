import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db("slamarica");

    const collections = await db.listCollections().toArray();

    return Response.json({
      success: true,
      collections,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error,
    });
  }
}
