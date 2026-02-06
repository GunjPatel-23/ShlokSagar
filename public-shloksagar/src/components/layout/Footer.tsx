import { Link } from "react-router-dom";
import { Flower2, Heart } from "lucide-react";

const footerLinks = [
  {
    title: "Content",
    links: [
      { label: "Categories", href: "/categories" },
      { label: "Quotes", href: "/quotes" },
      { label: "Gita Sandesh", href: "/gita-sandesh" },
    ],
  },
  {
    title: "Media",
    links: [
      { label: "Wallpapers", href: "/wallpapers" },
      { label: "Festivals", href: "/festivals" },
    ],
  },
  {
    title: "Info",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/about#contact" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border mt-16">
      <div className="container-devotional py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Flower2 className="w-5 h-5 text-primary" />
              <span className="text-xl font-bold">Shlok Sagar</span>
            </Link>
            <p className="text-muted-foreground text-base leading-relaxed">
              A devotional platform dedicated to spreading the sacred wisdom of
              Bhajans, Aartis, Chalisas, and Shlokas.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-base">
            <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-1">
              Made with <Heart className="w-4 h-4 text-sacred-red fill-current" /> for devotees worldwide
            </p>
            <p className="text-muted-foreground text-center order-last md:order-none">
              © {new Date().getFullYear()} ShlokSagar. All rights reserved.
            </p>
            <p className="text-muted-foreground text-center md:text-right">
              Proudly developed by{' '}
              <a
                href="https://www.astrasoftinnovations.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                AstraSoft Innovations
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
