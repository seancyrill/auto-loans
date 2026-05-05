# Auto Loans

A Next.js web application that streamlines loan applications for financing companies in the local area. Users fill out a single online form, and the app automatically generates all required documents and dispatches them directly to the appropriate consultants — eliminating unnecessary branch visits and back-and-forth communication.

## Features

- **Online Application Form** — A clean, guided form that collects all necessary applicant information in one sitting.
- **Automated Document Generation** — Uses `pdf-lib` to auto-fill and generate all required loan application documents (e.g., application forms, disclosure sheets, authorization letters) based on user-submitted data.
- **Multi-Company Support** — Supports multiple prominent local financing companies, each with their own document templates and consultant routing.
- **Automated Email Dispatch** — Uses `Nodemailer` to instantly send the generated documents to the respective loan consultants upon form submission.
- **Fast Processing** — Applications are received by consultants ready for review, significantly cutting down processing time.
- **Hassle-Free Experience** — Applicants no longer need to physically visit a branch just to submit paperwork.

## Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn
- Gmail account with app password

### Installation

```bash
# Clone the repository
git clone https://github.com/your_username/auto-loans.git
cd auto-loans

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory and configure the following:

```env
GMAIL_USER=your-email@example.com
GMAIL_APP_PASSWORD=password here

GDFI_EMAIL=gdfi-email@example.com
DEFAULT_EMAIL=default-email@example.com

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---
