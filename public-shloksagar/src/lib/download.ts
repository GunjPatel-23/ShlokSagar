export async function downloadResource(url: string, filename: string) {
    try {
        const res = await fetch(url, { mode: 'cors' });
        if (!res.ok) throw new Error(`Failed to fetch resource: ${res.status}`);
        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objectUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        // Revoke after a short delay to ensure download started
        setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
        return true;
    } catch (err) {
        // Fallback: open in new tab/window
        try {
            window.open(url, '_blank');
        } catch (e) {
            console.error('Failed to download or open resource', e);
        }
        return false;
    }
}
