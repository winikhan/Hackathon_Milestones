document.getElementById("createResumeButton")!.addEventListener("click", generateResume);

function generateResume() {
    const name = (document.getElementById("fullName") as HTMLInputElement).value;
    const email = (document.getElementById("emailAddress") as HTMLInputElement).value;
    const phone = (document.getElementById("contactNumber") as HTMLInputElement).value;
    const skills = (document.getElementById("skillsList") as HTMLTextAreaElement).value.split(',').map(skill => skill.trim()).join(', ');
    const education = (document.getElementById("educationDetails") as HTMLTextAreaElement).value;
    const experience = (document.getElementById("workExperience") as HTMLTextAreaElement).value;

    // Basic Validation
    if (!name || !email || !phone || !skills || !education || !experience) {
        alert("Please fill in all fields.");
        return;
    }

    // Sanitize input to prevent HTML injection
    function escapeHTML(str: string): string {
        return str.replace(/[&<>"']/g, (match) => {
            const escapeMap: { [key: string]: string } = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;',
            };
            return escapeMap[match];
        });
    }

    // Escape inputs to sanitize them
    const sanitizedName = escapeHTML(name);
    const sanitizedEmail = escapeHTML(email);
    const sanitizedPhone = escapeHTML(phone);
    const sanitizedSkills = escapeHTML(skills);
    const sanitizedEducation = escapeHTML(education);
    const sanitizedExperience = escapeHTML(experience);

    // Resume Content
    const resumeContent = `
        <div class="resume-header">
            <h2>${sanitizedName}</h2>
            <p><b>Email:</b> ${sanitizedEmail}</p>
            <p><b>Phone:</b> ${sanitizedPhone}</p>
        </div>
        <div class="resume-section">
            <h3>Skills</h3>
            <p>${sanitizedSkills}</p>
        </div>
        <div class="resume-section">
            <h3>Education</h3>
            <p>${sanitizedEducation}</p>
        </div>
        <div class="resume-section">
            <h3>Experience</h3>
            <p>${sanitizedExperience}</p>
        </div>
    `;

    // Display the generated resume
    const resumeDiv = document.getElementById("generatedResume");
    if (!resumeDiv) return;
    
    resumeDiv.innerHTML = resumeContent;
    resumeDiv.style.display = "block"; // Show the generated resume

    // Enable actions (Download & URL)
    document.getElementById("resumeActions")!.style.display = "block";

    // Create a shareable URL
    const resumeURL = generateResumeURL(name, email, phone, skills, education, experience);
    document.getElementById("resumeURL")!.textContent = resumeURL;

    // Show the Download PDF button
    const downloadPDFButton = document.getElementById("downloadPDFButton")!;
    downloadPDFButton.style.display = "block"; // Show the download PDF button

    // Add event listener for Download PDF
    downloadPDFButton.addEventListener("click", function () {
        downloadResumeAsPDF(resumeContent);
    });
}

// Generate a simple URL for the generated resume (with query params)
function generateResumeURL(name: string, email: string, phone: string, skills: string, education: string, experience: string): string {
    const baseUrl = window.location.href.split('?')[0]; // Clean URL without query parameters
    const resumeParams = new URLSearchParams({
        name: name,
        email: email,
        phone: phone,
        skills: skills,
        education: education,
        experience: experience
    });
    return `${baseUrl}?${resumeParams.toString()}`;
}

// Function to download the resume as a PDF (without external libraries)
function downloadResumeAsPDF(resumeContent: string) {
    // Create an invisible canvas to render the content as a PDF
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas size and style
    canvas.width = 600; // Width of the PDF
    canvas.height = 800; // Height of the PDF

    // Render the resume content to canvas
    context.font = "16px Arial";
    context.fillText(resumeContent, 10, 20);

    // Create a Blob (binary large object) from the canvas data
    canvas.toBlob(function (blob) {
        if (blob) {
            // Create an anchor element to trigger the download
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "resume.pdf"; // PDF file name
            link.click(); // Trigger download
        }
    }, "application/pdf");
}
