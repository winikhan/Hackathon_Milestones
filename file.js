document.getElementById("createResumeButton").addEventListener("click", generateResume);
function generateResume() {
    var name = document.getElementById("fullName").value;
    var email = document.getElementById("emailAddress").value;
    var phone = document.getElementById("contactNumber").value;
    var skills = document.getElementById("skillsList").value.split(',').map(function (skill) { return skill.trim(); }).join(', ');
    var education = document.getElementById("educationDetails").value;
    var experience = document.getElementById("workExperience").value;
    // Basic Validation
    if (!name || !email || !phone || !skills || !education || !experience) {
        alert("Please fill in all fields.");
        return;
    }
    // Sanitize input to prevent HTML injection
    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, function (match) {
            var escapeMap = {
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
    var sanitizedName = escapeHTML(name);
    var sanitizedEmail = escapeHTML(email);
    var sanitizedPhone = escapeHTML(phone);
    var sanitizedSkills = escapeHTML(skills);
    var sanitizedEducation = escapeHTML(education);
    var sanitizedExperience = escapeHTML(experience);
    // Resume Content
    var resumeContent = "\n        <div class=\"resume-header\">\n            <h2>".concat(sanitizedName, "</h2>\n            <p><b>Email:</b> ").concat(sanitizedEmail, "</p>\n            <p><b>Phone:</b> ").concat(sanitizedPhone, "</p>\n        </div>\n        <div class=\"resume-section\">\n            <h3>Skills</h3>\n            <p>").concat(sanitizedSkills, "</p>\n        </div>\n        <div class=\"resume-section\">\n            <h3>Education</h3>\n            <p>").concat(sanitizedEducation, "</p>\n        </div>\n        <div class=\"resume-section\">\n            <h3>Experience</h3>\n            <p>").concat(sanitizedExperience, "</p>\n        </div>\n    ");
    // Display the generated resume
    var resumeDiv = document.getElementById("generatedResume");
    if (!resumeDiv)
        return;
    resumeDiv.innerHTML = resumeContent;
    resumeDiv.style.display = "block"; // Show the generated resume
    // Enable actions (Download & URL)
    document.getElementById("resumeActions").style.display = "block";
    // Create a shareable URL
    var resumeURL = generateResumeURL(name, email, phone, skills, education, experience);
    document.getElementById("resumeURL").textContent = resumeURL;
    // Show the Download PDF button
    var downloadPDFButton = document.getElementById("downloadPDFButton");
    downloadPDFButton.style.display = "block"; // Show the download PDF button
    // Add event listener for Download PDF
    downloadPDFButton.addEventListener("click", function () {
        downloadResumeAsPDF(resumeContent);
    });
}
// Generate a simple URL for the generated resume (with query params)
function generateResumeURL(name, email, phone, skills, education, experience) {
    var baseUrl = window.location.href.split('?')[0]; // Clean URL without query parameters
    var resumeParams = new URLSearchParams({
        name: name,
        email: email,
        phone: phone,
        skills: skills,
        education: education,
        experience: experience
    });
    return "".concat(baseUrl, "?").concat(resumeParams.toString());
}
// Function to download the resume as a PDF (without external libraries)
function downloadResumeAsPDF(resumeContent) {
    // Create an invisible canvas to render the content as a PDF
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    if (!context)
        return;
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
            var link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "resume.pdf"; // PDF file name
            link.click(); // Trigger download
        }
    }, "application/pdf");
}
