import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import SEOHead from "@/components/SEOHead";
import ContactForm from "@/components/ContactForm";
import { Heart, BookOpen, Users, Sparkles, FileText, Image, CalendarDays } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Pure Text Content",
    description: "Our primary focus is on readable, distraction-free text content. Bhajans, Aartis, Chalisas, and Shlokas are presented in clean, large fonts suitable for all ages.",
  },
  {
    icon: Users,
    title: "Elder-Friendly Design",
    description: "Designed with our elderly users in mind. Large fonts, high contrast colors, simple navigation, and no confusing elements make ShlokSagar accessible to everyone.",
  },
  {
    icon: Sparkles,
    title: "Daily Inspiration",
    description: "Start each day with wisdom from our Gita Sandesh and daily quotes. Visual content like wallpapers and festival creatives are kept in separate sections.",
  },
  {
    icon: Heart,
    title: "Made with Devotion",
    description: "Every piece of content is carefully curated and presented with love and respect for our sacred traditions. We strive to preserve and share our spiritual heritage.",
  },
];

const About = () => {
  return (
    <Layout>
      <SEOHead
        title="हमारे बारे में | About ShlokSagar"
        description="श्लोकसागर के बारे में जानें - एक पवित्र भक्ति मंच। Learn about ShlokSagar - A clean, distraction-free platform for sacred Hindu texts."
        keywords="हमारे बारे में, about, shloksagar, about us, mission, vision"
      />
      {/* Page Header */}
      <section className="py-12 bg-secondary/30">
        <div className="container-devotional">
          <h1 className="sr-only">About ShlokSagar</h1>
          <SectionHeader
            title="About ShlokSagar"
            subtitle="A devotional platform for the modern age"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12">
        <div className="container-devotional">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-readable text-muted-foreground mb-6">
              ShlokSagar (श्लोक सागर) meaning "Ocean of Verses" is a devotional platform
              dedicated to making sacred Hindu texts accessible to everyone. We believe
              that spiritual wisdom should be easy to read, free from distractions, and
              available to devotees of all ages.
            </p>
            <p className="text-readable text-muted-foreground">
              In an age of flashy websites and overwhelming content, we've chosen
              simplicity. Our platform prioritizes clean, readable text over flashy
              multimedia, making it perfect for daily prayers, study, and meditation.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-secondary/30">
        <div className="container-devotional">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            Why Choose ShlokSagar?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="card-sacred flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Structure Section */}
      <section className="py-12">
        <div className="container-devotional">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              Our Content Structure
            </h2>
            <div className="space-y-6">
              <div className="card-sacred flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Text-Based Sections</h3>
                  <p className="text-muted-foreground">
                    <strong>Categories:</strong> Each deity's page contains Bhajans, Aartis,
                    Chalisas, and Stotras in pure text format. No images or videos are mixed
                    with the sacred text to maintain focus during recitation.
                  </p>
                </div>
              </div>
              <div className="card-sacred flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Image className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Visual Sections</h3>
                  <p className="text-muted-foreground">
                    <strong>Quotes, Wallpapers & Festivals:</strong> Visual content like
                    images and videos are kept in separate, dedicated sections. This keeps
                    our text content clean while still offering beautiful devotional media.
                  </p>
                </div>
              </div>
              <div className="card-sacred flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CalendarDays className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Daily Content</h3>
                  <p className="text-muted-foreground">
                    <strong>Gita Sandesh & Quotes:</strong> Fresh daily content featuring
                    verses from the Bhagavad Gita and inspirational quotes to guide your
                    spiritual journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 bg-secondary/30">
        <div className="container-devotional">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Get in Touch
            </h2>
            <p className="text-readable text-muted-foreground mb-6">
              We'd love to hear from you. Whether you have suggestions for content,
              feedback on our platform, or just want to connect, please reach out.
            </p>
            <div className="bg-card rounded-xl border border-border p-6">
              <p className="text-lg text-foreground">
                Email: <span className="text-primary">contact@shloksagar.com</span>
              </p>
              <p className="text-muted-foreground mt-4 text-sm">
                (This is a demo website. Contact information is for illustration purposes.)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="pb-16">
        <div className="container-devotional">
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default About;
