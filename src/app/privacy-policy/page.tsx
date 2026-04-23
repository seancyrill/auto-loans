export default function PrivacyPolicy() {
  const lastUpdated = "April 23, 2026"

  const sections = [
    {
      title: "Who We Are",
      content:
        "We are the personal information controller of this application, as defined under Republic Act No. 10173, also known as the Data Privacy Act of 2012 (DPA). We are committed to protecting your personal information and upholding your rights as a data subject.",
    },
    {
      title: "What Information We Collect",
      content:
        "We collect only the personal information necessary to process your application documents. This may include your name, contact details, identification numbers, and other information relevant to the documents you are preparing. We collect this information directly from you.",
    },
    {
      title: "How We Use Your Information",
      content:
        "Your information is used solely to process and generate the application documents you request. We do not store, retain, or build any database of your personal information. Once your documents are processed and transmitted to your chosen partner, your data is no longer held by us.",
    },
    {
      title: "No Data Storage",
      content:
        "This application does not operate a database and does not retain your personal information after processing. Your data exists only transiently during the document generation process and is not kept, archived, or used for any other purpose.",
    },
    {
      title: "Sharing with Authorized Partners",
      content:
        "Your processed documents and associated personal information are transmitted only to the authorized partner you select within the application. These partners are third-party entities who will receive and handle your data in connection with your application. You control which partner receives your information. Each partner is responsible for handling your personal data in accordance with the DPA and their own privacy policies once it is in their possession.",
    },
    {
      title: "Your Rights as a Data Subject",
      content:
        "Under the Data Privacy Act of 2012, you have the right to be informed of how your data is processed; the right to access your personal information; the right to correct inaccurate data; the right to object to processing; the right to erasure or blocking of your data; the right to lodge a complaint with the National Privacy Commission (NPC) at www.privacy.gov.ph.",
    },
    {
      title: "Data Security",
      content:
        "We implement reasonable technical and organizational measures to protect your personal information during processing and transmission. Data sent to your chosen partner is transmitted securely. However, we encourage you to review the privacy practices of the partner you select, as they become the data controller once your information is in their hands.",
    },
    {
      title: "Consent",
      content:
        "By using this application and submitting your information, you give your consent to the collection and processing of your personal data for the purposes described in this policy, in accordance with Section 13 of the Data Privacy Act of 2012.",
    },
    {
      title: "Changes to This Policy",
      content:
        "We may update this Privacy Policy to reflect changes in our practices or legal requirements. Updates will be posted within the application. Continued use of the application after changes are posted constitutes your acceptance of the revised policy.",
    },
  ]

  return (
    <main className="bg-primary text-accent min-h-screen pt-17.5 font-sans">
      {/* Top accent bar */}
      <div className="bg-accent h-1 w-full" />

      <div className="mx-auto max-w-2xl px-6 py-16">
        {/* Header */}
        <header className="mb-14">
          <p className="text-secondary mb-3 font-mono text-xs tracking-[0.2em] uppercase">Legal · Philippines</p>
          <h1 className="text-accent text-4xl font-semibold tracking-tight">Privacy Policy</h1>
          <p className="text-secondary mt-3 font-mono text-sm">Last updated: {lastUpdated}</p>
          <div className="bg-off mt-8 h-px w-full" />
        </header>

        {/* Intro */}
        <p className="text-secondary mb-12 text-sm leading-7">
          This Privacy Policy is issued in compliance with Republic Act No. 10173 (Data Privacy Act of 2012) and its
          Implementing Rules and Regulations. It describes how we collect, use, and transmit your personal information
          when you use our application.
        </p>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, i) => (
            <section key={i}>
              <div className="flex items-start gap-4">
                <span className="text-accent pt-0.5 font-mono text-xs tabular-nums select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h2 className="text-accent mb-2 text-base font-semibold tracking-tight">{section.title}</h2>
                  <p className="text-secondary text-sm leading-7">{section.content}</p>
                </div>
              </div>
              {i < sections.length - 1 && <div className="bg-off mt-10 h-px w-full" />}
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer className="border-off mt-12 border-t pt-8">
          <p className="text-secondary font-mono text-xs">© {new Date().getFullYear()} Auto Loans.</p>
        </footer>
      </div>
    </main>
  )
}
