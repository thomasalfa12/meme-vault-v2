import { Lightbulb, Zap, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Lightbulb size={40} className="text-primary" />,
      title: "Create Campaign",
      description:
        "Launch your meme fundraising campaign easily in just a few clicks.",
    },
    {
      icon: <Zap size={40} className="text-primary" />,
      title: "Get Funded",
      description:
        "Share your campaign and receive crypto donations from supporters around the world.",
    },
    {
      icon: <CheckCircle size={40} className="text-primary" />,
      title: "Make Impact",
      description:
        "Use the raised funds to make your meme project go viral or support your cause.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex justify-center mb-6">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
