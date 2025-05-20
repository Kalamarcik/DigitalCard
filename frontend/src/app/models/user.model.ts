export interface SocialMedia {
    id: number;
    platform: string;
    url: string;
  }
  
  export interface User {
    id: number;
    username: string;
    fullName: string;
    bio: string;
    email: string;
    avatarUrl: string;
    socialMediaList: SocialMedia[];
  }
  