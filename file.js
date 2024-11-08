document.getElementById("createResumeButton").addEventListener("click", generateResume);
function generateResume() {
    var name = document.getElementById("fullName").value;
    var email = document.getElementById("emailAddress").value;
    var phone = document.getElementById("contactNumber").value;
    var skills = document.getElementById("skillsList").value.split(',').map(function (skill) { return skill.trim(); }).join(', ');
    var education = document.getElementById("educationDetails").value;
    var experience = document.getElementById("workExperience").value;
    var resumeContent = "\n        <h2>Personal Information</h2>\n        <p><b>Name:</b> ".concat(name, "</p>\n        <p><b>Email:</b> ").concat(email, "</p>\n        <p><b>Phone:</b> ").concat(phone, "</p>\n        <h2>Skills</h2>\n        <p>").concat(skills, "</p>\n        <h2>Education</h2>\n        <p>").concat(education, "</p>\n        <h2>Experience</h2>\n        <p>").concat(experience, "</p>\n    ");
    var resumeDiv = document.getElementById("generatedResume");
    resumeDiv.innerHTML = resumeContent;
    resumeDiv.style.display = "block"; // Show the generated resume
}
