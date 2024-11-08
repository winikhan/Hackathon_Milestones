document.getElementById("createResumeButton").addEventListener("click", generateResume);
function generateResume() {
    var name = document.getElementById("fullName").value;
    var email = document.getElementById("emailAddress").value;
    var phone = document.getElementById("contactNumber").value;
    var skills = document.getElementById("skillsList").value.split(',').map(function (skill) { return skill.trim(); }).join(', ');
    var education = document.getElementById("educationDetails").value;
    var experience = document.getElementById("workExperience").value;
    var resumeContent = "\n        <h2>".concat(name, "</h2>\n        <p><b>Name:</b> <span contenteditable=\"true\">").concat(name, "</p>\n        <p><b>Email:</b><span contenteditable=\"true\">").concat(email, "</span></p>\n        <p><b>Phone:</b> <span contenteditable=\"true\">").concat(phone, "</span></p>\n        <h3>Skills</h3>\n        <p span contenteditable=\"true\">").concat(skills, "</p>\n        <h3>Education</h3>\n        <p span contenteditable=\"true\">").concat(education, "</p>\n        <h3>Experience</h3>\n        <p span contenteditable=\"true\">").concat(experience, "</p>\n    ");
    var resumeDiv = document.getElementById("generatedResume");
    resumeDiv.innerHTML = resumeContent;
    resumeDiv.style.display = "block"; // Show the generated resume
}
