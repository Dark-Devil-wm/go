import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Twitter as TwitterIcon, 
  Linkedin, 
  Youtube, 
  Phone
} from 'lucide-react';

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ className = '', iconSize = 20 }) => {
  const socials = [
    { icon: Instagram, href: 'https://instagram.com/strengthfitnesslondon', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/strengthfitnesslondon', label: 'Facebook' },
    { icon: TwitterIcon, href: 'https://twitter.com/strengthfitness', label: 'X (Twitter)' },
    { icon: Linkedin, href: 'https://linkedin.com/company/strengthfitnesslondon', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/@strengthfitness', label: 'YouTube' },
    { icon: Phone, href: 'https://wa.me/447857596220', label: 'WhatsApp' },
  ];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-brand-blue transition-colors"
          aria-label={social.label}
        >
          <social.icon size={iconSize} />
        </a>
      ))}
    </div>
  );
};
