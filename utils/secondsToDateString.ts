export function formatSecondsToHHMMSS(seconds: number): string {
    // Ensure the input is a non-negative integer
    if (seconds < 0 || !Number.isInteger(seconds)) {
        throw new Error("Input must be a non-negative integer.");
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Format each component as two digits
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}