const sections = [
  {
    title: '1. Scope of the Service',
    body: [
      'MVFN is an educational and community platform centered on the Moral Value Foundation Network framework. The Service may include interactive lessons, quizzes, reflections, progress tracking, profiles, community posts, comments, and related learning tools.',
      'We may update, improve, or modify the Service from time to time.',
    ],
  },
  {
    title: '2. Eligibility and Accounts',
    body: [
      'You must be at least the age of majority in your jurisdiction, or have permission from a parent or legal guardian where permitted by law, to use the Service.',
      'When you create an account, you agree to provide accurate information, keep your login credentials secure, remain responsible for activity under your account, and notify us promptly if you believe your account has been accessed without authorization.',
      'You may not share your account with another person or impersonate anyone else.',
    ],
  },
  {
    title: '3. License to Use the Service',
    body: [
      'Subject to your compliance with these Terms, MVFN grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable right to access and use the Service for your personal, educational, and lawful internal use.',
      'No ownership rights are transferred to you. All rights not expressly granted are reserved by MVFN and its licensors.',
    ],
  },
  {
    title: '4. Community Features and User Content',
    body: [
      'The Service may allow you to submit, upload, publish, or share content such as profile information, posts, comments, reflections, messages, and other materials (“User Content”).',
      'You retain ownership of your User Content. By submitting User Content through the Service, you grant MVFN a worldwide, non-exclusive, royalty-free license to host, store, reproduce, adapt, display, distribute, and otherwise use that User Content as necessary to operate, maintain, improve, promote, and provide the Service.',
      'You are solely responsible for your User Content and represent that you have the rights necessary to submit it and that it does not violate any law or third-party rights.',
      'We may, but are not required to, review, moderate, remove, or restrict User Content at our discretion.',
    ],
  },
  {
    title: '5. Acceptable Use',
    list: [
      'use the Service for any unlawful purpose or in violation of applicable law;',
      'harass, threaten, exploit, or harm other users;',
      'post false, misleading, infringing, or harmful content;',
      'upload third-party personal data without authorization;',
      'interfere with or disrupt the integrity, security, or performance of the Service;',
      'attempt to gain unauthorized access to the Service or related systems;',
      'scrape, crawl, copy, or data-mine the Service except as expressly permitted by us;',
      'reverse engineer, decompile, or attempt to derive source code from the Service except where applicable law prevents us from restricting that activity; or',
      'use the Service to distribute spam, malware, or other harmful code.',
    ],
  },
  {
    title: '6. Educational Purpose Disclaimer',
    body: [
      'The Service is provided for educational, informational, and community discussion purposes. It is not legal, medical, mental health, or other professional advice.',
      'You are responsible for how you interpret and use any information or educational content made available through the Service.',
    ],
  },
  {
    title: '7. Progress Tracking and Local Device Storage',
    body: [
      'Some features of the Service may store progress, preferences, or other usage information locally on your device or browser.',
      'Locally stored information may be lost if you clear browser storage, switch devices, or uninstall the application, unless and until cloud synchronization or backup features are expressly provided.',
    ],
  },
  {
    title: '8. Third-Party Services',
    body: [
      'The Service may integrate with or rely on third-party services, including authentication providers, hosting providers, analytics tools, payment processors, or social platforms.',
      'We are not responsible for third-party services, content, or websites, and your use of them may be subject to separate terms and privacy policies.',
    ],
  },
  {
    title: '9. Intellectual Property',
    body: [
      'The Service, including its software, design, text, graphics, logos, lesson materials, audiovisual elements, and other content provided by MVFN, is owned by or licensed to MVFN and is protected by intellectual property laws.',
      'Except for the limited license granted in these Terms, you may not copy, modify, distribute, sell, lease, publicly display, publicly perform, or create derivative works from the Service or our content without our prior written permission.',
    ],
  },
  {
    title: '10. Privacy',
    body: [
      'Your use of the Service is also subject to our Privacy Policy, which describes how we collect, use, and disclose personal information.',
      'By using the Service, you acknowledge that we may process personal information in accordance with the Privacy Policy.',
    ],
  },
  {
    title: '11. Paid Features and Fees',
    body: [
      'Certain features of the Service may currently be free, and some features may become paid in the future.',
      'If we offer paid subscriptions, premium access, digital content, or other paid features, we will present the applicable pricing, billing terms, renewal terms, and refund rules to you before you are charged.',
      'Unless otherwise required by law or expressly stated at the time of purchase, fees are non-refundable.',
    ],
  },
  {
    title: '12. Availability and Changes',
    body: [
      'We do not guarantee that the Service will always be available, uninterrupted, secure, or error-free.',
      'We may suspend, restrict, or discontinue all or part of the Service at any time, including for maintenance, updates, security issues, or legal reasons.',
      'We may also change features or functionality at any time.',
    ],
  },
  {
    title: '13. Termination',
    body: [
      'You may stop using the Service at any time.',
      'We may suspend or terminate your access to the Service, or remove content, if we reasonably believe that you have violated these Terms, your use of the Service creates risk for us or others, or we are required to do so by law.',
      'Upon termination, the rights granted to you under these Terms will cease immediately. Sections that by their nature should survive termination will survive.',
    ],
  },
  {
    title: '14. Disclaimers',
    body: [
      'To the maximum extent permitted by law, the Service is provided “as is” and “as available” without warranties of any kind, whether express, implied, or statutory.',
      'We do not warrant that the Service will meet your requirements, achieve any particular learning outcome, be uninterrupted, be secure, or be free of errors or harmful components.',
    ],
  },
  {
    title: '15. Limitation of Liability',
    body: [
      'To the maximum extent permitted by law, MVFN and its affiliates, officers, directors, employees, contractors, licensors, and service providers will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of data, profits, revenue, goodwill, or business opportunities arising out of or related to your use of or inability to use the Service.',
      'To the maximum extent permitted by law, the total liability of MVFN for all claims arising out of or relating to the Service or these Terms will not exceed the greater of: (a) the amount you paid to MVFN for the Service in the 12 months before the claim arose; or (b) USD 100.',
      'Nothing in these Terms limits liability that cannot be limited under applicable law.',
    ],
  },
  {
    title: '16. Indemnification',
    body: [
      'You agree to defend, indemnify, and hold harmless MVFN and its affiliates, personnel, licensors, and service providers from and against claims, liabilities, damages, judgments, losses, costs, expenses, and fees arising out of or related to your User Content, misuse of the Service, violation of these Terms, or violation of any law or third-party right.',
    ],
  },
  {
    title: '17. Changes to These Terms',
    body: [
      'We may update these Terms from time to time. If we make material changes, we will provide notice by updating the date above and, where appropriate, by additional notice within the Service or by email.',
      'Your continued use of the Service after revised Terms become effective constitutes your acceptance of the revised Terms.',
    ],
  },
  {
    title: '18. Governing Law and Dispute Resolution',
    body: [
      'These Terms are governed by the laws of [JURISDICTION], excluding its conflict of laws rules.',
      'Any dispute, claim, or controversy arising out of or relating to these Terms or the Service will be resolved exclusively in the courts located in [VENUE], unless applicable consumer protection law requires otherwise.',
    ],
  },
  {
    title: '19. Miscellaneous',
    body: [
      'If any provision of these Terms is found unenforceable, the remaining provisions will remain in full force and effect.',
      'Our failure to enforce any provision of these Terms will not be deemed a waiver.',
      'You may not assign or transfer your rights or obligations under these Terms without our prior written consent. We may assign these Terms in connection with a merger, acquisition, reorganization, or sale of assets.',
      'These Terms, together with any policies or additional terms expressly incorporated by reference, constitute the entire agreement between you and MVFN regarding the Service.',
    ],
  },
];

export default function TermsOfService() {
  return (
    <div className="page-container">
      <div className="legal-page">
        <div className="legal-hero">
          <div className="legal-eyebrow">Legal</div>
          <h1>Terms of Service</h1>
          <p className="legal-subtitle">
            These terms govern access to and use of the Moral Value Foundation Network
            platform and community features.
          </p>
          <div className="legal-meta">
            <span>Last updated: [DATE]</span>
            <span>Operator: [LEGAL ENTITY NAME]</span>
          </div>
        </div>

        <div className="legal-card">
          <p>
            These Terms of Service (“Terms”) govern your access to and use of the Moral
            Value Foundation Network application, including the website, web application,
            mobile versions (if any), and related services (collectively, the “Service”).
            The Service is operated by [LEGAL ENTITY NAME] (“MVFN,” “we,” “us,” or
            “our”).
          </p>
          <p>
            By creating an account, accessing, or using the Service, you agree to be
            bound by these Terms. If you are using the Service on behalf of an
            organization, you represent that you have authority to bind that organization
            to these Terms.
          </p>
          <p>If you do not agree to these Terms, do not use the Service.</p>
        </div>

        {sections.map(section => (
          <section key={section.title} className="legal-card legal-section">
            <h2>{section.title}</h2>
            {section.body?.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.list && (
              <ul className="legal-list">
                {section.list.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="legal-card legal-section">
          <h2>20. Contact Information</h2>
          <p>If you have questions about these Terms, contact us at:</p>
          <div className="legal-contact">
            <div>[LEGAL ENTITY NAME]</div>
            <div>[BUSINESS ADDRESS]</div>
            <div>[CONTACT EMAIL]</div>
          </div>
        </section>
      </div>
    </div>
  );
}
