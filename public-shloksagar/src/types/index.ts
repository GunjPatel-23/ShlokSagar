// Type definitions for ShlokSagar application

export interface Category {
    id: string;
    name: string;
    hindiName: string;
    image: string;
    itemCount: number;
    slug?: string;
}

export interface Quote {
    id: string;
    text: string;
    mediaUrl: string;
    mediaType: "image" | "video";
    date: string;
}

export interface GitaSandesh {
    id: string;
    shlok: string;
    meaning: string;
    mediaUrl?: string;
    mediaType?: "image" | "video";
    date: string;
    chapter?: number;
    verse?: number;
    adhyayName?: string;
    shlokName?: string;
}

export interface Wallpaper {
    id: string;
    title: string;
    imageUrl: string;
    category: string;
    downloadUrl: string;
}

export interface Festival {
    id: string;
    name: string;
    hindiName: string;
    dateRange: string;
    description: string;
    imageUrl: string;
}

export interface ContentItem {
    id: string;
    title: string;
    subtitle?: string;
    text: string;
    type: "bhajan" | "aarti" | "chalisa" | "stotra";
    deity: string;
    language: "hindi" | "gujarati" | "english";
    audioUrl?: string;
}

export interface CategoryContent {
    bhajan: ContentItem[];
    aarti: ContentItem[];
    chalisa: ContentItem[];
    stotra: ContentItem[];
}

export interface Content {
    bhajan: any[];
    aarti: any[];
    chalisa: any[];
    stotra: any[];
}
