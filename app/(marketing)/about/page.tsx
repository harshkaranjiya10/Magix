// app/about/page.tsx

import { Mail, MapPin, Phone } from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section id="hero" className="border-b">
        <div className="container mx-auto px-6 py-20 text-center">
          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-sm font-medium text-purple-400">
            About MagixThenics
          </span>

          <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
            Build Strength.
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {" "}
              Unlock Potential.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            MagixThenics is a modern calisthenics platform designed to help
            athletes master bodyweight training through progressive workouts,
            mobility systems, freestyle movement, and aesthetic conditioning.
          </p>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="container mx-auto px-6 py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-3xl border bg-card/50 p-8 backdrop-blur">
            <h2 className="text-3xl font-bold">Who We Are</h2>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              We are passionate athletes, coaches, and creators focused on
              making calisthenics accessible to everyone. Whether you're a
              beginner starting push-ups or an advanced athlete training
              freestyle skills, MagixThenics gives you the tools to progress.
            </p>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              Our mission is to help people build strength naturally, improve
              mobility, and create discipline through consistent training.
            </p>
          </div>

          <div className="rounded-3xl border bg-card/50 p-8 backdrop-blur">
            <h2 className="text-3xl font-bold">Our Focus</h2>

            <ul className="mt-6 space-y-4 text-muted-foreground">
              <li>🔥 Calisthenics Strength Training</li>
              <li>⚡ Freestyle & Dynamic Skills</li>
              <li>🧘 Mobility & Flexibility</li>
              <li>💪 Aesthetic Physique Development</li>
              <li>📈 Progressive Tracking & Coaching</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-y bg-muted/30">
        <div className="container mx-auto px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold">Contact Us</h2>

            <p className="mt-4 text-muted-foreground">
              Have questions, feedback, or partnership inquiries? We'd love to
              hear from you.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            <div className="rounded-2xl border bg-card p-6 text-center">
              <Mail className="mx-auto h-8 w-8 text-purple-400" />

              <h3 className="mt-4 text-xl font-semibold">Email</h3>

              <p className="mt-2 text-muted-foreground">
                support@magixthenics.com
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-6 text-center">
              <Phone className="mx-auto h-8 w-8 text-purple-400" />

              <h3 className="mt-4 text-xl font-semibold">Phone</h3>

              <p className="mt-2 text-muted-foreground">+91 98765 43210</p>
            </div>

            <div className="rounded-2xl border bg-card p-6 text-center">
              <MapPin className="mx-auto h-8 w-8 text-purple-400" />

              <h3 className="mt-4 text-xl font-semibold">Location</h3>

              <p className="mt-2 text-muted-foreground">
                Surat, Gujarat, India
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="container mx-auto px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>

            <p className="mt-4 text-muted-foreground">
              Everything you need to know about MagixThenics.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border bg-card p-6"
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>

                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

const faqs = [
  {
    question: "What is MagixThenics?",
    answer:
      "MagixThenics is a calisthenics and bodyweight training platform focused on strength, mobility, freestyle skills, and aesthetic development.",
  },
  {
    question: "Can beginners join?",
    answer:
      "Absolutely. Our programs are designed for all levels, from complete beginners to advanced athletes.",
  },
  {
    question: "Do I need gym equipment?",
    answer:
      "Most workouts require minimal or no equipment. You can train anywhere, anytime.",
  },
  {
    question: "How do I track progress?",
    answer:
      "MagixThenics includes guided progress systems, workout tracking, and structured training plans.",
  },
]
