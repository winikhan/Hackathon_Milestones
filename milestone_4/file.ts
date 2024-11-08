document.getElementById("createResumeButton")!.addEventListener("click", generateResume);

function generateResume() {
    const name = (document.getElementById("fullName") as HTMLInputElement).value;
    const email = (document.getElementById("emailAddress") as HTMLInputElement).value;
    const phone = (document.getElementById("contactNumber") as HTMLInputElement).value;
    const skills = (document.getElementById("skillsList") as HTMLTextAreaElement).value.split(',').map(skill => skill.trim()).join(', ');
    const education = (document.getElementById("educationDetails") as HTMLTextAreaElement).value;
    const experience = (document.getElementById("workExperience") as HTMLTextAreaElement).value;

    const resumeContent = `
        <h2>${name}</h2>
        <p><b>Name:</b> <span contenteditable="true">${name}</p>
        <p><b>Email:</b><span contenteditable="true">${email}</span></p>
        <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>
        <h3>Skills</h3>
        <p span contenteditable="true">${skills}</p>
        <h3>Education</h3>
        <p span contenteditable="true">${education}</p>
        <h3>Experience</h3>
        <p span contenteditable="true">${experience}</p>
    `;

    const resumeDiv = document.getElementById("generatedResume");
    resumeDiv!.innerHTML = resumeContent;
    resumeDiv!.style.display = "block"; // Show the generated resume
}
