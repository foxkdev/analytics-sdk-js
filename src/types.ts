export interface PageDefaults {
    path: string;
    referrer: string;
    search: string;
    title: string;
    url: string;
    navigator: {
        name: string;
        version: string;
        userAgent: string;
        language: string;
        platform: string;
    }
  }