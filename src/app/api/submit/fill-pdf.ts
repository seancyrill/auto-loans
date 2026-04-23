import { ApplicationFormType, NatureOfWork } from "@/app/context/form-context-types"
import fs from "fs"
import path from "path"
import { PDFDocument, PDFFont, PDFPage, rgb, StandardFonts } from "pdf-lib"

const BLACK = rgb(0, 0, 0)
const FONT_SIZE = 10

export async function fillGdfiApplication(data: ApplicationFormType): Promise<Uint8Array> {
  const pdfPath = path.join(process.cwd(), "src/templates/gdfi-application.pdf")
  const templateBytes = fs.readFileSync(pdfPath)

  const pdfDoc = await PDFDocument.load(templateBytes)
  const pages = pdfDoc.getPages()
  const font = await pdfDoc.embedFont(StandardFonts.Courier)

  fillPage1(pages[0], data, font)
  fillPage2(pages[1], data, font)
  fillPage3(pages[2], data, font)

  return pdfDoc.save()
}

function t(page: PDFPage, text: string, x: number, y: number, font: PDFFont, size = FONT_SIZE) {
  if (!text) return
  page.drawText(text, { x, y, size, font, color: BLACK })
}

function check(page: PDFPage, x: number, y: number, font: PDFFont) {
  page.drawText("X", { x: x + 3, y: y + 2, size: 7, font, color: BLACK })
}

export function fillPage1(page: PDFPage, data: ApplicationFormType, font: PDFFont) {
  // ─── DATE (top-right) ─────────────────────────────────────────────────────
  t(page, new Date().toLocaleDateString("en-US"), 533, 913, font)
  t(page, data.loanOption, 143, 886, font)
  t(page, "X", 483, 851, font)
  t(page, "Sean Cyrill L. de Guzman", 437, 783, font)

  // ─── FULL NAME ────────────────────────────────────────────────────────────
  const fullName = [data.lastName, data.firstName, data.middleName, data.nameSuffix].filter(Boolean).join(", ")
  t(page, fullName, 140, 680, font)

  // ─── CIVIL STATUS checkboxes ──────────────────────────────────────────────
  if (data.civilStatus === "single") check(page, 435, 683, font)
  if (data.civilStatus === "annulled") check(page, 484, 683, font)
  if (data.civilStatus === "separated") check(page, 537, 683, font)
  if (data.civilStatus === "married") check(page, 435, 671, font)
  if (data.civilStatus === "common Law") check(page, 485, 671, font)

  // ─── DATE OF BIRTH / PLACE OF BIRTH / GENDER ──────────────────────────────
  t(page, data.birthDate, 140, 634, font)
  t(page, data.birthPlace, 287, 633, font)
  t(page, data.gender === "male" ? "Male" : data.gender === "female" ? "Female" : "", 434, 634, font)

  // ─── PRESENT ADDRESS + LENGTH OF STAY ─────────────────────────────────────
  t(page, data.presentAddress, 140, 618, font)
  t(page, data.addressPresYears, 437, 612, font)
  t(page, data.addressPresMonths, 487, 613, font)

  // ─── PERMANENT ADDRESS + LENGTH OF STAY ───────────────────────────────────
  t(page, data.permanentAddress, 140, 591, font)
  t(page, data.addressPermYears, 437, 585, font)
  t(page, data.addressPermMonths, 489, 587, font)

  // ─── PROVINCIAL ADDRESS + LENGTH OF STAY ──────────────────────────────────
  t(page, data.provincialAddress, 140, 564, font)
  t(page, data.addressProvYears, 439, 559, font)
  t(page, data.addressProvMonths, 490, 559, font)

  // ─── CONTACT DETAILS ──────────────────────────────────────────────────────
  t(page, `0${data.mobile}`, 277, 534, font)

  // ─── CITIZENSHIP ──────────────────────────────────────────────────────────
  if (data.citizenship === "filipino") check(page, 143, 516, font)
  if (data.citizenship === "others") {
    check(page, 212, 514, font)
    t(page, data.citizenshipOther, 422, 516, font)
  }

  // ─── TIN / SSS / GSIS ─────────────────────────────────────────────────────
  t(page, data.tin, 159, 492, font)
  t(page, data.sssNumber, 271, 492, font)
  t(page, data.gsisNumber, 381, 492, font)

  // ─── SCHOOL LAST ATTENDED ─────────────────────────────────────────────────
  // Line 1 — School Name: x=199, y=472

  t(page, data.schoolName, 199, 472, font)
  t(page, data.schoolGradeLevel, 267, 457, font)
  t(page, data.schoolYearGraduated, 497, 457, font)

  // ─── HOUSE OWNERSHIP ──────────────────────────────────────────────────────
  if (data.houseOwnership === "owned (Not Mortgaged)") {
    check(page, 144, 443, font)
  }
  if (data.houseOwnership === "rented") {
    check(page, 269, 441, font)
    t(page, data.houseRentMonthly, 427, 440, font)
    t(page, data.houseOwnedBy, 379, 409, font)
  }
  if (data.houseOwnership === "owned (Mortgaged)") {
    check(page, 144, 430, font)
    t(page, data.houseMortgageMonthly, 373, 430, font)
    t(page, data.houseOwnedBy, 404, 398, font)
  }
  if (data.houseOwnership === "used Free") {
    check(page, 143, 419, font)
    t(page, data.houseOwnedBy, 389, 386, font)
  }

  // ─── DEPENDENTS ───────────────────────────────────────────────────────────
  const depRows = [344, 329, 313]
  data.dependents.slice(0, 4).forEach((dep, i) => {
    t(page, dep.name, 17, depRows[i], font)
    t(page, dep.age, 139, depRows[i], font)
    t(page, dep.schoolLastAttended, 202, depRows[i], font)
    t(page, dep.relationship, 464, depRows[i], font)
  })

  // ─── INCOME INFORMATION ───────────────────────────────────────────────────
  if (!data.incomeSources.includes("employment") && !data.incomeSources.includes("business")) {
    check(page, 468, 288, font)
  }

  t(page, data.employerName, 140, 277, font)
  t(page, data.businessName, 283, 276, font)

  const totalIncome = [
    data.employmentIncome,
    data.remittanceIncome,
    data.pensionIncome,
    data.commissionsIncome,
    data.businessIncome,
    data.interestIncome,
    data.saleOfAssetsIncome,
  ].filter((val) => val && val.toString().trim() !== "")

  t(page, totalIncome.join(" + "), 208, 255, font)

  t(page, data.employmentYears, 490, 253, font)
  t(page, data.employmentMonths, 540, 253, font)

  t(page, data.businessTelNumber, 484, 220, font)

  // Employer / Business Address — x=140, y=227
  t(page, data.employerBusinessAddress, 142, 232, font)

  // PRC License No. — x=248, y=216
  t(page, data.prcLicenseNumber, 255, 209, font)

  // ─── SOURCE OF INCOME checkboxes ──────────────────────────────────────────
  if (data.incomeSources.includes("employment")) check(page, 142, 188, font)
  if (data.incomeSources.includes("remittance")) check(page, 220, 186, font)
  if (data.incomeSources.includes("pension")) check(page, 295, 186, font)
  if (data.incomeSources.includes("commissions")) check(page, 402, 186, font)
  if (data.incomeSources.includes("business")) check(page, 144, 172, font)
  if (data.incomeSources.includes("interest Income")) check(page, 220, 172, font)
  if (data.incomeSources.includes("sale Of Assets")) check(page, 310, 174, font)
}

export function fillPage2(page: PDFPage, data: ApplicationFormType, font: PDFFont) {
  const cb = data.coBorrower

  // ─── NATURE OF WORK / BUSINESS ────────────────────────────────────────────
  const natureLeftCol: [string, number][] = [
    ["agriculture / Animal Farming", 936],
    ["food Services / Food Processing", 924],
    ["real Estate Leasing", 911],
    ["BPO", 897],
    ["government Service", 874],
    ["tourism", 862],
    ["casino / Gaming Club", 850],
    ["IT / Software", 836],
    ["transportation", 823],
    ["construction", 812],
    ["law / Accounting / Auditing Firm", 800],
    ["wholesale / Retail Trade", 788],
  ]
  const natureRightCol: [string, number][] = [
    ["finance / Insurance / Securities", 936],
    ["manufacturing", 924],
    ["utilities", 910],
    ["forex / Money Changer / Remittance Agent", 898],
    ["maritime / Shipping", 875],
    ["foundation", 863],
    ["medical Health Services", 851],
    ["others", 839],
  ]

  natureLeftCol.forEach(([value, y]) => {
    if (data.natureOfWork.includes(value as NatureOfWork)) check(page, 146, y, font)
  })
  natureRightCol.forEach(([value, y]) => {
    if (data.natureOfWork.includes(value as NatureOfWork)) check(page, 365, y, font)
  })
  if (data.natureOfWork.includes("others") && data.natureOfWorkOther) {
    t(page, data.natureOfWorkOther, 432, 839, font)
  }

  // REMOVED - not necessary, recycled form to handle sangla details instaed
  // ─── MOTOR VEHICLE ────────────────────────────────────────────────────────
  // if (data.motorVehicle) {
  //   const mv = data.motorVehicle
  //   t(page, mv.year, 163, 766, font)
  //   t(page, mv.makeModel, 290, 766, font)
  //   t(page, mv.color, 414, 766, font)
  //   t(page, mv.plateNumber, 498, 766, font)
  //   t(page, mv.mileageKm, 209, 751, font)
  //   t(page, mv.placeOfRegistration, 360, 751, font)
  // }

  // ─── CHARACTER REFERENCES ─────────────────────────────────────────────────

  // 3 data rows at y=730, 716, 701
  const charRefRows = [696, 680, 665]
  data.characterReferences.slice(0, 3).forEach((ref, i) => {
    t(page, ref.name, 17, charRefRows[i], font)
    t(page, ref.address, 137, charRefRows[i], font)
    t(page, ref.contactNumber ? `0${ref.contactNumber}` : "", 487, charRefRows[i], font)
  })

  // ─── TRADE REFERENCES ─────────────────────────────────────────────────────
  const tradeRefRows = [620, 606, 590]
  data.tradeReferences.slice(0, 3).forEach((ref, i) => {
    t(page, ref.businessName, 17, tradeRefRows[i], font)
    t(page, ref.address, 137, tradeRefRows[i], font)
    t(page, ref.contactNumber ? `0${ref.contactNumber}` : "", 487, tradeRefRows[i], font)
  })

  // ─── SPOUSE / CO-BORROWER INFORMATION ─────────────────────────────────────

  // Full Name — y=604
  const coFullName = [cb.lastName, cb.firstName, cb.middleName, cb.nameSuffix].filter(Boolean).join(", ")
  t(page, coFullName, 141, 554, font)

  // Date & Place of Birth — y=581
  t(page, cb.birthDate, 289, 530, font)
  t(page, cb.birthPlace, 139, 530, font)
  t(page, cb.gender === "male" ? "Male" : cb.gender === "female" ? "Female" : "", 489, 530, font)

  // Present Address — y=563  |  year/month y=564
  t(page, cb.presentAddress, 142, 507, font)
  t(page, cb.addressPresYears, 491, 509, font)
  t(page, cb.addressPresMonths, 540, 509, font)

  // Permanent Address — y=540  |  year/month y=541
  t(page, cb.permanentAddress, 137, 479, font)
  t(page, cb.addressPermYears, 491, 482, font)
  t(page, cb.addressPermMonths, 540, 481, font)

  // Provincial Address — y=514  |  year/month y=515
  t(page, cb.provincialAddress, 141, 454, font)
  t(page, cb.addressProvYears, 489, 456, font)
  t(page, cb.addressProvMonths, 540, 457, font)

  // Mobile
  if (cb.mobile) {
    t(page, `0${cb.mobile}`, 261, 424, font)
  }

  // Citizenship — y=463
  if (cb.citizenship === "filipino") check(page, 144, 409, font)
  if (cb.citizenship === "others") {
    check(page, 218, 408, font)
    t(page, cb.citizenshipOther, 409, 405, font)
  }

  // TIN / SSS / GSIS — y=434
  t(page, cb.tin, 172, 384, font)
  t(page, cb.sssNumber, 302, 385, font)
  t(page, cb.gsisNumber, 434, 384, font)

  // School Last Attended — line1 y=418, line2 y=384
  t(page, cb.schoolName, 206, 364, font)
  t(page, cb.schoolGradeLevel, 258, 351, font)
  t(page, cb.schoolYearGraduated, 444, 352, font)

  // House Ownership — mirrors page 1 house section, shifted +66.6pt
  if (cb.houseOwnership === "owned (Not Mortgaged)") {
    check(page, 142, 334, font)
  }
  if (cb.houseOwnership === "rented") {
    check(page, 270, 332, font)
    t(page, cb.houseRentMonthly, 428, 332, font)
    t(page, cb.houseOwnedBy, 398, 301, font)
  }
  if (cb.houseOwnership === "owned (Mortgaged)") {
    check(page, 142, 321, font)
    t(page, cb.houseMortgageMonthly, 371, 321, font)
    t(page, cb.houseOwnedBy, 393, 289, font)
  }
  if (cb.houseOwnership === "used Free") {
    check(page, 142, 313, font)
    t(page, cb.houseOwnedBy, 388, 278, font)
  }

  // Co-Borrower Employer / Business — y=361
  t(page, cb.employerName, 142, 245, font)
  t(page, cb.businessName, 271, 245, font)

  // Monthly Income — x=206, y=333
  t(page, cb.monthlyIncome, 210, 225, font)

  t(page, cb.employmentYears, 489, 224, font)
  t(page, cb.employmentMonths, 538, 224, font)

  t(page, cb.businessTelNumber, 487, 190, font)

  // Employer / Business Address — x=140, y=294
  t(page, cb.employerBusinessAddress, 139, 185, font)

  // ─── BORROWER'S BANK ACCOUNTS ─────────────────────────────────────────────
  const bankRowY = [122, 108, 92, 78, 63]
  data.bankAccounts.slice(0, 5).forEach((account, i) => {
    const y = bankRowY[i]
    t(page, account.bankBranch, 17, y, font, 7)
    t(page, account.accountName, 137, y, font, 7)
    t(page, account.dateOpened, 261, y, font, 7)
    t(page, account.accountType, 357, y, font, 7)
    t(page, account.accountNumber, 484, y, font, 7)
  })
}

export function fillPage3(page: PDFPage, data: ApplicationFormType, font: PDFFont) {
  // ─── "To:" BANK / BRANCH LINE ─────────────────────────────────────────────
  const toBankName = data.authorizeBankDetails[0]?.bankBranch || data.bankAccounts[0]?.bankBranch || ""
  t(page, toBankName, 65, 911, font)

  // ─── AUTHORIZATION TABLE ──────────────────────────────────────────────────
  const authRowY = [775, 755, 738]

  data.bankAccounts.slice(0, 3).forEach((entry, i) => {
    const y = authRowY[i]
    t(page, entry.bankBranch, 23, y, font, 7)
    t(page, entry.accountNumber, 393, y, font, 7)
    t(page, entry.accountType, 470, y, font, 7)
  })
}
