'use client'

export default function SolutionSection() {
  const solutions = [
    {
      title: 'AI-Powered Summaries',
      description: 'Instantly summarize parliamentary proceedings and complex policy documents into digestible insights.'
    },
    {
      title: 'Simple Explanations',
      description: 'Transform government jargon into plain language every citizen can understand.'
    },
    {
      title: 'Question & Answer',
      description: 'Ask questions about bills, policies, and government decisions—get instant, accurate answers.'
    },
    {
      title: 'Civic Intelligence',
      description: 'Access deep insights about government decisions and their potential impact on your community.'
    }
  ]

  return (
    <section className="py-20 px-6 bg-card">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Solution
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            BungeLens AI makes governance transparent, understandable, and accessible to all.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {solutions.map((solution, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-border hover:border-accent/50 hover:bg-background transition-all duration-300 hover:shadow-md"
            >
              {/* Accent line */}
              <div className="h-1 w-12 bg-accent rounded-full mb-4"></div>

              <h3 className="text-xl font-semibold text-foreground mb-3">
                {solution.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom accent message */}
        <div className="mt-16 p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center">
          <p className="text-lg font-medium text-foreground">
            Transparency breeds trust. Understanding breeds engagement.
          </p>
        </div>
      </div>
    </section>
  )
}
