export async function getNoise(lat, lon) {
    const apiKey = 'JsbJNzF3j2eh2P4MiEVW9LSiiBynlBdS'; // Replace with your real Meersens API key
    const url = `https://api.meersens.com/environment/public/noise/current?lat=${lat}&lng=${lon}`;

    try {
        const response = await fetch(url, {
            headers: {
                'apikey': `${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`Meersens API error: ${response.status}`);
        }

        const data = await response.json();

        console.log("Noise Data: " + JSON.stringify(data, null, 2))

        // Extract Lden (average daytime/evening/night level) if available
        const lden = data?.data?.Lden;
        return lden !== undefined ? lden : null;

    } catch (error) {
        console.error("Failed to fetch noise data:", error);
        return null;
    }
}



