const nodemailer = require('nodemailer')

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PW,
  },
})

// Function to send an email
const sendEmailToAirtaska = async (to, subject, text, email) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to,
      subject,
      text,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

const newOfferEmail = async ({ email, assignmentTitle }) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'New Bid',
      text: `You have received a new bid on ${assignmentTitle}`,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

const acceptOfferEmail = async ({ email, assignmentTitle, name }) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Bid Accepted',
      text: `${name} has accepted your offer on ${assignmentTitle}. You can now start working on it!`,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
const withdrawOfferEmail = async ({ email, assignmentTitle, name }) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Bid Withdrawal',
      text: `${name} has withdrawn offer made on ${assignmentTitle}`,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
const withdrawFromTaskEmail = async ({ email, assignmentTitle, name }) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Withdrawal from assignment',
      text: `${name} has withdrawn from ${assignmentTitle}, the assignment is now open to other freelancers.`,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
const cancelTaskEmail = async ({ email, assignmentTitle }) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'AssignmentCancelled',
      text: `${assignmentTitle} is no longer available, it has been cancelled by the student.`,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
const updateOfferEmail = async ({ email, assignmentTitle, name }) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Bid Update',
      text: `${name} has updated offer made on ${assignmentTitle}`,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
const requestPaymentEmail = async ({ email, assignmentTitle, name }) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Payment Requested',
      text: `${name} has requested payment on ${assignmentTitle}. Confirm everything is done then release payment.`,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

const releasePaymentAdminEmail = async ({
  accountName,
  accountNumber,
  assignmentTitle,
}) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.NODEMAILER_EMAIL,
      subject: 'Release Payment',
      text: `Payment needs to be released for ${assignmentTitle}. Account Holder Name: ${accountName}, Account Number: ${accountNumber}`,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
const releasePaymentTaskerEmail = async ({
  accountName,
  accountNumber,
  assignmentTitle,
  taskerEmail,
}) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: taskerEmail,
      subject: 'Payment Released',
      text: `Payment has been released by the student for ${assignmentTitle}, it will take 2-5 business days to reflect in your nominated bank account. Account Holder Name: ${accountName}, Account Number: ${accountNumber}`,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
module.exports = {
  sendEmailToAirtaska,
  newOfferEmail,
  acceptOfferEmail,
  withdrawFromTaskEmail,
  withdrawOfferEmail,
  updateOfferEmail,
  releasePaymentAdminEmail,
  releasePaymentTaskerEmail,
  requestPaymentEmail,
  cancelTaskEmail,
}
