const studentName = document.querySelector("#student-name");
const studentImage = document.querySelector("#student-image");

const addStudent = async (event) => {
  event.preventDefault();

  const studentUpload = studentImage.files[0];

  const imageResponse = await supabaseClient.storage
    .from("students_images")
    .upload(studentUpload.name, studentUpload);

  console.log(imageResponse);

  const studentResponse = await supabaseClient.from("students").insert({
    student_name: studentName.value,
    image_path: studentImage.value,
  });

  console.log(studentResponse);
};
