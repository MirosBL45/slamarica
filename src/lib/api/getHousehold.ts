export async function getHousehold() {
    const res = await fetch("/api/household");

    if (!res.ok) {
        throw new Error("Failed to load household");
    }

    return res.json();
}