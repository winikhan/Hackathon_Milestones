document.getElementById("createResumeButton")!.addEventListener("click", generateResume);

function generateResume() {
    const name = (document.getElementById("fullName") as HTMLInputElement).value;
    const email = (document.getElementById("emailAddress") as HTMLInputElement).value;
    const phone = (document.getElementById("contactNumber") as HTMLInputElement).value;
    const skills = (document.getElementById("skillsList") as HTMLTextAreaElement).value.split(',').map(skill => skill.trim()).join(', ');
    const education = (document.getElementById("educationDetails") as HTMLTextAreaElement).value;
    const experience = (document.getElementById("workExperience") as HTMLTextAreaElement).value;

    const resumeContent = `
        <h2>Personal Information</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <h2>Skills</h2>
        <p>${skills}</p>
        <h2>Education</h2>
        <p>${education}</p>
        <h2>Experience</h2>
        <p>${experience}</p>
    `;

    const resumeDiv = document.getElementById("generatedResume");
    resumeDiv!.innerHTML = resumeContent;
    resumeDiv!.style.display = "block"; // Show the generated resume
}
