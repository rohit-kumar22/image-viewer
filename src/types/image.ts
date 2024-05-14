export interface Image {
    id: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    alt_description: string | null;
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
      small_s3?: string;
    };
    user: {
      id: string;
      username: string;
      name: string;
      profile_image: {
        small: string;
        medium: string;
        large: string;
      };
    };
  }
  