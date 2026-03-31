import { ApplicationFormType } from "@/app/context/form-context-types"
import fs from "fs"
import path from "path"
import { PDFDocument, PDFFont, PDFPage, rgb, RGB, StandardFonts } from "pdf-lib"

const BLACK = rgb(0, 0, 0)
const PDF_HEIGHT = 1008

export async function fillGdfiApplication(data: ApplicationFormType): Promise<Uint8Array> {
  const pdfPath = path.join(process.cwd(), "src/templates/gdfi-application.pdf")
  const templateBytes = fs.readFileSync(pdfPath)

  const pdfDoc = await PDFDocument.load(templateBytes)
  const pages = pdfDoc.getPages()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  fillPage1(pages[0], data, font)
  fillPage2(pages[1], data, font)
  fillPage3(pages[2], data, font)

  return pdfDoc.save()
}

/**
 * Converts structure-extracted "top" coordinate (y=0 at top)
 * to pdf-lib y coordinate (y=0 at bottom).
 */
function y(top: number, offsetDown = 0): number {
  return PDF_HEIGHT - top - offsetDown
}

function draw(page: PDFPage, text: string, x: number, top: number, font: PDFFont, size = 8, color: RGB = BLACK) {
  if (!text) return
  page.drawText(text, { x, y: y(top), size, font, color })
}

function checkMark(page: PDFPage, x: number, top: number, font: PDFFont) {
  draw(page, "X", x, top, font, 7)
}

export function fillPage1(page: PDFPage, data: ApplicationFormType, font: PDFFont) {
  // ─── DATE (top-right) ───────────────────────────────────────────────────
  // Label ends at x=530.6, top=94.4
  draw(page, new Date().toLocaleDateString("en-US"), 540, 94.4, font, 8)

  // ─── BORROWER'S PERSONAL INFORMATION ────────────────────────────────────

  // Full Name — "Last Name, First Name, Middle Name, Suffix"
  // Entry area starts after the sub-label "(Last Name, First Name...)" at top≈306
  // The row label "Full Name" is at top=324.2; entry row is ~320–342
  const fullName = [data.lastName, data.firstName, data.middleName, data.nameSuffix].filter(Boolean).join(", ")
  draw(page, fullName, 140, 322, font, 8)

  // Civil Status checkboxes — row top≈317–328
  // Single x≈432, Annulled x≈487, Separated x≈540, Married x≈433 (row2), Common Law x≈491 (row2)
  if (data.civilStatus === "single") checkMark(page, 432, 316, font)
  if (data.civilStatus === "annulled") checkMark(page, 487, 316, font)
  if (data.civilStatus === "separated") checkMark(page, 540, 316, font)
  if (data.civilStatus === "married") checkMark(page, 433, 327, font)
  if (data.civilStatus === "commonLaw") checkMark(page, 491, 327, font)

  // Date of Birth — top≈353.9, entry starts at x=140
  draw(page, data.birthDate, 140, 354, font, 8)

  // Place of Birth — same row, after (City/Municipality) label at x≈285.9
  draw(page, data.birthPlace, 286, 354, font, 8)

  // Gender — same row, entry after label at x≈432
  draw(page, data.gender === "male" ? "Male" : data.gender === "female" ? "Female" : "", 432, 354, font, 8)

  // Present Address — top≈386.4, entry from x=140 to x=430
  draw(page, data.presentAddress, 140, 386, font, 8)
  // Length of stay years/months — x≈432, top≈389
  draw(page, data.addressPresYears, 432, 389, font, 8)
  draw(page, data.addressPresMonths, 463, 389, font, 8)

  // Permanent Address — top≈413.3
  draw(page, data.permanentAddress, 140, 413, font, 8)
  draw(page, data.addressPermYears, 432, 415, font, 8)
  draw(page, data.addressPermMonths, 463, 415, font, 8)

  // Provincial Address — top≈440.1
  draw(page, data.provincialAddress, 140, 440, font, 8)
  draw(page, data.addressProvYears, 432, 443, font, 8)
  draw(page, data.addressProvMonths, 463, 443, font, 8)

  // Contact Details — top≈459–464
  // Mobile at x≈240, Email at x≈370
  draw(page, data.mobile, 252, 465, font, 8)
  // draw(page, data.email,        370, 465, font, 8)

  // Citizenship — checkboxes at top≈487.2
  // Filipino checkbox at x≈142, Others at x≈216
  if (data.citizenship === "filipino") checkMark(page, 142, 487, font)
  if (data.citizenship === "others") checkMark(page, 216, 487, font)
  if (data.citizenship === "others" && data.citizenshipOther) {
    draw(page, data.citizenshipOther, 428, 487, font, 8)
  }

  // TIN / SSS / GSIS — top≈512.3
  // TIN entry after x≈157, SSS after x≈272, GSIS after x≈382
  draw(page, data.tin, 157, 512, font, 8)
  draw(page, data.sssNumber, 272, 512, font, 8)
  draw(page, data.gsisNumber, 382, 512, font, 8)

  // School Last Attended — top≈534–545
  // School Name entry at x≈199, top≈534
  draw(page, data.schoolName, 199, 534, font, 8)
  // Grade/Level entry at x≈266, top≈545
  draw(page, data.schoolGradeLevel, 266, 545, font, 8)
  // Year Graduated entry at x≈497, top≈545
  draw(page, data.schoolYearGraduated, 497, 545, font, 8)

  // House Ownership — checkboxes at top≈560–581
  // Owned (Not mortgaged) at x≈148, Rented at x≈274, Owned (Mortgaged) at x≈148 row2, Used Free at x≈148 row3
  if (data.houseOwnership === "owned (Not Mortgaged)") checkMark(page, 148, 560, font)
  if (data.houseOwnership === "rented") {
    checkMark(page, 274, 560, font)
    draw(page, data.houseRentMonthly, 421, 560, font, 8)
    draw(page, data.houseOwnedBy, 368, 592, font, 8)
  }
  if (data.houseOwnership === "owned (Mortgaged)") {
    checkMark(page, 148, 571, font)
    draw(page, data.houseMortgageMonthly, 359, 571, font, 8)
    draw(page, data.houseOwnedBy, 385, 603, font, 8)
  }
  if (data.houseOwnership === "used Free") {
    checkMark(page, 148, 581, font)
    draw(page, data.houseOwnedBy, 381, 614, font, 8)
  }

  // Dependents — 3 rows starting at top≈652, each row ~16pts apart
  const depRowTops = [655, 671, 687]
  data.dependents.slice(0, 3).forEach((dep, i) => {
    const rowTop = depRowTops[i]
    draw(page, dep.name, 140, rowTop, font, 8)
    draw(page, dep.age, 157, rowTop, font, 8)
    draw(page, dep.schoolLastAttended, 200, rowTop, font, 8)
    draw(page, dep.relationship, 479, rowTop, font, 8)
  })

  // ─── INCOME INFORMATION ─────────────────────────────────────────────────

  // Name of Employer / Business — top≈713.6
  if (data.incomeNotApplicable) {
    checkMark(page, 473, 713, font)
  } else {
    draw(page, data.employerName, 217, 713, font, 8)
    draw(page, data.businessName, 357, 713, font, 8)
  }

  // Monthly Income & Length of stay — top≈742
  draw(page, data.monthlyIncome, 206, 742, font, 8)
  draw(page, data.employmentYears, 487, 747, font, 8)
  draw(page, data.employmentMonths, 520, 747, font, 8)

  // Business Tel. No. — top≈760.8
  draw(page, data.businessTelNumber, 543, 760, font, 8)

  // Employer / Business Address — top≈775–786
  draw(page, data.employerBusinessAddress, 140, 781, font, 8)

  // PRC License No — top≈791.8, entry after x≈248
  draw(page, data.prcLicenseNumber, 248, 791, font, 8)

  // Source of Income checkboxes — row1 top≈815, row2 top≈827
  // Row 1: Employment x≈148, Remittance x≈228, Pension x≈301, Commissions x≈408
  // Row 2: Business x≈148, Interest Income x≈227, Sale of Assets x≈317
  if (data.incomeSources.includes("employment")) checkMark(page, 148, 815, font)
  if (data.incomeSources.includes("remittance")) checkMark(page, 228, 815, font)
  if (data.incomeSources.includes("pension")) checkMark(page, 301, 815, font)
  if (data.incomeSources.includes("commissions")) checkMark(page, 408, 815, font)
  if (data.incomeSources.includes("business")) checkMark(page, 148, 827, font)
  if (data.incomeSources.includes("interestIncome")) checkMark(page, 227, 827, font)
  if (data.incomeSources.includes("sale Of Assets")) checkMark(page, 317, 827, font)
}

/**
 * Page 2 covers: Nature of Work, Character/Trade References (manual),
 * Spouse/Co-Borrower info, and Borrower's Bank Accounts.
 *
 * This function fills the fields derived from ApplicationFormType.
 * Character References and Trade References are left blank (filled manually).
 */
export function fillPage2(page: PDFPage, data: ApplicationFormType, font: PDFFont) {
  // ─── NATURE OF WORK checkboxes ───────────────────────────────────────────
  // Checkboxes are in two columns. Left column top starts ~70, right column same row.
  // Each row is ~11pts apart. Left col x≈148, Right col x≈345
  // Row tops (approx): 70, 81, 92, 103, 114, 125, 136, 147, 158, 169, 180, 191
  const natureOfWorkLeftCol: [string, number][] = [
    ["agricultureAnimalFarming", 70],
    ["foodServicesFoodProcessing", 81],
    ["realEstateLeasing", 92],
    ["bpoKpo", 103],
    ["governmentService", 114],
    ["tourism", 125],
    ["casinoGamingClub", 136],
    ["itSoftware", 147],
    ["transportation", 158],
    ["construction", 169],
    ["lawAccountingAuditingFirm", 180],
    ["wholesaleRetailTrade", 191],
  ]
  const natureOfWorkRightCol: [string, number][] = [
    ["financeInsuranceSecurities", 70],
    ["manufacturing", 81],
    ["utilities", 92],
    ["forexMoneyChangerRemittance", 103],
    ["maritimeShipping", 114],
    ["foundation", 125],
    ["medicalHealthServices", 136],
    ["others", 147],
  ]

  natureOfWorkLeftCol.forEach(([value, top]) => {
    if (data.natureOfWork === value) {
      page.drawText("X", { x: 148, y: y(top), size: 7, font, color: BLACK })
    }
  })
  natureOfWorkRightCol.forEach(([value, top]) => {
    if (data.natureOfWork === value) {
      page.drawText("X", { x: 345, y: y(top), size: 7, font, color: BLACK })
    }
  })
  if (data.natureOfWork === "others" && data.natureOfWorkOther) {
    draw(page, data.natureOfWorkOther, 395, 147, font, 8)
  }

  // ─── BORROWER'S BANK ACCOUNTS ────────────────────────────────────────────
  // Table header row tops: ~857–862 (column headers)
  // Data rows start at top≈878, each row ~18pts apart
  // Columns (x positions):
  //   Bank/Branch:    x=19
  //   Account Name:   x=140
  //   Date Opened:    x=255
  //   Account Type:   x=360
  //   Account Number: x=466
  const bankRowTops = [878, 896, 914, 932]

  data.bankAccounts.slice(0, 4).forEach((account, i) => {
    const rowTop = bankRowTops[i]
    draw(page, account.bankBranch, 19, rowTop, font, 7)
    draw(page, account.accountName, 140, rowTop, font, 7)
    draw(page, account.dateOpened, 255, rowTop, font, 7)
    draw(page, account.accountType, 360, rowTop, font, 7)
    draw(page, account.accountNumber, 466, rowTop, font, 7)
  })
}

/**
 * Page 3 covers: Borrower's Authorization to Verify Bank Details table,
 * Specimen Signatures (left blank), and the Undertaking section (pre-printed).
 *
 * Only the authorization bank table rows are filled from data.
 */
export function fillPage3(page: PDFPage, data: ApplicationFormType, font: PDFFont) {
  // ─── "To:" bank/branch line ─────────────────────────────────────────────
  // The "To:" label is at top≈89 (approx), entry line at x≈40
  // If there's only one bank, pre-fill the "To:" line with the first bank name
  if (data.authorizeBankDetails.length > 0) {
    draw(page, data.authorizeBankDetails[0].bankBranch, 40, 90, font, 8)
  }

  // ─── AUTHORIZATION TABLE ─────────────────────────────────────────────────
  // Table header tops: ~197–207
  // Data rows start at top≈222, each row ~18pts apart
  // Columns (x positions):
  //   Name of Bank/Branch: x=19   (spans to ~255)
  //   Branch:              x=255  (spans to ~390)
  //   Account Number:      x=390  (spans to ~465)
  //   Account Type:        x=465  (spans to ~595)
  const authRowTops = [222, 240, 258, 276]

  data.authorizeBankDetails.slice(0, 4).forEach((entry, i) => {
    const rowTop = authRowTops[i]
    draw(page, entry.bankBranch, 19, rowTop, font, 7)
    draw(page, entry.accountNumber, 390, rowTop, font, 7)
    draw(page, entry.accountType, 465, rowTop, font, 7)
  })
}
