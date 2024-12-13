// import { jsPDF } from "jspdf";
console.log("jsPDF:", window.jspdf);


function generateReport() {
    const name = document.getElementById('name').value;
    const rollNo = document.getElementById('rollNo').value;
    const registrationNo = document.getElementById('registrationNo').value;
    const subject = document.getElementById('subject').value;
    const branch = document.getElementById('branch').value;
    const semester = document.getElementById('semester').value;
    const session = document.getElementById('session').value;
    const submittedTo = document.getElementById('submittedTo').value;

    document.getElementById('displayName').textContent = name;
    document.getElementById('displayRollNo').textContent = rollNo;
    document.getElementById('displayRegistrationNo').textContent = registrationNo;
    document.getElementById('displaySubject').textContent = subject;
    document.getElementById('displayBranch').textContent = branch;
    document.getElementById('displaySemester').textContent = semester;
    document.getElementById('displaySession').textContent = session;
    document.getElementById('displayTeacherName').textContent = submittedTo;
    document.getElementById('displayName2').textContent = name;

    document.getElementById('report').classList.remove('hidden');
}

function downloadPDF() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'pt', 'a4');
        const margin = 40;

    const lineHeight = 20;
    const startY = 60;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const centerX = pageWidth / 2;

    // Add border

    doc.setLineWidth(2);
    doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

    // Add title
    doc.setFontSize(27);
    doc.setFont('Courier New', 'bold');
    doc.text("PURNEA COLLEGE OF ENGINEERING", centerX, startY+30, { align: 'center'});

    doc.setFontSize(27);
    doc.setFont('Courier New', 'bold');
    doc.text("PURNEA", centerX, startY+58, { align: 'center'});

  
    // Add the logo
    const logo = document.getElementById('logo');
    const logoBase64 = getBase64Image(logo);
    doc.addImage(logoBase64, 'PNG', centerX-125, startY + 80, 265, 265);

    // Add "LAB REPORT" title
    doc.setFontSize(25);
    doc.setFont('Courier New', 'bold');
    doc.text("LAB REPORT", centerX, startY + 380, { align: 'center' });

    // Add report details
    doc.setFontSize(20);
    doc.setFont('courier', 'bold');
    let currentY = startY + 440;
    const addText = (label, value) => {
        doc.text(`${label}: ${value}`, margin+40, currentY);
        currentY += lineHeight+12;
    };

    addText("Name", document.getElementById('displayName').textContent);
    addText("Roll No", document.getElementById('displayRollNo').textContent);
    addText("Registration No", document.getElementById('displayRegistrationNo').textContent);
    addText("Subject", document.getElementById('displaySubject').textContent);
    addText("Branch", document.getElementById('displayBranch').textContent);
    addText("Semester", document.getElementById('displaySemester').textContent);
    addText("Session", document.getElementById('displaySession').textContent);


    addText("Submitted To", document.getElementById('displayTeacherName').textContent);

    addText("Submitted By", document.getElementById('displayName2').textContent);

        doc.save('Lab_Report.pdf');
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF. Please check the console for details.");
    }
}


function getBase64Image(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/png');
}