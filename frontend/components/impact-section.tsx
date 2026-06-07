'use client'

export default function ImpactSection() {
  const impacts = [
    {
      metric: 'Increased',
      title: 'Government Transparency',
      description: 'Make complex policies accessible to all citizens.'
    },
    {
      metric: 'Improved',
      title: 'Civic Awareness',
      description: 'Help citizens stay informed about decisions that affect them.'
    },
    {
      metric: 'Easier',
      title: 'Public Information Access',
      description: 'Democratize access to governance and policy information.'
    }
  ]

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            BungeLens AI is built to create real change in how citizens engage with governance.
          </p>
        </div>

        {/* Impact Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {impacts.map((impact, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-2xl border border-border bg-card overflow-hidden group hover:border-primary/50 transition-all duration-300"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
                  {impact.metric}
                </p>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {impact.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {impact.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 p-12 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary mb-2">1000+</p>
              <p className="text-muted-foreground">Documents Analyzed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-accent mb-2">10K+</p>
              <p className="text-muted-foreground">Citizens Empowered</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">24/7</p>
              <p className="text-muted-foreground">Always Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
