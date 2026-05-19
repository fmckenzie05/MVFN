const sections = [
  {
    title: '1. Introduction',
    body: [
      'This Privacy Policy explains how Moral Value Foundation Network (“MVFN,” “we,” “us,” or “our”) collects, uses, stores, and shares information when you use the MVFN website, web application, mobile versions (if any), and related services (collectively, the “Service”).',
      'By using the Service, you acknowledge the practices described in this Privacy Policy.',
    ],
  },
  {
    title: '2. Information We Collect',
    body: [
      'We may collect information that you provide directly to us, information generated through your use of the Service, and information received from third-party providers you choose to use with the Service.',
    ],
    list: [
      'Account information, such as your name, email address, username, profile details, and login method.',
      'Community content, such as posts, comments, reflections, and other content you choose to publish or submit through the Service.',
      'Progress and usage information, such as completed lessons, preferences, and interaction data related to educational content.',
      'Device and technical information, such as browser type, operating system, approximate location derived from IP address, log data, and identifiers needed to operate and secure the Service.',
      'Authentication information received from third-party sign-in providers, subject to the permissions you grant and the provider’s policies.',
    ],
  },
  {
    title: '3. Information Stored Locally on Your Device',
    body: [
      'Some Service features may use browser storage or similar local device storage to save progress, preferences, language settings, session information, or temporary authentication data.',
      'For example, lesson completion progress and certain account or language preferences may be stored locally in your browser to improve your experience.',
      'If you clear browser storage, switch devices, or use a private browsing mode, some of that information may be lost or unavailable.',
    ],
  },
  {
    title: '4. How We Use Information',
    list: [
      'provide, operate, maintain, and improve the Service;',
      'create and manage user accounts and profiles;',
      'display community posts, comments, reflections, and related interactions;',
      'track lesson progress and personalize the learning experience;',
      'authenticate users and help prevent fraud, abuse, and unauthorized access;',
      'communicate with you about updates, support requests, legal notices, and service changes;',
      'analyze usage trends and improve safety, usability, and performance; and',
      'comply with legal obligations and enforce our Terms of Service.',
    ],
  },
  {
    title: '5. Community and Public Content',
    body: [
      'If you submit posts, comments, profile content, or other materials to community features of the Service, that information may be visible to other users of the Service.',
      'Please do not post sensitive personal information or third-party personal information that you do not have permission to share.',
    ],
  },
  {
    title: '6. Third-Party Sign-In and Services',
    body: [
      'If you choose to sign in using a third-party provider, such as a social platform, we may receive certain account information from that provider as permitted by your settings and their policies.',
      'The Service may also rely on third-party infrastructure, hosting, analytics, authentication, payment, or content delivery providers.',
      'Those third parties may process information under their own privacy policies and contractual obligations.',
    ],
  },
  {
    title: '7. How We Share Information',
    body: [
      'We do not sell your personal information for money. We may share information in the following circumstances:',
    ],
    list: [
      'with service providers and contractors who help us operate the Service;',
      'with other users, when you choose to publish or share content in community areas;',
      'with professional advisors, auditors, insurers, or legal representatives as needed;',
      'in connection with a merger, acquisition, financing, reorganization, sale of assets, or similar transaction; and',
      'when required by law, regulation, legal process, or to protect rights, safety, and security.',
    ],
  },
  {
    title: '8. Data Retention',
    body: [
      'We retain personal information for as long as reasonably necessary to provide the Service, comply with legal obligations, resolve disputes, enforce agreements, and maintain legitimate business records.',
      'Retention periods may vary depending on the type of information and the reason it was collected.',
    ],
  },
  {
    title: '9. Security',
    body: [
      'We use reasonable administrative, technical, and organizational measures designed to protect personal information. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    title: '10. Children’s Privacy',
    body: [
      'The Service is not intended for children under the age at which personal data processing is permitted without parental consent under applicable law, unless expressly stated otherwise.',
      'If you believe a child has provided personal information in violation of applicable law, contact us so we can review and take appropriate action.',
    ],
  },
  {
    title: '11. Your Rights and Choices',
    body: [
      'Depending on your location, you may have rights regarding your personal information, including rights to access, correct, delete, restrict, object to, or receive a copy of certain personal information.',
      'You may also be able to update certain information through your account settings or by contacting us.',
      'We may need to verify your identity before acting on certain requests.',
    ],
  },
  {
    title: '12. International Data Transfers',
    body: [
      'If you access the Service from outside the country where our systems or service providers are located, your information may be transferred to and processed in other jurisdictions that may have different data protection laws.',
      'Where required, we will take appropriate measures to protect transferred information.',
    ],
  },
  {
    title: '13. Changes to This Privacy Policy',
    body: [
      'We may update this Privacy Policy from time to time. If we make material changes, we will update the effective date and may provide additional notice within the Service or by other appropriate means.',
      'Your continued use of the Service after the revised Privacy Policy becomes effective constitutes your acknowledgment of the updated policy.',
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="page-container">
      <div className="legal-page">
        <div className="legal-hero">
          <div className="legal-eyebrow">Legal</div>
          <h1>Privacy Policy</h1>
          <p className="legal-subtitle">
            This policy explains what information the platform collects, how it is used,
            and how community, account, and progress data are handled.
          </p>
          <div className="legal-meta">
            <span>Last updated: [DATE]</span>
            <span>Operator: [LEGAL ENTITY NAME]</span>
          </div>
        </div>

        <div className="legal-card">
          <p>
            This Privacy Policy explains how Moral Value Foundation Network (“MVFN,”
            “we,” “us,” or “our”) collects, uses, stores, and shares information when
            you use the website, web application, mobile versions (if any), and related
            services (collectively, the “Service”).
          </p>
          <p>
            By using the Service, you acknowledge the practices described in this
            Privacy Policy.
          </p>
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
          <h2>14. Contact Us</h2>
          <p>If you have questions or requests about this Privacy Policy, contact us at:</p>
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
