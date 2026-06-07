'use client'

export default function ProblemSection() {
  const problems = [
    {
      title: 'Parliamentary information is difficult to access',
      description: 'Citizens struggle to find and understand government documents and proceedings.'
    },
    {
      title: 'Documents are long and complex',
      description: 'Dense policy texts and legislative language alienate everyday citizens from governance.'
    },
    {
      title: 'Lack of government transparency',
      description: 'Citizens have limited visibility into how decisions are made and what they mean.'
    }
  ]

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Problem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Parliamentary information should be accessible to everyone. Today, it&apos;s not.
          </p>
        </div>

        {/* Problem Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              {/* Icon placeholder */}
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <span className="text-primary text-xl font-bold">0{idx + 1}</span>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3">
                {problem.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
