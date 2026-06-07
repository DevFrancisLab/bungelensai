'use client'

export default function FeaturesSection() {
  const features = [
    {
      title: 'AI Parliamentary Summaries',
      description: 'Get concise, accurate summaries of parliamentary proceedings in seconds.'
    },
    {
      title: 'Policy Q&A Assistant',
      description: 'Ask natural language questions about policies and get instant, authoritative answers.'
    },
    {
      title: 'Document Upload & Analysis',
      description: 'Upload any government or policy document for AI-powered analysis and explanation.'
    },
    {
      title: 'Simplified Explanations',
      description: 'Complex governance concepts explained in plain, everyday language.'
    },
    {
      title: 'Multi-Channel Access',
      description: 'Access insights via web, SMS, or WhatsApp—wherever you are.'
    },
    {
      title: 'Real-Time Updates',
      description: 'Stay informed with instant alerts on bills, policies, and government decisions.'
    }
  ]

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Key Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand governance and stay informed.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon Badge */}
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
