'use client'

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Upload or Select',
      description: 'Choose a parliamentary document, bill, or policy to analyze'
    },
    {
      number: '02',
      title: 'AI Processes',
      description: 'Our AI analyzes the content and extracts key insights instantly'
    },
    {
      number: '03',
      title: 'Explore & Understand',
      description: 'Ask questions, view summaries, or read simplified explanations'
    }
  ]

  return (
    <section className="py-20 px-6 bg-card">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to understand any policy or parliamentary discussion.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden md:block absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-30"></div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Step Circle */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-white font-bold text-2xl">{step.number}</span>
                </div>

                {/* Step Content */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
