
export interface Project {
  title: string;
  stack: string[];
  description: string;
  features: string[];
  imageUrl: string;
  links: {
    code?: {
      label: string;
      url: string;
    }[];
    live?: string;
  };
}

export interface SkillGroup {
  category: string;
  skills: string[];
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}
